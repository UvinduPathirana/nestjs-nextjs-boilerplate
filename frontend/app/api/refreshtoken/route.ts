import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { refreshToken } = await req.json();
        
        // Call NestJS backend API to refresh the token
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/auth/refreshtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
        });
    
        if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData.message }, { status: response.status });
        }
        const data = await response.json();
    
        return NextResponse.json({ accessToken: data.accessToken }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}