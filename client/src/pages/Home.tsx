import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

// Flowing lines component to match the design
function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute bottom-0 right-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#374151', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Flowing curved lines matching the design */}
        {Array.from({ length: 20 }, (_, i) => (
          <path
            key={i}
            d={`M ${1200 - i * 20} 800 Q ${1000 - i * 15} ${600 - i * 8} ${800 - i * 25} ${400 - i * 12} T ${400 - i * 30} ${200 - i * 15}`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-draw"
            style={{ 
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
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
      {/* Section 1: Hero */}
      <div 
        ref={el => sectionsRef.current[0] = el}
        className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="hero-section"
      >
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 animate-fade-in-up"
              data-testid="text-schronix-title"
            >
              Schronix
            </h1>
            <p 
              className="text-2xl md:text-4xl font-light text-gray-600 mb-12 animate-fade-in-up delay-300"
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
              onClick={() => scrollToSection(1)}
              className="text-gray-500 hover:text-gray-700"
              data-testid="button-scroll-down"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 2: Team */}
      <div 
        ref={el => sectionsRef.current[1] = el}
        className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden flex items-center justify-center"
        data-testid="team-section"
      >
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection(2)}
              className="text-gray-500 hover:text-gray-700"
              data-testid="button-scroll-to-upload"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 3: Upload */}
      <div 
        ref={el => sectionsRef.current[2] = el}
        className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-400 relative overflow-hidden flex items-center justify-center"
        data-testid="upload-section"
      >
        <FlowingLines />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
    </div>
  );
}