import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, Code, Sparkles } from "lucide-react";

// Elegant flowing lines that match the exact design from the image
function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-8 right-8 text-black text-sm font-light opacity-20 z-20">
        2030
      </div>
      
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Multiple parallel flowing lines that match the image exactly */}
        {Array.from({ length: 25 }, (_, i) => {
          const lineSpacing = i * 8;
          const yOffset = i * 6;
          const opacity = Math.max(0.15, 0.4 - i * 0.012);
          const strokeWidth = Math.max(0.5, 1.5 - i * 0.04);
          
          return (
            <path
              key={`flowing-line-${i}`}
              d={`
                M ${200 + lineSpacing} ${800 + yOffset}
                C ${400 + lineSpacing} ${700 + yOffset}
                  ${600 + lineSpacing} ${650 + yOffset}
                  ${800 + lineSpacing} ${580 + yOffset}
                C ${1000 + lineSpacing} ${510 + yOffset}
                  ${1200 + lineSpacing} ${450 + yOffset}
                  ${1400 + lineSpacing} ${380 + yOffset}
                C ${1500 + lineSpacing} ${340 + yOffset}
                  ${1600 + lineSpacing} ${300 + yOffset}
                  ${1720 + lineSpacing} ${250 + yOffset}
              `}
              stroke={`rgba(0, 0, 0, ${opacity})`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function WorkInProgress() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden">
      <FlowingLines />
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100/50 hover:text-gray-900 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-6">
          <div className="animate-fade-in">
            {/* Main Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Wrench className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="h-4 w-4 text-gray-800" />
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 
              className="text-6xl md:text-7xl font-bold text-gray-800 mb-8 drop-shadow-sm"
              style={{ fontFamily: 'inherit' }}
            >
              Still Working On It
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-light text-gray-700 mb-12 drop-shadow-sm">
              We're crafting something amazing for you
            </p>
            
            {/* Progress Indicators */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dashboard Design</h3>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-gray-600">In Progress</p>
              </div>
              
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Features</h3>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-gray-600">Coming Soon</p>
              </div>
              
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Final Polish</h3>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="text-gray-600">Planned</p>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
              Our team is working hard to bring you the best attendance management experience. 
              The dashboard will include smart analytics, attendance predictions, and seamless PDF processing.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Notify When Ready
              </Button>
            </div>
            
            {/* Coming Soon Badge */}
            <div className="mt-16">
              <div className="inline-flex items-center px-4 py-2 bg-gray-800/10 backdrop-blur-sm rounded-full border border-gray-800/20">
                <Sparkles className="h-4 w-4 text-gray-800 mr-2" />
                <span className="text-sm font-medium text-gray-800">Coming Soon in 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}