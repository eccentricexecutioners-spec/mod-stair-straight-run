# Eccentric Executioners — Ecosystem Registry

> Central registry of all modules, add-ins, apps, and sites in the EE ecosystem.

**Last Updated:** February 27, 2026 | **Registry Version:** 3.0 | **Web Modules:** 12 | **Fusion Add-ins:** 3 | **iOS Apps:** 1 | **Sites:** 3

---

## WEB MODULES

### mod-fiducious — Fiducious Processing Engine
**Status:** Integrated | **Version:** 2.0.0 | **Deploy:** https://mod-fiducious.vercel.app
**Repo:** eccentricexecutioners-spec/mod-fiducious | **API Base:** /api | **Tables:** 1

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
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None (not yet deployed)
**Repo:** eccentricexecutioners-spec/mod-head-sizer | **API Base:** /api | **Tables:** 0 (storage only)

Thin UI orchestrator — guides users through video upload, calls Fiducious API for measurement extraction, downloads CSV/scripts. No database.

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
**Status:** Integrated | **Version:** 1.0.0 | **Deploy:** https://mod-hbc-order-hat-blocks.vercel.app
**Repo:** eccentricexecutioners-spec/mod-hbc-order-hat-blocks | **API Base:** /api | **Tables:** 7

Hat fabrication order processing — converts customer head measurements into precision CNC parameters using Ramanujan ellipse solver. 7 database tables. Production v1.0.

**Provides:**
- Hat block calculator with Ramanujan solver
- Style 51/52 Bezier parameters
- 448-row CSV export for CNC fabrication
- Custom and Full Set modes

**Dependencies:** None
**Used by:** eccentricexecutioners, digitalconformateur

**Endpoints (1):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/calculate | Run hat block calculations |

**Embeddable Component:** `ModuleEmbed.tsx`

---

### mod-hbc-order-flanges — Hat Blocks Canada Flange Orders
**Status:** Integrated | **Version:** 1.0.0 | **Deploy:** https://mod-hbc-order-flanges.vercel.app
**Repo:** eccentricexecutioners-spec/mod-hbc-order-flanges | **API Base:** /api | **Tables:** 3

Hat brim flange order processing — calculates flange dimensions (circumference, diameter, brim, profile) and generates CNC-ready output. 3 database tables with RLS. Production v1.0.

**Provides:**
- Flange order processing
- Flange dimension calculations
- CSV export for CNC fabrication
- PDF export

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
**Status:** Integrated | **Version:** 1.0.0 | **Deploy:** https://mod-hbc-order-band-blocks.vercel.app
**Repo:** eccentricexecutioners-spec/mod-hbc-order-band-blocks | **API Base:** /api | **Tables:** 3

Hat band block order processing — calculates elliptical major/minor diameters for hat sweatband blocks using AGM elliptic integral solver. Supports Metric (55-65cm), Stetson (21.5"-25.25"), and Custom sizing modes. Generates CNC-ready CSV and fabrication PDF. Embeddable in mothership with JWT authentication and postMessage integration. Production v1.0.

**Provides:**
- Band block order processing
- Band block dimension calculations (elliptic integral solver)
- CSV export for CNC fabrication (63 rows, 15 decimal precision)
- PDF export (landscape A4, gold theme)
- Order persistence in Supabase
- Mothership iframe embed integration
- Async job processing with callbacks

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
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None (not yet deployed)
**Repo:** eccentricexecutioners-spec/mod-fusion-model-control | **API Base:** /api | **Tables:** 8

Fusion 360 integration — view .f3d models in 3D, extract parameters, import/export CSV, track import history. 8 database tables, 10 API routes. Requires APS credentials. Not yet deployed.

**Provides:**
- 3D model viewing via Autodesk Viewer
- Parameter extraction from .f3d files
- CSV parameter import/export
- Model translation to SVF2
- Import history tracking

**Dependencies:** Autodesk Platform Services (APS)
**Used by:** eccentricexecutioners (mothership)

**Endpoints (10):**

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/jobs/create | Upload .f3d and start translation |
| GET | /api/jobs/:id | Poll job status |
| POST | /api/jobs/:id/translate | Trigger model translation |
| GET | /api/jobs/:id/embed-data | Get viewer data |
| GET | /api/models/:id/parameters/extracted | Extract parameters from model |
| POST | /api/models/:id/parameters/import | Import CSV parameters |
| GET | /api/models/:id/parameters/imports | List import history |
| GET | /api/models/:id/parameters/imports/:importId | Get specific import details |
| GET | /api/models/:id/export/csv | Export model parameters as CSV |
| GET | /api/models | List all models |

**Embeddable Component:** `ModuleEmbed.tsx`

