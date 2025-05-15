export interface FollowUpQuestion {
    id: string;
    question: string;
    answer: string;
    isExpanded: boolean;
}

export interface Optimization {
    id: string;
    description: string;
}

export interface FollowUpOptimization {
    id: string;
    question: string;
    answer: string;
    isExpanded: boolean;
}

export interface Keyword {
    doc_id: string;
    level: number;
    matching_text: string;
}

export interface Alert {
    id: string;
    title: string;
    description: string;
    isExpanded: boolean;
    followUpQuestions: FollowUpQuestion[];
    optimizations: Optimization[];
    followUpOptimizations: FollowUpOptimization[];
    keywords: Keyword[];
}