export interface KeyArgument {
  party: string;
  argument: string;
  evidence: string;
  strength: 'Strong' | 'Moderate' | 'Weak';
}

export interface LawPoint {
  statute: string;
  section: string;
  description: string;
  relevance: string;
  citation: string;
}

export interface CaseOutcome {
  decision: string;
  reasoning: string;
  damages?: string;
  precedent?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'filing' | 'hearing' | 'ruling' | 'appeal' | 'settlement';
  importance: 'high' | 'medium' | 'low';
}

export interface LegalAnalysis {
  keyArguments: KeyArgument[];
  lawPoints: LawPoint[];
  caseOutcome: CaseOutcome;
  timeline: TimelineEvent[];
  caseTitle: string;
  caseNumber: string;
  court: string;
  date: string;
}