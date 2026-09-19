import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  RotateCcw,
  ShieldCheck,
  Award,
  Printer,
  KeyRound,
  Store,
  FileCheck2
} from 'lucide-react';
import { Button } from './ui/button';
import { formatINR } from '../lib/utils';
import { AUDIT_STEPS } from '../data/mockData';
import { MaharashtraSeal } from './OfficialEmblems';
import { CAGAuditMemoModal } from './CAGAuditMemoModal';
import { GeMOnboardingModal } from './GeMOnboardingModal';
import { MultiTierDSCModal } from './MultiTierDSCModal';
import { t } from '../data/translations';

function MetricCell({ label, value, accent }) {
  return (
    <div className="bg-card px-4 py-3 border-r last:border-r-0 border-border">
      <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={accent ? "mt-0.5 text-base font-bold font-mono text-emerald-700" : "mt-0.5 text-base font-bold font-mono text-foreground"}>
        {value}
      </dd>
    </div>
  );
}

export function CycleComplete({ challenge, awardedStartup, onReopenDossier, onReset, lang = 'en' }) {
  const [cagModalOpen, setCagModalOpen] = useState(false);
  const [gemModalOpen, setGemModalOpen] = useState(false);
  const [dscModalOpen, setDscModalOpen] = useState(false);

  return (
    <section aria-labelledby="cycle-title" className="mx-auto max-w-4xl px-4 py-8 sm:px-6 animate-in fade-in duration-300">
      <div className="govt-card border-2 border-slate-300 shadow-sm overflow-hidden bg-white border-t-8 border-t-[#0b2545]">
        {/* Official Header */}
        <div className="flex flex-col items-center border-b-2 border-slate-200 px-6 py-8 text-center bg-slate-50/75">
          <div className="flex items-center gap-3 mb-3">
            <MaharashtraSeal className="size-14" gold={true} />
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 ring-4 ring-emerald-200/50 shadow-xs">
              <CheckCircle2 className="size-8" aria-hidden="true" />
            </div>
          </div>
          <span className="text-xs font-bold text-[#b45309] uppercase tracking-widest font-mono">
            शासकीय खरेदी प्रक्रिया पूर्ण / STATUTORY PROCUREMENT CYCLE COMPLETED
          </span>
          <h2 id="cycle-title" className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-[#0b2545] text-balance">
            {t(lang, 'cycle.heading')}
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 text-pretty">
            {t(lang, 'cycle.subheading')}
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-white px-3 py-1 rounded border border-slate-300 shadow-2xs">
            <span>Audit Ref: <strong>MSInS/PMC/2026/AUDIT-FINAL-902</strong></span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-600" /> GFR 166 Cleared
            </span>
          </div>
        </div>

        {/* 4-Stage audit trail */}
        <ol className="divide-y divide-slate-200">
          {AUDIT_STEPS.map((step, idx) => (
            <li key={step.title} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-emerald-700 text-white shadow-2xs font-bold text-xs font-mono">
                0{idx + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0b2545]">
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                  {step.detail}
                </p>
              </div>
              <span className="ml-auto shrink-0 self-center rounded bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300 shadow-2xs font-mono">
                Audited &amp; Recorded
              </span>
            </li>
          ))}
        </ol>

        {/* Key Metrics dl */}
        <dl className="grid grid-cols-2 overflow-hidden border-t border-slate-200 bg-slate-100 sm:grid-cols-4">
          <MetricCell
            label="Awarded Vendor"
            value={awardedStartup || "JalDrishti Telematics Pvt Ltd"}
          />
          <MetricCell
            label="Sanctioned Budget"
            value={formatINR(challenge.budget)}
          />
          <MetricCell
            label="KPI Achieved"
            value="21.3% Net Reduction"
            accent={true}
          />
          <MetricCell
            label="Pilot Duration"
            value="60 Days"
          />
        </dl>
      </div>

      {/* Statutory Defense & Onboarding Modules Strip */}
      <div className="mt-4 p-4 rounded-lg border-2 border-slate-300 bg-white shadow-xs space-y-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-700">
          <ShieldCheck className="size-4 text-[#b45309]" />
          <span>Statutory Defense, Verification &amp; National Marketplace Gateways:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCagModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-[#0b2545] font-bold text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
          >
            <ShieldCheck className="size-3.5 text-emerald-700" />
            <span>{t(lang, 'cycle.pacMemoBtn')} (SHA-256)</span>
          </button>

          <button
            type="button"
            onClick={() => setGemModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-300 bg-blue-50/80 hover:bg-blue-100 text-[#0b2545] font-bold text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
          >
            <Store className="size-3.5 text-blue-700" />
            <span>{t(lang, 'cycle.gemGatewayBtn')}</span>
          </button>

          <button
            type="button"
            onClick={() => setDscModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-[#0b2545] font-bold text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
          >
            <KeyRound className="size-3.5 text-[#b45309]" />
            <span>{t(lang, 'cycle.dscSanctionBtn')}</span>
          </button>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          size="lg"
          className="w-full sm:w-auto gap-2 font-bold px-6 h-10 bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs"
          onClick={onReopenDossier}
        >
          <FileText className="size-4" aria-hidden="true" />
          {t(lang, 'cycle.reopenDossierBtn')}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto gap-2 font-bold px-6 h-10 border-slate-400 text-[#0b2545] text-xs"
          onClick={onReset}
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {t(lang, 'cycle.resetBtn')}
        </Button>
      </div>

      {/* Modals */}
      <CAGAuditMemoModal
        open={cagModalOpen}
        onClose={() => setCagModalOpen(false)}
        challenge={challenge}
        awardedStartup={awardedStartup}
      />

      <GeMOnboardingModal
        open={gemModalOpen}
        onClose={() => setGemModalOpen(false)}
        challenge={challenge}
        awardedStartup={awardedStartup}
      />

      <MultiTierDSCModal
        open={dscModalOpen}
        onClose={() => setDscModalOpen(false)}
        challenge={challenge}
        awardedStartup={awardedStartup}
      />
    </section>
  );
}
