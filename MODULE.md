# Stair-Straight-Run - Professional Stair Measurement UI

## Identity
- **Module ID:** mod-stair-straight-run
- **Repo:** eccentricexecutioners-spec/mod-stair-straight-run
- **Deploy URL:** https://mod-stair-straight-run.vercel.app
- **Status:** building

## Purpose
Professional installer-friendly UI orchestrator for straight-run stair measurements.
Guides installers through marker placement, calls Fiducious for processing, presents
results as stringer profiles with code compliance checks.

## Architecture
This is a THIN ORCHESTRATOR module:
- No processing (calls Fiducious API with 'stairs' template)
- No database (uses localStorage for session state)
- Pure UI + API coordination

## Dependencies
- mod-fiducious (measurement extraction)
- mod-sisyphean (optional 3D site documentation, future)
- mod-fusion360 (optional CAD model selection, future)

## Used By
- pocketstairs.ca (primary)
- eccentricexecutioners.ca (internal)

## User Flow
1. Enter job site name
2. Download landing markers
3. Place markers on top/bottom nosings
4. Record video walking up/down stairs
5. Upload video
6. Wait for processing (45-90s)
7. View results: rise/run/angle/profile
8. Download CSV or G-code

## Outputs
- Total rise/run
- Individual step measurements
- Stringer angle
- Stringer cut profile (CSV)
- Code compliance check (IRC 2021)
- Future: CNC G-code

## Compliance Checks
- Max rise per step: <=7.75" (196.85mm)
- Min run per tread: >=10" (254mm)
- Rise variation: <=3/8" (9.525mm)

## Processing Time
45-90 seconds (handled by Fiducious)
