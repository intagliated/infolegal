import React, { useState } from 'react';
import { Scale, Sparkles, FileSearch, Shield, BookOpen, Gavel } from 'lucide-react';
import { DocumentUpload } from './components/DocumentUpload';
import { CombinedView } from './components/CombinedView';
import { DocumentProcessor } from './services/DocumentProcessor';
import { LegalAnalysis } from './types/LegalCase';

function App() {
  const [analysis, setAnalysis] = useState<LegalAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const documentProcessor = new DocumentProcessor();

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError('');
    
    try {
      const result = await documentProcessor.processDocument(file);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process document');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                <Scale className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">InfoLegal</h1>
                <p className="text-amber-200 text-sm font-medium">Professional Legal Document Analysis Platform</p>
              </div>
            </div>
            
            {analysis && (
              <button
                onClick={resetAnalysis}
                className="flex items-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <FileSearch className="w-5 h-5" />
                <span>New Analysis</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!analysis ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-16">
              <div className="flex items-center justify-center space-x-3 text-amber-700 mb-6">
                <Shield className="w-8 h-8" />
                <span className="text-lg font-bold uppercase tracking-wider">Trusted Legal AI</span>
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Transform Legal Documents into 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800"> Strategic Insights</span>
              </h2>
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                InfoLegal leverages advanced AI technology to extract critical legal information, analyze case precedents, 
                and generate comprehensive timelines from your legal documents with professional-grade accuracy.
              </p>
            </div>

            {/* Legal Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-6">
                  <Gavel className="w-7 h-7 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Case Analysis</h3>
                <p className="text-slate-600 leading-relaxed">
                  Extract key arguments, legal precedents, and case outcomes with AI-powered analysis tailored for legal professionals.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-slate-500 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Legal Research</h3>
                <p className="text-slate-600 leading-relaxed">
                  Identify relevant statutes, regulations, and legal citations with comprehensive analysis of their application to your case.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Timeline Visualization</h3>
                <p className="text-slate-600 leading-relaxed">
                  Generate interactive case timelines with exportable infographics for presentations and case documentation.
                </p>
              </div>
            </div>

            {/* Professional Trust Indicators */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Trusted by Legal Professionals</h3>
                <p className="text-slate-300 text-lg">Secure, accurate, and designed for the legal industry</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-400 mb-2">99.9%</div>
                  <div className="text-slate-300 text-sm">Accuracy Rate</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-400 mb-2">256-bit</div>
                  <div className="text-slate-300 text-sm">Encryption</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-400 mb-2">GDPR</div>
                  <div className="text-slate-300 text-sm">Compliant</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-400 mb-2">24/7</div>
                  <div className="text-slate-300 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Upload Component */}
            <DocumentUpload 
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              error={error}
            />
          </div>
        ) : (
          <CombinedView analysis={analysis} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-t-4 border-amber-500 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Scale className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold">InfoLegal</span>
            </div>
            <p className="text-slate-300 mb-2">
              Professional Legal Document Analysis Platform
            </p>
            <p className="text-slate-400 text-sm">
              Powered by Advanced AI Technology • Built for Legal Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;