/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Star,
  Layers,
  Smartphone,
  LayoutDashboard,
  Compass,
  X,
  Menu,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  CheckCircle2,
  Film,
  Award,
  Moon,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Youtube,
  Mail
} from 'lucide-react';

// Google Flow shared hero video asset
const HERO_FLOW_VIDEO_URL = 'https://flow.google.com/shared/video/87eaab08-4331-4161-b6c4-725511e981f5';

// High-fidelity image assets
const PORTRAIT_HERO = '/src/assets/images/editorial_cream_portrait_1793992631164.jpg';
const FILM_INCEPTION = '/src/assets/images/reel_hero_cinematic_1793979721648.jpg';
const FILM_INTERSTELLAR = '/src/assets/images/reel_tech_essay_1793980418712.jpg';
const FILM_LAST_OF_US = '/src/assets/images/reel_timeline_preview_1793979722904.jpg';
const FILM_TED_LASSO = '/src/assets/images/reel_vertical_preview_1793979722364.jpg';
const FILM_DUNE = '/src/assets/images/project_fintech_dashboard_1793992647060.jpg';
const FILM_TOKYO_DOC = '/src/assets/images/reel_street_interview_1793980418352.jpg';

interface ServiceItem {
  number: string;
  title: string;
  subTags?: string[];
  description?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01.',
    title: 'Commercial & Promo Editing',
    subTags: ['Commercial Cuts', 'Brand Spots', 'Broadcast Delivery', 'Pacing & Rhythm'],
    description: 'High-impact commercial and promotional edits engineered to hook viewers instantly, sustain retention, and drive measurable audience action.'
  },
  {
    number: '02.',
    title: 'YouTube & Long-Form Content',
    subTags: [
      'YouTube Long-Form',
      'Documentary Cuts',
      'Narrative Pacing',
      'Dynamic A-Roll & B-Roll'
    ],
    description: 'Crafting high-retention episodic content, video essays, and documentaries with masterful story arcs and relentless viewer engagement.'
  },
  {
    number: '03.',
    title: 'Social Media Reels & TikToks',
    subTags: ['9:16 Vertical Video', 'Viral Hook Formatting', 'Captions & Sound Sync', 'Trend Adaptation'],
    description: 'Fast-turnaround vertical edits optimized for Instagram Reels, TikTok, and YouTube Shorts with thumb-stopping pacing and kinetic rhythm.'
  },
  {
    number: '04.',
    title: 'Color Grading & Correction',
    subTags: ['DaVinci Resolve', 'ACES & Log Workflows', 'Look Design', 'Skin Tone Matching'],
    description: 'Cinematic color passes and film emulation that elevate production value, unify multi-camera shoots, and evoke deep emotional atmosphere.'
  },
  {
    number: '05.',
    title: 'Motion Graphics & VFX',
    subTags: ['Kinetic Typography', 'Lower Thirds', 'Clean Screen Replacements', 'Visual Accents'],
    description: 'Seamless animated graphics, dynamic title sequences, visual accents, and subtle VFX that make every cut look like a studio production.'
  }
];

const ICEBERG_CAROUSEL = [
  {
    id: 'commercial-film',
    title: 'Apex Athletics — Cinematic Brand Film',
    rating: '9.8 ★',
    category: 'Commercial Cut',
    aspect: '9/16',
    image: FILM_INCEPTION,
    year: '2024',
    tags: ['High-Pace Cutting', 'Color Grading', 'Sound Design']
  },
  {
    id: 'documentary-cut',
    title: 'Echoes of Serengeti — Wildlife Doc',
    rating: '9.6 ★',
    category: 'Documentary Cut',
    aspect: '9/16',
    image: FILM_INTERSTELLAR,
    year: '2024',
    tags: ['Narrative Arc', 'Atmospheric Foley', '4K Master']
  },
  {
    id: 'tech-launch',
    title: 'Cyberpunk Pulse — Tech Launch Promo',
    rating: '9.9 ★',
    category: 'Product Commercial',
    aspect: '9/16',
    image: FILM_LAST_OF_US,
    year: '2023',
    tags: ['Kinetic Motion', 'VFX Transitions', 'Sound FX']
  },
  {
    id: 'social-series',
    title: 'Urban Velocity — Fashion Film & Reels',
    rating: '9.5 ★',
    category: 'Social & Reel Series',
    aspect: '9/16',
    image: FILM_TED_LASSO,
    year: '2024',
    tags: ['9:16 Vertical', 'Beat-Matched Sync', 'Film Grain']
  },
  {
    id: 'music-video',
    title: 'Neon Horizon — Music Video & Tour Cut',
    rating: '9.7 ★',
    category: 'Cinematic Music Video',
    aspect: '9/16',
    image: FILM_DUNE,
    year: '2024',
    tags: ['Stylized Grade', 'Multi-Cam Sync', 'Rhythm Edit']
  },
  {
    id: 'creator-doc',
    title: 'Tokyo Nocturne — Creator Short Doc',
    rating: '9.9 ★',
    category: 'Mini-Documentary',
    aspect: '9/16',
    image: FILM_TOKYO_DOC,
    year: '2024',
    tags: ['Street Audio', 'Night Color Pass', 'Kinetic Cut']
  }
];

