# Eccentric Executioners — Ecosystem Registry

> Central registry of all modules, add-ins, apps, and sites in the EE ecosystem.

**Last Updated:** March 13, 2026 | **Registry Version:** 3.4.0 | **Web Modules:** 13 | **Fusion Add-ins:** 3 | **iOS Apps:** 1 | **Sites:** 3

---

## WEB MODULES

### mod-fiducious — Fiducious Processing Engine
**Status:** Integrated | **Version:** 2.0.0 | **Deploy:** https://mod-fiducious.vercel.app
**Repo:** eccentricexecutioners-spec/mod-fiducious | **API Base:** /api | **Tables:** 2

Core photogrammetry processor — converts video/images with fiducial markers into scaled 3D models and headband measurements. BullMQ worker pipeline. Production v2.0.

**Provides:**
- Core 3D photogrammetry processing
- ArUco marker detection
- Headband measurement extraction
- Scale calculation
- BullMQ worker pipeline

**Dependencies:** None (foundational)
**Used by:** mod-sisyphean, mod-head-sizer, mod-stair-straight-run, mod-mosaic

**Endpoints (9):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/jobs/create | Start processing job |
| GET | /api/jobs/:id | Get job status |
| DELETE | /api/jobs/:id/delete | Delete processing job |
| GET | /api/jobs/:id/embed-data | Data for embed component |
| POST | /api/upload | Upload video/images |
| GET | /api/scan/:jobId | Get scan results |
| GET | /api/scan/:jobId/files | Get scan output files |
| POST | /api/process/:id/calibration | Run ArUco calibration |
| POST | /api/process | Start processing pipeline |

**Embeddable Components:** `ModuleEmbed.tsx`, `PhotogrammetryEmbed.tsx`

---

### mod-fiducious-slim — Fiducious Slim (Lightweight)
**Status:** Abandoned | **Deploy:** None
**Repo:** eccentricexecutioners-spec/mod-fiducious-slim

Experimental Python-based research branch for headband detection and mesh measurement. No Next.js app, no package.json, no git repo. Superseded by mod-fiducious v2.0. **Recommend archiving or deleting.**

---

### mod-sisyphean — Sisyphean Photogrammetry Pipeline
**Status:** Standalone Working | **Version:** 0.1.0 | **Deploy:** https://mod-sisyphean.vercel.app
**Repo:** eccentricexecutioners-spec/mod-sisyphean | **API Base:** /api/mesh | **Tables:** 1

Full photogrammetry pipeline — generates 3D meshes from video using Apple Object Capture on Mac Mini M4. Optional auto-scaling via Fiducious. Deployed to Vercel.

**Provides:**
- Full photogrammetry pipeline (video → textured mesh)
- Apple Object Capture integration
- Auto-scaling via Fiducious calibration
- BullMQ async job queue
- OBJ/MTL/GLB output
- React Three Fiber 3D viewer

**Dependencies:** mod-fiducious
**Used by:** eccentricexecutioners (mothership)

**Endpoints (3):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/mesh/create | Start mesh generation job |
| GET | /api/mesh/:id | Get job status |
| GET | /api/mesh/:id/embed-data | Data for embed component |

---

### mod-head-sizer — Head Sizing Module
**Status:** Building | **Version:** 0.1.0 | **Deploy:** https://mod-head-sizer.vercel.app
**Repo:** eccentricexecutioners-spec/mod-head-sizer | **API Base:** /api | **Tables:** 0 (storage only)

Thin UI orchestrator — guides users through video upload, calls Fiducious API for measurement extraction, downloads CSV/scripts. No database. Deployed to Vercel.

**Provides:**
- Head measurements from video
- ArUco calibration
- CSV export for hat fabrication

**Dependencies:** mod-fiducious, mod-sisyphean
**Used by:** eccentricexecutioners, digitalconformateur

**Endpoints (3):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/upload | Upload video for head measurement |
| POST | /api/session/process | Start processing session |
| GET | /api/session/status | Get session processing status |

---

### mod-stair-straight-run — Straight-Run Stair Measurement
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None (not yet deployed)
**Repo:** eccentricexecutioners-spec/mod-stair-straight-run | **API Base:** /api | **Tables:** 0 (storage only)

Thin UI orchestrator — guides installers through marker placement, calls Fiducious for measurements, presents stringer profiles, checks IRC 2021 code compliance. No database.

