import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const jobId = request.nextUrl.searchParams.get('job_id');

    if (!jobId) {
      return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    const fiduciousUrl = process.env.FIDUCIOUS_URL;
    if (!fiduciousUrl) {
      return NextResponse.json({ error: 'Fiducious URL not configured' }, { status: 500 });
    }

    const res = await fetch(`${fiduciousUrl}/api/jobs/${jobId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}
