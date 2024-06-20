// pages/api/suggestions/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${query}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: response.status });
    }

    const data = await response.json();
    const suggestions = data.map((location: any) => location.name);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