**Provides:**
- Stair measurements from video
- Rise/run calculation
- IRC 2021 code compliance checking
- Stringer profile CSV for CNC

**Dependencies:** mod-fiducious, mod-sisyphean
**Used by:** eccentricexecutioners (mothership), pocketstairs (planned)

**Endpoints (3):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/upload | Upload video for stair measurement |
| POST | /api/session/process | Start processing session |
| GET | /api/session/status | Get session processing status |

---

### mod-hbc-order-hat-blocks — Hat Blocks Canada Order System
**Status:** Integrated | **Version:** 1.3.0 | **Deploy:** https://mod-hbc-order-hat-blocks.vercel.app
**Repo:** eccentricexecutioners-spec/mod-hbc-order-hat-blocks | **API Base:** /api | **Tables:** 7

Hat fabrication order processing — converts customer head measurements into precision CNC parameters using Ramanujan ellipse solver. OvalShapeTool for interactive shape customization. Stepper inputs across all numeric fields. Icon-only compact header. America/Vancouver timezone. 7 database tables. Production v1.3.

**Provides:**
- Hat block calculator with Ramanujan solver
- Style 51/52 Bezier parameters
- 448-row CSV export for CNC fabrication
- Custom and Full Set modes
- OvalShapeTool — interactive ellipse visualization with Newton-Raphson solver
- Stepper inputs with RepeatButton press-and-hold on all numeric fields
- Full-Set Custom Delta with delta-only shape popup
- Proportional delta scaling (60cm base reference)
- Icon-only compact header
- America/Vancouver timezone standardization

**Dependencies:** None
**Used by:** eccentricexecutioners, digitalconformateur

**Endpoints (1):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/calculate | Run hat block calculations |

**Embeddable Component:** `ModuleEmbed.tsx`

---

### mod-hbc-order-flanges — Hat Blocks Canada Flange Orders
**Status:** Integrated | **Version:** 1.1.0 | **Deploy:** https://mod-hbc-order-flanges.vercel.app
**Repo:** eccentricexecutioners-spec/mod-hbc-order-flanges | **API Base:** /api | **Tables:** 3

Hat brim flange order processing — calculates flange dimensions and generates CNC-ready output. OvalShapeTool for interactive shape customization. Stepper inputs across all numeric fields. Profile Visualizer. Single Accept Order workflow. 3 database tables with RLS. Production v1.1.

**Provides:**
- Flange order processing
- Flange dimension calculations (circumference, diameter, brim, profile)
- CSV export for CNC fabrication
- PDF export
- OvalShapeTool — interactive ellipse visualization with Newton-Raphson solver
- Stepper inputs with RepeatButton press-and-hold on all numeric fields
- Full-Set Custom Delta with delta-only shape popup
- Proportional delta scaling (60cm base reference)
- Profile Visualizer with brim arc rendering
- Single Accept Order workflow
- America/Vancouver timezone standardization

**Dependencies:** None
**Used by:** eccentricexecutioners

**Endpoints (5):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/calculate | Run flange calculations |
| POST | /api/orders/create | Create new flange order |
| GET | /api/orders/:id | Get order details |
| GET | /api/orders/:id/export/csv | Download flange CSV |
| GET | /api/orders/:id/export/pdf | Download flange PDF |

---

### mod-hbc-order-band-blocks — Hat Blocks Canada Band Block Orders
**Status:** Integrated | **Version:** 0.2.0 | **Deploy:** https://mod-hbc-order-band-blocks.vercel.app
**Repo:** eccentricexecutioners-spec/mod-hbc-order-band-blocks | **API Base:** /api | **Tables:** 3

Hat band block order processing — calculates elliptical major/minor diameters for hat sweatband blocks using AGM elliptic integral solver. OvalShapeTool for interactive shape customization. Stepper inputs across all numeric fields. Supports Metric (55-65cm), Stetson (21.5"-25.25"), and Custom sizing modes. Single Accept Order workflow. Generates CNC-ready CSV and fabrication PDF. Embeddable in mothership with JWT authentication and postMessage integration. Production v0.2.

**Provides:**
- Band block order processing
- Band block dimension calculations (elliptic integral solver)
- CSV export for CNC fabrication (63 rows, 15 decimal precision)
- PDF export (landscape A4, gold theme)
- Order persistence in Supabase
- Mothership iframe embed integration
- Async job processing with callbacks
- OvalShapeTool — interactive ellipse visualization with Newton-Raphson solver
- Stepper inputs with RepeatButton press-and-hold on all numeric fields
- Full-Set Custom Delta with delta-only shape popup
- Proportional delta scaling (60cm base reference)
- Single Accept Order workflow
- America/Vancouver timezone standardization

