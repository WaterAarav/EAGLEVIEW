import React, { createContext, useReducer, useEffect } from 'react';
import { Note, NotesState, NotesAction } from '../types';

// Initialize with 10 empty pages, each with 1 line and increased character limit
export const initialNotes: Note[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  content: '',
  maxCharacters: 200 // Increased from 60 to 200 characters
}));

export const initialState: NotesState = {
  notes: initialNotes,
  currentPage: 0,
  viewMode: 'notebook'
};

// Load state from localStorage if available
const loadState = (): NotesState => {
  try {
    const savedState = localStorage.getItem('notesAppState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }
  return initialState;
};

// Reducer function to manage state updates
const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'RESET_NOTES':
      return {
        ...initialState,
        // Keep the current view mode
        viewMode: state.viewMode
      };
      
    case 'SET_LINE': {
      const { pageId, content } = action;
      // Only allow editing in notebook mode
      if (state.viewMode !== 'notebook') return state;
      
      // Create a new array of notes
      const newNotes = [...state.notes];
      
      // Update the note content
      newNotes[pageId] = {
        ...newNotes[pageId],
        content: content.slice(0, newNotes[pageId].maxCharacters) // Enforce max length
      };
      
      return {
        ...state,
        notes: newNotes
      };
    }
    
    case 'NEXT_PAGE':
      if (state.currentPage < state.notes.length - 1) {
        return {
          ...state,
          currentPage: state.currentPage + 1
        };
      }
      return state;
      
    case 'PREV_PAGE':
      if (state.currentPage > 0) {
        return {
          ...state,
          currentPage: state.currentPage - 1
        };
      }
      return state;
      
    case 'GOTO_PAGE':
      if (action.pageId >= 0 && action.pageId < state.notes.length) {
        return {
          ...state,
          currentPage: action.pageId
        };
      }
      return state;
      
    case 'TOGGLE_VIEW_MODE':
      return {
        ...state,
        viewMode: state.viewMode === 'notebook' ? 'spread' : 'notebook'
      };
      
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.mode
      };
      
    default:
      return state;
  }
};

// Create context
export const NotesContext = createContext<{
  state: NotesState;
  dispatch: React.Dispatch<NotesAction>;
}>({
  state: initialState,
  dispatch: () => null
});

// Provider component
export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, loadState());
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notesAppState', JSON.stringify(state));
  }, [state]);
  
  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};