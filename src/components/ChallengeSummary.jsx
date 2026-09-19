import React from 'react';
import { Building2, MapPin, Target, IndianRupee, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../lib/utils';

export function ChallengeSummary({ challenge }) {
  const cleanWard = (challenge?.ward || "Kothrud (Ward No. 12)")
    .replace(/\bWard\s+\(Ward/gi, '(Ward')
    .trim();

  return (
    <div className="rounded-lg border-2 border-[#cbd5e1] bg-white shadow-xs overflow-hidden">
      {/* 1. Official Government File Strip */}
      <div className="bg-[#0b2545] px-4 py-2 text-white flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-b border-[#163b6d]">
        <div className="flex items-center gap-2">
          <FileText className="size-3.5 text-[#ff9933]" />
          <span className="font-bold tracking-wider">
            REQUISITION DOSSIER: <span className="text-[#ff9933]">MSInS/PMC/2026/0491</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <span className="hidden sm:inline">Statutory Regime: <strong>GFR Rule 166 (Single Source)</strong></span>
          <span>•</span>
          <span className="text-emerald-300 font-semibold flex items-center gap-1">
            <CheckCircle2 className="size-3" /> GFR 173(i) Waived
          </span>
        </div>
      </div>

      {/* 2. Sponsoring Authority & Challenge Scope */}
      <div className="p-4 sm:p-5 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded bg-[#0b2545] text-white shadow-xs">
              <Building2 className="size-5 text-[#ff9933]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#b45309]">
                {challenge.department}
              </p>
              <h2 className="mt-0.5 text-base sm:text-lg font-serif font-bold text-[#0b2545] leading-tight">
                {challenge.title}
              </h2>
            </div>
          </div>
          <div className="self-start sm:self-auto shrink-0">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded text-xs font-bold font-mono">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Pilot Sanction Active
            </span>
          </div>
        </div>

        {/* 3. Four-Column Statutory Parameter Matrix */}
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-sans">
          <div className="rounded border border-slate-200 bg-slate-50/75 p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
              <IndianRupee className="size-3 text-[#0b2545]" /> Sanctioned Budget
            </span>
            <p className="mt-0.5 text-sm font-bold font-mono text-[#0b2545]">
              {formatINR(challenge.budget)}
            </p>
            <span className="text-[10px] text-emerald-700 font-semibold">Within ₹15L GFR Cap</span>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50/75 p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
              <MapPin className="size-3 text-[#b45309]" /> Field Ward Area
            </span>
            <p className="mt-0.5 text-xs font-bold text-slate-800 truncate" title={cleanWard}>
              {cleanWard}
            </p>
            <span className="text-[10px] text-slate-500 font-mono">PMC Smart SCADA Grid</span>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50/75 p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
              <Target className="size-3 text-emerald-600" /> KPI Deliverable
            </span>
            <p className="mt-0.5 text-xs font-bold text-slate-800 truncate" title={challenge.kpi}>
              {challenge.kpi}
            </p>
            <span className="text-[10px] text-slate-500">60-Day Field Validation</span>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50/75 p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Budget Head (HOA)
            </span>
            <p className="mt-0.5 text-xs font-bold font-mono text-slate-800">
              2217-01-800-01
            </p>
            <span className="text-[10px] text-slate-500 font-mono">PFMS Direct Disbursed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
