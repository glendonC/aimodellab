import { NextResponse } from 'next/server';
import { searchModels } from '@/lib/huggingface';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    if (!query) {
      return NextResponse.json({ models: [] });
    }

    const models = await searchModels(query);
    
    return NextResponse.json({ 
      models: models.slice(0, limit)
    });
  } catch (error) {
    console.error('Model search failed:', error);
    return NextResponse.json({ 
      error: 'Failed to search models',
      models: []
    }, {
      status: 500
    });
  }
}