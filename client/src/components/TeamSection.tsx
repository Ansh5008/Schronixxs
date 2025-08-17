import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Code, Database, TrendingUp } from "lucide-react";
import teamLeaderImage from "@assets/team-leader.webp";

interface TeamSectionProps {
  isActive: boolean;
}

export default function TeamSection({ isActive }: TeamSectionProps) {
  const [animatedMembers, setAnimatedMembers] = useState<number[]>([]);
  const [headerAnimated, setHeaderAnimated] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Animate header first
      setTimeout(() => setHeaderAnimated(true), 100);
      
      // Show particles
      setTimeout(() => setParticlesVisible(true), 300);
      
      // Animate team members sequentially
      const timeouts: NodeJS.Timeout[] = [];
      
      [0, 1, 2, 3].forEach((index) => {
        const timeout = setTimeout(() => {
          setAnimatedMembers(prev => [...prev, index]);
        }, 500 + index * 300);
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(clearTimeout);
      };
    } else {
      setAnimatedMembers([]);
      setHeaderAnimated(false);
      setParticlesVisible(false);
    }
  }, [isActive]);

  const teamMembers = [
    {
      name: "Vansh Sharma",
      role: "Team Leader",
      description: "Project Lead & Full-Stack Developer",
      icon: Crown,
      color: "from-schronix-primary to-schronix-secondary",
      tags: ["Leadership", "Strategy"],
      isLeader: true
    },
    {
      name: "Ansh Kumar", 
      role: "Team Member",
      description: "Frontend Developer",
      icon: Code,
      color: "from-schronix-accent to-schronix-primary",
      tags: ["React", "UI/UX"],
      isLeader: false
    },
    {
      name: "Prakhar Dhaundhiyal",
      role: "Team Member", 
      description: "Backend Developer",
      icon: Database,
      color: "from-schronix-secondary to-schronix-accent",
      tags: ["Node.js", "APIs"],
      isLeader: false
    },
    {
      name: "Indransh Pratap Singh",
      role: "Team Member",
      description: "Data Analyst", 
      icon: TrendingUp,
      color: "from-schronix-primary to-schronix-warning",
      tags: ["Analytics", "ML"],
      isLeader: false
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 600" fill="none">
          <circle cx="100" cy="100" r="50" fill="#4F46E5" className="animate-pulse" style={{ animationDelay: '0s' }}/>
          <circle cx="700" cy="500" r="80" fill="#6366F1" className="animate-pulse" style={{ animationDelay: '1s' }}/>
          <circle cx="600" cy="150" r="30" fill="#4F46E5" className="animate-pulse" style={{ animationDelay: '2s' }}/>
          <circle cx="200" cy="400" r="40" fill="#6366F1" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
          <circle cx="500" cy="300" r="25" fill="#4F46E5" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
        </svg>
      </div>

      {/* Floating Particles */}
      {particlesVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-schronix-primary/20 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          headerAnimated ? 'animate-slide-down' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-schronix-grey-800 mb-6 animate-gradient-x bg-gradient-to-r from-schronix-primary via-schronix-secondary to-schronix-accent bg-clip-text text-transparent" data-testid="text-team-header">
            Meet Our Team
          </h2>
          <p className="text-xl text-schronix-grey-600 max-w-2xl mx-auto animate-fade-in-up" data-testid="text-team-description" style={{ animationDelay: '0.3s' }}>
            The brilliant minds behind Schronix, dedicated to revolutionizing student academic planning
          </p>
        </div>
        
        {/* Team Leader */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-schronix-grey-700" data-testid="text-team-leader-section">Team Leader</h3>
          </div>
          <div className="flex justify-center">
            <div 
              className={`transition-all duration-600 ease-out ${
                animatedMembers.includes(0) 
                  ? 'opacity-100 translate-y-0 animate-bounce-in' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-sm" data-testid="card-team-leader">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={teamLeaderImage} 
                      alt="Vansh Sharma - Team Leader" 
                      className="w-full h-full object-cover"
                      data-testid="img-team-leader-avatar"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-schronix-grey-800 mb-2" data-testid="text-team-leader-name">
                    {teamMembers[0].name}
                  </h4>
                  <p className="text-schronix-grey-600 mb-4" data-testid="text-team-leader-description">
                    {teamMembers[0].description}
                  </p>
                  <div className="flex justify-center space-x-3">
                    {teamMembers[0].tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`${
                          index === 0 
                            ? 'bg-schronix-primary/10 text-schronix-primary' 
                            : 'bg-schronix-secondary/10 text-schronix-secondary'
                        } px-3 py-1 rounded-full text-sm`}
                        data-testid={`tag-team-leader-${index}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Team Members */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-schronix-grey-700" data-testid="text-team-members-section">Team Members</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.slice(1).map((member, index) => {
              const memberIndex = index + 1;
              const IconComponent = member.icon;
              
              return (
                <div 
                  key={memberIndex}
                  className={`transition-all duration-600 ease-out ${
                    animatedMembers.includes(memberIndex) 
                      ? 'opacity-100 translate-y-0 animate-scale-in' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  data-testid={`card-team-member-${index}`}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8 text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                        <IconComponent className="text-white text-xl h-5 w-5" />
                      </div>
                      <h4 className="text-lg font-bold text-schronix-grey-800 mb-2" data-testid={`text-team-member-name-${index}`}>
                        {member.name}
                      </h4>
                      <p className="text-schronix-grey-600 mb-4" data-testid={`text-team-member-description-${index}`}>
                        {member.description}
                      </p>
                      <div className="flex justify-center space-x-2">
                        {member.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={`${
                              tagIndex === 0 
                                ? 'bg-schronix-accent/10 text-schronix-accent' 
                                : 'bg-schronix-primary/10 text-schronix-primary'
                            } px-3 py-1 rounded-full text-sm`}
                            data-testid={`tag-team-member-${index}-${tagIndex}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
