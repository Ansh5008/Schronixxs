import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import UploadZone from "@/components/ui/upload-zone";
import { useToast } from "@/hooks/use-toast";

// Continuous flowing lines that connect and descend through all sections
function FlowingLines({ sectionIndex = 0 }) {
  const sectionHeight = 1080; // Standard section height
  const totalSections = 6;
  
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
        viewBox={`0 0 1920 ${sectionHeight * totalSections}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: `translateY(-${sectionIndex * sectionHeight}px)`
        }}
      >
        <defs>
          {/* Gradient for smooth transitions */}
          <linearGradient id={`flowGradient-${sectionIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.8)" />
            <stop offset="50%" stopColor="rgba(0, 0, 0, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
          </linearGradient>
        </defs>

        {/* Main continuous flowing curves that descend through all sections */}
        {Array.from({ length: 20 }, (_, i) => {
          const yStart = i * 40;
          const flowOffset = sectionIndex * 200;
          return (
            <path
              key={`main-flow-${i}`}
              d={`
                M 0 ${yStart + flowOffset}
                C 300 ${yStart - 50 + flowOffset} 600 ${yStart - 100 + flowOffset} 900 ${yStart + flowOffset}
                C 1200 ${yStart + 100 + flowOffset} 1500 ${yStart + 50 + flowOffset} 1920 ${yStart + 200 + flowOffset}
                
                C 1600 ${yStart + 400 + flowOffset} 1300 ${yStart + 350 + flowOffset} 1000 ${yStart + 500 + flowOffset}
                C 700 ${yStart + 650 + flowOffset} 400 ${yStart + 600 + flowOffset} 0 ${yStart + 800 + flowOffset}
                
                C 300 ${yStart + 950 + flowOffset} 600 ${yStart + 900 + flowOffset} 900 ${yStart + 1000 + flowOffset}
                C 1200 ${yStart + 1100 + flowOffset} 1500 ${yStart + 1050 + flowOffset} 1920 ${yStart + 1200 + flowOffset}
                
                C 1600 ${yStart + 1400 + flowOffset} 1300 ${yStart + 1350 + flowOffset} 1000 ${yStart + 1500 + flowOffset}
                C 700 ${yStart + 1650 + flowOffset} 400 ${yStart + 1600 + flowOffset} 0 ${yStart + 1800 + flowOffset}
                
                C 300 ${yStart + 1950 + flowOffset} 600 ${yStart + 1900 + flowOffset} 900 ${yStart + 2000 + flowOffset}
                C 1200 ${yStart + 2100 + flowOffset} 1500 ${yStart + 2050 + flowOffset} 1920 ${yStart + 2200 + flowOffset}
                
                C 1600 ${yStart + 2400 + flowOffset} 1300 ${yStart + 2350 + flowOffset} 1000 ${yStart + 2500 + flowOffset}
                C 700 ${yStart + 2650 + flowOffset} 400 ${yStart + 2600 + flowOffset} 0 ${yStart + 2800 + flowOffset}
              `}
              stroke={`rgba(0, 0, 0, ${0.7 - i * 0.02})`}
              strokeWidth={`${2 - i * 0.05}`}
              fill="none"
              strokeDasharray={`${30 + i * 2} ${15 + i}`}
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-50;0"
                dur={`${8 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.05}s`}
              />
            </path>
          );
        })}
        
        {/* Secondary connecting curves for smoother flow */}
        {Array.from({ length: 15 }, (_, i) => {
          const spacing = i * 8;
          const verticalFlow = sectionIndex * 180;
          return (
            <path
              key={`secondary-flow-${i}`}
              d={`
                M ${1920 - spacing} ${verticalFlow}
                C ${1800 - spacing} ${200 + verticalFlow} ${1700 - spacing} ${400 + verticalFlow} ${1600 - spacing} ${600 + verticalFlow}
                C ${1500 - spacing} ${800 + verticalFlow} ${1400 - spacing} ${1000 + verticalFlow} ${1300 - spacing} ${1200 + verticalFlow}
                C ${1200 - spacing} ${1400 + verticalFlow} ${1100 - spacing} ${1600 + verticalFlow} ${1000 - spacing} ${1800 + verticalFlow}
                C ${900 - spacing} ${2000 + verticalFlow} ${800 - spacing} ${2200 + verticalFlow} ${700 - spacing} ${2400 + verticalFlow}
                C ${600 - spacing} ${2600 + verticalFlow} ${500 - spacing} ${2800 + verticalFlow} ${400 - spacing} ${3000 + verticalFlow}
                C ${300 - spacing} ${3200 + verticalFlow} ${200 - spacing} ${3400 + verticalFlow} ${100 - spacing} ${3600 + verticalFlow}
              `}
              stroke={`rgba(0, 0, 0, ${0.5 - i * 0.02})`}
              strokeWidth={`${1.5 - i * 0.05}`}
              fill="none"
              strokeDasharray={`${25 + i} ${12 + i * 0.5}`}
              style={{
                animationDelay: `${i * 0.15}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-40;0"
                dur={`${6 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.08}s`}
              />
            </path>
          );
        })}
        
        {/* Bottom flowing curves for base pattern */}
        {Array.from({ length: 12 }, (_, i) => {
          const yOffset = i * 12;
          const baseY = sectionHeight * (sectionIndex + 1) - 200;
          return (
            <path
              key={`bottom-flow-${i}`}
              d={`
                M 0 ${baseY - yOffset}
                C 200 ${baseY - 30 - yOffset} 400 ${baseY - 60 - yOffset} 600 ${baseY - 80 - yOffset}
                C 800 ${baseY - 100 - yOffset} 1000 ${baseY - 110 - yOffset} 1200 ${baseY - 120 - yOffset}
                C 1400 ${baseY - 130 - yOffset} 1600 ${baseY - 140 - yOffset} 1920 ${baseY - 150 - yOffset}
              `}
              stroke={`rgba(0, 0, 0, ${0.6 - i * 0.03})`}
              strokeWidth={`${1.8 - i * 0.08}`}
              fill="none"
              strokeDasharray={`${20 + i} ${10 + i * 0.5}`}
              style={{
                animationDelay: `${i * 0.12}s`
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-30;0"
                dur={`${5 + i * 0.2}s`}
                repeatCount="indefinite"
                begin={`${i * 0.06}s`}
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
  const [isVisible, setIsVisible] = useState([true, false, false, false, false, false]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section should be visible based on scroll
      if (scrollPosition < windowHeight * 0.5) {
        setCurrentSection(0);
        setIsVisible([true, false, false, false, false, false]);
      } else if (scrollPosition < windowHeight * 1.5) {
        setCurrentSection(1);
        setIsVisible([false, true, false, false, false, false]);
      } else if (scrollPosition < windowHeight * 2.5) {
        setCurrentSection(2);
        setIsVisible([false, false, true, false, false, false]);
      } else if (scrollPosition < windowHeight * 3.5) {
        setCurrentSection(3);
        setIsVisible([false, false, false, true, false, false]);
      } else if (scrollPosition < windowHeight * 4.5) {
        setCurrentSection(4);
        setIsVisible([false, false, false, false, true, false]);
      } else {
        setCurrentSection(5);
        setIsVisible([false, false, false, false, false, true]);
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
        <FlowingLines sectionIndex={1} />
        
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
              data-testid="button-scroll-to-about"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 3: About Schronix */}
      <div 
        ref={el => sectionsRef.current[2] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="about-section"
      >
        <FlowingLines sectionIndex={2} />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-12 drop-shadow-sm"
              data-testid="text-about-title"
            >
              About Schronix
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Tracking</h3>
                <p className="text-gray-600">Intelligent attendance monitoring with AI-powered insights</p>
              </div>
              
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Skip Optimizer</h3>
                <p className="text-gray-600">Calculate exactly when you can skip classes safely</p>
              </div>
              
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Upload</h3>
                <p className="text-gray-600">Simply upload your timetable and calendar PDFs</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              Schronix revolutionizes how students manage attendance by combining smart analytics 
              with intuitive design. Upload your academic documents and let our AI do the rest.
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection(3)}
              className="text-gray-600 hover:text-gray-800"
              data-testid="button-scroll-to-roadmap"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 4: Roadmap */}
      <div 
        ref={el => sectionsRef.current[3] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="roadmap-section"
      >
        <FlowingLines sectionIndex={3} />
        
        <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-16 drop-shadow-sm"
              data-testid="text-roadmap-title"
            >
              How to Use Schronix
            </h2>
            
            {/* Branch-style roadmap */}
            <div className="relative">
              {/* Central trunk line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2 opacity-30"></div>
              
              {/* Step 1 - Left branch */}
              <div className="flex items-center mb-12 relative">
                <div className="flex-1 pr-8">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6 text-right transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-end mb-3">
                      <h3 className="text-xl font-semibold text-gray-800 mr-3">Upload Documents</h3>
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                    </div>
                    <p className="text-gray-600">Upload your academic calendar and class timetable PDFs</p>
                  </Card>
                </div>
                {/* Branch line */}
                <div className="w-16 h-1 bg-gray-800 opacity-30"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              {/* Step 2 - Right branch */}
              <div className="flex items-center mb-12 relative">
                <div className="flex-1 pr-8"></div>
                {/* Branch line */}
                <div className="w-16 h-1 bg-gray-800 opacity-30"></div>
                <div className="flex-1 pl-8">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6 text-left transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">AI Processing</h3>
                    </div>
                    <p className="text-gray-600">Our AI extracts and analyzes your schedule automatically</p>
                  </Card>
                </div>
              </div>
              
              {/* Step 3 - Left branch */}
              <div className="flex items-center mb-12 relative">
                <div className="flex-1 pr-8">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6 text-right transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-end mb-3">
                      <h3 className="text-xl font-semibold text-gray-800 mr-3">Track Attendance</h3>
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                    </div>
                    <p className="text-gray-600">Mark your attendance and view real-time statistics</p>
                  </Card>
                </div>
                {/* Branch line */}
                <div className="w-16 h-1 bg-gray-800 opacity-30"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              {/* Step 4 - Right branch */}
              <div className="flex items-center mb-8 relative">
                <div className="flex-1 pr-8"></div>
                {/* Branch line */}
                <div className="w-16 h-1 bg-gray-800 opacity-30"></div>
                <div className="flex-1 pl-8">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-6 text-left transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">Smart Insights</h3>
                    </div>
                    <p className="text-gray-600">Get personalized recommendations and skip strategies</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection(4)}
              className="text-gray-600 hover:text-gray-800"
              data-testid="button-scroll-to-team"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 5: Team */}
      <div 
        ref={el => sectionsRef.current[4] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center"
        data-testid="team-section"
      >
        <FlowingLines sectionIndex={4} />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
              onClick={() => scrollToSection(5)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              data-testid="button-continue-to-upload"
            >
              Continue to Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Section 6: Upload */}
      <div 
        ref={el => sectionsRef.current[5] = el}
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center" 
        data-testid="upload-section"
      >
        <FlowingLines sectionIndex={5} />
        
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
          
          <div className="grid md:grid-cols-2 gap-8">
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