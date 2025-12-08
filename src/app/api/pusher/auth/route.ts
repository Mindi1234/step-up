import { pusher } from '@/lib/pusher-client';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const formData = await req.formData();
    const socketId = formData.get('socket_id') as string;
    const channelName = formData.get('channel_name') as string;

    try {
        const authResponse = pusher.authorizeChannel(socketId, channelName);
        return NextResponse.json(authResponse);
    } catch (error) {
        console.error("Pusher Auth Error:", error);
        return new NextResponse("Pusher authorization failed", { status: 500 });
    }
}