'use client';

export interface StairMeasurementSession {
  id: string;
  job_site?: string;
  video_url?: string;
  fiducious_job_id?: string;
  sisyphean_job_id?: string;
  measurements?: any;
  stringer_profile?: any;
  created_at: string;
}

const SESSION_KEY = 'stair-straight-run-session';

export function getSession(): StairMeasurementSession | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function setSession(session: StairMeasurementSession) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function createSession(jobSite?: string): StairMeasurementSession {
  const session: StairMeasurementSession = {
    id: crypto.randomUUID(),
    job_site: jobSite,
    created_at: new Date().toISOString(),
  };
  setSession(session);
  return session;
}
