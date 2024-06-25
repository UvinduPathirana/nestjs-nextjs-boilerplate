import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function POST() {
  cookies().delete('token',);
  cookies().delete('refreshToken');
  //redirect to signin page 

  
   return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
//return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
