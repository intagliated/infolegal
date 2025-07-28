import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, Scale, BookOpen, Gavel } from 'lucide-react';
import { LegalAnalysis } from '../types/LegalCase';

interface DataTableProps {
  analysis: LegalAnalysis;
}

export const DataTable: React.FC<DataTableProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'arguments' | 'laws' | 'outcome'>('arguments');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig?.key === column) {
      return sortConfig.direction === 'asc' ? 
        <ChevronUp className="w-4 h-4" /> : 
        <ChevronDown className="w-4 h-4" />;
    }
    return <Filter className="w-4 h-4 opacity-50" />;
  };

  const tabs = [
    { id: 'arguments', label: 'Key Arguments', count: analysis.keyArguments.length, icon: Scale },
    { id: 'laws', label: 'Legal Citations', count: analysis.lawPoints.length, icon: BookOpen },
    { id: 'outcome', label: 'Case Outcome', count: 1, icon: Gavel }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-amber-500 rounded-xl">
            <BookOpen className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="text-3xl font-bold">Legal Analysis Results</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <span className="text-amber-200 font-medium">Case Title:</span>
            <div className="font-bold text-white mt-1">{analysis.caseTitle}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <span className="text-amber-200 font-medium">Case Number:</span>
            <div className="font-bold text-white mt-1">{analysis.caseNumber}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <span className="text-amber-200 font-medium">Court:</span>
            <div className="font-bold text-white mt-1">{analysis.court}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <span className="text-amber-200 font-medium">Date:</span>
            <div className="font-bold text-white mt-1">{analysis.date}</div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <div className="flex bg-slate-50">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-3 px-8 py-6 text-sm font-bold border-b-4 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-700 bg-amber-50'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'arguments' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th 
                    className="text-left py-4 px-6 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={() => handleSort('party')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Party</span>
                      <SortIcon column="party" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Legal Argument</th>
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Supporting Evidence</th>
                  <th 
                    className="text-left py-4 px-6 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={() => handleSort('strength')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Strength</span>
                      <SortIcon column="strength" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {analysis.keyArguments.map((arg, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        arg.party === 'Plaintiff' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {arg.party}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-slate-900 font-medium">{arg.argument}</td>
                    <td className="py-6 px-6 text-slate-700">{arg.evidence}</td>
                    <td className="py-6 px-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        arg.strength === 'Strong' ? 'bg-green-100 text-green-800 border border-green-200' :
                        arg.strength === 'Moderate' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {arg.strength}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'laws' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Statute</th>
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Section</th>
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Description</th>
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Case Relevance</th>
                  <th className="text-left py-4 px-6 font-bold text-slate-800">Legal Citation</th>
                </tr>
              </thead>
              <tbody>
                {analysis.lawPoints.map((law, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-6 font-bold text-amber-700 text-lg">{law.statute}</td>
                    <td className="py-6 px-6">
                      <span className="font-mono text-sm bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 font-bold">
                        {law.section}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-slate-900 font-medium">{law.description}</td>
                    <td className="py-6 px-6 text-slate-700">{law.relevance}</td>
                    <td className="py-6 px-6 text-slate-600 text-sm italic font-medium">{law.citation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'outcome' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-500 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Gavel className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">Final Court Decision</h3>
              </div>
              <p className="text-slate-800 text-lg font-medium mb-6 leading-relaxed">{analysis.caseOutcome.decision}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    <span>Court Reasoning</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed">{analysis.caseOutcome.reasoning}</p>
                </div>
                
                {analysis.caseOutcome.damages && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center space-x-2">
                      <Scale className="w-5 h-5 text-amber-600" />
                      <span>Damages Awarded</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed">{analysis.caseOutcome.damages}</p>
                  </div>
                )}
              </div>
              
              {analysis.caseOutcome.precedent && (
                <div className="mt-8 pt-6 border-t-2 border-green-200">
                  <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center space-x-2">
                    <Gavel className="w-5 h-5 text-amber-600" />
                    <span>Legal Precedent Established</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed bg-white rounded-xl p-6 shadow-md">{analysis.caseOutcome.precedent}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};