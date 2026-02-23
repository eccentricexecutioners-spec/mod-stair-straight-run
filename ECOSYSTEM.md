# Eccentric Executioners — Ecosystem Registry

> Central registry of all modules and sites in the EE ecosystem.

**Last Updated:** February 23, 2026 | **Registry Version:** 2.1 | **Modules:** 10 | **Sites:** 3

---

## MODULES

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
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None (not yet deployed)
**Repo:** eccentricexecutioners-spec/mod-sisyphean | **API Base:** /api/mesh | **Tables:** 1

Full photogrammetry pipeline — generates 3D meshes from video using Apple Object Capture on Mac Mini M4. Optional auto-scaling via Fiducious calibration. BullMQ async queue. 5-15 min processing. Outputs OBJ, MTL, GLB.

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
**Status:** Building | **Version:** 0.1.0 | **Deploy:** None
**Repo:** eccentricexecutioners-spec/mod-hbc-order-band-blocks | **API Base:** /api | **Tables:** 0

Stub implementation — has UI scaffolding but no API routes or database schema. Needs full implementation.

**Provides:**
- Band block order processing (planned)
- Band block dimension calculations (planned)

**Dependencies:** None
**Used by:** —

**Endpoints:** None yet

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

## PARENT SITES

### Mothership (eccentricexecutioners.ca)
**Status:** Live | **Pages:** 23 | **API Routes:** 35 | **Tables:** 6

Internal ops hub — projects, clients, fabricators, hours, full module toolkit.

**Modules (8):** mod-fiducious, mod-sisyphean, mod-head-sizer, mod-stair-straight-run, mod-fusion-model-control, mod-hbc-order-hat-blocks, mod-hbc-order-flanges, mod-mosaic

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

## MODULE DEPENDENCY GRAPH

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
   ├─ mod-sisyphean .............. building v0.1.0
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
   └─ mod-mosaic ................. standalone-working v0.1.0
      └─ mod-fiducious

Standalone (not linked to a site):
├─ mod-fiducious-slim (abandoned)
└─ mod-hbc-order-band-blocks (building — stub only)
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
