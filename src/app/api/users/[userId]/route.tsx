import { User } from '@/lib/db/models';
import { connectToDatabase } from '@/lib/db/mongoose';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }>}) {
    try {
        await connectToDatabase();
        const {userId} = await params; 
        const user = await User.findOne({_id: userId});
        if(user){
            return NextResponse.json(user.toObject(), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }else{
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}