**Dependencies:** None
**Used by:** eccentricexecutioners

**Endpoints (2):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/validate-token | Validate JWT token from mothership |
| POST | /api/calculate | Process band block calculations with callback |

**Embeddable Component:** `BandBlockEmbed.tsx`

---

### mod-fusion-model-control — Fusion 360 Model Control
**Status:** Standalone Working | **Version:** 0.1.0 | **Deploy:** https://mod-fusion-model-control.vercel.app
**Repo:** eccentricexecutioners-spec/mod-fusion-model-control | **API Base:** /api | **Tables:** 2

Fusion 360 integration — link models via embed code or public link, view in mothership project cards. Full mothership round-trip with JWT auth and webhook callbacks. OAuth PKCE, file upload, and Autodesk Viewer features deployed but awaiting APS activation. 2 database tables, 19 API routes. Deployed to Vercel.

**Provides:**
- Fusion 360 model linking via embed code or public link
- Mothership integration with JWT auth and webhook callbacks
- OAuth PKCE flow with Autodesk (deployed, awaiting APS activation)
- 3D model viewing via Autodesk Viewer (awaiting APS)
- Direct .f3d file upload to OSS (awaiting APS)
- Parameter extraction from .f3d files (awaiting APS)
- CSV parameter import/export
- Model translation to SVF2 (awaiting APS)
- Fusion project/file browsing (awaiting APS)
- .f3d preview PNG extraction

**Dependencies:** Autodesk Platform Services (APS)
**Used by:** eccentricexecutioners (mothership)

**Endpoints (19):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/models/create | Create model link (mothership entry point) |
| POST | /api/models/link | Link model with embed code (browser UI) |
| GET | /api/models | List all linked models |
| GET | /api/models/:id | Get model details |
| DELETE | /api/models/:id | Remove linked model |
| GET | /api/models/:id/status | Poll translation status |
| GET | /api/models/:id/parameters/extracted | Extract parameters from model |
| POST | /api/models/:id/parameters/import | Import CSV parameters |
| GET | /api/models/:id/parameters/imports | List import history |
| GET | /api/models/:id/parameters/imports/:importId | Get specific import details |
| GET | /api/models/:id/export/csv | Export model parameters as CSV |
| POST | /api/upload/bypass | Upload .f3d and translate to SVF2 (awaiting APS) |
| GET | /api/viewer/token | Get Autodesk Viewer token (awaiting APS) |
| GET | /api/auth/login | Start OAuth PKCE flow with Autodesk |
| GET | /api/auth/callback | OAuth callback, set session cookie |
| GET | /api/auth/status | Check Autodesk connection status |
| POST | /api/auth/logout | Clear session and delete tokens |
| GET | /api/fusion/projects | List Fusion projects (awaiting APS) |
| GET | /api/fusion/projects/:id/files | List .f3d files in project (awaiting APS) |

**Embeddable Component:** `FusionEmbed.tsx`

---

### mod-mosaic — Mosaic Mesh Segmentation
**Status:** Standalone Working | **Version:** 0.1.0 | **Deploy:** https://mod-mosaic.vercel.app
**Repo:** eccentricexecutioners-spec/mod-mosaic | **API Base:** /api | **Tables:** 3

Segments 3D sculpture meshes into quasi-developable patches for metal press fabrication. Computes discrete Gaussian curvature, classifies pressability by material, generates flat patterns and press die geometries. Simple/Advanced mode UI with die downloads. 3 database tables. Supports STEP files. React Three Fiber viewer.

**Provides:**
- Mesh segmentation via curvature-aware region growing
- Per-patch Gaussian curvature analysis
- Flat pattern export (DXF + SVG)
- Press die generation (STL male/female)
- Material-aware pressability classification
- STEP file support
- React Three Fiber 3D viewer
- Simple/Advanced mode tabs
- Die file downloads

**Dependencies:** mod-fiducious
**Used by:** eccentricexecutioners (mothership)

**Endpoints (5):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/jobs/create | Create a segmentation job |
| GET | /api/jobs/:id | Get job status and details |
| GET | /api/jobs/:id/embed-data | Get embeddable visualization data |
| GET | /api/jobs/:id/patches | Get patches with download URLs |
| GET | /api/jobs/:id/logs | Get processing step logs |

