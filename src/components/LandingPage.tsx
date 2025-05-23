import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Dog, Zap, Lightbulb } from 'lucide-react';
import { initialState } from '../context/NotesContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple floating note effect
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const notes = Array(15).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 10,
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI * 2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(180, 200, 170, 0.3)';
      notes.forEach(note => {
        ctx.beginPath();
        ctx.arc(note.x, note.y, note.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        note.x += Math.cos(note.angle) * note.speed;
        note.y += Math.sin(note.angle) * note.speed * 0.5;
        
        // Bounce off edges
        if (note.x < 0 || note.x > canvas.width) note.angle = Math.PI - note.angle;
        if (note.y < 0 || note.y > canvas.height) note.angle = -note.angle;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen bg-[#d1d9c7] flex flex-col items-center justify-center p-4 text-center overflow-hidden w-full relative">
      {/* Animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      />
      
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        {/* Logo/Title */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center mb-4 shadow-lg">
            <Dog className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Eagle View</h1>
          <p className="text-amber-700/90 max-w-xs">Your thoughts, organized simply</p>
        </div>
        
        {/* Main CTA */}
        <div className="space-y-6">
          <button
            onClick={() => {
              // Set view mode to notebook before navigating
              localStorage.setItem('notesAppState', JSON.stringify({
                ...initialState,
                viewMode: 'notebook'
              }));
              navigate('/notebook');
            }}
            className="group w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PenTool className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Start Writing</span>
            <Zap className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
          </button>
          
          <div className="relative my-2">
            <div className="w-full border-t border-amber-200/70"></div>
          </div>
          
          <button
            onClick={() => navigate('/creator')}
            className="group w-full flex items-center justify-center space-x-2.5 px-6 py-3.5 border-2 border-amber-300/70 text-amber-700 hover:bg-amber-50/50 hover:border-amber-400/50 text-base font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="relative">
              <Lightbulb className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform" />
              <div className="absolute -inset-1 bg-amber-200/40 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span>From the creator</span>
            <svg className="h-4 w-4 text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-xs text-amber-700/60">No account required • Works offline</p>
      </div>
    </div>
  );
};

export default LandingPage;
