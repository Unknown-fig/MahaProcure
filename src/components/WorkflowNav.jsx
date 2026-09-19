import React from 'react';
import { Check, ChevronRight, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { t } from '../data/translations';

export function WorkflowNav({ current = 1, lang = 'en', onSelectStep }) {
  const steps = [
    {
      id: 1,
      code: t(lang, 'steps.step1Code'),
      label: t(lang, 'steps.step1Title'),
      sub: t(lang, 'steps.step1Sub'),
      status: current > 1 ? 'Approved' : current === 1 ? 'Formulating' : 'Pending'
    },
    {
      id: 2,
      code: t(lang, 'steps.step2Code'),
      label: t(lang, 'steps.step2Title'),
      sub: t(lang, 'steps.step2Sub'),
      status: current > 2 ? 'L-1 Ranked' : current === 2 ? 'In Scrutiny' : 'Pending'
    },
    {
      id: 3,
      code: t(lang, 'steps.step3Code'),
      label: t(lang, 'steps.step3Title'),
      sub: t(lang, 'steps.step3Sub'),
      status: current > 3 ? 'Target Met' : current === 3 ? 'Live SCADA' : 'Pending'
    },
    {
      id: 4,
      code: t(lang, 'steps.step4Code'),
      label: t(lang, 'steps.step4Title'),
      sub: t(lang, 'steps.step4Sub'),
      status: current >= 4 ? 'Sanctioned' : 'Awaiting Pilot'
    },
  ];

  const effectiveCurrent = current;

  return (
    <nav aria-label="Procurement statutory workflow progress" className="mx-auto max-w-5xl px-4 pt-4 pb-2 sm:px-6 select-none print:hidden">
      <div className="rounded-lg border-2 border-slate-300 bg-white shadow-xs overflow-hidden">
        {/* e-Office Pipeline Tracking Header */}
        <div className="bg-[#edf2f7] px-4 py-1.5 border-b border-slate-300 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-700 font-mono">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-[#ff9933] animate-pulse" />
            <span className="font-bold text-[#0b2545]">
              e-OFFICE STATUTORY DISPATCH PIPELINE:
            </span>
            <span className="text-slate-600 hidden sm:inline">MSInS/PROC/2026/89410</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-slate-500">
              Authority: <strong>MSInS &amp; PMC Sponsoring Body</strong>
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="size-3" /> GFR 166 Compliant
            </span>
          </div>
        </div>

        {/* 4 Interactive Process Nodes */}
        <ol className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {steps.map((step) => {
            const isCompleted = effectiveCurrent > step.id;
            const isActive = effectiveCurrent === step.id;

            return (
              <li
                key={step.id}
                onClick={() => onSelectStep && onSelectStep(step.id)}
                className={cn(
                  "p-3 transition-all cursor-pointer relative group",
                  isActive && "bg-slate-50/80 border-b-2 md:border-b-0 md:border-t-2 border-t-[#0b2545]",
                  isCompleted && "bg-emerald-50/30 hover:bg-emerald-50/60",
                  !isCompleted && !isActive && "hover:bg-slate-50 opacity-80 hover:opacity-100"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded text-xs font-bold font-mono transition-colors shadow-2xs mt-0.5",
                      isCompleted && "bg-emerald-700 text-white",
                      isActive && "bg-[#0b2545] text-white ring-2 ring-[#0b2545]/20",
                      !isCompleted && !isActive && "border border-slate-300 bg-slate-100 text-slate-500"
                    )}
                  >
                    {isCompleted ? <Check className="size-4" aria-hidden="true" /> : `0${step.id}`}
                  </span>

                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase">
                        {step.code}
                      </span>
                      <span className={cn(
                        "text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase tracking-wider",
                        isCompleted && "bg-emerald-100 text-emerald-800",
                        isActive && "bg-amber-100 text-amber-900 border border-amber-300",
                        !isCompleted && !isActive && "bg-slate-100 text-slate-500"
                      )}>
                        {step.status}
                      </span>
                    </div>

                    <p className={cn(
                      "text-xs font-bold truncate mt-1",
                      isActive ? "text-[#0b2545]" : isCompleted ? "text-emerald-950" : "text-slate-700"
                    )}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {step.sub}
                    </p>
                  </div>
                </div>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b2545]" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