export default function App() {
  const [activeAccordion, setActiveAccordion] = useState<number>(1); // 02. Website Design expanded by default as in reference
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSubmitted, setModalSubmitted] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedFilm, setSelectedFilm] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  // Free-scrolling video scrubber with lerp easing
  useEffect(() => {
    const video = heroVideoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    let targetTime = 0;
    let currentTime = 0;
    let duration = 0;
    let isVideoReady = false;
    let animationFrameId: number;

    const updateDuration = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        duration = video.duration;
        isVideoReady = true;
        handleScroll();
      }
    };

    video.addEventListener('loadedmetadata', updateDuration);
    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      updateDuration();
    }

    // Unlock video playback on mobile browsers upon first user touch or scroll
    let unlocked = false;
    const unlockVideo = () => {
      if (!unlocked && video) {
        video.play().then(() => {
          video.pause();
          unlocked = true;
        }).catch(() => {});
      }
    };

    window.addEventListener('touchstart', unlockVideo, { passive: true, once: true });
    window.addEventListener('scroll', unlockVideo, { passive: true, once: true });

    const handleScroll = () => {
      const heroHeight = hero.offsetHeight || window.innerHeight;
      const scrollThreshold = heroHeight * 0.8;
      const progress = Math.min(Math.max(window.scrollY / (scrollThreshold > 0 ? scrollThreshold : 1), 0), 1);
      if (duration > 0) {
        targetTime = progress * duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Smooth lerp loop with requestAnimationFrame (lerp factor ~0.1)
    const render = () => {
      if (duration > 0 && isVideoReady) {
        const diff = targetTime - currentTime;
        if (Math.abs(diff) > 0.001) {
          currentTime += diff * 0.1;
          currentTime = Math.max(0, Math.min(duration, currentTime));
          if (video.readyState >= 2) {
            video.currentTime = currentTime;
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('touchstart', unlockVideo);
      window.removeEventListener('scroll', unlockVideo);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const nextSlide = () => {
    setActiveCardIndex((prev) => (prev + 1) % ICEBERG_CAROUSEL.length);
  };

  const prevSlide = () => {
    setActiveCardIndex((prev) => (prev - 1 + ICEBERG_CAROUSEL.length) % ICEBERG_CAROUSEL.length);
  };

  // Optional auto-advance every 4 seconds, paused on touch or hover
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % ICEBERG_CAROUSEL.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedFilm(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsCarouselPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchDeltaXRef.current < -35) {
      nextSlide();
    } else if (touchDeltaXRef.current > 35) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setTimeout(() => setIsCarouselPaused(false), 2000);
  };

  const getCardOffset = (index: number) => {
    const total = ICEBERG_CAROUSEL.length;
    let diff = (index - activeCardIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff <= -total / 2) diff += total;
    return diff;
  };

  const getCardStyle = (diff: number) => {
    switch (diff) {
      case 0:
        return {
          transform: 'translate(-50%, -50%) scale(1)',
          zIndex: 30,
          opacity: 1,
          pointerEvents: 'auto' as const
        };
      case 1:
        return {
          transform: 'translate(calc(-50% + var(--neighbor-offset, 130px)), -50%) scale(0.8)',
          zIndex: 20,
          opacity: 0.85,
          pointerEvents: 'auto' as const
        };
      case -1:
        return {
          transform: 'translate(calc(-50% - var(--neighbor-offset, 130px)), -50%) scale(0.8)',
          zIndex: 20,
          opacity: 0.85,
          pointerEvents: 'auto' as const
        };
      case 2:
        return {
          transform: 'translate(calc(-50% + var(--outer-offset, 230px)), -50%) scale(0.7)',
          zIndex: 10,
          opacity: 0.5,
          pointerEvents: 'auto' as const
        };
      case -2:
        return {
          transform: 'translate(calc(-50% - var(--outer-offset, 230px)), -50%) scale(0.7)',
          zIndex: 10,
          opacity: 0.5,
          pointerEvents: 'auto' as const
        };
      default:
        return {
          transform: diff > 0
            ? 'translate(calc(-50% + var(--waiting-offset, 340px)), -50%) scale(0.5)'
            : 'translate(calc(-50% - var(--waiting-offset, 340px)), -50%) scale(0.5)',
          zIndex: 0,
          opacity: 0,
          pointerEvents: 'none' as const
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#FF2A85] selection:text-white">
      
      {/* 1. FLOATING PILL NAVBAR */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl pointer-events-none">
        <header className="pointer-events-auto bg-[#141416]/95 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all">
          
          {/* Mobile: Hamburger Menu on Left */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white p-1 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop: Logo Badge (Hidden on mobile) */}
          <a href="#hero" className="hidden md:flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#FF2A85] flex items-center justify-center text-white font-bold shadow-sm shadow-[#FF2A85]/30 group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-bold text-white tracking-wide text-base font-sans">
              Karen.
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-wider text-zinc-300">
            <a href="#hero" className="text-[#FF2A85] font-semibold hover:text-white transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-[#FF2A85] transition-colors">
              Services
            </a>
            <a href="#iceberg" className="hover:text-[#FF2A85] transition-colors">
              Projects
            </a>
            <a href="#services" className="hover:text-[#FF2A85] transition-colors">
              Blogs
            </a>
            <a href="#about" className="hover:text-[#FF2A85] transition-colors">
              About Me
            </a>
            <a href="#testimonials" className="hover:text-[#FF2A85] transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Black, Pink & White palette synced.')}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full transition-colors hidden md:block cursor-pointer"
              title="Toggle Theme"
            >
              <Moon className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setModalSubmitted(false);
                setIsModalOpen(true);
              }}
              className="bg-[#FF2A85] hover:bg-[#E02070] text-white font-mono text-xs font-bold px-4 sm:px-5 py-2 rounded-full transition-all cursor-pointer shadow-md shadow-[#FF2A85]/25 active:scale-95"
            >
              Let's Talk
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 md:hidden bg-[#141416]/95 border border-[#FF2A85]/30 rounded-3xl p-6 font-mono text-xs space-y-3 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#FF2A85] font-bold py-2 border-b border-white/10">Home</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block text-zinc-200 hover:text-[#FF2A85] py-2 border-b border-white/10">Services</a>
          <a href="#iceberg" onClick={() => setIsMobileMenuOpen(false)} className="block text-zinc-200 hover:text-[#FF2A85] py-2 border-b border-white/10">Projects</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-zinc-200 hover:text-[#FF2A85] py-2 border-b border-white/10">About Me</a>
          <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="block text-zinc-200 hover:text-[#FF2A85] py-2">Testimonials</a>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full overflow-hidden bg-black flex flex-col justify-center pt-20 sm:pt-28 pb-10 sm:pb-14 min-h-screen"
      >
          
          {/* Full-Width Background Video (Scroll-Controlled) */}
          <video
            ref={heroVideoRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain md:object-cover object-center z-0 pointer-events-none"
            src="https://res.cloudinary.com/djkiddls/video/upload/f_mp4,vc_h264,q_auto/Create_smooth_seamless_transition_1f8d059e.mp4"
          />

          {/* 40% Black Overlay between video and text */}
          <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 z-10 w-full">
          {/* Top Award Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#26262B] font-sans text-xs text-zinc-300 shadow-sm">
              <div className="w-5 h-5 rounded-full bg-[#1E1E24] flex items-center justify-center text-[#FF2A85]">
                <Award className="w-3 h-3" />
              </div>
              <span className="font-medium">Award-Winning Video Editor & Colorist</span>
            </div>
          </div>

          {/* Main Title & Rotating Stamp Row */}
          <div className="relative text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-md">
              I'm <span className="text-[#FF2A85]">Karen Eddy</span>
              <span className="inline-block text-[#FF2A85] text-3xl sm:text-5xl ml-1 font-serif select-none">
                ✦
              </span>
            </h1>
            <p className="text-zinc-300 font-sans text-sm sm:text-base md:text-lg mt-3 font-normal drop-shadow">
              Professional Video Editor & Colorist
            </p>

            {/* Rotating "HIRE ME" Stamp Badge (Top-Right) */}
            <div className="absolute -top-6 -right-2 sm:-right-12 md:-right-24 hidden sm:block">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Rotating SVG Text */}
                <svg className="w-24 h-24 animate-spin-slow select-none pointer-events-none" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-mono uppercase tracking-[0.22em] fill-zinc-300 font-bold">
                    <textPath xlinkHref="#circlePath">
                      HIRE ME • HIRE ME • HIRE ME • 
                    </textPath>
                  </text>
                </svg>

                {/* Central Arrow Button */}
                <button
                  onClick={() => {
                    setModalSubmitted(false);
                    setIsModalOpen(true);
                  }}
                  className="absolute w-10 h-10 rounded-full bg-[#FF2A85] text-white flex items-center justify-center shadow-md shadow-[#FF2A85]/30 hover:scale-110 transition-transform cursor-pointer"
                  title="Hire Karen"
                >
                  <ArrowRight className="w-4 h-4 font-bold" />
                </button>
              </div>
            </div>
          </div>

          {/* Central Stage Area with Floating Badges and Centered Character Focus */}
          <div className="relative max-w-3xl mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex justify-center items-center pt-4">
            {/* --- FLOATING LEFT ELEMENTS --- */}
            
            {/* Follow Me On (Top Left) */}
            <div className="absolute top-2 sm:top-1 left-2 sm:-left-6 md:-left-16 z-20 space-y-2 text-left">
              <span className="font-sans text-xs text-zinc-300 font-medium block drop-shadow-sm">
                Follow Me On
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://x.com/TheKarenEddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#26262B] text-white flex items-center justify-center hover:bg-[#FF2A85] hover:border-[#FF2A85] transition-colors shadow-sm cursor-pointer"
                  aria-label="X Profile"
                  title="X (@TheKarenEddy)"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@kareneddy2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#26262B] text-white flex items-center justify-center hover:bg-[#FF2A85] hover:border-[#FF2A85] transition-colors shadow-sm cursor-pointer"
                  aria-label="YouTube Channel"
                  title="YouTube (@kareneddy2)"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/karen-eddy-940258286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#26262B] text-white flex items-center justify-center hover:bg-[#FF2A85] hover:border-[#FF2A85] transition-colors shadow-sm cursor-pointer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://t.me/Kareneddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#26262B] text-white flex items-center justify-center hover:bg-[#FF2A85] hover:border-[#FF2A85] transition-colors shadow-sm cursor-pointer"
                  aria-label="Telegram"
                  title="Telegram (@Kareneddy)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.939z"/>
                  </svg>
                </a>
                <a
                  href="mailto:winneredet2@gmail.com"
                  className="w-7 h-7 rounded-full bg-[#141416]/90 backdrop-blur-md border border-[#26262B] text-white flex items-center justify-center hover:bg-[#FF2A85] hover:border-[#FF2A85] transition-colors shadow-sm cursor-pointer"
                  aria-label="Email Karen Eddy"
                  title="Email winneredet2@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Testimonial Quote (Top Right, desktop) */}
            <div className="absolute top-2 sm:top-1 right-2 sm:-right-6 md:-right-16 z-20 text-right max-w-[190px] hidden sm:block pointer-events-none">
              <span className="text-2xl text-[#FF2A85] font-serif leading-none block">“</span>
              <p className="text-[11px] font-sans text-zinc-300 leading-snug font-medium drop-shadow-sm">
                High-Retention Video Editing with Masterful Storytelling!
              </p>
            </div>

            {/* --- 10 BALANCED FLOATING SERVICE CHIPS AROUND CHARACTER --- */}
            {/* 1. Left Upper: Color Grading (Dark, -4deg) */}
            <div className="absolute top-16 sm:top-14 left-2 sm:-left-4 md:-left-12 z-20 pointer-events-none float-chip-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#141416]/90 backdrop-blur-md text-white border border-[#26262B] font-sans text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-black/50 -rotate-[4deg] select-none">
                Color Grading
              </span>
            </div>

            {/* 2. Right Upper: Motion Graphics (Pink, +4deg) */}
            <div className="absolute top-16 sm:top-14 right-2 sm:-right-4 md:-right-12 z-20 pointer-events-none float-chip-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#FF2A85] text-white font-sans text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-[#FF2A85]/25 rotate-[4deg] select-none">
                Motion Graphics
              </span>
            </div>

            {/* 3. Left Upper-Mid: Talking Head Video (Pink, +5deg) */}
            <div className="absolute top-32 sm:top-30 left-0 sm:-left-8 md:-left-18 z-20 pointer-events-none float-chip-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#FF2A85] text-white font-sans text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-[#FF2A85]/25 rotate-[5deg] select-none">
                Talking Head Video
              </span>
            </div>

            {/* 4. Right Upper-Mid: Text Motion (Dark, -5deg) */}
            <div className="absolute top-32 sm:top-30 right-0 sm:-right-8 md:-right-18 z-20 pointer-events-none float-chip-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#141416]/90 backdrop-blur-md text-white border border-[#26262B] font-sans text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-black/50 -rotate-[5deg] select-none">
                <span className="text-[#FF2A85]">✣</span> Text Motion
              </span>
            </div>

            {/* 5. Left Mid: 4K Editing (Dark, -3deg) */}
            <div className="absolute top-48 sm:top-46 left-2 sm:-left-6 md:-left-14 z-20 pointer-events-none float-chip-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#141416]/90 backdrop-blur-md text-white border border-[#26262B] font-sans text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-black/50 -rotate-[3deg] select-none">
                <span className="text-[#FF2A85]">✣</span> 4K Editing
              </span>
            </div>

            {/* 6. Right Mid: B-Roll (Pink, +3deg) */}
            <div className="absolute top-48 sm:top-46 right-2 sm:-right-6 md:-right-14 z-20 pointer-events-none float-chip-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#FF2A85] text-white font-sans text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-[#FF2A85]/25 rotate-[3deg] select-none">
                B-Roll
              </span>
            </div>

            {/* 7. Left Lower-Mid: Podcast Edits (Dark, +4deg) */}
            <div className="absolute bottom-24 sm:bottom-22 left-0 sm:-left-8 md:-left-20 z-20 pointer-events-none float-chip-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#141416]/90 backdrop-blur-md text-white border border-[#26262B] font-sans text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-black/50 rotate-[4deg] select-none">
                Podcast Edits
              </span>
            </div>

            {/* 8. Right Lower-Mid: Reels & Shorts (Pink, -4deg) */}
            <div className="absolute bottom-24 sm:bottom-22 right-0 sm:-right-8 md:-right-20 z-20 pointer-events-none float-chip-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#FF2A85] text-white font-sans text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-[#FF2A85]/25 -rotate-[4deg] select-none">
                Reels & Shorts
              </span>
            </div>

            {/* 9. Left Bottom: Sound Design (Dark, -5deg) */}
            <div className="absolute bottom-8 sm:bottom-8 left-2 sm:-left-4 md:-left-12 z-20 pointer-events-none float-chip-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#141416]/90 backdrop-blur-md text-white border border-[#26262B] font-sans text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-black/50 -rotate-[5deg] select-none">
                Sound Design
              </span>
            </div>

            {/* 10. Right Bottom: Events (Dark, +5deg) */}
            <div className="absolute bottom-8 sm:bottom-8 right-2 sm:-right-4 md:-right-12 z-20 pointer-events-none float-chip-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#141416]/90 backdrop-blur-md text-white border border-[#26262B] font-sans text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-black/50 rotate-[5deg] select-none">
                <span className="text-[#FF2A85]">✣</span> Events
              </span>
            </div>

            {/* --- BOTTOM OVERLAPPING CTAs (PORTFOLIO & HIRE ME) --- */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#141416]/95 backdrop-blur-md p-1 rounded-full shadow-xl border border-[#26262B]">
              <a
                href="#iceberg"
                className="bg-[#FF2A85] hover:bg-[#E02070] text-white font-sans text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#FF2A85]/25 active:scale-95"
              >
                <span>Portfolio</span>
                <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px]">
                  →
                </span>
              </a>

              <button
                onClick={() => {
                  setModalSubmitted(false);
                  setIsModalOpen(true);
                }}
                className="bg-[#141416] hover:bg-[#1E1E24] text-white border border-[#26262B] font-sans text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all cursor-pointer active:scale-95"
              >
                Hire Me
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MARQUEE TICKER BAR */}
      <section className="bg-[#0D0D0E] text-white py-4 border-y border-[#FF2A85]/30 overflow-hidden relative select-none">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap font-sans text-sm font-semibold tracking-wider">
          <span>Commercial Editing</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Color Grading</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Motion Graphics</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>4K Editing</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Sound Design</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Reels & Shorts</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Documentary Cuts</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Narrative Rhythm</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          {/* Looped duplicate */}
          <span>Commercial Editing</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Color Grading</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Motion Graphics</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>4K Editing</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Sound Design</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Reels & Shorts</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Documentary Cuts</span>
          <span className="text-[#FF2A85] text-base">✣</span>
          <span>Narrative Rhythm</span>
          <span className="text-[#FF2A85] text-base">✣</span>
        </div>
      </section>

      {/* 4. SERVICES SECTION ("HOW I BRING STORIES TO LIFE") */}
      <section id="services" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 font-sans text-xs font-semibold text-zinc-400">
              <span className="text-[#FF2A85] text-base">◒</span>
              <span>My Services</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              How I Bring <span className="text-[#FF2A85]">Stories to Life</span>
              <span className="text-[#FF2A85] text-2xl sm:text-4xl ml-1">✦</span>
            </h2>
          </div>

          <button
            onClick={() => {
              setModalSubmitted(false);
              setIsModalOpen(true);
            }}
            className="bg-[#FF2A85] hover:bg-[#E02070] text-white font-sans text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#FF2A85]/20 self-start sm:self-auto"
          >
            <span>View All Services</span>
            <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px]">
              →
            </span>
          </button>
        </div>

        {/* Interactive Accordion Cards matching reference styling */}
        <div className="space-y-3.5">
          {SERVICES_DATA.map((service, index) => {
            const isOpen = activeAccordion === index;

            return (
              <div
                key={service.number}
                className={`transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'bg-[#18181C] text-white border border-[#FF2A85] shadow-[0_0_25px_rgba(255,42,133,0.15)]'
                    : 'bg-[#141416] text-white border border-[#26262B] hover:border-[#FF2A85]/60'
                }`}
                onClick={() => setActiveAccordion(isOpen ? -1 : index)}
              >
                {/* Header Strip */}
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isOpen ? 'text-[#FF2A85]' : 'text-zinc-500'
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight text-white">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-transform ${
                      isOpen
                        ? 'bg-[#FF2A85] text-white rotate-90'
                        : 'bg-[#FF2A85] text-white hover:scale-105'
                    }`}
                  >
                    ↗
                  </div>
                </div>

                {/* Expanded Body for Open Item */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 space-y-4 animate-in fade-in duration-200">
                    {/* Sub-tags Pill Group */}
                    {service.subTags && (
                      <div className="flex flex-wrap gap-2">
                        {service.subTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-white/10 text-zinc-200 font-sans text-xs border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SECTION: "A TIP OF THE ICEBERG" (CENTERED COVERFLOW CAROUSEL) */}
      <section id="iceberg" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#26262B] bg-black relative overflow-hidden">
        {/* Soft elliptical glow centered on the middle card */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1300px] h-[45%] rounded-[100%] pointer-events-none -z-0 blur-3xl opacity-80"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 42, 133, 0.4) 0%, rgba(255, 42, 133, 0.15) 45%, rgba(255, 42, 133, 0) 75%)'
          }}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 font-sans text-xs font-semibold text-zinc-400">
            <span className="text-[#FF2A85] text-base">✦</span>
            <span>Selected Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            A Tip of the <span className="text-[#FF2A85]">Iceberg</span>
          </h2>
        </div>

        {/* Coverflow Stage */}
        <div
          className="relative w-full h-[470px] sm:h-[530px] md:h-[580px] overflow-hidden flex items-center justify-center select-none [--neighbor-offset:130px] sm:[--neighbor-offset:190px] md:[--neighbor-offset:270px] lg:[--neighbor-offset:300px] [--outer-offset:230px] sm:[--outer-offset:340px] md:[--outer-offset:480px] lg:[--outer-offset:540px] [--waiting-offset:340px] sm:[--waiting-offset:490px] md:[--waiting-offset:690px] lg:[--waiting-offset:760px]"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {ICEBERG_CAROUSEL.map((item, index) => {
            const diff = getCardOffset(index);
            const style = getCardStyle(diff);
            const isActive = diff === 0;
            const isNeighbor = Math.abs(diff) === 1;
            const isOuter = Math.abs(diff) === 2;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isActive) {
                    setSelectedFilm(item);
                  } else {
                    setActiveCardIndex(index);
                  }
                }}
                style={style}
                className={`absolute top-1/2 left-1/2 w-[210px] sm:w-[250px] md:w-[285px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#141416] border transition-all duration-500 ease-out cursor-pointer group shadow-2xl flex flex-col justify-between ${
                  isActive
                    ? 'border-[#FF2A85]/70 shadow-[0_12px_45px_rgba(255,42,133,0.3)] ring-1 ring-[#FF2A85]/40'
                    : 'border-[#26262B] hover:border-[#FF2A85]/50'
                }`}
              >
                {/* Full-Bleed Image */}
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isActive ? 'group-hover:scale-105 opacity-90 group-hover:opacity-100' : 'opacity-85'
                    }`}
                  />

                  {/* Active Card Top Badges & Scrim */}
                  {isActive && (
                    <>
                      {/* Category Badge Top-Left */}
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full font-sans text-[11px] font-medium text-white border border-white/10 shadow-sm z-10">
                        {item.category}
                      </div>

                      {/* Rating Badge Top-Right */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full font-mono text-xs font-bold text-[#FF2A85] border border-white/10 shadow-sm z-10">
                        {item.rating}
                      </div>

                      {/* Play hover prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 z-10">
                        <div className="w-12 h-12 rounded-full bg-[#FF2A85] text-white flex items-center justify-center shadow-lg shadow-[#FF2A85]/40">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom Content Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent flex flex-col justify-end p-5 z-10 pointer-events-none">
                        <span className="font-mono text-[10px] text-[#FF2A85] uppercase tracking-wider font-semibold">
                          Release · {item.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-[#FF2A85] transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-sans text-zinc-300 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Neighbor Cards (Offset ±1) */}
                  {isNeighbor && (
                    <>
                      {/* Rating Top-Right */}
                      <div className="absolute top-3.5 right-3.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full font-mono text-[11px] font-bold text-[#FF2A85] border border-white/10 shadow-sm z-10">
                        {item.rating}
                      </div>

                      {/* Subtle brand pink glow tint */}
                      <div className="absolute inset-0 bg-[#FF2A85]/15 pointer-events-none" />

                      {/* Small Title at Bottom (No Tags) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4 z-10 pointer-events-none">
                        <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                    </>
                  )}

                  {/* Outer Cards (Offset ±2) */}
                  {isOuter && (
                    <>
                      {/* Rating Top-Right */}
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full font-mono text-[10px] font-bold text-[#FF2A85] border border-white/10 shadow-sm z-10">
                        {item.rating}
                      </div>

                      {/* Dimming overlay */}
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                      {/* Small Title at Bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent flex flex-col justify-end p-3 z-10 pointer-events-none">
                        <h3 className="text-[11px] font-semibold text-zinc-300 line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Navigation Controls Below Carousel */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full bg-[#141416] border border-[#26262B] hover:border-[#FF2A85] text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full bg-[#FF2A85] hover:bg-[#E02070] text-white flex items-center justify-center transition-all shadow-md shadow-[#FF2A85]/25 active:scale-95 cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View Full Portfolio Button */}
        <div className="flex justify-center mt-7">
          <a
            href="https://drive.google.com/drive/folders/1NBdXLUmTscD0wOOu5FnWIFYeB91yUCQ-"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF2A85] hover:bg-[#E02070] text-white font-sans text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#FF2A85]/25 active:scale-95 hover:shadow-lg hover:shadow-[#FF2A85]/40"
          >
            <span>View Full Portfolio</span>
            <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px]">
              →
            </span>
          </a>
        </div>
      </section>

      {/* 6. ABOUT ME SECTION ("WHO IS KAREN EDDY?") */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-[#141416] text-white rounded-[36px] p-8 sm:p-12 md:p-16 border border-[#26262B] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Stylized Pink Arch with Karen Eddy and Angled Floating Badges */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[310px] aspect-[4/5] flex items-end justify-center">
                
                {/* Stylized Arch Backdrop */}
                <div className="absolute inset-0 bg-[#FF2A85] rounded-t-[140px] rounded-b-3xl -z-10 shadow-[0_0_50px_rgba(255,42,133,0.3)]" />

                {/* Portrait Cutout inside Arch */}
                <img
                  src="https://res.cloudinary.com/djkiddls/image/upload/v1794063398/HL5NBlPXcAAKeuo.jpg"
                  alt="Karen Eddy About"
                  className="w-full h-full object-cover rounded-t-[140px] rounded-b-3xl contrast-105"
                  style={{ objectPosition: "50% 80%" }}
                />

                {/* Floating Angled Skill Pills matching reference */}
                <span className="absolute top-16 -left-4 -rotate-6 px-3 py-1 bg-[#0A0A0A] text-white font-sans text-[11px] font-bold rounded-full shadow-lg border border-white/10 z-10">
                  Commercial Cuts
                </span>

                <span className="absolute top-12 -right-4 rotate-6 px-3 py-1 bg-[#0A0A0A] text-white font-sans text-[11px] font-bold rounded-full shadow-lg border border-white/10 z-10">
                  Color Grading
                </span>

                <span className="absolute top-36 -right-5 rotate-3 px-3 py-1 bg-[#FF2A85] text-white font-sans text-[11px] font-bold rounded-full shadow-lg shadow-[#FF2A85]/30 z-10">
                  Motion Graphics
                </span>

                <span className="absolute bottom-20 -left-6 -rotate-12 px-3 py-1 bg-[#0A0A0A] text-white font-sans text-[11px] font-bold rounded-full shadow-lg border border-white/10 z-10">
                  4K Editing
                </span>

                <span className="absolute bottom-12 -right-2 sm:-right-4 rotate-6 px-3 py-1 bg-[#0A0A0A] text-white font-sans text-[11px] font-bold rounded-full shadow-lg border border-white/10 z-10">
                  Sound Design
                </span>

                <span className="absolute bottom-4 left-2 sm:left-4 rotate-2 px-3 py-1 bg-[#FF2A85] text-white font-sans text-[11px] font-bold rounded-full shadow-lg shadow-[#FF2A85]/30 z-10">
                  Reels & Shorts
                </span>
              </div>
            </div>

            {/* Right Column: Bio, Download CV & Signature */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold text-[#FF2A85]">
                  <span>◒</span>
                  <span>About Me</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  Who is <span className="text-[#FF2A85]">Karen Eddy?</span>
                  <span className="text-[#FF2A85] text-2xl sm:text-4xl ml-1">✦</span>
                </h2>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base font-light leading-relaxed font-sans">
                <p>
                  Hey there, I'm Karen Eddy — a professional video editor and colorist passionate about turning raw footage into high-retention, emotionally resonant visual narratives.
                </p>
                <p>
                  Over the past 7+ years, I've cut high-impact commercials, viral social campaigns, documentaries, and branded films for top-tier creators, global brands, and independent production houses.
                </p>
                <p>
                  I believe exceptional editing is rooted in intentional pacing and invisible rhythm: knowing exactly when to hold tension, when to cut to the beat, and how to grade color to make every frame unforgettable.
                </p>
              </div>

              {/* Action Button & Signature Row */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => showToast('Karen_Eddy_Video_Editor_CV.pdf downloaded successfully!')}
                  className="bg-[#0A0A0A] hover:bg-black text-white border border-[#FF2A85] font-sans text-xs sm:text-sm font-bold px-6 py-3 rounded-full flex items-center gap-3 transition-all cursor-pointer shadow-md shadow-[#FF2A85]/20 active:scale-95"
                >
                  <span>Download CV</span>
                  <span className="w-5 h-5 rounded-full bg-[#FF2A85] text-white flex items-center justify-center text-[10px]">
                    →
                  </span>
                </button>

                {/* Elegant Handwritten Signature */}
                <div className="font-cursive text-3xl sm:text-4xl text-[#FF2A85] select-none tracking-wide pt-1">
                  Karen Eddy
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#26262B]">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 font-sans text-xs font-semibold text-zinc-400">
            <span className="text-[#FF2A85]">✦</span>
            <span>Client Praise & Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            What Valued Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Karen has an extraordinary instinct for story arcs and kinetic pacing. She turned 40 hours of raw commercial footage into a 60-second broadcast cut that outperformed all our benchmarks.",
              author: "David Vance",
              role: "Creative Director, Circa Films"
            },
            {
              quote: "The rare editor who balances razor-sharp comedic timing with cinematic color grading. Working with Karen elevated our entire YouTube series to broadcast grade.",
              author: "Sarah Lindqvist",
              role: "Executive Producer, Kroma Media"
            },
            {
              quote: "Her multi-cam sync workflow and attention to audio foley made our documentary cut feel alive. 350+ reviews with a 4.9 average is richly deserved.",
              author: "Marcus Sterling",
              role: "Lead Videographer & Director, Apex Productions"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#141416] border border-[#26262B] hover:border-[#FF2A85]/50 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-[#FF2A85]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm sm:text-base font-sans italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#26262B]">
                <h4 className="font-bold text-sm text-white">{item.author}</h4>
                <p className="text-zinc-400 text-xs font-mono">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#0A0A0A] text-white py-16 px-6 border-t border-[#26262B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF2A85] text-white font-bold flex items-center justify-center text-xs shadow-md shadow-[#FF2A85]/20">
              KE
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Karen Eddy</span>
              <span className="text-zinc-400 text-[11px]">Professional Video Editor & Colorist</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            <a href="#hero" className="hover:text-[#FF2A85] transition-colors">Home</a>
            <a href="#services" className="hover:text-[#FF2A85] transition-colors">Services</a>
            <a href="#iceberg" className="hover:text-[#FF2A85] transition-colors">Projects</a>
            <a href="#about" className="hover:text-[#FF2A85] transition-colors">About Me</a>
            <a href="#testimonials" className="hover:text-[#FF2A85] transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://x.com/TheKarenEddy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2A85] transition-colors flex items-center gap-1.5"
              title="X (@TheKarenEddy)"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X</span>
            </a>
            <span>·</span>
            <a
              href="https://www.youtube.com/@kareneddy2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2A85] transition-colors flex items-center gap-1.5"
              title="YouTube (@kareneddy2)"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/karen-eddy-940258286"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2A85] transition-colors flex items-center gap-1.5"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span>·</span>
            <a
              href="https://t.me/Kareneddy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF2A85] transition-colors flex items-center gap-1.5"
              title="Telegram (@Kareneddy)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.939z"/>
              </svg>
              <span>Telegram</span>
            </a>
            <span>·</span>
            <a
              href="mailto:winneredet2@gmail.com"
              className="hover:text-[#FF2A85] transition-colors flex items-center gap-1.5"
              title="Email winneredet2@gmail.com"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <p>© 2026 Karen Eddy. All Rights Reserved.</p>
          <p>Crafted in high-contrast Black, Pink & White aesthetic.</p>
        </div>
      </footer>

      {/* 9. JOTFORM CONTACT POPUP MODAL (FULL-SCREEN WITH BLUR, ESC & OVERLAY DISMISS) */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Close button X top right */}
          <button
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-[#141416]/90 border border-white/20 text-zinc-300 hover:text-white hover:border-[#FF2A85] flex items-center justify-center font-mono text-lg transition-all cursor-pointer shadow-xl hover:scale-105"
          >
            ✕
          </button>

          {/* Modal Content Container */}
          <div className="w-full max-w-4xl flex flex-col items-center my-auto relative animate-in fade-in zoom-in-95 duration-150">
            {/* Line above iframe */}
            <div className="w-full text-center mb-3 sm:mb-4 px-2">
              <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                Prefer chat? Message me on Telegram{' '}
                <a
                  href="https://t.me/Kareneddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF2A85] hover:underline font-semibold"
                >
                  @Kareneddy
                </a>
              </p>
            </div>

            {/* Jotform Embed Iframe */}
            <iframe
              src="https://form.jotform.com/260071745992564"
              title="Contact Karen Eddy"
              loading="lazy"
              scrolling="yes"
              className="w-full h-[88vh] sm:h-[90vh] rounded-3xl border border-white/10 bg-[#141416] shadow-2xl"
            />

            {/* Preserved existing contact form code (hidden for future wiring) */}
            <div className="hidden" aria-hidden="true">
              <span className="font-mono text-xs text-[#FF2A85] font-bold tracking-widest uppercase block mb-1">
                INQUIRY // PROJECT BRIEF
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
                Let's Talk About Your Project
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light mb-6">
                Have a commercial, YouTube series, documentary, or viral social campaign in mind? Karen responds within 24 hours.
              </p>
              {modalSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FF2A85]/20 border border-[#FF2A85] text-[#FF2A85] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono">PROJECT INQUIRY RECEIVED</h4>
                  <p className="text-xs text-zinc-400 font-sans max-w-sm mx-auto">
                    Thank you! Your project brief has been dispatched. Karen will review your footage specs and reach out promptly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setModalSubmitted(true);
                  }}
                  className="space-y-4 font-mono text-xs"
                >
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan, Executive Producer"
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl p-3 text-white"
                  />
                  <input
                    type="email"
                    placeholder="alex@production.io"
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl p-3 text-white"
                  />
                  <textarea
                    rows={3}
                    placeholder="Tell Karen about your footage format, timeline, sound requirements..."
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl p-3 text-white"
                  />
                  <button type="submit" className="w-full bg-[#FF2A85] text-white">
                    <Send className="w-3.5 h-3.5" />
                    <span>DISPATCH INQUIRY</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 10. PROJECT DETAIL MODAL */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-[#FF2A85]/40 w-full max-w-xl rounded-[32px] p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-white">
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white font-mono text-sm cursor-pointer p-1"
            >
              ✕ ESC
            </button>

            <span className="font-mono text-xs text-[#FF2A85] font-bold uppercase tracking-widest block mb-1">
              {selectedFilm.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
              {selectedFilm.title}
            </h3>
            <p className="font-mono text-xs text-[#FF2A85] mb-4 font-semibold">
              IMDb Rating: {selectedFilm.rating} · Released {selectedFilm.year}
            </p>

            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 mb-4 bg-black relative">
              <img
                src={selectedFilm.image}
                alt={selectedFilm.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedFilm.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/10 rounded-full font-mono text-xs text-zinc-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedFilm(null);
                setModalSubmitted(false);
                setIsModalOpen(true);
              }}
              className="w-full bg-[#FF2A85] hover:bg-[#E02070] text-white font-mono text-xs font-bold py-3 rounded-full shadow-lg shadow-[#FF2A85]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inquire About Similar Production</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141416] text-white border border-[#FF2A85]/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#FF2A85] text-white flex items-center justify-center text-xs font-bold">
            ✓
          </div>
          <span className="font-sans text-xs font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
