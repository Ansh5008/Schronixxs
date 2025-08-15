import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import FlowingLines from "@/components/ui/flowing-lines";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="relative min-h-screen overflow-hidden" data-testid="home-page">
      
      {/* Slide 1: Hero/Landing */}
      <div 
        className={`absolute inset-0 transition-all duration-800 ease-out ${
          currentSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        data-testid="hero-slide"
      >
        <div className="min-h-screen bg-gradient-to-br from-schronix-grey-300 to-schronix-grey-400 relative overflow-hidden">
          <FlowingLines />
          
          <div className="relative z-10 container mx-auto px-6 py-20">
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
              {/* Logo */}
              <div className="mb-8 animate-float">
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in-up" data-testid="text-schronix-title">
                  Schronix
                </h1>
              </div>
              
              {/* Tagline */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-4xl font-light text-white/95 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }} data-testid="text-tagline">
                  Plan Smarter Skip Smarter
                </h2>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }} data-testid="text-description">
                  Intelligent attendance tracking and academic planning for students who value strategic learning
                </p>
              </div>
              
              {/* CTA Button */}
              <Button 
                onClick={nextSlide}
                className="bg-white text-schronix-grey-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-schronix-grey-100 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce-in animate-ripple"
                style={{ animationDelay: '0.8s' }}
                data-testid="button-get-started"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2: Team Information */}
      <div 
        className={`absolute inset-0 transition-all duration-800 ease-out ${
          currentSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        data-testid="team-slide"
      >
        <div className="min-h-screen bg-white relative overflow-hidden">
          <TeamSection isActive={currentSlide === 1} />
          
          <div className="text-center mt-16 pb-20">
            <Button 
              onClick={nextSlide}
              className="bg-schronix-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-schronix-secondary transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-glow animate-scale-in"
              style={{ animationDelay: '0.5s' }}
              data-testid="button-view-dashboard"
            >
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide 3: Dashboard Preview */}
      <div 
        className={`absolute inset-0 transition-all duration-800 ease-out ${
          currentSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        data-testid="dashboard-preview-slide"
      >
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-schronix-grey-800 mb-6" data-testid="text-dashboard-preview-title">
              Experience the Dashboard
            </h2>
            <p className="text-xl text-schronix-grey-600 max-w-2xl mx-auto mb-8" data-testid="text-dashboard-preview-description">
              Upload your academic PDFs and let Schronix analyze your schedule to provide intelligent skip recommendations
            </p>
            <Link href="/dashboard">
              <Button 
                className="bg-schronix-primary text-white px-12 py-6 rounded-lg font-semibold text-xl hover:bg-schronix-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
                data-testid="button-enter-dashboard"
              >
                Enter Dashboard
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow" data-testid="card-upload-feature">
              <div className="w-12 h-12 bg-schronix-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-upload text-schronix-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-schronix-grey-800 mb-2">PDF Upload</h3>
              <p className="text-schronix-grey-600 text-sm">Upload academic calendars and timetables</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow" data-testid="card-analytics-feature">
              <div className="w-12 h-12 bg-schronix-accent/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-schronix-accent text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-schronix-grey-800 mb-2">Smart Analytics</h3>
              <p className="text-schronix-grey-600 text-sm">Get insights on attendance and performance</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow" data-testid="card-strategy-feature">
              <div className="w-12 h-12 bg-schronix-warning/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-calculator text-schronix-warning text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-schronix-grey-800 mb-2">Skip Strategy</h3>
              <p className="text-schronix-grey-600 text-sm">Calculate optimal class skip recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 right-6 flex space-x-3 z-50">
        {currentSlide > 0 && (
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="bg-white text-schronix-primary border-schronix-primary hover:bg-schronix-primary hover:text-white"
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {currentSlide < totalSlides - 1 && (
          <Button
            onClick={nextSlide}
            size="sm"
            className="bg-schronix-primary text-white hover:bg-schronix-secondary"
            data-testid="button-next-slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-schronix-primary' : 'bg-schronix-grey-300'
            }`}
            data-testid={`button-slide-indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
