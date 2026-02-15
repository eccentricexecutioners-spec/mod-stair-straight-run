'use client';

import { Download, MapPin, Video, Ruler } from 'lucide-react';

export function MarkerInstructions({
  jobSite,
  onContinue,
}: {
  jobSite: string;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="status-badge active">
        Job Site: {jobSite}
      </div>

      <h2 className="text-2xl font-semibold">Marker Placement & Recording</h2>

      <div className="neutral-panel">
        <h3 className="font-semibold mb-4 flex items-center text-white">
          <Download className="mr-2 text-ee-gold" size={20} />
          Step 1: Download & Print Markers
        </h3>
        <p className="text-gray-300 mb-4">
          Print calibration markers at 100% scale. These will be placed on landing nosings.
        </p>
        <a
          href="/calibration-sheets/stairs-landing-markers.pdf"
          download
          className="btn-primary py-3 px-6 font-bold"
        >
          Download Landing Markers (PDF)
        </a>
      </div>

      <div className="neutral-panel">
        <h3 className="font-semibold mb-4 flex items-center text-white">
          <MapPin className="mr-2 text-ee-gold" size={20} />
          Step 2: Place Markers on Landings
        </h3>
        <div className="space-y-3 text-gray-300">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-md">
            <p className="font-medium text-white mb-2">Top Landing</p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Place 3 markers in triangle formation on nosing edge</li>
              <li>Markers should be visible from multiple angles</li>
              <li>Ensure markers are flat and secure</li>
            </ul>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-md">
            <p className="font-medium text-white mb-2">Bottom Landing</p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Repeat triangle formation on bottom nosing</li>
              <li>Keep markers in similar positions as top</li>
              <li>Check that all 6 markers are visible</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="neutral-panel">
        <h3 className="font-semibold mb-4 flex items-center text-white">
          <Video className="mr-2 text-ee-gold" size={20} />
          Step 3: Record Video
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-ee-gold mr-2 font-bold">1.</span>
            Walk up and down the stairs slowly while recording
          </li>
          <li className="flex items-start">
            <span className="text-ee-gold mr-2 font-bold">2.</span>
            Capture multiple angles (front view, side view)
          </li>
          <li className="flex items-start">
            <span className="text-ee-gold mr-2 font-bold">3.</span>
            Ensure all markers are visible in most frames
          </li>
          <li className="flex items-start">
            <span className="text-ee-gold mr-2 font-bold">4.</span>
            Record for 30-60 seconds
          </li>
          <li className="flex items-start">
            <span className="text-ee-gold mr-2 font-bold">5.</span>
            Good lighting is critical for accurate measurements
          </li>
        </ul>
      </div>

      <div className="neutral-panel">
        <h3 className="font-semibold mb-4 flex items-center text-white">
          <Ruler className="mr-2 text-ee-gold" size={20} />
          What We&apos;ll Measure
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-white">Total Rise</p>
            <p className="text-sm text-gray-400">Vertical height from bottom to top</p>
          </div>
          <div>
            <p className="font-medium text-white">Total Run</p>
            <p className="text-sm text-gray-400">Horizontal depth of staircase</p>
          </div>
          <div>
            <p className="font-medium text-white">Individual Rises</p>
            <p className="text-sm text-gray-400">Height of each step</p>
          </div>
          <div>
            <p className="font-medium text-white">Individual Runs</p>
            <p className="text-sm text-gray-400">Depth of each tread</p>
          </div>
          <div>
            <p className="font-medium text-white">Stringer Angle</p>
            <p className="text-sm text-gray-400">Angle for cutting stringers</p>
          </div>
          <div>
            <p className="font-medium text-white">Tread Width</p>
            <p className="text-sm text-gray-400">Side-to-side measurement</p>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="btn-primary w-full py-4 text-lg font-bold"
      >
        Markers Placed - Ready to Upload Video
      </button>
    </div>
  );
}
