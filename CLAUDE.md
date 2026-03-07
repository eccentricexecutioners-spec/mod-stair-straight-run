# CLAUDE.md — mod-stair-straight-run
**Last updated:** 2026-03-06
**Status:** Building
**Version:** 0.1.0
**Deploy:** https://mod-stair-straight-run.vercel.app

## WHAT THIS IS
Stair measurement UI orchestrator — thin client that guides installers through video capture for straight-run stair measurements, uploads video to Supabase, delegates processing to mod-fiducious, and displays IRC 2021 code-compliant results (total rise/run, individual steps, stringer angle, compliance checks). No processing or database of its own — uses localStorage for session state. 5-step wizard UI with Recharts stringer profile visualization.

## STATUS
Building v0.1.0. Wizard UI, video upload, Fiducious polling, and stringer profile visualization all implemented. **CRITICAL: No authentication on any API route** — `auth.ts` exists with `validateModuleToken()` but is never imported or called anywhere. Same architecture as mod-head-sizer (thin orchestrator). No test suite.

## HOW IT FITS
- Dependencies: mod-fiducious (processing), mod-sisyphean (optional, planned)
- Used by: pocketstairs.ca (planned), eccentricexecutioners.ca (mothership)
- Embed method: iframe + JWT (planned — auth not yet enforced)

## KEY FILES
| File | Purpose |
|------|---------|
| `app/page.tsx` | Main 5-step wizard UI (job-site → instructions → upload → processing → results) |
| `app/api/upload/route.ts` | POST — uploads video to Supabase Storage (**no auth**) |
| `app/api/session/process/route.ts` | POST — triggers Fiducious processing with template='stairs' (**no auth**) |
| `app/api/session/status/route.ts` | GET — polls Fiducious for job status (**no auth**) |
| `lib/auth.ts` | JWT validation via `jsonwebtoken` (**defined but NEVER CALLED**) |
| `lib/session.ts` | Client-side localStorage session management (StairMeasurementSession) |
| `components/upload/VideoUpload.tsx` | File input, upload trigger, progress display |
| `components/results/ProcessingStatus.tsx` | Polls status every 3s, shows progress |
| `components/results/StairResults.tsx` | Displays measurements, IRC compliance checks, download options |
| `components/visualization/StringerProfile.tsx` | Recharts stringer cut profile (X vs Z coordinates) |
| `components/instructions/MarkerInstructions.tsx` | Setup instructions with marker PDF download |

## API ROUTES

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/upload` | **None** | Upload video to Supabase — accepts FormData (file + session_id) |
| POST | `/api/session/process` | **None** | Trigger Fiducious processing — hardcoded template='stairs' |
| GET | `/api/session/status` | **None** | Poll Fiducious job status — query param: job_id |

## ENV VARS
```
MODULE_ID=mod-stair-straight-run
NEXT_PUBLIC_MODULE_URL=http://localhost:3003
EE_MODULE_SECRET=                    # Shared JWT secret (auth.ts exists but unused)
FIDUCIOUS_URL=https://mod-fiducious.vercel.app
SISYPHEAN_URL=https://mod-sisyphean.vercel.app
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## OPEN ISSUES
1. **CRITICAL: No authentication** — `validateModuleToken()` in `lib/auth.ts` is never imported or called. All 3 API routes accept unauthenticated requests. Flagged as HIGH severity in ECOSYSTEM.md security notes.
2. **Missing marker PDFs** — `public/calibration-sheets/` exists but appears empty. MarkerInstructions.tsx references marker download links.
3. **No test suite** — No tests configured. Cannot verify IRC compliance calculations.
4. **Hardcoded template** — `/api/session/process` hardcodes `template: 'stairs'` — inflexible but appropriate for single-purpose module.
5. **No .env.example** — Required env vars not documented in a template file.

## KEY RULES
- **Timezone:** America/Vancouver
- **Auth:** JWT via `jsonwebtoken` using `EE_MODULE_SECRET` (defined but NOT enforced — must fix)
- **Dev port:** 3003
- **Architecture:** Thin orchestrator — no processing, no database, calls Fiducious, uses localStorage
- **IRC 2021:** Code compliance checks for max rise, min run, max variation, min width, min headroom
- **Design:** Dark theme, ee-gold (#D4A574), Montserrat font
