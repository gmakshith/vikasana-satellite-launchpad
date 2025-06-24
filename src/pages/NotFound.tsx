
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowDown, Satellite } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0B0F1A] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,227,255,0.1),transparent_50%)]"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#1C78C0]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9A6BFF]/10 rounded-full blur-3xl"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00E3FF] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#FFD700] rounded-full opacity-80 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#FF8C42] rounded-full opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
        {/* 404 Icon */}
        <div className="mb-8 relative">
          <Satellite className="w-24 h-24 md:w-32 md:h-32 mx-auto text-[#00E3FF] opacity-80 drop-shadow-2xl" />
          <div className="absolute inset-0 bg-[#00E3FF]/20 rounded-full blur-xl opacity-50 mx-auto"></div>
        </div>

        {/* 404 Text with professional styling */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#1C78C0] via-[#00E3FF] to-[#9A6BFF] bg-clip-text text-transparent drop-shadow-lg">
          404
        </h1>
        <p className="text-xl md:text-2xl text-[#E0E0E0] mb-4 font-light">
          Oops! Page not found
        </p>
        <p className="text-base text-[#E0E0E0]/70 mb-8">
          The page you're looking for seems to have drifted into deep space
        </p>
        
        {/* Professional button */}
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1C78C0] to-[#00E3FF] text-white font-medium rounded-lg hover:from-[#00E3FF] hover:to-[#9A6BFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Return to Home
        </a>

        {/* Scroll down indicator */}
        <div className="mt-16 flex flex-col items-center">
          <p className="text-sm text-[#E0E0E0]/60 mb-2">Scroll for more options</p>
          <div className="animate-bounce">
            <ArrowDown className="w-5 h-5 text-[#00E3FF] opacity-70" />
          </div>
        </div>
      </div>

      {/* Additional content section that appears when scrolling */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0F1A] to-transparent p-8 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-[#00E3FF] mb-2">Need Help?</h3>
          <p className="text-sm text-[#E0E0E0]/70 mb-4">
            If you believe this is an error, please contact our support team
          </p>
          <a 
            href="mailto:v4vaayuvega@gmail.com" 
            className="text-[#FFD700] hover:text-[#FF8C42] transition-colors duration-300 text-sm underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
