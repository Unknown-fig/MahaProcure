import React, { useState } from 'react';
import {
  Gauge,
  IndianRupee,
  Upload,
  CheckCircle2,
  CircleDashed,
  FileCheck2,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Hash,
  Clock,
  Building2,
  CreditCard,
  KeyRound,
  Copy,
  Check,
  FileText,
  Store
} from 'lucide-react';
import { Button } from './ui/button';
import { formatINR } from '../lib/utils';
import { ChallengeSummary } from './ChallengeSummary';
import { WardGISMap } from './WardGISMap';
import { MultiTierDSCModal } from './MultiTierDSCModal';
import { CAGAuditMemoModal } from './CAGAuditMemoModal';
import { GeMOnboardingModal } from './GeMOnboardingModal';
import { t } from '../data/translations';

function MilestoneItem({ index, title, subheader, state, badge, children }) {
  const isVerified = state === "verified";
  const isActive = state === "active";

  return (
    <li className={`govt-card p-5 sm:p-6 bg-white border-2 border-slate-300 shadow-xs relative overflow-hidden transition-all ${
      isVerified ? "border-t-4 border-t-emerald-600" : isActive ? "border-t-4 border-t-[#0b2545]" : "border-t-4 border-t-slate-300 opacity-90"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-start gap-3.5">
          <span
            className={
              isVerified
                ? "flex size-9 items-center justify-center rounded bg-emerald-700 text-white shadow-xs font-bold text-sm shrink-0 mt-0.5"
                : isActive
                ? "flex size-9 items-center justify-center rounded bg-[#0b2545] text-white font-bold text-sm shadow-xs shrink-0 mt-0.5"
                : "flex size-9 items-center justify-center rounded border border-slate-300 bg-slate-100 text-slate-500 shrink-0 mt-0.5"
            }
          >
            {isVerified ? (
              <CheckCircle2 className="size-5" aria-hidden="true" />
            ) : isActive ? (
              index
            ) : (
              <CircleDashed className="size-5" aria-hidden="true" />
            )}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b45309]">
                टप्पा / STAGE 0{index}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {subheader}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#0b2545] mt-0.5">{title}</h2>
          </div>
        </div>
        <span
          className={
            isVerified
              ? "inline-flex items-center gap-1.5 self-start rounded bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300 shadow-2xs"
              : isActive
              ? "inline-flex items-center gap-1.5 self-start rounded bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300 shadow-2xs font-mono"
              : "inline-flex items-center gap-1.5 self-start rounded bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 border border-slate-300"
          }
        >
          {isVerified && <ShieldCheck className="size-3.5 text-emerald-600" />}
          {isActive && <Clock className="size-3.5 text-amber-600" />}
          {badge}
        </span>
      </div>
      <div className="mt-4">{children}</div>
    </li>
  );
}

export function SandboxTracker({
  challenge,
  awardedStartup,
  proofUploaded,
  stage2Verified,
  currentUser,
  onUploadProof,
  onVerify,
  onBack,
  onGenerate,
  lang = 'en'
}) {
  const isStartup = currentUser?.role === 'startup';
  const isBuyer = currentUser?.role === 'buyer';
  const [dscModalOpen, setDscModalOpen] = useState(false);
  const [cagModalOpen, setCagModalOpen] = useState(false);
  const [gemModalOpen, setGemModalOpen] = useState(false);

  // Normalize ward string to prevent duplicate "Ward (Ward No. XX)" occurrences
  const cleanWard = (challenge?.ward || "Kothrud (Ward No. 12)")
    .replace(/\bWard\s+\(Ward/gi, '(Ward')
    .trim();

  return (
    <section aria-labelledby="track-title" className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-5 rounded border border-border bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xs bg-[#0b2545] text-white font-bold text-xs font-mono">
              03
            </span>
            <div>
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                प्रकल्प प्रगती नियंत्रण / PROJECT PROGRESS MONITORING
              </span>
              <h1 id="track-title" className="text-lg sm:text-xl font-serif font-bold text-primary tracking-tight">
                {t(lang, 'tracker.heading')} — {awardedStartup || "JalDrishti Telematics Pvt Ltd"}
              </h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground self-start sm:self-auto">
            <Clock className="size-3.5" />
            Live PFMS &amp; Telemetry Sync Active
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {t(lang, 'tracker.subheading')}
        </p>

        {/* Phase-2 Statutory Actions Strip */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="size-4 text-[#b45309]" />
            <span>Statutory Audits &amp; National Marketplace Gateways:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDscModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-[#0b2545] font-bold text-[11px] transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
            >
              <KeyRound className="size-3.5 text-[#b45309]" />
              <span>{t(lang, 'tracker.dscChainBtn')}</span>
            </button>
            <button
              type="button"
              onClick={() => setCagModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-[#0b2545] font-bold text-[11px] transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
            >
              <FileText className="size-3.5 text-emerald-700" />
              <span>{t(lang, 'tracker.cagMemoBtn')}</span>
            </button>
            <button
              type="button"
              onClick={() => setGemModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-300 bg-blue-50/80 hover:bg-blue-100 text-[#0b2545] font-bold text-[11px] transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
            >
              <Store className="size-3.5 text-blue-700" />
              <span>{t(lang, 'tracker.gemPac1Btn')}</span>
            </button>
          </div>
        </div>
      </div>

      <ChallengeSummary challenge={challenge} />

      <ol className="mt-6 grid gap-4">
        {/* Stage 1: Setup & PFMS Disbursement */}
        <MilestoneItem
          index={1}
          title="Setup & Sensor Deployment"
          subheader="PFMS Tranche-1"
          state="verified"
          badge="Disbursed & Verified"
        >
          {(() => {
            const budget = challenge?.budget || 300000;
            const tranche1Amount = Math.round(budget * 0.3);
            const tranche1Lakhs = (tranche1Amount / 100000).toFixed(2);
            return (
              <div className="space-y-3">
                <div className="rounded border border-success/30 bg-success/5 p-3 text-xs text-foreground">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-semibold text-success text-sm">
                      <IndianRupee className="size-4" />
                      <span>{formatINR(tranche1Amount)} (₹{tranche1Lakhs} Lakhs) Disbursed via PFMS</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      UTR: SBIN002934182910 · Tranche 1 (30% of {formatINR(budget)})
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                    <span>Account Head: <strong>HOA: 2217-01-800-01</strong></span>
                    <span>Beneficiary: <strong>{awardedStartup || "JalDrishti Telematics Pvt Ltd"}</strong></span>
                    <span>Sanction Order Ref: <strong>MSInS/PMC/FIN/4102</strong></span>
                  </div>
                </div>

                {/* Role-Specific Escrow Ledger & Webhook credentials */}
                {isStartup ? (
                  <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <CreditCard className="size-3.5 text-emerald-600" />
                        <span>Startup Escrow Account Balance (Axis Bank):</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                        {formatINR(tranche1Amount)} Available
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                      <div>
                        <span>Escrow Acc: </span>
                        <strong className="font-mono text-slate-800">9260-2001-4192-8821</strong>
                      </div>
                      <div>
                        <span>Webhook API Token: </span>
                        <strong className="font-mono text-slate-800 text-[10px]">sk_live_msins_2026_jaldrishti_...</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Building2 className="size-3.5 text-slate-600" />
                        <span>Municipal Nodal Officer Sign-off Ledger:</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">
                        Approver: Er. S. R. Deshmukh (EE, Water)
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Initial mobilization tranche released following physical installation of 8 acoustic sensors at {cleanWard} distribution mains.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}
        </MilestoneItem>

        {/* Stage 2: 30-Day Telemetry Stream & Ward GIS SCADA Map */}
        {/* TODO: connect live MQTT broker once PMC Smart City SCADA gateway port is whitelisted */}
        <MilestoneItem
          index={2}
          title="30-Day Field Telemetry Stream & Proof"
          subheader={`${cleanWard.replace(/\s*\(.*?\)/, '')} Ward Deployment`}
          state={stage2Verified ? "verified" : "active"}
          badge={stage2Verified ? "Deliverable Approved" : "In Progress"}
        >
          <div className="grid gap-3">
            {/* Live Interactive Ward GIS SCADA Grid */}
            <WardGISMap
              ward={challenge?.ward}
              onTelemetryUpdate={() => {
                if (!proofUploaded && onUploadProof && isStartup) {
                  onUploadProof();
                }
              }}
              userRole={currentUser?.role}
            />

            {/* Geo-tagging metadata strip */}
            <div className="rounded bg-muted/50 p-2.5 text-[11px] font-mono border border-border flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1 text-foreground">
                <MapPin className="size-3 text-accent" />
                Coordinates: <strong>18.5074° N, 73.8077° E</strong> ({cleanWard}, Pune)
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Hash className="size-3" />
                Telemetry Logs: <strong>4,182 packets logged (4 re-transmits Day 19) · SHA-256</strong>
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Milestone 2: Telemetry Upload Button (Actionable exclusively by Startup) */}
              <Button
                type="button"
                variant={proofUploaded ? "secondary" : "outline"}
                className="flex-1 gap-2 h-10 font-semibold"
                onClick={isStartup ? onUploadProof : undefined}
                disabled={proofUploaded || stage2Verified || !isStartup}
                title={!isStartup && !proofUploaded ? "Action restricted to Recognized Startup (SOD)" : undefined}
              >
                {proofUploaded ? (
                  <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                ) : !isStartup ? (
                  <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <Upload className="size-4 text-accent" aria-hidden="true" />
                )}
                <span>
                  {proofUploaded
                    ? t(lang, 'tracker.proofUploadedBtn')
                    : !isStartup
                    ? t(lang, 'tracker.awaitingStartupUpload')
                    : t(lang, 'tracker.uploadProofBtn')}
                </span>
              </Button>

              {/* Milestone 2: Verification Button (Actionable exclusively by Municipal Buyer) */}
              <Button
                type="button"
                variant={stage2Verified ? "secondary" : "default"}
                className="flex-1 gap-2 h-10 font-semibold"
                onClick={isBuyer ? onVerify : undefined}
                disabled={!isBuyer || !proofUploaded || stage2Verified}
                title={!isBuyer ? "Approval authority restricted to Municipal Executive Engineer (SOD)" : undefined}
              >
                {stage2Verified ? (
                  <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                ) : (
                  <FileCheck2 className="size-4" aria-hidden="true" />
                )}
                <span>
                  {stage2Verified
                    ? t(lang, 'tracker.verifiedBtn')
                    : isStartup
                    ? t(lang, 'tracker.awaitingMunicipalApproval')
                    : t(lang, 'tracker.verifyBtn')}
                </span>
              </Button>
            </div>

            {!proofUploaded && (
              <p className="text-xs text-muted-foreground italic">
                {isStartup
                  ? "Upload the field telemetry logs and geo-tagged photographs to enable official municipal inspection sign-off."
                  : "Awaiting Startup to upload geo-tagged field telemetry data from municipal SCADA grid."}
              </p>
            )}

            {stage2Verified && (
              <div className="rounded bg-success/10 border border-success/30 px-3 py-2 text-xs text-success font-medium flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0" />
                <span><strong>Inspection Certificate Signed:</strong> Verified by Executive Engineer (Water Supply &amp; Drainage), PMC.</span>
              </div>
            )}
          </div>
        </MilestoneItem>

        {/* Stage 3: KPI Benchmark Validation */}
        <MilestoneItem
          index={3}
          title={t(lang, 'tracker.stage3Title')}
          subheader="Statutory Evaluation"
          state={stage2Verified ? "active" : "pending"}
          badge={stage2Verified ? "Target Exceeded" : "Awaiting Stage 2"}
        >
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm pb-3 border-b border-border">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Target Performance</span>
                <p className="text-base font-bold font-mono text-foreground mt-0.5">{challenge.kpi || "20% reduction in water loss"}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Achieved in Pilot</span>
                <p className="text-base font-bold font-mono text-success mt-0.5">21.3% Net Reduction</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">16.8% at Day 28, sensor recalibrated</p>
              </div>
            </div>

            <div className="mt-3">
              {(() => {
                const targetMatch = (challenge?.kpi || "20%").match(/(\d+(?:\.\d+)?)/);
                const targetNum = targetMatch ? parseFloat(targetMatch[1]) : 20;
                const achievementPct = targetNum > 0 ? ((21.3 / targetNum) * 100).toFixed(1) : "106.5";
                return (
                  <>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                      <span>Field Progress Meter</span>
                      <span className="font-bold text-success font-mono">{stage2Verified ? `${achievementPct}% of Target Achieved` : "0%"}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-secondary border border-border">
                      <div
                        className="h-full rounded-full bg-success transition-all duration-700 ease-out shadow-xs"
                        style={{ width: stage2Verified ? "100%" : "0%" }}
                      />
                    </div>
                  </>
                );
              })()}
            </div>

            <p className="mt-2 text-xs text-success font-semibold flex items-center gap-1">
              <CheckCircle2 className="size-3.5" />
              Pilot completed: initial 28-day baseline achieved 16.8% reduction; after sensor recalibration in Zone B-4, final 60-day audit certified net 21.3% reduction. Qualifies for direct procurement under GFR 166.
            </p>
          </div>
        </MilestoneItem>
      </ol>

      {/* Footer Controls */}
      <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t(lang, 'tracker.backBtn')}
        </button>
        <Button
          size="lg"
          className="gap-2 px-6 h-10 font-bold bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs"
          onClick={onGenerate}
          disabled={!stage2Verified}
        >
          <FileCheck2 className="size-4" />
          {t(lang, 'tracker.generateDossierBtn')}
        </Button>
      </div>

      {!stage2Verified && (
        <p className="mt-2 text-right text-xs text-muted-foreground">
          Deliverable verification by Municipal Authority is required to issue the statutory direct procurement dossier.
        </p>
      )}

      {/* Phase-2 Modal Dialogs */}
      <MultiTierDSCModal
        open={dscModalOpen}
        onClose={() => setDscModalOpen(false)}
        challenge={challenge}
        awardedStartup={awardedStartup}
      />

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
    </section>
  );
}
