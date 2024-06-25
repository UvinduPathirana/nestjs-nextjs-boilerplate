import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