---

### mod-mosaic — Mosaic Mesh Segmentation
**Status:** Standalone Working | **Version:** 0.1.0 | **Deploy:** https://mod-mosaic.vercel.app
**Repo:** eccentricexecutioners-spec/mod-mosaic | **API Base:** /api | **Tables:** 3

Segments 3D sculpture meshes into quasi-developable patches for metal press fabrication. Computes discrete Gaussian curvature, classifies pressability by material, generates flat patterns and press die geometries. Supports Simple Mode dome flattening and STEP files. React Three Fiber viewer.

**Provides:**
- Mesh segmentation via curvature-aware region growing
- Per-patch Gaussian curvature analysis
- Flat pattern export (DXF + SVG)
- Press die generation (STL male/female)
- Material-aware pressability classification
- STEP file support
- React Three Fiber 3D viewer

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
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None (not yet deployed)
**Repo:** eccentricexecutioners-spec/mod-universal-3d-viewer | **Tables:** 0

Universal CAD file viewer for Next.js applications. Supports STEP, STL, OBJ, IGES formats with browser-based rendering using Three.js and OpenCascade.js. Client-side only, no server processing required.

**Provides:**
- Multi-format CAD file import (STEP, STL, OBJ, IGES)
- Browser-based 3D rendering via Three.js
- Drag-and-drop file upload
- OpenCascade.js geometry processing
- Embeddable React component

**Dependencies:** None
**Used by:** mod-chickadee-parametric

**Embeddable Component:** `UniversalViewer.tsx`

---

## FUSION 360 ADD-INS

### geopanel — GeoPanel Dome Generator
**Status:** Building | **Version:** 0.1.0
**Repo:** eccentricexecutioners-spec/geopanel | **Platform:** macOS | **Language:** Python 3.12+

Fusion 360 add-in that generates Goldberg polyhedron dome geometry with exact planar faces. Implements GP(n,0) Class I geodesic generation with icosahedron base.

**Provides:**
- Goldberg polyhedron dome generation
- Exact planar face calculation
- Real-time geometry preview in Fusion 360
- User parameter integration
- Spherical projection algorithms

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
**Status:** Building | **Version:** 0.1.0
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
**Status:** Live | **Pages:** 23 | **API Routes:** 35 | **Tables:** 6

Internal ops hub — projects, clients, fabricators, hours, full module toolkit.

**Modules (9):** mod-fiducious, mod-sisyphean, mod-head-sizer, mod-stair-straight-run, mod-fusion-model-control, mod-hbc-order-hat-blocks, mod-hbc-order-flanges, mod-hbc-order-band-blocks, mod-mosaic

---

### Digital Conformateur (digitalconformateur.ca)
**Status:** Live | **Pages:** 9 | **API Routes:** 35 | **Tables:** 4

B2B/B2C digital hat measurement service for hatters and their clients.

**Modules (2):** mod-head-sizer, mod-hbc-order-hat-blocks

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
│  └─ mod-hbc-order-hat-blocks
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
   ├─ mod-fusion-model-control ... building v0.1.0
   │  └─ Autodesk Platform Services (APS)
   ├─ mod-hbc-order-hat-blocks ... integrated v1.0.0
   ├─ mod-hbc-order-flanges ...... integrated v1.0.0
   ├─ mod-hbc-order-band-blocks .. integrated v1.0.0
   └─ mod-mosaic ................. standalone-working v0.1.0
      └─ mod-fiducious

Web Modules (standalone):
├─ mod-chickadee-parametric ...... building v0.1.0
│  └─ mod-universal-3d-viewer (viewer dependency)
├─ mod-universal-3d-viewer ....... building v0.1.0
└─ mod-fiducious-slim ............ abandoned

Fusion 360 Add-ins:
├─ geopanel ...................... building v0.1.0
├─ polyhedron-generator .......... building v0.1.0
└─ spline-param .................. standalone-working v3.1.0

iOS Apps:
└─ mod-fiducious-pro ............. building v0.1.0
   └─ mod-fiducious (backend)
```

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

| Module | Severity | Issue | Discovered |
|--------|----------|-------|------------|
| mod-stair-straight-run | **HIGH** | No authentication on API routes | 2026-02-22 |
| mod-head-sizer | **MEDIUM** | Supabase module-scope initialization bug | 2026-02-22 |
| mod-hbc-order-hat-blocks | **LOW** | package.json incorrectly names itself `mod-fusion360` | 2026-02-22 |
| mod-fiducious-slim | **INFO** | Abandoned — no git, no package.json. Consider archiving. | 2026-02-23 |

---

*This registry is the source of truth for the EE ecosystem.*