**Embeddable Component:** `MosaicEmbed.tsx`

---

### mod-chickadee-parametric — Chickadee Parametric CAD Generator
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None (not yet deployed)
**Repo:** eccentricexecutioners-spec/mod-chickadee-parametric | **API Base:** /api | **Tables:** 0

Interactive parametric CAD generation with real-time 3D preview. Next.js frontend with FastAPI/CadQuery backend. Browser-based CAD tools for manufacturing including IRC 2021 compliant stair stringers. Backend deployed on Railway.

**Provides:**
- Parametric stair stringer generation
- IRC 2021 compliant calculations
- Real-time STL preview via React Three Fiber
- STEP file export for CNC fabrication
- Configurable material thickness and tread depth
- Multi-unit support (inches/cm)

**Dependencies:** None
**Used by:** eccentricexecutioners (mothership)

**Endpoints (3):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/preview/stair | Generate STL preview for real-time 3D (< 1 second) |
| POST | /api/generate/stair | Generate STEP file for CNC fabrication (5-10 seconds) |
| GET | /api/download/:jobId/:filename | Download generated STEP/STL files |

**Embeddable Components:** `StairViewer3D.tsx`, `ParameterPanel.tsx`

---

### mod-universal-3d-viewer — Universal 3D Viewer
**Status:** Standalone Working | **Version:** 0.1.0 | **Deploy:** https://mod-universal-3d-viewer.vercel.app
**Repo:** eccentricexecutioners-spec/mod-universal-3d-viewer | **API Base:** /api | **Tables:** 1

Universal CAD file viewer for Next.js applications. Supports STEP, STL, OBJ, IGES formats with browser-based rendering using Three.js and OpenCascade.js. Client-side viewer with backend job API for file persistence. 1 Supabase table. Deployed to Vercel.

**Provides:**
- Multi-format CAD file import (STEP, STL, OBJ, IGES)
- Browser-based 3D rendering via Three.js
- Drag-and-drop file upload
- OpenCascade.js geometry processing
- Embeddable React component
- Job API for file persistence

**Dependencies:** None
**Used by:** mod-chickadee-parametric, mod-cad-watcher

**Endpoints (4):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/jobs/create | Create viewer job |
| GET | /api/jobs/:id | Get job status |
| GET | /api/jobs/:id/embed-data | Get embed data for viewer |
| POST | /api/jobs/:id/confirm | Confirm job completion |

**Embeddable Component:** `UniversalViewer.tsx`

---

### mod-cad-watcher — CAD Watcher Desktop Agent
**Status:** Integrated | **Version:** 0.1.0 | **Deploy:** https://mod-cad-watcher.vercel.app
**Repo:** eccentricexecutioners-spec/mod-cad-watcher | **API Base:** /api | **Tables:** 3

Cross-platform desktop agent that watches local CAD save folders and
automatically syncs files to the Mothership. Fabricators save CAD files
as normal — the agent handles upload, webhook callback, and live viewer
updates silently in the background. PyInstaller packaged for macOS and Windows.

**Provides:**
- Desktop agent (Python, PyQt6 system tray) for macOS/Windows/Linux
- Pairing token flow — one-time setup per fabricator machine
- watchdog file monitoring with 2s debounce
- Signed URL upload pipeline to Supabase Storage
- Heartbeat-based project assignment delivery
- Webhook callback to Mothership on file upload
- CAD Watcher block in Mothership page designer (auto-updating 3D viewer)
- Supports 12 CAD formats including IFC (Revit export)

**Dependencies:** mod-universal-3d-viewer (for 3D preview iframe)
**Used by:** eccentricexecutioners (mothership)

**Endpoints (10):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/pairing/token | Generate pairing token (admin) |
| POST | /api/agent/register | Register desktop agent, return agent JWT |
| POST | /api/agent/heartbeat | Update heartbeat, return pending assignments |
| GET | /api/agent/status | Get agent status |
| POST | /api/assignments/create | Notify agent of new project assignment |
| POST | /api/jobs/create | Create upload job, return signed URL |
| POST | /api/jobs/:id/confirm | Mark job complete, fire Mothership webhook |
| GET | /api/jobs/:id | Get job status |
| GET | /api/jobs/:id/embed-data | Get embed data with viewer_compatible flag |
| DELETE | /api/jobs/:id | Delete job (admin) |

