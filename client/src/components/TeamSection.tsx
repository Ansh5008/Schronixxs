import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Code, Database, TrendingUp } from "lucide-react";

interface TeamSectionProps {
  isActive: boolean;
}

export default function TeamSection({ isActive }: TeamSectionProps) {
  const [animatedMembers, setAnimatedMembers] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isActive) {
      // Animate team members sequentially
      const timeouts: NodeJS.Timeout[] = [];
      
      [0, 1, 2, 3].forEach((index) => {
        const timeout = setTimeout(() => {
          setAnimatedMembers(prev => new Set([...prev, index]));
        }, 300 + index * 200);
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(clearTimeout);
    } else {
      setAnimatedMembers(new Set());
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
    <div className="container mx-auto px-6 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 600" fill="none">
          <circle cx="100" cy="100" r="50" fill="#4F46E5"/>
          <circle cx="700" cy="500" r="80" fill="#6366F1"/>
          <circle cx="600" cy="150" r="30" fill="#4F46E5"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-schronix-grey-800 mb-6" data-testid="text-team-header">
            Meet Our Team
          </h2>
          <p className="text-xl text-schronix-grey-600 max-w-2xl mx-auto" data-testid="text-team-description">
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
                animatedMembers.has(0) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-sm" data-testid="card-team-leader">
                <CardContent className="p-8 text-center">
                  <div className={`w-24 h-24 bg-gradient-to-br ${teamMembers[0].color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                    <Crown className="text-white text-2xl h-6 w-6" />
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
                    animatedMembers.has(memberIndex) 
                      ? 'opacity-100 translate-y-0' 
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
