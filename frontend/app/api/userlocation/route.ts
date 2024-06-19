import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/userlocation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Failed to fetch cities' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching cities:', error);
        return NextResponse.json({ message: 'Error fetching cities' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { city } = await req.json();

    if (!city) {
        return NextResponse.json({ message: 'City name is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/userlocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({ city })
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Failed to create city' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error creating city:', error);
        return NextResponse.json({ message: 'Error creating city' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ message: 'City ID is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/userlocation/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Failed to delete city' }, { status: response.status });
        }

        return NextResponse.json({ message: 'City deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting city:', error);
        return NextResponse.json({ message: 'Error deleting city' }, { status: 500 });
    }
}
