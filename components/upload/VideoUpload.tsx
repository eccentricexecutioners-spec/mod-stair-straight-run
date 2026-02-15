'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProgressBar } from '@/components/ProgressBar';

export function VideoUpload({
  onUploadComplete,
  sessionId,
}: {
  onUploadComplete: (videoUrl: string, jobId: string) => void;
  sessionId: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('session_id', sessionId);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');

      const { video_url } = await uploadRes.json();
      setProgress(50);

      const processRes = await fetch('/api/session/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url,
          template: 'stairs',
          session_id: sessionId,
        }),
      });

      if (!processRes.ok) throw new Error('Processing failed to start');

      const { job_id } = await processRes.json();
      setProgress(100);

      onUploadComplete(video_url, job_id);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold">Upload Stair Video</h2>

      {error && (
        <div className="bg-white/[0.02] border border-white/10 text-gray-300 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="upload-zone text-center">
        {!uploading ? (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="mx-auto mb-4 text-ee-gold" size={48} />
            <p className="text-lg mb-2 text-white">Tap to select video</p>
            <p className="text-sm text-gray-500">MP4, MOV, or AVI &middot; Max 500MB</p>
          </label>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-lg mb-4 text-white">Uploading & Starting Processing...</p>
            <div className="max-w-md mx-auto">
              <ProgressBar progress={progress} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