**Embeddable Component:** `CADWatcherBlock.tsx` (in Mothership page-viewer)

---

## FUSION 360 ADD-INS

### geopanel — GeoPanel Dome Generator
**Status:** Building | **Version:** 0.2.0
**Repo:** eccentricexecutioners-spec/geopanel | **Platform:** macOS | **Language:** Python 3.12+

Fusion 360 add-in that generates Goldberg polyhedron dome geometry with exact planar faces. Panel classification, instance propagation, display mode selector. Distributable ZIP package. Implements GP(n,0) Class I geodesic generation with icosahedron base.

**Provides:**
- Goldberg polyhedron dome generation
- Exact planar face calculation
- Real-time geometry preview in Fusion 360
- User parameter integration
- Spherical projection algorithms
- Instance propagation (master components with linked occurrences)
- Panel classification and display mode selector
- Distributable ZIP package

---

### polyhedron-generator — Polyhedron Generator (Win→Mac Framework)
**Status:** Building | **Version:** 0.1.0
**Repo:** eccentricexecutioners-spec/polyhedron-generator | **Platform:** macOS | **Language:** Python 3.12+

Framework and workflow for converting Windows-only Fusion 360 add-ins to run natively on macOS. Provides systematic conversion structure with templates and checklist.

**Provides:**
- Windows add-in porting framework
- Cross-platform compatibility utilities
- Add-in template generation
- Conversion status tracking
- Deployment scripting

---

### spline-param — SplineParam
**Status:** Standalone Working | **Version:** 3.1.0
**Repo:** eccentricexecutioners-spec/SplineParam | **Platform:** macOS/Windows | **Language:** Python 3.12+

Fusion 360 add-in that captures spline and curve lengths as live User Parameters. Select any spline, arc, or edge, name it, and create a tracked parameter. UUID-based tracking, manual refresh. Production v3.1.

**Provides:**
- Spline/curve length parameterization
- Live user parameter creation in Fusion 360
- UUID-based edge tracking
- Parameter renaming with link preservation
- BRep and sketch geometry support
- Distribution packaging (ZIP)

**Commands:** Capture Spline Length, Refresh Spline Params

---

## iOS APPS

### mod-fiducious-pro — Fiducious Pro (iOS)
**Status:** Building | **Version:** 0.4.0
**Repo:** eccentricexecutioners-spec/mod-fiducious-pro | **Platform:** iOS 17+ | **Language:** Swift 5.9+

Native iOS client for photogrammetry processing. Professional measurement tool using ARKit for video capture, uploads to mod-fiducious backend for processing. SwiftUI interface.

**Provides:**
- ARKit-powered video capture
- Real-time camera tracking and plane detection
- Video upload to mod-fiducious backend
- Job status polling
- Result file download (PDF, CSV, mesh)
- 3D mesh visualization via SceneKit

**Dependencies:** mod-fiducious (backend)

---

## PARENT SITES

### Mothership (eccentricexecutioners.ca)
**Status:** Live | **Pages:** 50 | **API Routes:** 68 | **Tables:** 35

Internal ops hub — projects, clients, fabricators, hours, full module toolkit, finance (invoices, receipts, mileage, bank), markers, page designer, accountant portal. 461 tests passing. Email infrastructure with lazy Resend init, shared EE template (ported from DC), 10 named functions + 2 legacy aliases. America/Vancouver timezone. Mobile-optimized.

**Modules (10):** mod-fiducious, mod-sisyphean, mod-head-sizer, mod-stair-straight-run, mod-fusion-model-control, mod-hbc-order-hat-blocks, mod-hbc-order-flanges, mod-hbc-order-band-blocks, mod-mosaic, mod-cad-watcher

---

### Digital Conformateur (digitalconformateur.ca)
**Status:** Live | **Pages:** 9 | **API Routes:** 39 | **Tables:** 4

B2B/B2C digital hat measurement service for hatters and their clients. 3D mesh viewer integration (mod-sisyphean). 18 email templates. Stripe payments.

**Modules (3):** mod-head-sizer, mod-hbc-order-hat-blocks, mod-sisyphean

---

### Pocket Stairs (pocketstairs.ca)
**Status:** Planning | **Pages:** 0 | **API Routes:** 0

Professional stair measurement tools for installers and contractors. Site does not exist yet.

**Modules (1, planned):** mod-stair-straight-run

