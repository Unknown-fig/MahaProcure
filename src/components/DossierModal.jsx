import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  ShieldCheck,
  Stamp,
  X,
  Printer,
  Store,
  QrCode,
  FileCheck2,
  ExternalLink,
  Award
} from 'lucide-react';
import { Button } from './ui/button';
import { formatINR } from '../lib/utils';
import { MaharashtraSeal, AshokaEmblem } from './OfficialEmblems';
import { GeMOnboardingModal } from './GeMOnboardingModal';
import { CAGAuditMemoModal } from './CAGAuditMemoModal';

export function DossierModal({ open, challenge, awardedStartup, onClose, lang = 'en' }) {
  const [downloadNotice, setDownloadNotice] = useState('');
  const [gemModalOpen, setGemModalOpen] = useState(false);
  const [cagModalOpen, setCagModalOpen] = useState(false);

  // Fixed reference numbers
  const refNumber = useMemo(() => {
    try {
      let saved = localStorage.getItem('mahaprocure_sanction_ref');
      if (!saved) {
        saved = "MSInS/PMC/EXP-SANDBOX/2026/SANCTION-" + Math.floor(4000 + 5000 * Math.random());
        localStorage.setItem('mahaprocure_sanction_ref', saved);
      }
      return saved;
    } catch {
      return "MSInS/PMC/EXP-SANDBOX/2026/SANCTION-8841";
    }
  }, []);

  const grNumber = useMemo(() => {
    return "सँडबॉक्स-२०२६/प्र.क्र.०८९/उद्यम-४";
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    setDownloadNotice('Formatting official Government Sanction Order for printing...');
    setTimeout(() => {
      window.print();
      setDownloadNotice('');
    }, 400);
  };

  const handleOnboard = () => {
    setGemModalOpen(true);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0b2545]/70 p-2 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative my-4 w-full max-w-3xl rounded-lg border-2 border-border bg-white text-[#0b2545] shadow-2xl overflow-hidden">
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="bg-[#0b2545] text-white px-4 py-2.5 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Award className="size-4 text-saffron" />
            <span id="dossier-title">OFFICIAL GOVERNMENT RESOLUTION (शासन निर्णय) · DIRECT PROCUREMENT DOSSIER</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="flex size-7 items-center justify-center rounded hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Official Government Letterhead Sheet (Printable A4 format) */}
        <div className="p-6 sm:p-10 govt-watermark relative bg-white">
          {/* Government Masthead */}
          <div className="border-b-2 border-double border-primary/40 pb-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <MaharashtraSeal className="size-16" gold={true} />
              <div className="h-12 w-px bg-border hidden sm:block" />
              <AshokaEmblem className="h-14 w-10 hidden sm:block" />
            </div>

            <p className="font-serif text-lg font-bold tracking-tight text-primary">
              महाराष्ट्र शासन | GOVERNMENT OF MAHARASHTRA
            </p>
            <p className="font-serif text-sm font-bold text-primary">
              महाराष्ट्र राज्य नवउद्यम संस्था (Maharashtra State Innovation Society)
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग (Skill, Employment, Entrepreneurship &amp; Innovation Department)
            </p>
            <p className="text-[11px] text-muted-foreground">
              मंत्रालय, मादाम कामा मार्ग, मुंबई - ४०० ०३२ (Mantralaya, Mumbai - 400 032)
            </p>
          </div>

          {/* Reference & Date Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs border-b border-border py-2.5 gap-1 font-mono">
            <div>
              <p><strong>शासन निर्णय क्र:</strong> {grNumber}</p>
              <p><strong>Sanction Order Ref:</strong> {refNumber}</p>
            </div>
            <div className="sm:text-right">
              <p><strong>Date:</strong> 06 September 2026</p>
              <p><strong>PFMS Head:</strong> 2217-01-800-01</p>
            </div>
          </div>

          {/* Subject & Reference */}
          <div className="mt-4 text-xs leading-relaxed space-y-1.5 bg-muted/30 p-3 rounded border border-border">
            <p>
              <strong>विषय:</strong> महाराष्ट्र राज्य नाविन्यपूर्ण स्टार्टअप धोरण आणि वित्तीय नियम (GFR 166) अंतर्गत थेट खरेदी मंजुरी आदेश.
            </p>
            <p>
              <strong>SUBJECT:</strong> Administrative Approval &amp; Financial Sanction for Direct Procurement of Innovative Civic Solution post successful completion of 60-Day Innovation Sandbox Pilot under Rule 166 of General Financial Rules (GFR), 2017.
            </p>
          </div>

          {/* Body Content */}
          <div className="mt-4 space-y-3 text-xs leading-relaxed text-foreground">
            <p className="text-justify">
              WHEREAS, under the <em>Maharashtra State Innovative Startup Policy 2018</em> and <em>Pune Municipal Corporation Sandbox Framework</em>, a scoped 60-day civic innovation challenge was sanctioned for <strong>"{challenge.title}"</strong> under <strong>{challenge.department}</strong>.
            </p>
            <p className="text-justify">
              AND WHEREAS, <strong>{awardedStartup || "JalDrishti Telematics Pvt Ltd"}</strong> (DPIIT Reg: DIPP88219), a recognized Maharashtra startup, was awarded the sandbox pilot with statutory relaxation of prior turnover and prior experience under GFR Rule 173(i).
            </p>
            <p className="text-justify">
              AND WHEREAS, the competent Technical Inspection Committee has verified 100% telemetry stream evidence, confirmed PFMS Tranche disbursements, and certified that the field performance benchmark achieved <strong>21.3% (exceeding the 20% statutory KPI target)</strong>.
            </p>
            <p className="font-semibold text-primary text-justify bg-amber-soft p-2.5 rounded border border-accent/20">
              NOW THEREFORE, sanction of the Government is hereby accorded under <strong>Rule 166 of GFR, 2017 (Single Tender / Proprietary Innovation Exemption)</strong> to directly procure the innovative solution from <strong>{awardedStartup || "JalDrishti Telematics Pvt Ltd"}</strong> for full-scale municipal deployment without repeat tendering.
            </p>
          </div>

          {/* Sanction Specification Table */}
          <div className="mt-4 rounded border border-border overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted text-primary font-bold border-b border-border">
                  <th className="p-2 border-r border-border">Particulars</th>
                  <th className="p-2 border-r border-border">Sanctioned Value</th>
                  <th className="p-2 border-r border-border">Performance Delivered</th>
                  <th className="p-2">Statutory Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-2 border-r border-border font-semibold">Civic Sandbox Pilot Grant</td>
                  <td className="p-2 border-r border-border font-mono font-bold">{formatINR(challenge.budget)}</td>
                  <td className="p-2 border-r border-border text-success font-bold">21.3% (Target {challenge?.kpi || "20% reduction"} met Day 41)</td>
                  <td className="p-2">GFR Rule 166 / MSInS</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-2 border-r border-border font-semibold">Pilot Duration &amp; Ward</td>
                  <td className="p-2 border-r border-border">60 Days (Completed)</td>
                  <td className="p-2 border-r border-border">{challenge?.ward ? `${challenge.ward}, Pune` : "Kothrud (Ward No. 12), Pune"}</td>
                  <td className="p-2">Pune Municipal Corp</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Official Signatures & Digital Seal Verification */}
          <div className="mt-8 pt-4 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Digital Hologram Stamp */}
            <div className="flex items-center gap-3">
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-accent text-accent ring-4 ring-accent/10 shadow-xs">
                <Stamp className="size-8" />
              </div>
              <div className="text-left text-[11px]">
                <p className="font-bold text-accent uppercase tracking-wider">DIGITALLY SEALED</p>
                <p className="text-muted-foreground font-mono">e-Mudhra / NIC CA</p>
                <p className="text-[10px] text-muted-foreground">SHA-256 Validated</p>
              </div>
            </div>

            {/* Verification QR Code */}
            <div className="flex items-center gap-2.5 bg-muted/40 p-2 rounded border border-border">
              {/* QR Code Matrix SVG */}
              <svg className="size-12 shrink-0" viewBox="0 0 33 33" fill="currentColor">
                <path d="M0 0h9v9H0zm2 2h5v5H2zm10 0h2v2h-2zm4 0h3v2h-3zm5 0h2v3h-2zm4 0h8v8h-8zm2 2h4v4h-4zm-13 1h2v4h-2zm-8 7h2v2H4zm8 0h3v2h-3zm8 0h2v2h-2zm3 0h3v2h-3zm4 0h3v2h-3zm-23 2h2v4H0zm4 0h3v2H4zm6 0h2v2h-2zm6 0h2v4h-2zm3 0h3v2h-3zm4 0h2v2h-2zm-17 3h3v2H6zm6 0h2v4h-2zm6 0h3v2h-3zm-18 2h2v2H0zm6 0h2v2H6zm14 0h3v2h-3zm-18 2h3v2H2zm8 0h2v2h-2zm12 0h2v2h-2zm2 0h2v2h-2zm-24 2h9v9H0zm2 2h5v5H2zm10 0h2v2h-2zm4 0h2v2h-2zm4 0h2v3h-2zm4 0h2v2h-2zm4 0h3v2h-3zm-14 3h3v2h-3zm10 0h2v2h-2zm-8 2h3v2h-3zm6 0h2v2h-2zm3 0h2v2h-2z"/>
              </svg>
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-foreground">Scan to Verify Authenticity</p>
                <p className="text-muted-foreground font-mono">maha-procure.gov.in</p>
                <p className="text-success font-semibold">Valid &amp; Audited</p>
              </div>
            </div>

            {/* Authorised Government Signatories */}
            <div className="text-right text-xs">
              <div className="mb-2">
                <p className="font-bold text-foreground">Rajesh K. Patil, IAS</p>
                <p className="text-[11px] text-muted-foreground">Chief Executive Officer, MSInS</p>
                <p className="text-[10px] text-muted-foreground">Govt. of Maharashtra</p>
              </div>
              <div className="border-t border-border pt-1">
                <p className="font-bold text-foreground">Vikram Kumar, IAS</p>
                <p className="text-[11px] text-muted-foreground">Municipal Commissioner</p>
                <p className="text-[10px] text-muted-foreground">Pune Municipal Corporation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Controls (Hidden in Print) */}
        <div className="bg-muted/80 border-t border-border p-4 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-success shrink-0" />
            <span>Official Government Resolution generated under Section 166 GFR 2017</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Button
              className="flex-1 sm:flex-none gap-2 font-bold px-4"
              size="lg"
              onClick={handlePrint}
            >
              <Printer className="size-4" />
              Print Official Order (A4)
            </Button>

            <Button
              variant="outline"
              className="flex-1 sm:flex-none gap-2 font-bold px-4 border-emerald-700 text-emerald-800 hover:bg-emerald-50"
              size="lg"
              onClick={() => setCagModalOpen(true)}
            >
              <FileCheck2 className="size-4 text-emerald-700" />
              GFR 166 PAC Memo
            </Button>

            <Button
              variant="outline"
              className="flex-1 sm:flex-none gap-2 font-bold px-4 border-primary text-primary hover:bg-primary/5"
              size="lg"
              onClick={handleOnboard}
            >
              <Store className="size-4" />
              Onboard to MahaGEMS / GeM
            </Button>
          </div>
        </div>

        {downloadNotice && (
          <div className="bg-[#fffbeb] text-[#92400e] px-4 py-2 text-center text-xs font-semibold animate-pulse no-print border-t border-border">
            {downloadNotice}
          </div>
        )}
      </div>

      {/* GFR 166 PAC Justification & CAG Audit Defense Modal */}
      <CAGAuditMemoModal
        open={cagModalOpen}
        onClose={() => setCagModalOpen(false)}
        challenge={challenge}
        awardedStartup={awardedStartup}
      />

      {/* GeM & MahaGEMS National Marketplace Sync Modal */}
      <GeMOnboardingModal
        open={gemModalOpen}
        onClose={() => setGemModalOpen(false)}
        awardedStartup={awardedStartup}
        challenge={challenge}
      />
    </div>,
    document.body
  );
}
