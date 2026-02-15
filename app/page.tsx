'use client';

import { useState, useEffect } from 'react';
import { getSession, createSession, setSession, clearSession, type StairMeasurementSession } from '@/lib/session';
import { StepIndicator } from '@/components/StepIndicator';
import { MarkerInstructions } from '@/components/instructions/MarkerInstructions';
import { VideoUpload } from '@/components/upload/VideoUpload';
import { ProcessingStatus } from '@/components/results/ProcessingStatus';
import { StairResults } from '@/components/results/StairResults';

type Step = 'job-site' | 'instructions' | 'upload' | 'processing' | 'results';

export default function StairStraightRunPage() {
  const [step, setStep] = useState<Step>('job-site');
  const [session, setSessionState] = useState<StairMeasurementSession | null>(null);

  useEffect(() => {
    const existing = getSession();
    if (existing) {
      setSessionState(existing);
    }
  }, []);

  useEffect(() => {
    if (!session) {
      setStep('job-site');
    } else if (session.measurements) {
      setStep('results');
    } else if (session.fiducious_job_id) {
      setStep('processing');
    } else if (session.video_url) {
      setStep('upload');
    } else if (session.job_site) {
      setStep('instructions');
    }
  }, [session]);

  const handleJobSiteEntered = (jobSite: string) => {
    const newSession = createSession(jobSite);
    setSessionState(newSession);
    setStep('instructions');
  };

  const handleVideoUploaded = (videoUrl: string, jobId: string) => {
    const updated = { ...session!, video_url: videoUrl, fiducious_job_id: jobId };
    setSession(updated);
    setSessionState(updated);
  };

  const handleMeasurementsComplete = (measurements: any) => {
    const updated = { ...session!, measurements };
    setSession(updated);
    setSessionState(updated);
  };

  const handleStartOver = () => {
    clearSession();
    setSessionState(null);
    setStep('job-site');
  };

  const completedStep = (s: Step): boolean => {
    const order: Step[] = ['job-site', 'instructions', 'upload', 'processing', 'results'];
    return order.indexOf(s) < order.indexOf(step);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Straight-Run Stair Measurement</h1>
          <p className="text-gray-400">Precision measurements for stringer fabrication</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 md:space-x-4">
            <StepIndicator number={1} label="Job Site" active={step === 'job-site'} completed={completedStep('job-site')} />
            <div className={`w-6 md:w-12 h-px ${completedStep('job-site') ? 'bg-ee-gold' : 'bg-white/5'}`} />
            <StepIndicator number={2} label="Setup" active={step === 'instructions'} completed={completedStep('instructions')} />
            <div className={`w-6 md:w-12 h-px ${completedStep('instructions') ? 'bg-ee-gold' : 'bg-white/5'}`} />
            <StepIndicator number={3} label="Upload" active={step === 'upload'} completed={completedStep('upload')} />
            <div className={`w-6 md:w-12 h-px ${completedStep('upload') ? 'bg-ee-gold' : 'bg-white/5'}`} />
            <StepIndicator number={4} label="Processing" active={step === 'processing'} completed={completedStep('processing')} />
            <div className={`w-6 md:w-12 h-px ${completedStep('processing') ? 'bg-ee-gold' : 'bg-white/5'}`} />
            <StepIndicator number={5} label="Results" active={step === 'results'} completed={false} />
          </div>
        </div>

        {/* Step Content */}
        <div className="module-panel md:p-8">
          {step === 'job-site' && (
            <JobSiteEntry onContinue={handleJobSiteEntered} />
          )}

          {step === 'instructions' && (
            <MarkerInstructions
              jobSite={session?.job_site || ''}
              onContinue={() => setStep('upload')}
            />
          )}

          {step === 'upload' && (
            <VideoUpload
              onUploadComplete={handleVideoUploaded}
              sessionId={session?.id || ''}
            />
          )}

          {step === 'processing' && (
            <ProcessingStatus
              jobId={session?.fiducious_job_id || ''}
              onComplete={handleMeasurementsComplete}
            />
          )}

          {step === 'results' && session?.measurements && (
            <StairResults
              measurements={session.measurements}
              jobSite={session.job_site || 'Unknown'}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function JobSiteEntry({ onContinue }: { onContinue: (jobSite: string) => void }) {
  const [jobSite, setJobSite] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold">Job Site Information</h2>
      <div>
        <label className="block mb-2 text-gray-300 text-sm font-medium">
          Job Site Name or Address
        </label>
        <input
          type="text"
          value={jobSite}
          onChange={(e) => setJobSite(e.target.value)}
          placeholder="e.g., 123 Main St, Toronto"
          className="input-field py-3"
        />
      </div>
      <button
        onClick={() => jobSite.trim() && onContinue(jobSite.trim())}
        disabled={!jobSite.trim()}
        className="btn-primary w-full py-4 text-lg font-bold"
      >
        Continue
      </button>
    </div>
  );
}