---

## DEPENDENCY GRAPH

```
Sites:
├─ digitalconformateur.ca
│  ├─ mod-head-sizer
│  │  ├─ mod-sisyphean
│  │  │  └─ mod-fiducious
│  │  └─ mod-fiducious
│  ├─ mod-hbc-order-hat-blocks
│  └─ mod-sisyphean
│     └─ mod-fiducious
│
├─ pocketstairs.ca (planning)
│  └─ mod-stair-straight-run
│     ├─ mod-sisyphean
│     │  └─ mod-fiducious
│     └─ mod-fiducious
│
└─ eccentricexecutioners.ca (Mothership)
   ├─ mod-fiducious .............. integrated v2.0.0
   ├─ mod-sisyphean .............. standalone-working v0.1.0
   │  └─ mod-fiducious
   ├─ mod-head-sizer ............. building v0.1.0
   │  ├─ mod-sisyphean
   │  └─ mod-fiducious
   ├─ mod-stair-straight-run ..... building v0.1.0
   │  ├─ mod-sisyphean
   │  └─ mod-fiducious
   ├─ mod-fusion-model-control ... standalone-working v0.1.0
   │  └─ Autodesk Platform Services (APS)
   ├─ mod-hbc-order-hat-blocks ... integrated v1.3.0
   ├─ mod-hbc-order-flanges ...... integrated v1.1.0
   ├─ mod-hbc-order-band-blocks .. integrated v0.2.0
   ├─ mod-mosaic ................. standalone-working v0.1.0
   │  └─ mod-fiducious
   └─ mod-cad-watcher ............. integrated v0.1.0
      └─ mod-universal-3d-viewer (viewer iframe)

Web Modules (standalone):
├─ mod-chickadee-parametric ...... building v0.1.0
│  └─ mod-universal-3d-viewer (viewer dependency)
├─ mod-cad-watcher ............... integrated v0.1.0
│  └─ mod-universal-3d-viewer (viewer iframe)
├─ mod-universal-3d-viewer ....... standalone-working v0.1.0
└─ mod-fiducious-slim ............ abandoned

Fusion 360 Add-ins:
├─ geopanel ...................... building v0.2.0
├─ polyhedron-generator .......... building v0.1.0
└─ spline-param .................. standalone-working v3.1.0

iOS Apps:
└─ mod-fiducious-pro ............. building v0.4.0
   └─ mod-fiducious (backend)
```

---

## EMAIL ARCHITECTURE

All EE sites share one Resend account. Each site sends from its own verified domain
with its own branding. The mothership will eventually centralise all delivery.

### Phase 1 — Current
Each site owns its own email.ts and Resend key. Same account, different domains.
- digitalconformateur.ca → sizing@digitalconformateur.ca (verified, live)
- eccentricexecutioners.ca → hello@eccentricexecutioners.ca (pending domain verification)

### Phase 2 — Future
DC and future sites call POST /api/email/send on the mothership.
Mothership owns all delivery, templates, and Resend analytics.
Trigger: mothership /api/email/send route built and tested.

### Pattern Standard (applies to all sites and modules)
- Lazy Resend init — never initialise at module scope
- All functions call sendEmail() internally — never call resend.emails.send() directly
- Always include plain-text fallback alongside HTML
- Email failure must never crash the application — always catch and log
- buildEmailHtml() / buildEmailText() from DC are the canonical EE template

---

## STATUS KEY

| Status | Meaning |
|--------|---------|
| planning | Spec exists, no code yet |
| building | Active development, not yet deployable |
| standalone-working | Deployed and functional on its own |
| integrated | Working within at least one parent site |
| live | In production use |
| abandoned | No longer maintained, superseded |

---

## SECURITY NOTES

### Open

| Module | Severity | Issue | Discovered |
|--------|----------|-------|------------|
| mod-hbc-order-band-blocks | **LOW** | RLS overpermissive — anonymous INSERT/SELECT/DELETE with no row filtering. | 2026-02-23 |
| mod-chickadee-parametric | **LOW** | No authentication on any endpoint. Building status — fix before launch. | 2026-03-06 |
| mod-fiducious-slim | **INFO** | Abandoned — no git, no package.json. Consider archiving. | 2026-02-23 |
| mod-fusion-model-control | **INFO** | APS activation pending — OAuth PKCE, file upload, and Viewer deployed but blocked by Autodesk (AUTH-001). | 2026-03-03 |

