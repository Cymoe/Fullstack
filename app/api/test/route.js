import { NextResponse } from 'next/server';

export async function GET() {
  return new Response(JSON.stringify({ message: 'Test route working' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

