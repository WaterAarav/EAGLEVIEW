import React, { useEffect, useRef } from 'react';
import { Note } from '../types';
import { useNotes } from '../hooks/useNotes';

interface NotePageProps {
  note: Note;
  isActive?: boolean;
  readOnly?: boolean;
  animateIn?: boolean;
  isFirstPage?: boolean;
}

const NotePage: React.FC<NotePageProps> = ({ 
  note, 
  isActive = true, 
  readOnly = false,
  animateIn = false,
  isFirstPage = false
}) => {
  const { dispatch } = useNotes();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-focus the textarea when the component mounts, when it becomes active, or when the note changes
  useEffect(() => {
    if (!readOnly && textareaRef.current) {
      // Small timeout to ensure the DOM has updated
      const timer = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Move cursor to the end of the text
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [readOnly, note.id]); // Add note.id to dependency array
  
  const MAX_LINES = 8; // Maximum number of lines allowed

  const handleContentChange = (newContent: string) => {
    // Split content into lines and trim any extra lines beyond MAX_LINES
    const lines = newContent.split('\n');
    const lineCount = lines.length;
    
    // If we're at or below the limit, or if the user is deleting content, allow the change
    if (lineCount <= MAX_LINES || newContent.length < (note.content || '').length) {
      // If we're at the limit and trying to add a new line, prevent it
      if (lineCount > MAX_LINES && newContent.endsWith('\n')) {
        return;
      }
      
      // If we're over the limit, trim to MAX_LINES
      const trimmedContent = lineCount > MAX_LINES 
        ? lines.slice(0, MAX_LINES).join('\n')
        : newContent;
      
      dispatch({
        type: 'SET_LINE',
        pageId: note.id,
        content: trimmedContent
      });
    }
  };
  
  // Base note styles
  const noteClasses = [
    'relative',
    'p-6',
    'rounded-lg',
    'shadow-lg',
    'transform',
    'transition-all',
    'duration-300',
    'flex flex-col',
    isActive ? 'bg-amber-50/90' : 'bg-amber-50/80',
    readOnly ? 'cursor-default' : 'cursor-text',
    animateIn ? 'animate-fadeIn' : ''
  ];

  // Add border and hover effects only in edit mode
  if (!readOnly) {
    noteClasses.push('border-2', 'border-amber-200', 'hover:border-amber-300');
  } else {
    noteClasses.push('border', 'border-amber-100');
  }

  return (
    <div className="relative">
      
      <div 
        className={noteClasses.join(' ')}
        style={{
          aspectRatio: '1',
          width: readOnly ? '100%' : '18rem',
          transform: readOnly ? 'rotate(-1deg)' : 'none'
        }}
      >
        <div className="flex flex-col justify-center items-center h-full p-4">
          {readOnly ? (
            <p className="w-full text-amber-900 font-light break-words text-sm text-center">
              {note.content || ''}
            </p>
          ) : (
            <div className="w-full h-full overflow-hidden">
              <textarea
                ref={textareaRef}
                value={note.content || ''}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full h-full py-2 px-4 bg-transparent border-none outline-none text-amber-900 font-light resize-none text-center placeholder-amber-300 focus:ring-0 focus:outline-none cursor-text text-sm overflow-hidden"
                placeholder={isFirstPage ? "Write your note here..." : ""}
                maxLength={note.maxCharacters}
                rows={MAX_LINES}
                disabled={readOnly}
                aria-label="Note content"
                autoFocus
                style={{
                  lineHeight: '1.25',
                  minHeight: 'auto',
                  WebkitAppearance: 'none',
                  WebkitOverflowScrolling: 'touch',
                  overflow: 'hidden',
                  resize: 'none',
                  boxSizing: 'border-box',
                  caretColor: '#92400e' // Amber-700 for better visibility
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;