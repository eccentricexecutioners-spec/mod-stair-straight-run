'use client';

import { useEffect, useState, useRef } from 'react';
import { XCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProgressBar } from '@/components/ProgressBar';

export function ProcessingStatus({
  jobId,
  onComplete,
}: {
  jobId: string;
  onComplete: (measurements: any) => void;
}) {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const res = await fetch(`/api/session/status?job_id=${jobId}`);
        const data = await res.json();
        setStatus(data);

        if (data.status === 'complete' && !completedRef.current) {
          completedRef.current = true;
          onComplete(data.measurements);
        } else if (data.status === 'failed') {
          setError(data.error || 'Processing failed');
        }
      } catch (err) {
        console.error('Status poll error:', err);
      }
    };

    pollStatus();
    const interval = setInterval(pollStatus, 3000);
    return () => clearInterval(interval);
  }, [jobId, onComplete]);

  if (error) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <XCircle className="mx-auto mb-4 text-gray-400" size={64} />
        <h2 className="text-2xl font-semibold mb-2">Processing Failed</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="flex justify-center mb-6">
        <LoadingSpinner size="lg" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Analyzing Stair Measurements</h2>
      <p className="text-gray-400 mb-6">
        {status?.status === 'processing'
          ? 'Detecting nosings and calculating dimensions...'
          : 'Queued for processing...'}
      </p>

      {status?.progress_pct > 0 && (
        <div className="max-w-md mx-auto">
          <ProgressBar progress={status.progress_pct} />
        </div>
      )}

      <p className="text-sm text-gray-500 mt-6">This usually takes 45-90 seconds</p>
    </div>
  );
}
