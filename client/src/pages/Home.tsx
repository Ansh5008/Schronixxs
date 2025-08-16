import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import UploadZone from "@/components/ui/upload-zone";
import { useToast } from "@/hooks/use-toast";

// Exact flowing lines pattern from the provided image with animations
function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 2030 text in top-right corner - subtle white */}
      <div className="absolute top-8 right-8 text-black text-sm font-light opacity-20 z-20">
        2030
      </div>
      
      <svg
        className="absolute bottom-0 right-0 w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
      >
        <defs>
          {/* Animated stroke patterns */}
          <animate
            id="flowAnimation"
            attributeName="stroke-dashoffset"
            values="0;-40;0"
            dur="6s"
            repeatCount="indefinite"
          />
        </defs>

        {/* Bottom flowing curves - exactly like the image with animation */}
        {Array.from({ length: 15 }, (_, i) => {
          const yOffset = i * 8;
          return (
            <path
              key={`bottom-${i}`}
              d={`M 0 ${1080 - yOffset} 
                  C 200 ${1050 - yOffset} 400 ${1020 - yOffset} 600 ${1000 - yOffset}
                  C 800 ${980 - yOffset} 1000 ${970 - yOffset} 1200 ${960 - yOffset}
                  C 1400 ${950 - yOffset} 1600 ${940 - yOffset} 1920 ${930 - yOffset}`}
              stroke="rgba(0, 0, 0, 0.7)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="30 15"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-45;0"
                dur={`${5 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.1}s`}
              />
            </path>
          );
        })}
        
        {/* Right side rising curves - exactly like the image with animation */}
        {Array.from({ length: 25 }, (_, i) => {
          const spacing = i * 6;
          return (
            <path
              key={`right-${i}`}
              d={`M ${1920 - spacing} 1080
                  C ${1800 - spacing} ${900 - i * 12} ${1700 - spacing} ${700 - i * 15} ${1600 - spacing} ${500 - i * 18}
                  C ${1500 - spacing} ${300 - i * 20} ${1400 - spacing} ${200 - i * 22} ${1300 - spacing} ${100 - i * 24}`}
              stroke="rgba(0, 0, 0, 0.6)"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="25 10"
              style={{
                animationDelay: `${i * 0.15}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-35;0"
                dur={`${4 + i * 0.2}s`}
                repeatCount="indefinite"
                begin={`${i * 0.08}s`}
              />
            </path>
          );
        })}
        
        {/* Additional curved lines for the exact pattern with animation */}
        {Array.from({ length: 20 }, (_, i) => {
          const offset = i * 10;
          return (
            <path
              key={`curve-${i}`}
              d={`M ${800 + offset} 1080
                  Q ${1000 + offset} ${800 - i * 10} ${1200 + offset} ${600 - i * 12}
                  Q ${1400 + offset} ${400 - i * 14} ${1600 + offset} ${200 - i * 16}`}
              stroke="rgba(0, 0, 0, 0.5)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="20 8"
              style={{
                animationDelay: `${i * 0.25}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-28;0"
                dur={`${6 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.12}s`}
              />
            </path>
          );
        })}
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
        <FlowingLines />
        
        {/* Welcome content with clear scroll indicator */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center">
            {/* Welcome message */}
            <h1 className="text-6xl md:text-8xl font-light text-gray-800 mb-4 opacity-80">
              Welcome
            </h1>
            <p className="text-xl text-gray-700 mb-8 opacity-70">
              Scroll down to explore
            </p>
            
            {/* Clear scroll indicator */}
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => scrollToSection(1)}
              data-testid="click-to-continue"
            >
              <span className="text-sm text-gray-600 mb-2">Continue</span>
              <div className="animate-bounce">
                <ChevronDown className="h-8 w-8 text-gray-700" />
              </div>
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
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-8xl md:text-9xl font-bold text-gray-800 mb-8 drop-shadow-sm"
              data-testid="text-schronix-title"
            >
              Schronix
            </h1>
            <p 
              className="text-3xl md:text-4xl font-light text-gray-700 mb-12 drop-shadow-sm"
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
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-16 drop-shadow-sm"
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
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 drop-shadow-sm"
            data-testid="text-upload-title"
          >
            Upload PDFs to Begin
          </h2>
          
          <p 
            className="text-xl text-gray-600 mb-12 drop-shadow-sm"
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