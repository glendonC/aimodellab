"use client";

import { useState } from 'react';

type RefactorState = {
  isRefactoring: boolean;
  error: string | null;
  refactoredCode: string | null;
  explanation: string | null;
};

export function useCodeRefactor() {
  const [state, setState] = useState<RefactorState>({
    isRefactoring: false,
    error: null,
    refactoredCode: null,
    explanation: null
  });

  const refactorCode = async (code: string, prompt: string) => {
    setState({
      isRefactoring: true,
      error: null,
      refactoredCode: null,
      explanation: null
    });

    try {
      const response = await fetch('/api/refactor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to refactor code');
      }

      const data = await response.json();
      
      setState({
        isRefactoring: false,
        error: null,
        refactoredCode: data.code,
        explanation: data.explanation
      });

      return data;
    } catch (error) {
      setState({
        isRefactoring: false,
        error: error instanceof Error ? error.message : 'Failed to refactor code',
        refactoredCode: null,
        explanation: null
      });
      throw error;
    }
  };

  return {
    refactorCode,
    ...state
  };
}