### Resolved

| Module | Severity | Issue | Resolved | Resolution |
|--------|----------|-------|----------|------------|
| mod-stair-straight-run | ~~HIGH~~ | No authentication on API routes | 2026-03-06 | Auth middleware added to all 3 API routes |
| mod-head-sizer | ~~MEDIUM~~ | Supabase module-scope initialization bug | 2026-03-06 | Lazy-init inside handler function |

---

## CHANGELOG (v3.4.0 — March 13, 2026)

**Full ecosystem audit completed.** Ground truth corrections from read-only audit of all 20+ repos.

**Registry corrections:**
- mod-fiducious: tables 1 → 2 (fiducious_jobs + marker_configs)
- mod-fiducious-pro: version 0.1.0 → 0.4.0 (very active ARKit development)
- mod-head-sizer: deploy_url added (https://mod-head-sizer.vercel.app)
- mod-universal-3d-viewer: now has 4 API routes, 1 Supabase table (universal_3d_viewer_jobs), used_by includes mod-cad-watcher
- mod-cad-watcher: endpoints 9 → 10 (added GET /api/agent/status)
- Mothership: pages 23 → 50, API routes 54 → 68, tables 27 → 35 (finance, markers, pages, accountant)
- Digital Conformateur: API routes 35 → 39, added mod-sisyphean to modules_used (3D mesh viewer wired in)

**Security notes:**
- Resolved: mod-stair-straight-run HIGH (auth added 2026-03-06)
- Resolved: mod-head-sizer MEDIUM (lazy-init fix 2026-03-06)
- Added: mod-hbc-order-band-blocks LOW (RLS overpermissive)
- Added: mod-chickadee-parametric LOW (no auth on any endpoint)

---

## CHANGELOG (v3.3.0 — March 12, 2026)

**Mothership:**
- Email infrastructure built: lazy Resend init, shared EE template (ported from DC), 10 named functions + 2 legacy aliases covering admin/fabricator/client roles
- All email env vars set in .env.local and Vercel production
- Pending: eccentricexecutioners.ca domain verification in Resend dashboard

**Digital Conformateur:**
- RESEND_API_KEY restored in Vercel production — emails live
- No code changes

---

## CHANGELOG (v3.2.0 — March 12, 2026)

**New module:**
- mod-cad-watcher v0.1.0: Desktop agent + web API for automated CAD file sync.
  PyQt6 system tray, watchdog file monitoring, pairing token flow, Mothership
  page designer block, IFC/Revit support.

**Mothership:**
- Added CAD Watcher pairing UI to fabricator profile pages
- Added FabricatorAssignment component with CAD Watcher status feedback
- Added cad-watcher block type to page designer
- Added CADWatcherBlock to page viewer (30s polling, 3D viewer iframe)
- API routes: 51 → 54
- Supabase tables: 27 → 27 (no new tables, added partial unique index on module_jobs)

---

## CHANGELOG (v3.1.0 — March 6, 2026)

**Ecosystem-wide:**
- Mobile zoom locks applied across all modules
- America/Vancouver timezone standardization (all HBC modules + mothership)

**Module updates:**
- mod-hbc-order-hat-blocks: v1.1.0 → v1.3.0 (icon-only header, timezone, CSV cohesion, package.json name fix)
- mod-hbc-order-band-blocks: v1.1.0 → v0.2.0 (single Accept Order, mobile CSS, timezone)
- mod-hbc-order-flanges: v1.1.0 (single Accept Order, mobile CSS, timezone)
- mod-fusion-model-control: building → standalone-working (deployed to Vercel, mothership integration complete, 19 API routes)
- mod-universal-3d-viewer: building → standalone-working (deployed to Vercel)
- mod-mosaic: UI redesign with Simple/Advanced mode tabs, die downloads
- geopanel: v0.1.0 → v0.2.0 (instance propagation, panel classification, distributable ZIP)

**Mothership:**
- API routes: 35 → 51
- Supabase tables: 6 → 27
- Mobile header redesign (solid black, hamburger menu)
- Overflow fix for HBC iframe embeds
- Hat size display shows input size (metric/Stetson) alongside hat size

**Security:**
- Resolved: mod-hbc-order-hat-blocks package.json name (was mod-fusion360, now correct)
- Added: mod-fusion-model-control APS activation pending note

---

*This registry is the source of truth for the EE ecosystem.*
