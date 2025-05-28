import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool } from 'lucide-react';

const CreatorNote: React.FC = () => {
  const navigate = useNavigate();

  // Auto-request fullscreen when component mounts
  useEffect(() => {
    const requestFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen().catch(e => {
            console.log('Fullscreen request failed:', e);
          });
        }
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    };

    requestFullscreen();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#d1d9c7] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">From the Creator</h2>
          
          <div className="prose prose-amber max-w-none mb-8 text-left space-y-4">
            <p className="text-amber-800">
              Aight guys so this app is made so u can brainstorm ideas or make ur decisions better. This shit literally improves your IQ (but only until u use this tool lol).
            </p>
            <p className="text-amber-800">
              This app is not made to store notes long term. Only to brainstorm and think which is obviously for the short term.
            </p>
            <p className="text-amber-800">
              Also I know that the logo of my app doesn't look like an eagle at all.
            </p>
            <p className="text-amber-800 mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              I am trying to buy a domain name but I don't want to ask my parents for money. Can you please send me some money on this PayPal so I can buy the domain name? I will replace this line with a success message when we hit the $15 goal.
              <br/><br/>
              <a href="https://www.paypal.me/ArbudaSingh" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 font-medium underline">Donate via PayPal</a>
            </p>
          </div>
          
          <button
            onClick={() => navigate('/notebook')}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-amber-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <PenTool className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
              <span className="font-semibold tracking-wide">Start Writing</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-300/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorNote;
