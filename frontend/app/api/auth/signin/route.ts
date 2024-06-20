import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Call NestJS backend API to authenticate the user
    const response = await fetch(`${process.env.BACKEND_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: response.status });
    }
    const data = await response.json();
    cookies().set("token", data.accessToken);
    cookies().set("refreshToken", data.refreshToken)


    return NextResponse.json({ accessToken: data.accessToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}