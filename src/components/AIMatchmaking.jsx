import React, { useState } from 'react';
import {
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  Scale,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { Button } from './ui/button';
import { ChallengeSummary } from './ChallengeSummary';
import { AIMatchExplanationModal } from './AIMatchExplanationModal';
import { MATCHED_STARTUPS } from '../data/mockData';
import { MaharashtraSeal } from './OfficialEmblems';
import { t } from '../data/translations';

export function AIMatchmaking({ challenge, onBack, onAward, lang = 'en' }) {
  const [explainingStartup, setExplainingStartup] = useState(null);

  return (
    <section aria-labelledby="match-title" className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* Official Government Evaluation Committee Header */}
      <div className="mb-5 rounded border border-border bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-xs bg-[#0b2545] text-white font-bold text-xs font-mono">
              02
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
                {t(lang, 'scrutiny.reportCode')}
              </span>
              <h1 id="match-title" className="text-lg sm:text-xl font-serif font-bold text-primary tracking-tight">
                {t(lang, 'scrutiny.heading')}
              </h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            <CheckCircle2 className="size-3.5 text-emerald-600" />
            {t(lang, 'scrutiny.shortlistedCount')}
          </span>
        </div>

        {/* Regulatory Citation */}
        <div className="mt-3 flex items-start gap-2.5 rounded bg-[#fffbeb] p-3 text-xs text-[#92400e] border border-amber-200">
          <Scale className="size-4 shrink-0 mt-0.5 text-[#b45309]" />
          <p className="leading-relaxed">
            <strong>Statutory Scrutiny Mandate:</strong> {t(lang, 'scrutiny.regulatoryNotice')}
          </p>
        </div>
      </div>

      <ChallengeSummary challenge={challenge} />

      {/* Scrutiny Results & Comparative Rankings */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <FileCheck2 className="size-4 text-[#0b2545]" />
              <span>Scrutiny Comparative Statement (Ranked by Merit Index)</span>
            </h2>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
            Engine: ATES Matrix v2.4 (NIC-CERT Validated)
          </span>
        </div>

        <ul className="grid gap-4">
          {MATCHED_STARTUPS.map((startup, idx) => {
            const isTopMatch = idx === 0;

            return (
              <li
                key={startup.name}
                className={
                  isTopMatch
                    ? "govt-card border-2 border-[#0b2545] p-5 sm:p-6 shadow-sm relative overflow-hidden bg-white border-t-4 border-t-[#0b2545]"
                    : "govt-card border border-slate-300 bg-white p-5 shadow-2xs relative"
                }
              >
                {/* Official Merit Ranking Ribbon */}
                {isTopMatch ? (
                  <div className="absolute top-0 right-0 bg-[#0b2545] text-white text-[10px] font-bold uppercase px-3.5 py-1 rounded-bl tracking-wider shadow-xs flex items-center gap-1.5 font-mono border-b border-l border-[#163b6d]">
                    <Award className="size-3.5 text-[#ff9933]" />
                    <span>{t(lang, 'scrutiny.recommendedRank')}</span>
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase px-3 py-1 rounded-bl tracking-wider font-mono">
                    Rank {idx + 1}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1 sm:pt-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                        Rank {idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-foreground">{startup.name}</h3>
                      <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border">
                        {startup.location}
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {startup.blurb}
                    </p>

                    {/* Official Verification & Regulatory Badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {startup.verified ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                          <BadgeCheck className="size-3.5 text-emerald-600" aria-hidden="true" />
                          DPIIT Recognized (Reg: DIPP{88200 + idx * 431}) · MSInS Empaneled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                          <AlertCircle className="size-3.5 text-amber-600" />
                          DPIIT Verification Pending
                        </span>
                      )}

                      {startup.waiver && (
                        <span className="inline-flex items-center gap-1 rounded border border-amber-300 bg-[#fffbeb] px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                          <Scale className="size-3 text-[#b45309]" />
                          {t(lang, 'scrutiny.waiverBadge')}
                        </span>
                      )}
                    </div>

                    {/* Multi-parameter Evaluation Scorecard Matrix */}
                    <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-slate-100 text-[10px]">
                      <div className="bg-slate-50/80 p-2 rounded border border-slate-200">
                        <span className="text-slate-500 block">Problem Alignment:</span>
                        <strong className="text-[#0b2545] font-mono text-xs">{idx === 0 ? "96%" : idx === 1 ? "82%" : "74%"}</strong>
                        <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                          <div className="bg-[#0b2545] h-full" style={{ width: idx === 0 ? "96%" : idx === 1 ? "82%" : "74%" }} />
                        </div>
                      </div>
                      <div className="bg-slate-50/80 p-2 rounded border border-slate-200">
                        <span className="text-slate-500 block">TRL Maturity:</span>
                        <strong className="text-slate-800 font-mono text-xs">{idx === 0 ? "TRL-7 (Tested)" : idx === 1 ? "TRL-6 (Lab)" : "TRL-5"}</strong>
                        <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                          <div className="bg-emerald-600 h-full" style={{ width: idx === 0 ? "92%" : idx === 1 ? "78%" : "65%" }} />
                        </div>
                      </div>
                      <div className="bg-slate-50/80 p-2 rounded border border-slate-200">
                        <span className="text-slate-500 block">SCADA Interop:</span>
                        <strong className="text-slate-800 font-mono text-xs">{idx === 0 ? "Modbus/MQTT" : idx === 1 ? "LoRaWAN" : "REST API"}</strong>
                        <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: idx === 0 ? "95%" : idx === 1 ? "85%" : "70%" }} />
                        </div>
                      </div>
                      <div className="bg-slate-50/80 p-2 rounded border border-slate-200">
                        <span className="text-slate-500 block">GFR Exemption:</span>
                        <strong className="text-emerald-700 font-mono text-xs">Rule 173(i) Waived</strong>
                        <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                          <div className="bg-emerald-600 h-full" style={{ width: "100%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Matrix & Actions */}
                  <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                    <div className="text-left sm:text-right">
                      <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#0b2545] font-mono">
                        {startup.match}%
                      </p>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        {t(lang, 'scrutiny.meritIndex')}
                      </p>
                    </div>

                    <div className="text-right mt-1.5 hidden sm:block text-[10px] text-muted-foreground font-medium space-y-0.5">
                      <p>Technical Fit: <strong className="text-foreground">{startup.match + 2}%</strong></p>
                      <p>Regulatory Compliance: <strong className="text-emerald-700">100%</strong></p>
                    </div>

                    {/* Button: Official Detailed Scrutiny Sheet */}
                    <button
                      type="button"
                      onClick={() => setExplainingStartup(startup)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2545] hover:text-[#163b6d] underline underline-offset-2 cursor-pointer"
                    >
                      <FileText className="size-3.5 text-[#b45309]" />
                      <span>{t(lang, 'scrutiny.viewScrutinyBtn')}</span>
                    </button>
                  </div>
                </div>

                {/* Primary Action Button for Awarding */}
                <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    <span>Eligible for 60-day sandbox pilot sanction under Rule 166 GFR (Max ₹15 Lakhs)</span>
                  </div>

                  {isTopMatch ? (
                    <Button
                      onClick={() => onAward(startup.name)}
                      className="bg-[#0b2545] hover:bg-[#163b6d] text-white font-bold gap-2 text-xs py-2.5 px-5 shadow-xs transition-all active:scale-98"
                    >
                      <ShieldCheck className="size-4 text-emerald-400" />
                      <span>{t(lang, 'scrutiny.sanctionPilotBtn')}</span>
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => onAward(startup.name)}
                      className="text-xs font-semibold text-slate-700 border-slate-300"
                    >
                      Select as Alternate Vendor
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Back and Auxiliary Action Bar */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="text-xs font-semibold gap-1.5 border-slate-300 text-[#0b2545]"
          >
            <ArrowLeft className="size-3.5" />
            <span>{t(lang, 'scrutiny.returnBtn')}</span>
          </Button>

          <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline">
            Official Audit Trail Ref: TEC/PMC/2026/0491
          </span>
        </div>
      </div>

      {/* Official Government Technical Scrutiny Modal */}
      <AIMatchExplanationModal
        startup={explainingStartup}
        challenge={challenge}
        open={Boolean(explainingStartup)}
        onClose={() => setExplainingStartup(null)}
      />
    </section>
  );
}
