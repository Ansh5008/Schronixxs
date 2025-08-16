import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, ChevronDown, Menu, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import UploadZone from "@/components/ui/upload-zone";
import { useToast } from "@/hooks/use-toast";

// Elegant flowing lines that match the exact design from the image
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
                M ${200 + lineSpacing} ${800 + yOffset + sectionIndex * 100}
                C ${400 + lineSpacing} ${700 + yOffset + sectionIndex * 100}
                  ${600 + lineSpacing} ${650 + yOffset + sectionIndex * 100}
                  ${800 + lineSpacing} ${580 + yOffset + sectionIndex * 100}
                C ${1000 + lineSpacing} ${510 + yOffset + sectionIndex * 100}
                  ${1200 + lineSpacing} ${450 + yOffset + sectionIndex * 100}
                  ${1400 + lineSpacing} ${380 + yOffset + sectionIndex * 100}
                C ${1500 + lineSpacing} ${340 + yOffset + sectionIndex * 100}
                  ${1600 + lineSpacing} ${300 + yOffset + sectionIndex * 100}
                  ${1720 + lineSpacing} ${250 + yOffset + sectionIndex * 100}
              `}
              stroke={`rgba(0, 0, 0, ${opacity})`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
        
        {/* Additional curves for the upper flow that connects to next section */}
        {Array.from({ length: 20 }, (_, i) => {
          const lineSpacing = i * 10;
          const yOffset = i * 4;
          const opacity = Math.max(0.1, 0.35 - i * 0.015);
          const strokeWidth = Math.max(0.3, 1.2 - i * 0.05);
          
          return (
            <path
              key={`upper-flow-${i}`}
              d={`
                M ${300 + lineSpacing} ${1080 + yOffset + sectionIndex * 80}
                C ${500 + lineSpacing} ${980 + yOffset + sectionIndex * 80}
                  ${700 + lineSpacing} ${930 + yOffset + sectionIndex * 80}
                  ${900 + lineSpacing} ${860 + yOffset + sectionIndex * 80}
                C ${1100 + lineSpacing} ${790 + yOffset + sectionIndex * 80}
                  ${1300 + lineSpacing} ${730 + yOffset + sectionIndex * 80}
                  ${1500 + lineSpacing} ${660 + yOffset + sectionIndex * 80}
                C ${1600 + lineSpacing} ${620 + yOffset + sectionIndex * 80}
                  ${1700 + lineSpacing} ${580 + yOffset + sectionIndex * 80}
                  ${1820 + lineSpacing} ${530 + yOffset + sectionIndex * 80}
              `}
              stroke={`rgba(0, 0, 0, ${opacity})`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
        
        {/* Connecting curves that bridge between the main flows */}
        {Array.from({ length: 15 }, (_, i) => {
          const lineSpacing = i * 12;
          const yOffset = i * 5;
          const opacity = Math.max(0.08, 0.25 - i * 0.012);
          const strokeWidth = Math.max(0.4, 1 - i * 0.04);
          
          return (
            <path
              key={`bridge-flow-${i}`}
              d={`
                M ${100 + lineSpacing} ${900 + yOffset + sectionIndex * 120}
                C ${350 + lineSpacing} ${820 + yOffset + sectionIndex * 120}
                  ${650 + lineSpacing} ${780 + yOffset + sectionIndex * 120}
                  ${950 + lineSpacing} ${720 + yOffset + sectionIndex * 120}
                C ${1250 + lineSpacing} ${660 + yOffset + sectionIndex * 120}
                  ${1550 + lineSpacing} ${600 + yOffset + sectionIndex * 120}
                  ${1850 + lineSpacing} ${540 + yOffset + sectionIndex * 120}
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

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState([true, false, false, false, false, false]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      // Don't update visibility during manual navigation
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section should be visible based on scroll
      let newSection = currentSection;
      let newVisibility = [...isVisible];
      
      if (scrollPosition < windowHeight * 0.8) {
        newSection = 0;
        newVisibility = [true, false, false, false, false, false];
      } else if (scrollPosition < windowHeight * 1.8) {
        newSection = 1;
        newVisibility = [false, true, false, false, false, false];
      } else if (scrollPosition < windowHeight * 2.8) {
        newSection = 2;
        newVisibility = [false, false, true, false, false, false];
      } else if (scrollPosition < windowHeight * 3.8) {
        newSection = 3;
        newVisibility = [false, false, false, true, false, false];
      } else if (scrollPosition < windowHeight * 4.8) {
        newSection = 4;
        newVisibility = [false, false, false, false, true, false];
      } else {
        newSection = 5;
        newVisibility = [false, false, false, false, false, true];
      }
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        setIsVisible(newVisibility);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, isVisible, isScrolling]);

  const scrollToSection = (index: number) => {
    const element = sectionsRef.current[index];
    if (element) {
      // Update visibility state immediately when navigating
      const newVisibility = [false, false, false, false, false, false];
      newVisibility[index] = true;
      setIsVisible(newVisibility);
      setCurrentSection(index);
      
      // Prevent automatic scroll detection for a moment
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1500);
      
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
        className="min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 relative overflow-hidden flex items-center justify-center pt-16"
        data-testid="hero-section"
      >
        <FlowingLines sectionIndex={0} />
        
        {/* Modern Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">
                  Schronix
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <button 
                    onClick={() => scrollToSection(1)} 
                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection(3)} 
                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    How it Works
                  </button>
                  <button 
                    onClick={() => scrollToSection(4)} 
                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Team
                  </button>
                  <button 
                    onClick={() => scrollToSection(5)} 
                    className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/98 backdrop-blur-md shadow-lg border-t border-gray-100">
              <button
                onClick={() => {
                  scrollToSection(1);
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-300"
              >
                About
              </button>
              <button
                onClick={() => {
                  scrollToSection(3);
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-300"
              >
                How it Works
              </button>
              <button
                onClick={() => {
                  scrollToSection(4);
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-300"
              >
                Team
              </button>
              <button
                onClick={() => {
                  scrollToSection(5);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gray-800 text-white hover:bg-gray-700 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-300 mt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Main content with clear scroll indicator */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center">
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
                  <Card className="bg-gray-100/90 backdrop-blur-sm border-0 shadow-lg p-6 text-right transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
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
                  <Card className="bg-gray-100/90 backdrop-blur-sm border-0 shadow-lg p-6 text-left transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
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
                  <Card className="bg-gray-100/90 backdrop-blur-sm border-0 shadow-lg p-6 text-right transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
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
                  <Card className="bg-gray-100/90 backdrop-blur-sm border-0 shadow-lg p-6 text-left transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
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
            
            <div className="mb-12">
              {/* Team Leader - Centered */}
              <div className="flex justify-center mb-8">
                <Card className="team-card p-8 animate-slide-in-left delay-200 max-w-sm transition-all duration-300" data-testid="card-team-leader">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 animate-float"></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2" data-testid="text-leader-name">Vansh Sharma</h3>
                    <p className="text-gray-600" data-testid="text-leader-role">Team Leader</p>
                  </div>
                </Card>
              </div>

              {/* Team Members - In a line below */}
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Ansh Kumar", role: "Developer" },
                  { name: "Prakhar Dhaundhiyal", role: "Developer" },
                  { name: "Indransh Pratap Singh", role: "Developer" },
                ].map((member, index) => (
                  <Card 
                    key={member.name}
                    className="team-card p-8 animate-slide-in-right transition-all duration-300"
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