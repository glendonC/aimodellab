import { NextResponse } from 'next/server';
import { LlamaRefactor } from '@/lib/llama';

export async function POST(request: Request) {
  try {
    const { code, prompt } = await request.json();

    if (!code || !prompt) {
      return NextResponse.json(
        { error: 'Code and prompt are required' },
        { status: 400 }
      );
    }

    const refactor = new LlamaRefactor();
    const result = await refactor.refactorCode({ code, prompt });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Refactor API error:', error);
    return NextResponse.json(
      { error: 'Failed to refactor code' },
      { status: 500 }
    );
  }
}