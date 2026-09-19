import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building2,
  Rocket,
  Lock,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  FileCheck,
  BadgeCheck,
  Cpu,
  Info,
  ExternalLink,
  ChevronRight,
  Clock,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';
import { AshokaEmblem, MaharashtraSeal, DigitalIndiaLogo, StartupIndiaLogo } from './OfficialEmblems';

export function AuthGate({ onLogin }) {
  // Live IST Clock
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ' ' +
        now.toLocaleTimeString('en-GB', { hour12: false }) +
        ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Buyer state
  const [buyerEmail, setBuyerEmail] = useState("officer@pmc.gov.in");
  const [buyerDesignation, setBuyerDesignation] = useState("Executive Engineer, Water Supply");
  const [buyerDept, setBuyerDept] = useState("Pune Municipal Corporation (PMC)");
  const [buyerCaptchaCode, setBuyerCaptchaCode] = useState("7M9K2");
  const [buyerCaptcha, setBuyerCaptcha] = useState("7M9K2");
  const [buyerCaptchaError, setBuyerCaptchaError] = useState("");

  // Startup state
  const [startupRegNo, setStartupRegNo] = useState("DIPP123847");
  const [startupCompany, setStartupCompany] = useState("JalDrishti Telematics Pvt Ltd");
  const [startupCategory, setStartupCategory] = useState("IoT Acoustic Leak Localisation (Smart Water)");
  const [startupCaptchaCode, setStartupCaptchaCode] = useState("4W8P6");
  const [startupCaptcha, setStartupCaptcha] = useState("4W8P6");
  const [startupCaptchaError, setStartupCaptchaError] = useState("");

  const refreshBuyerCaptcha = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setBuyerCaptchaCode(code);
    setBuyerCaptcha(code);
    setBuyerCaptchaError("");
  };

  const refreshStartupCaptcha = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setStartupCaptchaCode(code);
    setStartupCaptcha(code);
    setStartupCaptchaError("");
  };

  const handleBuyerSubmit = (e) => {
    e.preventDefault();
    if (buyerCaptcha.trim().toUpperCase() !== buyerCaptchaCode) {
      setBuyerCaptchaError("Incorrect Captcha code. Please enter the characters shown.");
      refreshBuyerCaptcha();
      return;
    }
    setBuyerCaptchaError("");
    onLogin({
      role: 'buyer',
      name: "Er. S. R. Deshmukh",
      email: buyerEmail,
      designation: buyerDesignation,
      organization: buyerDept,
      authMethod: "Jan Parichay (National SSO)",
      badge: "Municipal Nodal Officer"
    });
  };

  const handleStartupSubmit = (e) => {
    e.preventDefault();
    if (startupCaptcha.trim().toUpperCase() !== startupCaptchaCode) {
      setStartupCaptchaError("Incorrect Captcha code. Please enter the characters shown.");
      refreshStartupCaptcha();
      return;
    }
    setStartupCaptchaError("");
    onLogin({
      role: 'startup',
      name: "Dr. Ananya Rao",
      email: "founders@jaldrishti.in",
      company: startupCompany,
      dpiitNo: startupRegNo,
      category: startupCategory,
      authMethod: "Startup India API Gateway",
      badge: "DPIIT Recognized Innovator"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-[#0b2545] select-none">
      {/* 1. National Tiranga Ribbon */}
      <div className="flex h-1.5 w-full shrink-0">
        <div className="flex-1 bg-[#ff9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* 2. Top GIGW Security & Utility Bar */}
      <div className="border-b border-slate-300 bg-[#edf2f7] px-4 py-1.5 text-[11px] text-slate-700">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 font-semibold text-[#0b2545]">
            <span className="text-[#ff9933]">●</span>
            <span>महाराष्ट्र शासन | Government of Maharashtra</span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-600 font-normal">
              कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-600">
            {/* Live IST clock */}
            <span className="hidden sm:flex items-center gap-1 font-mono bg-white px-2 py-0.5 rounded border border-slate-300">
              <Clock className="size-3 text-[#0b2545]" />
              <span>{currentTime || 'IST'}</span>
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
              <ShieldCheck className="size-3 text-emerald-600" />
              STQC Level-2 Compliant
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden md:inline">256-Bit TLS Encryption</span>
          </div>
        </div>
      </div>

      {/* 3. Official Government Portal Header */}
      <header className="border-b border-slate-300 bg-[#0b2545] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Official Seals and Titles */}
          <div className="flex items-center gap-3.5">
            {/* Maharashtra State Seal */}
            <div className="flex items-center justify-center p-1 rounded-full border-2 border-[#c59b27] bg-white shadow-xs shrink-0">
              <MaharashtraSeal className="size-14 sm:size-16" />
            </div>

            {/* Ashoka Emblem */}
            <div className="hidden sm:flex items-center justify-center p-1 rounded bg-white shadow-xs shrink-0 border border-slate-300">
              <AshokaEmblem className="h-14 w-auto" />
            </div>

            {/* Portal Titles */}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#c59b27] text-[#0b2545] font-black text-[9px] px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                  Official Portal
                </span>
                <span className="text-white/80 text-[11px] font-medium hidden sm:inline">
                  MSInS Innovation Sandbox (शासन निर्णय क्र. सँडबॉक्स-२०२६/प्र.क्र.१४)
                </span>
              </div>
              <h1 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                MahaProcure — Public Innovation Procurement Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                <span>Government of Maharashtra</span>
                <span className="text-white/40">·</span>
                <span className="text-amber-200">Maharashtra State Innovation Society (MSInS)</span>
                <span className="text-white/40 hidden md:inline">·</span>
                <span className="text-slate-300 hidden md:inline">Pune Municipal Corporation Nodal Cell</span>
              </p>
            </div>
          </div>

          {/* Right: Partner & Initiative Logos */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            <div className="bg-white/10 px-3 py-1.5 rounded border border-white/20 flex items-center gap-3">
              <StartupIndiaLogo className="h-6 text-white" />
              <div className="h-4 w-px bg-white/30" />
              <DigitalIndiaLogo className="h-6 text-white" />
            </div>
            <div className="flex flex-col items-end text-right text-[11px]">
              <span className="bg-[#ff9933] text-[#0b2545] font-bold px-2 py-0.5 rounded text-[10px]">
                SIH26136 PROTOTYPE
              </span>
              <span className="text-white/70 text-[10px] mt-0.5">Jan Parichay SSO Gateway</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Security & Role Selection Hero Banner */}
      <div className="bg-[#07172c] border-b border-[#163b6d] py-2.5 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="size-3.5 text-[#ff9933]" />
            <span className="font-bold text-white">Jan Parichay (National SSO) / MahaGov e-Pramaan Single Sign-On Gateway</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/80 font-medium">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="size-3 text-emerald-400" />
              GFR 166 Single-Source Pilot
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="size-3 text-emerald-400" />
              DPIIT GFR 173(i) Turnover Waiver
            </span>
          </div>
        </div>
      </div>

      {/* 5. Center of Screen: Two Role-Selection Cards Side-by-Side */}
      <main className="flex-1 flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl w-full">
          {/* Section Introduction */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow-2xs mb-2">
              <KeyRound className="size-3.5 text-[#b45309]" />
              <span>Institutional Single Sign-On (SSO) Authentication</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b2545]">
              Select Institutional Login Gateway
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Access the Maharashtra Public Procurement Sandbox. Select your sanctioned role to enter the secure procurement workspace.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* ---------------------------------------------------- */}
            {/* LEFT CARD: Government Department / Municipal Body    */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col bg-white rounded border-2 border-slate-300 shadow-xs hover:border-[#0b2545] transition-colors overflow-hidden">
              {/* Card Top Banner */}
              <div className="bg-[#0b2545] p-4 text-white border-b border-[#0b2545]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-white/10 text-[#c59b27] border border-white/20 shrink-0">
                      <Building2 className="size-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27] bg-white/10 px-2 py-0.5 rounded border border-[#c59b27]/40">
                        Civic Procuring Body
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white mt-1">
                        Government Buyer Portal
                      </h3>
                    </div>
                  </div>
                  <div className="size-11 rounded-full bg-white p-1 flex items-center justify-center shrink-0 border border-white/30 shadow-xs">
                    <MaharashtraSeal className="size-9" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  For Municipal Commissioners, Jal Sansthan, and Department Nodal Officers
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Auth Badge */}
                <div className="inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-900 w-full">
                  <ShieldCheck className="size-4 text-blue-700 shrink-0" />
                  <span className="truncate">Secured via Jan Parichay (National SSO)</span>
                </div>

                {/* Form fields */}
                <form onSubmit={handleBuyerSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Official Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        required
                        className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-[#0b2545] focus:bg-white focus:ring-1 focus:ring-[#0b2545]"
                      />
                      <span className="absolute right-2.5 top-2.5 text-emerald-700" title="Domain Whitelisted (gov.in)">
                        <BadgeCheck className="size-4" />
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Whitelisted NIC / MahaGov Nodal Account
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={buyerDesignation}
                      onChange={(e) => setBuyerDesignation(e.target.value)}
                      required
                      className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-[#0b2545] focus:bg-white focus:ring-1 focus:ring-[#0b2545]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Procuring Civic Body
                    </label>
                    <input
                      type="text"
                      value={buyerDept}
                      onChange={(e) => setBuyerDept(e.target.value)}
                      className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-[#0b2545] focus:bg-white focus:ring-1 focus:ring-[#0b2545]"
                    />
                  </div>

                  {/* Security Captcha (Govt Standard) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Security Verification (Captcha)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-200 border border-slate-400 px-3 py-1.5 rounded font-mono font-black text-sm tracking-widest text-[#0b2545] select-none line-through decoration-slate-400">
                        {buyerCaptchaCode}
                      </div>
                      <button
                        type="button"
                        onClick={refreshBuyerCaptcha}
                        className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 text-slate-600"
                        title="Reload Captcha"
                      >
                        <RefreshCw className="size-3.5" />
                      </button>
                      <input
                        type="text"
                        placeholder="Enter Captcha"
                        value={buyerCaptcha}
                        onChange={(e) => setBuyerCaptcha(e.target.value)}
                        className="flex-1 rounded border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-mono font-bold uppercase outline-none focus:border-[#0b2545] focus:bg-white"
                      />
                    </div>
                    {buyerCaptchaError && (
                      <p className="mt-1 text-[11px] text-rose-600 font-semibold">{buyerCaptchaError}</p>
                    )}
                  </div>

                  {/* Primary Action Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded bg-[#0b2545] hover:bg-[#163b6d] text-white font-bold py-2.5 px-4 text-xs sm:text-sm transition-colors shadow-xs cursor-pointer border border-[#0b2545]"
                  >
                    <span>Login via Jan Parichay SSO</span>
                    <ArrowRight className="size-4" />
                  </button>
                </form>

                <p className="text-[10px] text-center text-slate-500 font-medium pt-1 border-t border-slate-200">
                  Enters Department Requisition Studio (Form-SANDBOX-01)
                </p>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT CARD: DPIIT / MSInS Registered Startup         */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col bg-white rounded border-2 border-slate-300 shadow-xs hover:border-[#0b2545] transition-colors overflow-hidden">
              {/* Card Top Banner */}
              <div className="bg-[#07172c] p-4 text-white border-b border-[#07172c]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-white/10 text-[#ff9933] border border-white/20 shrink-0">
                      <Rocket className="size-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff9933] bg-[#ff9933]/15 px-2 py-0.5 rounded border border-[#ff9933]/40">
                        Innovator / Vendor
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white mt-1">
                        Startup Innovation Portal
                      </h3>
                    </div>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    <span className="rounded bg-[#ff9933] text-[#0b2545] font-black text-[9px] px-1.5 py-0.5 uppercase">
                      #StartupIndia
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  For DPIIT-recognized tech startups seeking government sandbox pilots
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Auth Badge */}
                <div className="inline-flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-900 w-full">
                  <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
                  <span className="truncate">Verified via Startup India API Gateway</span>
                </div>

                {/* Form fields */}
                <form onSubmit={handleStartupSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Startup DPIIT Reg No
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={startupRegNo}
                        onChange={(e) => setStartupRegNo(e.target.value)}
                        required
                        className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-mono font-bold text-slate-800 outline-none focus:border-[#0b2545] focus:bg-white focus:ring-1 focus:ring-[#0b2545]"
                      />
                      <span className="absolute right-2.5 top-2.5 text-emerald-700" title="DPIIT Status Active">
                        <BadgeCheck className="size-4" />
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Certificate No: DIPP123847 · Valid under GFR 173(i)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={startupCompany}
                      onChange={(e) => setStartupCompany(e.target.value)}
                      required
                      className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-[#0b2545] focus:bg-white focus:ring-1 focus:ring-[#0b2545]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Registered Innovation Domain
                    </label>
                    <input
                      type="text"
                      value={startupCategory}
                      onChange={(e) => setStartupCategory(e.target.value)}
                      className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-[#0b2545] focus:bg-white focus:ring-1 focus:ring-[#0b2545]"
                    />
                  </div>

                  {/* Security Captcha (Govt Standard) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                      Security Verification (Captcha)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-200 border border-slate-400 px-3 py-1.5 rounded font-mono font-black text-sm tracking-widest text-[#0b2545] select-none line-through decoration-slate-400">
                        {startupCaptchaCode}
                      </div>
                      <button
                        type="button"
                        onClick={refreshStartupCaptcha}
                        className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 text-slate-600"
                        title="Reload Captcha"
                      >
                        <RefreshCw className="size-3.5" />
                      </button>
                      <input
                        type="text"
                        placeholder="Enter Captcha"
                        value={startupCaptcha}
                        onChange={(e) => setStartupCaptcha(e.target.value)}
                        className="flex-1 rounded border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-mono font-bold uppercase outline-none focus:border-[#0b2545] focus:bg-white"
                      />
                    </div>
                    {startupCaptchaError && (
                      <p className="mt-1 text-[11px] text-rose-600 font-semibold">{startupCaptchaError}</p>
                    )}
                  </div>

                  {/* Primary Action Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded bg-[#0b2545] hover:bg-[#163b6d] text-white font-bold py-2.5 px-4 text-xs sm:text-sm transition-colors shadow-xs cursor-pointer border border-[#0b2545]"
                  >
                    <span>Login via Startup India</span>
                    <ArrowRight className="size-4" />
                  </button>
                </form>

                <p className="text-[10px] text-center text-slate-500 font-medium pt-1 border-t border-slate-200">
                  Enters Startup Sandbox View (60-Day Pilot Tracker)
                </p>
              </div>
            </div>
          </div>

          {/* Statutory and Security Notice */}
          <div className="mt-6 rounded border border-slate-300 bg-white p-4 text-xs text-slate-700 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Info className="size-4 text-[#b45309] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0b2545]">Statutory Compliance Advisory:</span>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Unauthorized access to this government system is strictly prohibited under Section 43 &amp; 66 of the Information Technology Act, 2000. All transactions and digital actions are cryptographically logged for municipal audit trails.
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2 self-end sm:self-center font-mono text-[10px] text-slate-500">
                <span>IP: 10.63.120.101</span>
                <span className="inline-block size-2 rounded-full bg-emerald-600" title="Active Connection" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 6. Official Government Footer Bar */}
      <footer className="border-t border-slate-300 bg-[#edf2f7] py-3 text-center text-xs text-slate-600">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 Maharashtra State Innovation Society (MSInS), Government of Maharashtra. All Rights Reserved.
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Smart India Hackathon Prototype · Problem Statement SIH26136
          </span>
        </div>
      </footer>
    </div>
  );
}
