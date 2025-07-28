import React, { useRef } from 'react';
import { Download, FileText, Clock, Scale, Award } from 'lucide-react';
import { LegalAnalysis } from '../types/LegalCase';
import { DataTable } from './DataTable';
import { Timeline } from './Timeline';
import html2canvas from 'html2canvas';

interface CombinedViewProps {
  analysis: LegalAnalysis;
}

export const CombinedView: React.FC<CombinedViewProps> = ({ analysis }) => {
  const combinedRef = useRef<HTMLDivElement>(null);

  const exportCombinedView = async () => {
    if (!combinedRef.current) return;

    try {
      const canvas = await html2canvas(combinedRef.current, {
        backgroundColor: '#f8fafc',
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        height: combinedRef.current.scrollHeight,
        width: combinedRef.current.scrollWidth
      });

      const link = document.createElement('a');
      link.download = `InfoLegal_${analysis.caseTitle.replace(/\s+/g, '_')}_Complete_Analysis.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting combined view:', error);
      alert('Failed to export analysis. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-2xl border-4 border-amber-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
              <Scale className="w-10 h-10 text-slate-900" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3">InfoLegal Analysis Report</h1>
              <p className="text-amber-200 text-xl font-medium">{analysis.caseTitle}</p>
              <div className="flex items-center space-x-8 mt-4 text-slate-300">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Case #{analysis.caseNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{analysis.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">{analysis.court}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={exportCombinedView}
            className="flex items-center space-x-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-8 py-4 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            <Download className="w-6 h-6" />
            <span>Export Complete Report</span>
          </button>
        </div>
      </div>

      {/* Combined content for export */}
      <div ref={combinedRef} className="space-y-10 bg-gradient-to-br from-slate-50 to-amber-50 p-8 rounded-2xl shadow-lg">
        {/* Executive Summary */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-amber-500">
          <div className="flex items-center space-x-3 mb-6">
            <Scale className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-slate-900">Executive Summary</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">{analysis.keyArguments.length}</div>
              <div className="text-slate-600 font-medium">Key Arguments</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <div className="text-4xl font-bold text-amber-700 mb-2">{analysis.lawPoints.length}</div>
              <div className="text-slate-600 font-medium">Legal Citations</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-4xl font-bold text-green-700 mb-2">{analysis.timeline.length}</div>
              <div className="text-slate-600 font-medium">Timeline Events</div>
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <DataTable analysis={analysis} />

        {/* Timeline */}
        <Timeline events={analysis.timeline} caseTitle={analysis.caseTitle} />

        {/* Professional Footer */}
        <div className="text-center py-6 border-t-2 border-slate-200">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Scale className="w-6 h-6 text-amber-600" />
            <span className="text-xl font-bold text-slate-900">InfoLegal</span>
          </div>
          <p className="text-slate-600 font-medium">
            Professional Legal Document Analysis Platform
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Generated on {new Date().toLocaleDateString()} • Confidential Legal Analysis
          </p>
        </div>
      </div>
    </div>
  );
};