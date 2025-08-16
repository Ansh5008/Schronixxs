import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

// Flowing lines component to match the exact design from the image
function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute bottom-0 right-0 w-full h-full"
        viewBox="0 0 1400 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
      >
        {/* Create the exact flowing curves from the design */}
        {Array.from({ length: 30 }, (_, i) => {
          const offset = i * 8;
          const curvature = 300 + i * 15;
          return (
            <path
              key={i}
              d={`M ${1400 - offset} 900 Q ${1200 - offset} ${700 - i * 12} ${1000 - offset} ${500 - i * 8} Q ${800 - offset} ${300 - i * 6} ${600 - offset} ${200 - i * 4} Q ${400 - offset} ${100 - i * 3} ${200 - offset} ${50 - i * 2}`}
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="1.5"
              fill="none"
              className="animate-draw"
              style={{ 
                strokeDasharray: 2000,
                strokeDashoffset: 2000,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '3s'
              }}
            />
          );
        })}
        
        {/* Additional curved lines for depth */}
        {Array.from({ length: 25 }, (_, i) => {
          const offset = i * 12;
          return (
            <path
              key={`secondary-${i}`}
              d={`M ${1350 - offset} 900 Q ${1150 - offset} ${650 - i * 10} ${950 - offset} ${450 - i * 8} Q ${750 - offset} ${250 - i * 6} ${550 - offset} ${150 - i * 4}`}
              stroke="rgba(0, 0, 0, 0.08)"
              strokeWidth="1"
              fill="none"
              className="animate-draw"
              style={{ 
                strokeDasharray: 1500,
                strokeDashoffset: 1500,
                animationDelay: `${i * 0.08}s`,
                animationDuration: '4s'
              }}
            />
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

  const handleUploadClick = () => {
    // Navigate to dashboard when upload is clicked
    window.location.href = '/dashboard';
  };

  return (
    <div className="relative" data-testid="home-page">
      {/* Section 1: Minimal Hero - Exact match to design */}
      <div 
        ref={el => sectionsRef.current[0] = el}
        className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden flex items-center justify-center"
        data-testid="hero-section"
      >
        <FlowingLines />
        
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
        className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden flex items-center justify-center"
        data-testid="schronix-section"
      >
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-8xl md:text-9xl font-bold text-white mb-8 animate-fade-in-up"
              data-testid="text-schronix-title"
            >
              Schronix
            </h1>
            <p 
              className="text-3xl md:text-4xl font-light text-white/90 mb-12 animate-fade-in-up delay-300"
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
              className="text-white/70 hover:text-white"
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
        className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="team-section"
      >
        <FlowingLines />
        
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
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center" data-testid="upload-section">
        <FlowingLines />
        
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
          
          <Button
            onClick={handleUploadClick}
            className="bg-gray-800 hover:bg-gray-900 text-white px-12 py-6 rounded-lg text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up delay-500 hover:scale-105"
            data-testid="button-upload"
          >
            <Upload className="mr-3 h-6 w-6" />
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}