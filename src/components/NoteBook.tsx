import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotePage from './NotePage';
import { useNotes } from '../hooks/useNotes';

const NoteBook: React.FC = () => {
  const { state, dispatch } = useNotes();
  const bookRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Get current page and notes
  const currentPage = state.notes[state.currentPage];
  
  // Handle navigation
  const goToNextPage = () => dispatch({ type: 'NEXT_PAGE' });
  const goToPrevPage = () => dispatch({ type: 'PREV_PAGE' });
  const goToSpreadView = () => {
    dispatch({ type: 'TOGGLE_VIEW_MODE' });
    navigate('/notebook');
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div 
      ref={bookRef}
      className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto transition-all duration-300"
    >
      <div className="relative w-full">
        {/* View All Pages button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={goToSpreadView}
            className="group relative px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <Grid3x3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">View All Pages</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
        
        <div className="relative w-full flex items-center justify-between">
          {/* Previous button */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <button
              onClick={goToPrevPage}
              disabled={state.currentPage === 0}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200
                        ${state.currentPage === 0 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'}`}
              aria-label="Previous page"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          {/* Current page */}
          <div className="mx-auto">
            <NotePage 
              note={currentPage} 
              isActive={true}
              readOnly={false}
              animateIn={true}
              isFirstPage={state.currentPage === 0}
            />
          </div>
          
          {/* Next button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              onClick={goToNextPage}
              disabled={state.currentPage === state.notes.length - 1}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200
                        ${state.currentPage === state.notes.length - 1 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'}`}
              aria-label="Next page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Page number indicator */}
        <div className="mt-6 text-center text-amber-50">
          Page {state.currentPage + 1} of {state.notes.length}
        </div>
      </div>
    </div>
  );
};

export default NoteBook;