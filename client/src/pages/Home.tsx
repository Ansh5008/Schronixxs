import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import UploadZone from "@/components/ui/upload-zone";
import { useToast } from "@/hooks/use-toast";

// Continuous flowing lines that connect across all sections
function FlowingLines({ sectionIndex = 0 }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 2030 text in top-right corner - only on first section */}
      {sectionIndex === 0 && (
        <div className="absolute top-8 right-8 text-black text-sm font-light opacity-20 z-20">
          2030
        </div>
      )}
      
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for animated effect */}
          <linearGradient id={`flowGradient-${sectionIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.8)" />
            <stop offset="50%" stopColor="rgba(0, 0, 0, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.2)" />
          </linearGradient>
          
          {/* Animation definition */}
          <animate
            id={`pathAnimation-${sectionIndex}`}
            attributeName="stroke-dashoffset"
            values="0;-100;0"
            dur="8s"
            repeatCount="indefinite"
          />
        </defs>

        {/* Main flowing path that connects across sections */}
        <path
          d={`
            M 0 ${200 + sectionIndex * 300}
            C 300 ${150 + sectionIndex * 300} 600 ${100 + sectionIndex * 300} 900 ${200 + sectionIndex * 300}
            C 1200 ${300 + sectionIndex * 300} 1500 ${250 + sectionIndex * 300} 1920 ${400 + sectionIndex * 300}
            
            M 1920 ${400 + sectionIndex * 300}
            C 1600 ${500 + sectionIndex * 300} 1300 ${450 + sectionIndex * 300} 1000 ${600 + sectionIndex * 300}
            C 700 ${750 + sectionIndex * 300} 400 ${700 + sectionIndex * 300} 0 ${900 + sectionIndex * 300}
          `}
          stroke={`url(#flowGradient-${sectionIndex})`}
          strokeWidth="2"
          fill="none"
          strokeDasharray="20 10"
          className="animate-pulse"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Secondary flowing lines */}
        {Array.from({ length: 8 }, (_, i) => {
          const yStart = 100 + sectionIndex * 250 + i * 40;
          const amplitude = 150 + i * 20;
          return (
            <path
              key={`flow-${sectionIndex}-${i}`}
              d={`
                M ${-100 + i * 50} ${yStart}
                Q ${400 + i * 100} ${yStart - amplitude} ${800 + i * 50} ${yStart + 100}
                Q ${1200 + i * 80} ${yStart + amplitude + 150} ${1920 + i * 30} ${yStart + 200}
              `}
              stroke={`rgba(0, 0, 0, ${0.3 - i * 0.03})`}
              strokeWidth={`${1.5 - i * 0.1}`}
              fill="none"
              strokeDasharray={`${15 + i * 5} ${5 + i * 2}`}
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + i}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-50;0"
                dur={`${5 + i}s`}
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
            </path>
          );
        })}
        
        {/* Connecting vertical flow between sections */}
        {sectionIndex < 3 && (
          <path
            d={`
              M 1920 ${800 + sectionIndex * 300}
              C 1800 ${900 + sectionIndex * 300} 1700 ${1000 + sectionIndex * 300} 1600 ${1080 + sectionIndex * 300}
              L 1600 ${1080 + sectionIndex * 300 + 200}
              C 1500 ${1200 + sectionIndex * 300} 1400 ${1250 + sectionIndex * 300} 1300 ${1300 + sectionIndex * 300}
            `}
            stroke="rgba(0, 0, 0, 0.4)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="10 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-15;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        )}
      </svg>
    </div>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState([true, false, false]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section should be visible based on scroll
      if (scrollPosition < windowHeight * 0.5) {
        setCurrentSection(0);
        setIsVisible([true, false, false]);
      } else if (scrollPosition < windowHeight * 1.5) {
        setCurrentSection(1);
        setIsVisible([false, true, false]);
      } else {
        setCurrentSection(2);
        setIsVisible([false, false, true]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const element = sectionsRef.current[index];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { toast } = useToast();
  
  const handleUploadSuccess = () => {
    toast({
      title: "Upload successful",
      description: "Your document has been processed. Redirecting to dashboard...",
    });
    
    // Navigate to dashboard after a brief delay
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="relative" data-testid="home-page">
      {/* Section 1: Minimal Hero - Exact match to design */}
      <div 
        ref={el => sectionsRef.current[0] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="hero-section"
      >
        <FlowingLines sectionIndex={0} />
        
        {/* Completely minimal - just the flowing lines background */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Invisible click area to proceed to next section */}
          <div 
            className="w-full h-full cursor-pointer flex items-center justify-center"
            onClick={() => scrollToSection(1)}
            data-testid="click-to-continue"
          >
            {/* Very subtle scroll hint */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse opacity-30">
              <ChevronDown className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Schronix Title */}
      <div 
        ref={el => sectionsRef.current[1] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="schronix-section"
      >
        <FlowingLines sectionIndex={1} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-8xl md:text-9xl font-bold text-gray-800 mb-8 animate-fade-in-up"
              data-testid="text-schronix-title"
            >
              Schronix
            </h1>
            <p 
              className="text-3xl md:text-4xl font-light text-gray-700 mb-12 animate-fade-in-up delay-300"
              data-testid="text-tagline"
            >
              Plan Smarter Skip Smarter
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection(2)}
              className="text-gray-600 hover:text-gray-800"
              data-testid="button-scroll-to-team"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 3: Team */}
      <div 
        ref={el => sectionsRef.current[2] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="team-section"
      >
        <FlowingLines sectionIndex={2} />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-16 animate-fade-in-up"
              data-testid="text-team-title"
            >
              Our Team
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Team Leader */}
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-slide-in-left delay-200" data-testid="card-team-leader">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 animate-float"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2" data-testid="text-leader-name">Team Leader</h3>
                  <p className="text-gray-600" data-testid="text-leader-role">Project Manager</p>
                </div>
              </Card>

              {/* Team Members */}
              {[
                { name: "Developer 1", role: "Frontend Developer" },
                { name: "Developer 2", role: "Backend Developer" },
                { name: "Designer", role: "UI/UX Designer" },
                { name: "Analyst", role: "Data Analyst" },
              ].map((member, index) => (
                <Card 
                  key={member.name}
                  className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-slide-in-right"
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                  data-testid={`card-team-member-${index}`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2" data-testid={`text-member-name-${index}`}>{member.name}</h3>
                    <p className="text-gray-600" data-testid={`text-member-role-${index}`}>{member.role}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Continue to Upload button */}
            <Button
              onClick={() => {
                // Add fourth section or go to upload
                window.location.href = '/dashboard';
              }}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up delay-700 hover:scale-105"
              data-testid="button-continue-to-upload"
            >
              Continue to Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Section 4: Upload */}
      <div className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center" data-testid="upload-section">
        <FlowingLines sectionIndex={3} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 animate-fade-in-up"
            data-testid="text-upload-title"
          >
            Upload PDFs to Begin
          </h2>
          
          <p 
            className="text-xl text-gray-600 mb-12 animate-fade-in-up delay-300"
            data-testid="text-upload-description"
          >
            Upload your academic calendars and timetables to start smart attendance tracking
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up delay-500">
            <UploadZone
              type="calendar"
              title="Upload Calendar"
              description="Upload your academic calendar to track important dates"
              icon="calendar"
            />
            <UploadZone
              type="timetable"
              title="Upload Timetable"
              description="Upload your class timetable for automatic scheduling"
              icon="table"
            />
          </div>
          
          <div className="mt-8">
            <Button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              data-testid="button-go-to-dashboard"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}