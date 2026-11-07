# Karen Eddy // Video Editor Portfolio (NLE Prototype)

An authentic Non-Linear Editor (NLE) software interface metaphor portfolio for professional freelance video editor Karen Eddy. Designed around Premiere Pro / DaVinci Resolve aesthetics with deep matte black (#0B0B0C), crisp white (#FFFFFF), and high-voltage neon hot-pink (#FF2D55) accents.

### User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying decisions confirmed in Phase 1 have been incorporated into this plan:
> - **Source Monitor**: High-resolution video preview with interactive playback controls, scrub bar, timecode tracking (`00:00:04:12`), and scroll-scrubbing support.
> - **Action Trigger ("Book a Cut")**: Opens a dedicated NLE-themed Project Inquiry Modal with timeline deliverable options (Vertical 9:16 Shorts, 16:9 Commercial/YouTube, Narrative/Documentary), turnaround speed, and direct contact form.
> - **NLE Keyboard Shortcuts**: Spacebar toggles Play/Pause, J-K-L acts as shuttle controls (reverse, pause, forward), and I/O marks In/Out cues, with an on-screen HUD badge guide.

---

### 1. Overview & Core Concept

- **What It Does**: A showcase for Karen Eddy, a high-retention video editor, styled precisely like a high-end NLE workstation. The source monitor acts as the centerpiece with interactive playhead, audio track meters, transport controls, and responsive layout.
- **Target Audience / Persona**: Content creators, agencies, commercial directors, and brand producers seeking a video editor who blends narrative retention with technical mastery.
- **Key Value**: Instantly conveys technical authority through the NLE aesthetic while delivering an engaging, frictionless browsing and client booking experience.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **First Impression & Navigation**:
   - Header with brand mark `KAREN EDDY // FREELANCE VIDEO EDITOR` and hot-pink live status indicator.
   - Smooth navigation anchor links ("Reels", "About", "Contact") and primary hot-pink `"Book a Cut"` CTA.
2. **Hero & Source Monitor**:
   - Confident positioning headline: *"Transforming raw footage into high-retention narratives."*
   - Technical metadata bar: Sequence `KAREN_EDDY_REEL_MASTER_v4.mp4`, timecode readout `00:00:04:12`, 23.976 FPS / 4K ProRes 422 HQ tag.
   - Video canvas with interactive timeline track, draggable hot-pink playhead, In/Out marker points, audio peak level indicators, and scroll-scrubbing.
   - Floating keyboard shortcut HUD badge (`[Space] Play/Pause`, `[J/K/L] Shuttle`, `[I/O] Mark In/Out`).
3. **Structured Next-Step Placeholders**:
   - **Placeholder 1**: `<!-- 9/16 VERTICAL REEL CAROUSEL GOES HERE -->` — dark card frame styled with technical track labels (V1, A1/A2), aspect ratio badges, and clean spacing.
   - **Placeholder 2**: `<!-- 16/9 CINEMATIC REEL CAROUSEL GOES HERE -->` — wide cinematic timeline-styled frame with aspect ratio indicators and metadata slots.
   - **Placeholder 3**: `<!-- FOOTER, PROCESS & TESTIMONIALS GO HERE -->` — split-grid modular container with technical panel borders ready for workflow steps and client testimonials.
4. **Project Inquiry Modal ("Book a Cut")**:
   - NLE-themed popover dialog with render queue / export settings aesthetic.
   - Format selector (9:16 Short Form, 16:9 Long Form/Commercial, Full Series).
   - Expected turnaround slider, project description input, and direct booking submission with instant confirmation state.

#### Visual Identity & Theme
- **Color Palette**:
  - Canvas: Deep matte black (`#0B0B0C`, `bg-[#0B0B0C]`)
  - Surfaces & Chrome: Dark slate / graphite (`#141416`, `#1B1B1E`, `#242429`)
  - Hairline Borders: Precision dividers (`#26262B`, `rgba(255,255,255,0.08)`)
  - Typography: Crisp white (`#FFFFFF`) with secondary technical zinc (`#9CA3AF`, `#71717A`)
  - High-Voltage Accent: Neon hot-pink (`#FF2D55`) reserved for active states, playhead, live indicator dot, In/Out selection zone, and primary CTA.
- **Typography Pairing**:
  - Display & Headings: `Inter` / clean neo-grotesque sans with balanced tracking.
  - Timecodes, Track Labels & Metadata: `JetBrains Mono` with `tabular-nums` for precise alignment.

---

### 3. Key Product Decisions & Trade-Offs

- **NLE Metaphor vs. Conventional Portfolio**:
  - *Chosen Approach*: Ground the hero in a functional NLE Source Monitor with transport controls, audio meters, and timecode.
  - *Why*: Differentiates Karen Eddy immediately from generic creator portfolios, demonstrating deep software familiarity and precision editing craft.
- **Scroll-Scrubbing & HTML5 Video Engine**:
  - *Chosen Approach*: Implement smooth scroll-scrubbing linked to video playback timestamp alongside manual playhead dragging and keyboard J-K-L shuttle controls.
  - *Why*: Allows visitors to quickly scrub through Karen's editing work naturally on both desktop and mobile touchscreens without stuttering.
- **Single-File Clean Modular Implementation**:
  - *Chosen Approach*: Build as a self-contained, high-performance responsive application in `src/App.tsx` utilizing Tailwind CSS utilities and Google Fonts (`Inter` and `JetBrains Mono`), fully supporting standard React 19 and mobile viewport collapse.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Navigation Header                           │
│  [●] KAREN EDDY // FREELANCE VIDEO EDITOR  ────  Reels | About | [Book a Cut] │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                  Hero Section: The Source Monitor                      │
│  Headline: "Transforming raw footage into high-retention narratives"   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ NLE Monitor Chrome: KAREN_EDDY_REEL_MASTER_v4.mp4 | 00:00:04:12  │  │
│  │ ──────────────────────────────────────────────────────────────── │  │
│  │ [ Video Display Canvas & Audio VU Meter ]                        │  │
│  │ ──────────────────────────────────────────────────────────────── │  │
│  │ [◀◀] [▶/❚❚] [▶▶] [In/Out] | ────●───────── Timeline Track       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  HUD: [Space] Play  [J] Rev  [K] Pause  [L] Fwd  [I/O] Set Markers     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│            Section 1: 9/16 Vertical Reel Carousel (Placeholder)        │
│    <!-- 9/16 VERTICAL REEL CAROUSEL GOES HERE -->                       │
├────────────────────────────────────────────────────────────────────────┤
│            Section 2: 16/9 Cinematic Reel Carousel (Placeholder)       │
│    <!-- 16/9 CINEMATIC REEL CAROUSEL GOES HERE -->                      │
├────────────────────────────────────────────────────────────────────────┤
│            Section 3: Footer, Process & Testimonials (Placeholder)     │
│    <!-- FOOTER, PROCESS & TESTIMONIALS GO HERE -->                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ (Triggered by "Book a Cut")
┌────────────────────────────────────────────────────────────────────────┐
│                   NLE Export / Project Booking Modal                   │
│   Project Scope (9:16 / 16:9), Turnaround, Budget, Client Contact      │
└────────────────────────────────────────────────────────────────────────┘
```

#### Component & State Structure
- **Video State**: `currentTime`, `duration`, `isPlaying`, `playbackRate` (-2x, -1x, 1x, 2x for J-K-L), `inPoint`, `outPoint`, `volume`.
- **Keyboard Listener**: Global window keydown handling for `Space`, `j`, `k`, `l`, `i`, `o`, `m` (mute).
- **Scroll Observer**: Smooth scrub synchronization when scrolling past the hero monitor.
- **Modal State**: `isBookingOpen`, form validation, format selection, success feedback.
- **Responsive Layout**: Media chrome collapses to compact transport controls on mobile (<640px) while maintaining legible timecodes and touch-friendly scrubbing.
