import ProgressRing from "@/components/ui/progress-ring";
import { Badge } from "@/components/ui/badge";

interface Subject {
  id: string;
  name: string;
  attendanceRate: number;
  attendedClasses: number;
  totalClasses: number;
  canSkip: number;
  status: 'safe' | 'warning';
}

interface AttendanceCardProps {
  subject: Subject;
}

export default function AttendanceCard({ subject }: AttendanceCardProps) {
  const getColor = () => {
    if (subject.status === 'safe') return '#10B981';
    return '#EF4444';
  };

  return (
    <div className="text-center" data-testid={`attendance-card-${subject.id}`}>
      <ProgressRing 
        percentage={subject.attendanceRate} 
        color={getColor()}
        size={96}
      />
      <h4 className="font-semibold text-schronix-grey-800 mt-4" data-testid={`text-subject-name-${subject.id}`}>
        {subject.name}
      </h4>
      <p className="text-sm text-schronix-grey-600" data-testid={`text-subject-classes-${subject.id}`}>
        {subject.attendedClasses}/{subject.totalClasses} classes
      </p>
      <Badge 
        variant={subject.status === 'safe' ? 'default' : 'destructive'}
        className="mt-2"
        data-testid={`badge-subject-skips-${subject.id}`}
      >
        {subject.canSkip > 0 ? `${subject.canSkip} skips available` : 'No skips available'}
      </Badge>
    </div>
  );
}
