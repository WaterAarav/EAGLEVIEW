import React from 'react';
import { Book } from 'lucide-react';
import NotePage from './NotePage';
import { useNotes } from '../hooks/useNotes';

const SpreadView: React.FC = () => {
  const { state, dispatch } = useNotes();
  
  // Fixed layout with 5 pages per row
  
  // Return to notebook mode
  const returnToNotebook = () => {
    dispatch({ type: 'SET_VIEW_MODE', mode: 'notebook' });
  };
  
  return (
    <div className="w-full min-h-[calc(100vh-2rem)] bg-[#d1d9c7] overflow-auto">
      <div className="max-w-[95%] sm:max-w-[90%] lg:max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
        <div className="flex justify-center mb-6 sm:mb-8">
          <button
            onClick={returnToNotebook}
            className="group relative flex items-center gap-2 px-5 sm:px-7 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm sm:text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Book className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Return to Notebook</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 relative pb-6">
          {/* Pinboard texture overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZDFkOWM3Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNiOGMxYjUiPjwvcmVjdD4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          
          {state.notes.map((note, index) => {
            // Create a slight rotation for each note for a natural look
            const rotation = (index % 3 - 1) * 2; // -2, 0, or 2 degrees
            const yOffset = index % 2 === 0 ? '0' : '1';
            
            return (
              <div 
                key={note.id} 
                className={`relative transform transition-all duration-300 hover:z-10 hover:scale-105 cursor-pointer`}
                style={{
                  transform: `rotate(${rotation}deg) translateY(${yOffset}px)`
                }}
                onClick={() => {
                  // Switch to notebook view and go to the clicked page
                  dispatch({ type: 'SET_VIEW_MODE', mode: 'notebook' });
                  dispatch({ type: 'GOTO_PAGE', pageId: index });
                }}
              >
                {/* Pin at the top with hover animation */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 group z-20">
                  <div className="w-full h-full rounded-full bg-amber-200 shadow-md transition-all duration-200 ease-out group-hover:scale-125 group-hover:shadow-lg">
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-amber-300 rounded-full transition-all duration-200 group-hover:bg-amber-400"></div>
                  </div>
                </div>
                
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <NotePage 
                    note={note} 
                    isActive={false}
                    readOnly={true}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpreadView;