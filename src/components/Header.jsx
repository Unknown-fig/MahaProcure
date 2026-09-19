import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Eye,
  Volume2,
  Bell,
  ShieldCheck,
  Pause,
  Play,
  FileText,
  ExternalLink,
  ArrowLeftRight,
  LogOut,
  Building2,
  Rocket,
  Clock,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { AshokaEmblem, MaharashtraSeal, DigitalIndiaLogo, StartupIndiaLogo } from './OfficialEmblems';
import { t } from '../data/translations';

export function Header({
  fontScale = 1,
  onFontScaleChange,
  lang = 'en',
  onLangToggle,
  highContrast = false,
  onToggleHighContrast,
  onOpenPolicyModal,
  currentUser,
  onSwitchPersona,
  onLogout,
  currentStep = 1,
  onNavigateStep
}) {
  const isMarathi = lang === 'mr';
  const [tickerPaused, setTickerPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock (Standard requirement for Indian Government Procurement Portals)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' IST';
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-card shadow-xs border-b border-border select-none">
      {/* 1. National Tiranga Ribbon */}
      <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-[#ff9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* 2. GIGW Standard Government Utility & Accessibility Top Bar */}
      <div className="border-b border-border bg-[#edf2f7] text-[11px] text-slate-700">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#0b2545] flex items-center gap-1.5">
              <span className="text-[#ff9933] text-xs">●</span>
              {t(lang, 'stateMarathi')} | {t(lang, 'stateTitle')}
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-600 font-medium">
              <Phone className="size-3 text-[#b45309]" />
              {t(lang, 'tollFree')}
            </span>
            <span className="hidden xl:inline text-slate-300">|</span>
            {/* Live IST Clock */}
            <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-slate-600 font-semibold bg-white px-2 py-0.5 rounded border border-slate-300">
              <Clock className="size-3 text-[#0b2545]" />
              <span>{currentTime || 'IST (UTC+05:30)'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Screen Reader */}
            <a
              href="#main-content"
              className="hidden lg:flex items-center gap-1 text-slate-600 hover:text-[#0b2545] transition-colors"
              title="Screen Reader Access"
            >
              <Volume2 className="size-3" />
              <span>{t(lang, 'screenReader')}</span>
            </a>
            <span className="hidden lg:inline text-slate-300">|</span>

            {/* Skip to Content */}
            <a href="#main-content" className="text-slate-600 hover:text-[#0b2545] transition-colors font-medium">
              {t(lang, 'skipToMain')}
            </a>
            <span className="text-slate-300">|</span>

            {/* High Contrast Mode Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] border font-semibold transition-colors cursor-pointer ${
                highContrast
                  ? "bg-foreground text-background border-foreground font-bold"
                  : "border-slate-300 bg-white hover:bg-slate-100 text-[#0b2545]"
              }`}
              title="GIGW High Contrast Mode"
            >
              <Eye className="size-3" />
              <span className="hidden sm:inline">{highContrast ? t(lang, 'normalContrast') : t(lang, 'highContrast')}</span>
            </button>
            <span className="text-slate-300">|</span>

            {/* Font Sizing Buttons (GIGW Standard A- A A+) */}
            <div className="flex items-center gap-1 select-none font-bold">
              <button
                type="button"
                onClick={() => onFontScaleChange && onFontScaleChange(0.9)}
                className={`px-1.5 py-0.5 rounded border border-slate-300 transition-colors cursor-pointer ${
                  fontScale < 1 ? "bg-[#0b2545] text-white" : "bg-white hover:bg-slate-100 text-[#0b2545]"
                }`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onFontScaleChange && onFontScaleChange(1)}
                className={`px-1.5 py-0.5 rounded border border-slate-300 transition-colors cursor-pointer ${
                  fontScale === 1 ? "bg-[#0b2545] text-white" : "bg-white hover:bg-slate-100 text-[#0b2545]"
                }`}
                title="Default Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontScaleChange && onFontScaleChange(1.1)}
                className={`px-1.5 py-0.5 rounded border border-slate-300 transition-colors cursor-pointer ${
                  fontScale > 1 ? "bg-[#0b2545] text-white" : "bg-white hover:bg-slate-100 text-[#0b2545]"
                }`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>
            <span className="text-slate-300">|</span>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={onLangToggle}
              className="cursor-pointer hover:text-white hover:bg-[#0b2545] font-bold text-[11px] px-2 py-0.5 rounded border border-slate-300 bg-white text-[#0b2545] transition-colors"
            >
              {isMarathi ? "English" : "मराठी"}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Government Emblems & Ministry Masthead */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Official Seals: Maharashtra State Seal + Ashoka Lion Capital */}
          <div className="flex items-center gap-3.5">
            {/* Maharashtra State Seal */}
            <div className="flex items-center justify-center p-1 rounded-full border-2 border-[#c59b27] bg-white shadow-xs shrink-0">
              <MaharashtraSeal className="size-14 sm:size-16" />
            </div>

            {/* Ashoka Lion Capital */}
            <div className="hidden sm:flex items-center justify-center pl-1 pr-3 border-r border-slate-300 shrink-0">
              <AshokaEmblem className="h-14 w-auto" />
            </div>

            {/* Department Title & Typography */}
            <div className="leading-tight">
              <p className="font-serif text-base font-bold tracking-tight text-[#0b2545] sm:text-lg">
                महाराष्ट्र राज्य नवउद्यम संस्था (MSInS)
              </p>
              <p className="font-serif text-sm font-bold tracking-tight text-[#0b2545] sm:text-base">
                MahaProcure — Public Innovation Procurement Sandbox Portal
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600 font-medium">
                कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग · Government of Maharashtra
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-600 font-medium">
                <span className="bg-slate-100 text-[#0b2545] px-2 py-0.5 rounded border border-slate-300 font-semibold">
                  पुणे महानगरपालिका (PMC) Nodal Sandbox
                </span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="hidden md:inline text-slate-500 font-mono">
                  GFR 2017 Rule 166 / DoE OM F.20/2/2014-PPD
                </span>
              </div>
            </div>
          </div>

          {/* Right: National Initiatives & Official Certifications */}
          <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-3">
              <StartupIndiaLogo className="h-6" />
              <div className="h-5 w-px bg-slate-300" />
              <DigitalIndiaLogo className="h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded bg-[#0b2545] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs font-mono">
                SIH26136 PROTOTYPE
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                <ShieldCheck className="size-3 text-emerald-600" />
                STQC Audited
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Official Government Portal Dark Navy Strip & Sub-navigation */}
      <div className="bg-[#0b2545] text-white border-t border-[#133c64]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2.5 px-4 py-2 text-xs sm:px-6">
          {/* Official Nav Menu Items */}
          <nav aria-label="Portal main navigation" className="flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => onNavigateStep && onNavigateStep(1)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
                currentStep === 1 ? "bg-white text-[#0b2545] font-bold shadow-xs" : "text-white/90 hover:bg-white/10"
              }`}
            >
              1. {t(lang, 'steps.step1Title')}
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>

            <button
              type="button"
              onClick={() => onNavigateStep && onNavigateStep(2)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
                currentStep === 2 ? "bg-white text-[#0b2545] font-bold shadow-xs" : "text-white/90 hover:bg-white/10"
              }`}
            >
              2. {t(lang, 'steps.step2Title')}
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>

            <button
              type="button"
              onClick={() => onNavigateStep && onNavigateStep(3)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
                currentStep === 3 ? "bg-white text-[#0b2545] font-bold shadow-xs" : "text-white/90 hover:bg-white/10"
              }`}
            >
              3. {t(lang, 'steps.step3Title')}
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>

            <button
              type="button"
              onClick={() => onNavigateStep && onNavigateStep(4)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
                currentStep >= 4 ? "bg-white text-[#0b2545] font-bold shadow-xs" : "text-white/90 hover:bg-white/10"
              }`}
            >
              4. {t(lang, 'steps.step4Title')}
            </button>
            <span className="text-white/30 hidden md:inline">|</span>

            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('gem')}
              className="px-2 py-1 text-amber-300 hover:text-white transition-colors cursor-pointer font-medium hidden md:inline-flex items-center gap-1"
            >
              MahaGEMS / GeM
            </button>
            <span className="text-white/30 hidden lg:inline">|</span>

            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('gfr')}
              className="px-2 py-1 text-white/80 hover:text-white transition-colors cursor-pointer font-medium hidden lg:inline"
            >
              GFR 166 Rules
            </button>
          </nav>

          {/* Active Persona Switcher Controls & Session Controls */}
          <div className="flex items-center gap-2">
            {currentUser && (
              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded border border-white/20">
                {/* Active Persona Pill */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px]">
                  {currentUser.role === 'buyer' ? (
                    <>
                      <Building2 className="size-3.5 text-amber-300 shrink-0" />
                      <span className="text-amber-300 font-bold">Officer:</span>
                      <span className="text-white max-w-[120px] sm:max-w-none truncate font-medium">
                        {currentUser.designation || currentUser.email}
                      </span>
                    </>
                  ) : (
                    <>
                      <Rocket className="size-3.5 text-[#ff9933] shrink-0" />
                      <span className="text-[#ff9933] font-bold">DPIIT Startup:</span>
                      <span className="text-white max-w-[120px] sm:max-w-none truncate font-medium">
                        {currentUser.company || 'JalDrishti Telematics'}
                      </span>
                    </>
                  )}
                </div>

                {/* Switch Persona Button */}
                <button
                  type="button"
                  onClick={onSwitchPersona}
                  className="flex items-center gap-1 bg-[#ff9933] hover:bg-[#e68522] text-[#0b2545] font-bold text-[11px] px-2.5 py-1 rounded transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Switch between Officer and Startup views during presentation"
                >
                  <ArrowLeftRight className="size-3" />
                  <span className="hidden sm:inline">Switch to</span> {currentUser.role === 'buyer' ? 'Startup View' : 'Buyer Studio'}
                </button>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white text-[11px] px-2 py-1 rounded border border-white/20 transition-colors cursor-pointer"
                  title="Logout session"
                >
                  <LogOut className="size-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Live Government Resolution (GR) Notification Marquee */}
      <div className="border-b border-border bg-[#fffbeb] text-xs text-[#92400e] overflow-hidden flex items-center">
        <div className="bg-[#b45309] text-white px-3 py-1 font-bold shrink-0 flex items-center gap-1.5 text-[11px] shadow-xs z-10">
          <Bell className="size-3" />
          <span>शासन निर्णय / NOTIFICATIONS:</span>
        </div>

        <div className="overflow-hidden relative flex-1 py-1 px-3">
          <div
            className={`animate-ticker ${tickerPaused ? 'pause' : ''}`}
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            <span className="mx-4 font-medium">
              ★ <strong>GR No. MSInS-2026/CR-14:</strong> Maharashtra State Innovative Startup Policy enables Direct Procurement Pilot sanction up to ₹15 Lakhs under GFR Rule 166.
            </span>
            <span className="mx-4 font-medium">
              ★ <strong>DoE OM F.20/2/2014-PPD:</strong> Mandatory waiver of Prior Turnover &amp; Prior Experience for DPIIT-recognized startups in Public Procurement.
            </span>
            <span className="mx-4 font-medium">
              ★ <strong>PMC Municipal Resolution:</strong> Direct work orders issued upon 60-day sandbox pilot verification for Smart City civic utilities.
            </span>
            <span className="mx-4 font-medium">
              ★ <strong>GeM MahaPortal:</strong> Direct vendor onboarding integration active for sandbox-certified innovations under Rule 144 of GFR.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTickerPaused(!tickerPaused)}
          className="px-2 py-1 text-slate-500 hover:text-slate-800 shrink-0 border-l border-border bg-[#fff7ed] cursor-pointer"
          title={tickerPaused ? "Resume notifications scroll" : "Pause notifications scroll"}
        >
          {tickerPaused ? <Play className="size-3" /> : <Pause className="size-3" />}
        </button>
      </div>
    </header>
  );
}
