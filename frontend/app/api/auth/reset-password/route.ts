
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req:
    NextRequest) {
    const { email, password } = await req.json();
    try {
        const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}