import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteBook from './components/NoteBook';
import SpreadView from './components/SpreadView';
import LandingPage from './components/LandingPage';
import CreatorNote from './components/CreatorNote';
import Logo from './components/Logo';
import { NotesProvider, NotesContext } from './context/NotesContext';
import './index.css';

function AppContent() {
  const { state, dispatch } = React.useContext(NotesContext);
  
  // Reset notes when component mounts
  useEffect(() => {
    // Only clear local storage and reset notes if not in the landing page
    if (window.location.pathname !== '/') {
      localStorage.removeItem('notesAppState');
      dispatch({ type: 'RESET_NOTES' });
    }
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-[#d1d9c7] flex flex-col relative overflow-x-hidden">
      <Logo />
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex items-center justify-center w-full">
        <div className="w-full max-w-[2000px] mx-auto transition-all duration-500 ease-in-out">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/creator" element={<CreatorNote />} />
            <Route path="/notebook" element={
              state.viewMode === 'notebook' ? <NoteBook /> : <SpreadView />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NotesProvider>
        <AppContent />
      </NotesProvider>
    </Router>
  );
}

export default App;