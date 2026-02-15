'use client';

import { Download, RotateCcw } from 'lucide-react';
import { StringerProfile } from '@/components/visualization/StringerProfile';

interface StairMeasurements {
  stair?: {
    total_rise_mm?: number;
    total_run_mm?: number;
    num_treads?: number;
    stringer_angle_deg?: number;
    individual_rises_mm?: number[];
    individual_runs_mm?: number[];
    stringer_profile?: Array<{
      nosing_x?: number;
      nosing_y?: number;
      nosing_z?: number;
    }>;
  };
  csv_url?: string;
}

export function StairResults({
  measurements,
  jobSite,
  onStartOver,
}: {
  measurements: StairMeasurements;
  jobSite: string;
  onStartOver: () => void;
}) {
  const stair = measurements.stair;
  const rises = stair?.individual_rises_mm || [];
  const runs = stair?.individual_runs_mm || [];
  const profile = stair?.stringer_profile || [];

  const downloadCSV = () => {
    if (measurements.csv_url) {
      window.open(measurements.csv_url, '_blank');
    }
  };

  const downloadGCode = () => {
    alert('G-code generation coming soon!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="status-badge active">
        {jobSite}
      </div>

      <h2 className="text-2xl font-semibold">Stair Measurements Complete</h2>

      {/* Key Measurements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MeasurementCard
          label="Total Rise"
          value={stair?.total_rise_mm}
          unit="mm"
          highlight
        />
        <MeasurementCard
          label="Total Run"
          value={stair?.total_run_mm}
          unit="mm"
          highlight
        />
        <MeasurementCard
          label="Number of Steps"
          value={stair?.num_treads}
        />
        <MeasurementCard
          label="Stringer Angle"
          value={stair?.stringer_angle_deg}
          unit="\u00B0"
          decimals={1}
        />
      </div>

      {/* Stringer Profile Visualization */}
      {profile.length > 0 && (
        <div className="neutral-panel">
          <h3 className="font-semibold mb-4">Stringer Cut Profile</h3>
          <StringerProfile data={profile} />
        </div>
      )}

      {/* Individual Step Data */}
      {rises.length > 0 && (
        <div className="neutral-panel">
          <h3 className="font-semibold mb-4">Individual Step Measurements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/5">
                  <th className="pb-2 pr-4 text-gray-400 font-medium">Step #</th>
                  <th className="pb-2 pr-4 text-gray-400 font-medium">Rise (mm)</th>
                  <th className="pb-2 pr-4 text-gray-400 font-medium">Run (mm)</th>
                  <th className="pb-2 pr-4 text-gray-400 font-medium hidden md:table-cell">Nosing X</th>
                  <th className="pb-2 pr-4 text-gray-400 font-medium hidden md:table-cell">Nosing Y</th>
                  <th className="pb-2 text-gray-400 font-medium hidden md:table-cell">Nosing Z</th>
                </tr>
              </thead>
              <tbody>
                {rises.map((rise: number, i: number) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-gray-300">{i + 1}</td>
                    <td className="pr-4 text-white">{rise.toFixed(1)}</td>
                    <td className="pr-4 text-white">{runs[i]?.toFixed(1) ?? '\u2014'}</td>
                    <td className="pr-4 text-gray-500 text-xs hidden md:table-cell">
                      {profile[i]?.nosing_x?.toFixed(0) ?? '\u2014'}
                    </td>
                    <td className="pr-4 text-gray-500 text-xs hidden md:table-cell">
                      {profile[i]?.nosing_y?.toFixed(0) ?? '\u2014'}
                    </td>
                    <td className="text-gray-500 text-xs hidden md:table-cell">
                      {profile[i]?.nosing_z?.toFixed(0) ?? '\u2014'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Compliance Check */}
      {rises.length > 0 && (
        <div className="neutral-panel">
          <h3 className="font-semibold mb-4">Code Compliance (IRC 2021)</h3>
          <div className="space-y-2 text-sm">
            <ComplianceCheck
              label="Max Rise per Step"
              value={Math.max(...rises)}
              limit={196.85}
              unit="mm"
            />
            <ComplianceCheck
              label="Min Run per Tread"
              value={Math.min(...runs)}
              limit={254}
              unit="mm"
              inverse
            />
            <ComplianceCheck
              label="Rise Variation"
              value={Math.max(...rises) - Math.min(...rises)}
              limit={9.525}
              unit="mm"
            />
          </div>
        </div>
      )}

      {/* Download Buttons */}
      <div className="space-y-3">
        <button
          onClick={downloadCSV}
          disabled={!measurements.csv_url}
          className="btn-primary w-full py-3 font-bold"
        >
          <Download className="mr-2" size={20} />
          Download Stringer Profile CSV
        </button>

        <button
          onClick={downloadGCode}
          className="btn-secondary w-full py-3 font-bold"
        >
          <Download className="mr-2" size={20} />
          Generate CNC G-Code (Coming Soon)
        </button>
      </div>

      {/* Start Over */}
      <button
        onClick={onStartOver}
        className="btn-ghost w-full py-3 font-bold"
      >
        <RotateCcw className="mr-2" size={20} />
        Measure Another Staircase
      </button>
    </div>
  );
}

function MeasurementCard({
  label,
  value,
  unit,
  highlight = false,
  decimals = 0,
}: {
  label: string;
  value?: number;
  unit?: string;
  highlight?: boolean;
  decimals?: number;
}) {
  if (value == null) return null;

  return (
    <div className="neutral-panel">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-ee-gold' : 'text-white'}`}>
        {value.toFixed(decimals)}{unit && <span className="text-lg">{unit}</span>}
      </p>
      {highlight && unit === 'mm' && (
        <p className="text-xs text-gray-500">
          ({(value / 25.4).toFixed(1)}&quot;)
        </p>
      )}
    </div>
  );
}

function ComplianceCheck({
  label,
  value,
  limit,
  unit,
  inverse = false,
}: {
  label: string;
  value: number;
  limit: number;
  unit: string;
  inverse?: boolean;
}) {
  const passes = inverse ? value >= limit : value <= limit;

  return (
    <div className={`flex flex-col md:flex-row md:justify-between p-3 rounded-md ${
      passes
        ? 'bg-ee-gold/[0.02] border border-ee-gold/30'
        : 'bg-white/[0.02] border border-white/10'
    }`}>
      <span className="text-gray-300">{label}</span>
      <span className={passes ? 'text-ee-gold' : 'text-gray-400'}>
        {value.toFixed(1)} {unit} {passes ? 'PASS' : 'FAIL'} (limit: {limit.toFixed(1)} {unit})
      </span>
    </div>
  );
}
