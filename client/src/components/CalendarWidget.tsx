import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  startTime: Date;
  type: string;
}

interface CalendarWidgetProps {
  events?: Event[];
  showFullCalendar?: boolean;
}

export default function CalendarWidget({ events = [], showFullCalendar = false }: CalendarWidgetProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  // Generate calendar days for current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-schronix-primary';
      case 'exam': return 'bg-schronix-warning';
      case 'assignment': return 'bg-schronix-accent';
      default: return 'bg-schronix-grey-400';
    }
  };

  const isToday = (day: number | null) => {
    return day === currentDate;
  };

  const getRelativeTime = (eventDate: Date) => {
    const now = new Date();
    const diffMs = eventDate.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffMins > 0) {
      return `In ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else if (diffMins > -60) {
      return 'Now';
    } else {
      return 'Past';
    }
  };

  return (
    <Card data-testid="calendar-widget">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          {!showFullCalendar && (
            <Button variant="ghost" size="sm" className="text-schronix-primary hover:underline" data-testid="button-view-all-calendar">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h4 className="font-semibold text-schronix-grey-800" data-testid="text-calendar-month">
              {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-schronix-grey-400 py-2 font-medium">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`py-2 text-sm ${
                  day === null 
                    ? 'text-transparent' 
                    : isToday(day)
                      ? 'bg-schronix-primary text-white rounded-full font-semibold'
                      : 'text-schronix-grey-800 hover:bg-schronix-grey-100 rounded-full cursor-pointer'
                }`}
                data-testid={day ? `calendar-day-${day}` : `calendar-empty-${index}`}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div>
          <h4 className="text-sm font-semibold text-schronix-grey-700 mb-3" data-testid="text-upcoming-events-title">
            Upcoming Events
          </h4>
          <div className="space-y-3">
            {events.length > 0 ? (
              events.slice(0, showFullCalendar ? events.length : 3).map((event, index) => (
                <div key={event.id} className="flex items-center space-x-3" data-testid={`event-${event.id}`}>
                  <div className={`w-2 h-2 ${getEventColor(event.type)} rounded-full`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-schronix-grey-800" data-testid={`text-event-title-${event.id}`}>
                      {event.title}
                    </div>
                    <div className="text-xs text-schronix-grey-500" data-testid={`text-event-time-${event.id}`}>
                      {getRelativeTime(new Date(event.startTime))} • {formatTime(new Date(event.startTime))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-schronix-grey-500 text-sm" data-testid="text-no-upcoming-events">
                No upcoming events. Upload your timetable to see your schedule.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
