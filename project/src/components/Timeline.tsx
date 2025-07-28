import React, { useRef } from 'react';
import { Calendar, FileText, Gavel, Scale, Download, AlertTriangle, Award, Clock } from 'lucide-react';
import { TimelineEvent } from '../types/LegalCase';
import html2canvas from 'html2canvas';

interface TimelineProps {
  events: TimelineEvent[];
  caseTitle: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, caseTitle }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'filing': return <FileText className="w-6 h-6" />;
      case 'hearing': return <Scale className="w-6 h-6" />;
      case 'ruling': return <Gavel className="w-6 h-6" />;
      case 'appeal': return <AlertTriangle className="w-6 h-6" />;
      case 'settlement': return <Award className="w-6 h-6" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type'], importance: TimelineEvent['importance']) => {
    const baseColors = {
      filing: 'blue',
      hearing: 'purple', 
      ruling: 'green',
      appeal: 'red',
      settlement: 'amber'
    };
    
    const intensity = importance === 'high' ? '600' : importance === 'medium' ? '500' : '400';
    return `${baseColors[type]}-${intensity}`;
  };

  const exportTimeline = async () => {
    if (!timelineRef.current) return;

    try {
      const canvas = await html2canvas(timelineRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const link = document.createElement('a');
      link.download = `InfoLegal_${caseTitle.replace(/\s+/g, '_')}_Timeline.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting timeline:', error);
      alert('Failed to export timeline. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <Clock className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Case Timeline</h2>
              <p className="text-amber-200 text-lg font-medium">{caseTitle}</p>
            </div>
          </div>
          <button
            onClick={exportTimeline}
            className="flex items-center space-x-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-6 py-3 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Export Timeline</span>
          </button>
        </div>
      </div>

      <div ref={timelineRef} className="p-8 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-lg"></div>

          {/* Timeline events */}
          <div className="space-y-8">
            {events.map((event, index) => {
              const colorClass = getEventColor(event.type, event.importance);
              
              return (
                <div key={event.id} className="relative flex items-start space-x-8">
                  {/* Timeline dot */}
                  <div className={`
                    relative z-10 flex items-center justify-center w-20 h-20 rounded-full shadow-2xl
                    bg-gradient-to-br from-${colorClass} to-${colorClass.replace('400', '600').replace('500', '700').replace('600', '800')} text-white
                    ${event.importance === 'high' ? 'ring-4 ring-amber-300 ring-opacity-50' : ''}
                    transform hover:scale-110 transition-transform duration-200
                  `}>
                    {getEventIcon(event.type)}
                  </div>

                  {/* Event content */}
                  <div className="flex-1 min-w-0">
                    <div className={`
                      bg-white p-8 rounded-2xl shadow-lg border-l-4 border-${colorClass} hover:shadow-xl transition-all duration-300
                      ${event.importance === 'high' ? 'bg-gradient-to-r from-amber-50 to-yellow-50' : 
                        event.importance === 'medium' ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 
                        'bg-gradient-to-r from-slate-50 to-gray-50'}
                    `}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-slate-900">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span className={`
                            px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide
                            ${event.importance === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                              event.importance === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                              'bg-gray-100 text-gray-600 border border-gray-200'}
                          `}>
                            {event.importance} Priority
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-700 mb-6 text-lg leading-relaxed">{event.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-slate-600">
                        <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-4 py-2">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span className="font-bold">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-4 py-2">
                          <span className="capitalize font-bold text-slate-700">{event.type} Event</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline end marker */}
          <div className="relative flex items-center justify-center mt-12">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-16 text-center">
              <p className="text-slate-600 font-medium">Case Timeline Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};