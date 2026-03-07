import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, unauthorizedResponse } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    getTokenFromRequest(request);
  } catch {
    return unauthorizedResponse();
  }

  try {
    const { video_url, template, session_id } = await request.json();

    if (!video_url || !session_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fiduciousUrl = process.env.FIDUCIOUS_URL;
    if (!fiduciousUrl) {
      return NextResponse.json({ error: 'Fiducious URL not configured' }, { status: 500 });
    }

    const res = await fetch(`${fiduciousUrl}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        video_url,
        template: template || 'stairs',
        session_id,
        module: 'mod-stair-straight-run',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Fiducious error:', errText);
      return NextResponse.json({ error: 'Failed to start processing' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ job_id: data.job_id });
  } catch (error) {
    console.error('Process error:', error);
    return NextResponse.json({ error: 'Failed to start processing' }, { status: 500 });
  }
}
