import React, { useState, useEffect } from 'react';
import { AuthGate } from './components/AuthGate';
import { Header } from './components/Header';
import { WorkflowNav } from './components/WorkflowNav';
import { ChallengeStudio } from './components/ChallengeStudio';
import { AIMatchmaking } from './components/AIMatchmaking';
import { SandboxTracker } from './components/SandboxTracker';
import { DossierModal } from './components/DossierModal';
import { CycleComplete } from './components/CycleComplete';
import { GovernmentFooter } from './components/GovernmentFooter';
import { PolicyModal } from './components/PolicyModal';
import { DEFAULT_CHALLENGE } from './data/mockData';

const DEFAULT_BUYER = {
  role: 'buyer',
  name: "Er. S. R. Deshmukh",
  email: "officer@pmc.gov.in",
  designation: "Executive Engineer, Water Supply",
  organization: "Pune Municipal Corporation (PMC)",
  authMethod: "Jan Parichay (National SSO)",
  badge: "Municipal Nodal Officer"
};

const DEFAULT_STARTUP = {
  role: 'startup',
  name: "Dr. Ananya Rao",
  email: "founders@jaldrishti.in",
  company: "JalDrishti Telematics Pvt Ltd",
  dpiitNo: "DIPP123847",
  category: "IoT Acoustic Leak Localisation (Smart Water)",
  authMethod: "Startup India API Gateway",
  badge: "DPIIT Recognized Innovator"
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam === 'startup') return DEFAULT_STARTUP;
      if (roleParam === 'buyer') return DEFAULT_BUYER;
      const stageParam = parseInt(params.get('stage') || '', 10);
      if (stageParam && stageParam >= 1 && stageParam <= 4) return DEFAULT_BUYER;
      
      const saved = localStorage.getItem('mahaprocure_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [step, setStep] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const stageParam = parseInt(params.get('stage') || '', 10);
      if (stageParam >= 1 && stageParam <= 4) return stageParam;
      const roleParam = params.get('role');
      if (roleParam === 'startup') return 3;
      return 1;
    } catch {
      return 1;
    }
  });
  
  // Persistent Challenge State across page reloads
  const [challenge, setChallenge] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaprocure_challenge');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.budget === 1450000) {
          parsed.budget = 300000;
        }
        return parsed;
      }
      return DEFAULT_CHALLENGE;
    } catch {
      return DEFAULT_CHALLENGE;
    }
  });

  const [awardedStartup, setAwardedStartup] = useState(() => {
    try {
      return localStorage.getItem('mahaprocure_awarded') || DEFAULT_STARTUP.company;
    } catch {
      return DEFAULT_STARTUP.company;
    }
  });

  // Persistent Telemetry & Milestone Verification Flags
  const [proofUploaded, setProofUploaded] = useState(() => {
    try {
      return localStorage.getItem('mahaprocure_proof') === 'true';
    } catch {
      return false;
    }
  });

  const [stage2Verified, setStage2Verified] = useState(() => {
    try {
      return localStorage.getItem('mahaprocure_verified') === 'true';
    } catch {
      return false;
    }
  });

  const [dossierOpen, setDossierOpen] = useState(false);
  const [fontScale, setFontScale] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaprocure_fontscale');
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });
  const [lang, setLang] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const l = params.get('lang');
      if (l === 'mr' || l === 'en') return l;
      return localStorage.getItem('mahaprocure_lang') || 'en';
    } catch {
      return 'en';
    }
  });
  const [highContrast, setHighContrast] = useState(() => {
    try {
      return localStorage.getItem('mahaprocure_contrast') === 'true';
    } catch {
      return false;
    }
  });
  const [policyModalType, setPolicyModalType] = useState(null);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mahaprocure_challenge', JSON.stringify(challenge));
    } catch (e) {
      console.warn(e);
    }
  }, [challenge]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('mahaprocure_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('mahaprocure_user');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('mahaprocure_fontscale', String(fontScale));
      localStorage.setItem('mahaprocure_lang', lang);
      localStorage.setItem('mahaprocure_contrast', String(highContrast));
    } catch (e) {
      console.warn(e);
    }
  }, [fontScale, lang, highContrast]);

  useEffect(() => {
    try {
      localStorage.setItem('mahaprocure_awarded', awardedStartup);
      localStorage.setItem('mahaprocure_proof', String(proofUploaded));
      localStorage.setItem('mahaprocure_verified', String(stage2Verified));
    } catch (e) {
      console.warn(e);
    }
  }, [awardedStartup, proofUploaded, stage2Verified]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;
      const p = new URLSearchParams(window.location.search);
      const s = state?.step || parseInt(p.get('stage') || '1', 10);
      const r = state?.role || p.get('role');
      if (s >= 1 && s <= 4) setStep(s);
      if (r === 'startup') setCurrentUser(DEFAULT_STARTUP);
      else if (r === 'buyer') setCurrentUser(DEFAULT_BUYER);
      if (state && typeof state.proofUploaded !== 'undefined') {
        setProofUploaded(state.proofUploaded);
      }
      if (state && typeof state.stage2Verified !== 'undefined') {
        setStage2Verified(state.stage2Verified);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // sync stage & role to url
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const params = new URLSearchParams();
    params.set('stage', String(step));
    params.set('role', currentUser.role);
    if (lang === 'mr') params.set('lang', 'mr');
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    
    window.history.replaceState(
      { step, role: currentUser.role, proofUploaded, stage2Verified },
      '',
      newUrl
    );
  }, [step, currentUser, lang, proofUploaded, stage2Verified]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale * 100}%`;
  }, [fontScale]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'buyer') {
      setStep(1);
    } else if (user.role === 'startup') {
      const startupCo = user.company || DEFAULT_STARTUP.company;
      setAwardedStartup(startupCo);
      setStep(3);
    }
  };

  const handleSwitchPersona = () => {
    if (!currentUser || currentUser.role === 'buyer') {
      // Switch to Startup Persona
      setCurrentUser(DEFAULT_STARTUP);
      if (!awardedStartup) setAwardedStartup(DEFAULT_STARTUP.company);
      // If currently before Step 3, proceed to Step 3, otherwise preserve active step
      setStep((prev) => (prev < 3 ? 3 : prev));
    } else {
      // Switch to Government Buyer Persona without resetting step, allowing inspection on Step 3 or 4
      setCurrentUser(DEFAULT_BUYER);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStep(1);
    try {
      localStorage.removeItem('mahaprocure_user');
    } catch (e) {
      console.warn(e);
    }
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const handleChallengeChange = (updates) => {
    setChallenge((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setStep(1);
    setAwardedStartup(DEFAULT_STARTUP.company);
    setProofUploaded(false);
    setStage2Verified(false);
    setDossierOpen(false);
    setChallenge({ ...DEFAULT_CHALLENGE });
    try {
      localStorage.removeItem('mahaprocure_challenge');
      localStorage.removeItem('mahaprocure_awarded');
      localStorage.removeItem('mahaprocure_proof');
      localStorage.removeItem('mahaprocure_verified');
      localStorage.removeItem('mahaprocure_dsc_tier3_signed');
      localStorage.removeItem('mahaprocure_dsc_tier3_time');
      localStorage.removeItem('mahaprocure_sanction_ref');
    } catch (e) {
      console.warn(e);
    }
    const params = new URLSearchParams();
    params.set('stage', '1');
    params.set('role', currentUser?.role || 'buyer');
    if (lang === 'mr') params.set('lang', 'mr');
    window.history.replaceState({ step: 1, role: currentUser?.role || 'buyer' }, '', `${window.location.pathname}?${params.toString()}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-accent/20">
        <AuthGate onLogin={handleLogin} />
        <PolicyModal
          type={policyModalType}
          onClose={() => setPolicyModalType(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-accent/20">
      <Header
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'mr' : 'en'))}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        onOpenPolicyModal={(type) => setPolicyModalType(type)}
        currentUser={currentUser}
        onSwitchPersona={handleSwitchPersona}
        onLogout={handleLogout}
        currentStep={step}
        onNavigateStep={setStep}
      />

      {/* Active Persona Context Banner for Presentation (Hidden during print) */}
      <div className="mx-auto max-w-5xl px-4 pt-3 pb-0 sm:px-6 w-full print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-border bg-card px-3 py-1.5 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
              currentUser.role === 'buyer'
                ? "bg-slate-100 text-[#0b2545] border-slate-300"
                : "bg-emerald-50 text-emerald-900 border-emerald-300"
            }`}>
              {currentUser.role === 'buyer' ? 'Role: Municipal Buyer' : 'Role: DPIIT Startup'}
            </span>
            <span className="text-muted-foreground font-medium">
              {currentUser.role === 'buyer'
                ? `${currentUser.organization || 'Pune Municipal Corporation'} · ${currentUser.designation || 'Executive Engineer'} (${currentUser.email})`
                : `${currentUser.company || 'JalDrishti Telematics'} · DPIIT #${currentUser.dpiitNo || 'DIPP123847'} (GFR 173i Prior Experience Waived)`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="bg-primary/5 text-primary border border-border px-2 py-0.5 rounded font-mono font-semibold">
              {currentUser.authMethod}
            </span>
          </div>
        </div>
      </div>

      <WorkflowNav current={step} lang={lang} onSelectStep={setStep} />

      {/* Main Workflow Stage Container (Hidden during print to prevent bleed) */}
      <main id="main-content" className="flex-1 pb-10 print:hidden">
        {step === 1 && (
          <ChallengeStudio
            challenge={challenge}
            onChange={handleChallengeChange}
            onSubmit={() => setStep(2)}
            currentUser={currentUser}
            lang={lang}
          />
        )}

        {step === 2 && (
          <AIMatchmaking
            challenge={challenge}
            onBack={() => setStep(1)}
            onAward={(startupName) => {
              setAwardedStartup(startupName);
              setStep(3);
            }}
            lang={lang}
          />
        )}

        {step === 3 && (
          <SandboxTracker
            challenge={challenge}
            awardedStartup={awardedStartup}
            proofUploaded={proofUploaded}
            stage2Verified={stage2Verified}
            currentUser={currentUser}
            onUploadProof={() => setProofUploaded(true)}
            onVerify={() => setStage2Verified(true)}
            onBack={() => setStep(2)}
            onGenerate={() => {
              setStep(4);
              setDossierOpen(true);
            }}
            lang={lang}
          />
        )}

        {step === 4 && (
          <CycleComplete
            challenge={challenge}
            awardedStartup={awardedStartup}
            onReopenDossier={() => setDossierOpen(true)}
            onReset={handleReset}
            lang={lang}
          />
        )}
      </main>

      {/* Official Government Sanction Order Dossier Modal */}
      <DossierModal
        open={dossierOpen}
        challenge={challenge}
        awardedStartup={awardedStartup}
        onClose={() => {
          setDossierOpen(false);
          setStep(4);
        }}
        lang={lang}
      />

      {/* Statutory Guidelines & Policy Modal */}
      <PolicyModal
        type={policyModalType}
        onClose={() => setPolicyModalType(null)}
      />

      {/* GIGW Official Government Footer */}
      <GovernmentFooter
        onOpenPolicyModal={(type) => setPolicyModalType(type)}
      />
    </div>
  );
}
