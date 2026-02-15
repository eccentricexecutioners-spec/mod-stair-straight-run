# Stair-Straight-Run

Professional UI for straight-run stair measurements.

## What It Does
- Guides installers through marker placement
- Calls Fiducious for stair measurement extraction
- Presents results as stringer profiles
- Checks code compliance (IRC 2021)
- Downloads CSV for CNC fabrication

## Architecture
Thin UI orchestrator:
- No backend processing
- No database
- Calls Fiducious API
- localStorage for session state

## For Installers
1. Print landing markers
2. Place on top/bottom nosings
3. Record walk-through video
4. Upload and wait
5. Get stringer profile + cut list!

## For Developers
```bash
npm install
npm run dev
```

Requires:
- Fiducious running (for measurements)
- Supabase (for video uploads)

## Deployment
Deploys to Vercel. No special requirements.
