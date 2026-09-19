import React from 'react';
import { createPortal } from 'react-dom';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  X,
  Scale,
  Building2,
  Lock,
  Download,
  AlertCircle,
  FileCheck2,
  BadgeCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { formatINR } from '../lib/utils';
import { MaharashtraSeal, AshokaEmblem } from './OfficialEmblems';

export function CAGAuditMemoModal({ open, onClose, challenge, awardedStartup }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    window.print();
  };

  const budget = challenge?.budget || 300000;
  const tranche1 = Math.round(budget * 0.3);
  const tranche2 = budget - tranche1;
  const conventionalEstimate = Math.round(budget * 1.95);
  const directSavings = conventionalEstimate - budget;
  const savingsPercent = Math.round((directSavings / conventionalEstimate) * 100);
  const roiMultiple = budget > 0 ? (4280000 / budget).toFixed(1) : '2.9';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cag-memo-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-[#0b2545]/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-auto rounded border-2 border-slate-400 bg-white text-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="shrink-0 bg-[#0b2545] p-4 text-white flex items-center justify-between border-b border-[#163b6d] no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/10 text-amber-300 border border-white/20">
              <FileCheck2 className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">
                  Statutory Audit Defense
                </span>
                <span className="text-white/70 text-[11px]">
                  CAG &amp; State Vigilance Commission
                </span>
              </div>
              <h3 id="cag-memo-title" className="text-base font-serif font-bold text-white mt-0.5">
                Vigilance &amp; CAG Audit Defense Dossier
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors cursor-pointer border border-white/20"
              title="Print official audit memo"
            >
              <Printer className="size-3" />
              <span>Print Memo</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Printable Memo Sheet */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 min-h-0 space-y-4 text-xs govt-watermark bg-white">
          {/* Government Masthead */}
          <div className="border-b-2 border-slate-400 pb-3 text-center">
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <MaharashtraSeal className="size-12" gold={true} />
              <div className="h-9 w-px bg-slate-300 hidden sm:block" />
              <AshokaEmblem className="h-10 w-auto hidden sm:block" />
            </div>

            <h3 className="font-serif text-base font-bold tracking-tight text-[#0b2545]">
              महाराष्ट्र शासन | GOVERNMENT OF MAHARASHTRA
            </h3>
            <p className="font-serif text-xs font-bold text-[#0b2545]">
              लेखापरीक्षण व दक्षता संरक्षण प्रपत्र (CAG &amp; VIGILANCE AUDIT DEFENSE DOSSIER)
            </p>
            <p className="text-[10px] text-slate-600 font-medium">
              पुणे महानगरपालिका (PMC) · महाराष्ट्र राज्य नवउद्यम संस्था (MSInS) सँडबॉक्स कक्ष
            </p>
          </div>

          {/* Reference Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded border border-slate-300 font-mono text-[11px]">
            <div>
              <span className="text-slate-500 block text-[10px]">OUTWARD REF:</span>
              <strong className="text-[#0b2545]">PMC/CAG-DEF/2026/088</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">RECORD DATE:</span>
              <strong className="text-[#0b2545]">07-Sep-2026</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">HEAD OF ACCOUNT:</span>
              <strong className="text-[#0b2545]">2217-01-800-01</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">AUDIT STATUS:</span>
              <strong className="text-emerald-700 font-bold">100% COMPLIANT</strong>
            </div>
          </div>

          {/* Subject Strip */}
          <div className="bg-[#fffbeb] p-3 rounded border border-amber-200 text-xs text-[#92400e] leading-relaxed">
            <p>
              <strong>विषय / SUBJECT:</strong> Complete paper trail, price reasonableness justification, and statutory defense for direct single-source procurement under <em>Rule 166 of GFR 2017</em> awarded to <strong>{awardedStartup || "JalDrishti Telematics Pvt Ltd"}</strong> (DPIIT Reg: DIPP123847).
            </p>
          </div>

          {/* 5 Core Pillars of Audit Defense */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-700" />
              <span>5 Pillars of Audit &amp; Vigilance Clearance:</span>
            </h4>

            <div className="space-y-2.5">
              {/* Pillar 1 */}
              <div className="rounded border border-slate-300 bg-white p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-[#0b2545] text-white text-[10px] font-mono flex items-center justify-center font-bold">1</span>
                    Statutory Rule 166 GFR Exemption Authorization
                  </strong>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Statutory Ground Established</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                  Procurement satisfies GFR Rule 166(i) as a proprietary innovation developed under government incubation. Startups recognized by DPIIT are exempt from open tender under the <em>Maharashtra State Innovative Startup Policy 2018 (Clause 4.2)</em> and <em>DoE OM F.20/2/2014-PPD</em>.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded border border-slate-300 bg-white p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-[#0b2545] text-white text-[10px] font-mono flex items-center justify-center font-bold">2</span>
                    DSR Schedule of Rates &amp; Price Reasonableness Analysis
                  </strong>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Savings Certified</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  <table className="govt-table text-[10px] mt-1 mb-1">
                    <thead>
                      <tr>
                        <th>Procurement Mode</th>
                        <th>Standard Cost Estimate</th>
                        <th>Actual Sanction</th>
                        <th>Fiscal Benefit to ULB</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Conventional PWD Manual Survey</td>
                        <td className="font-mono">{formatINR(conventionalEstimate)}</td>
                        <td className="font-mono text-slate-400">—</td>
                        <td className="text-slate-600">High latency, excavation damages</td>
                      </tr>
                      <tr className="bg-emerald-50">
                        <td><strong>MahaProcure Sandbox Pilot</strong></td>
                        <td className="font-mono text-emerald-900 font-bold">{formatINR(budget)}</td>
                        <td className="font-mono text-emerald-900 font-bold">{formatINR(budget)}</td>
                        <td className="text-emerald-900 font-bold">{formatINR(directSavings)} Direct Treasury Savings ({savingsPercent}% less)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Water conserved during 60-day trial: 42.8 Million Liters (Monetary valuation: ₹42.8 Lakhs vs {formatINR(budget)} investment — {roiMultiple}x Civic ROI).
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="rounded border border-slate-300 bg-white p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-[#0b2545] text-white text-[10px] font-mono flex items-center justify-center font-bold">3</span>
                    Empirical Verification of Municipal Target KPI
                  </strong>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Target Exceeded</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Sanction condition required minimum <strong>{challenge?.kpi || "20% reduction in acoustic pipeline loss"}</strong>. Independent telemetry audit verified actual achievement of <strong>21.3% Net Reduction</strong> across distribution sectors. Certified by Executive Engineer, Water Supply.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="rounded border border-slate-300 bg-white p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-[#0b2545] text-white text-[10px] font-mono flex items-center justify-center font-bold">4</span>
                    PFMS DBT Disbursement &amp; Zero Cash Intermediary
                  </strong>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">PFMS Audited</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-mono text-[10px]">
                  Tranche 1 (30% Mobilization): {formatINR(tranche1)} via PFMS UTR: <code>PFMS2026MH09842103</code><br />
                  Tranche 2 (70% Completion): {formatINR(tranche2)} via PFMS UTR: <code>PFMS2026MH09890412</code> (Pre-audited by CAFO).
                </p>
              </div>

              {/* Pillar 5 */}
              <div className="rounded border border-slate-300 bg-white p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-[#0b2545] text-white text-[10px] font-mono flex items-center justify-center font-bold">5</span>
                    Cryptographic Tamper-Proofing (Zero Retrospective Manipulation)
                  </strong>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">SHA-256 Sealed</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                  Every IoT telemetry packet received from {challenge?.ward || "Kothrud (Ward #12)"} was hashed upon receipt using SHA-256 and committed to the municipal audit ledger. Retrospective alteration of sensor readings is mathematically impossible under cryptographic audit standards.
                </p>
                <p className="text-[10px] font-mono text-slate-500 truncate pt-1 border-t border-slate-200">
                  Master Telemetry Root Hash: <code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>
                </p>
              </div>
            </div>
          </div>

          {/* Audit Endorsement Signatures */}
          <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[10px]">
              <p className="font-bold text-slate-800">Er. S. R. Deshmukh</p>
              <p className="text-slate-600">Executive Engineer</p>
              <p className="text-slate-500">Technical Sponsoring Directorate</p>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[10px]">
              <p className="font-bold text-slate-800">Smt. P. V. Kulkarni</p>
              <p className="text-slate-600">Chief Accounts &amp; Finance Officer</p>
              <p className="text-slate-500">Municipal Treasury Wing</p>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[10px]">
              <p className="font-bold text-slate-800">Shri R. K. Shinde, IAS</p>
              <p className="text-slate-600">Addl. Municipal Commissioner</p>
              <p className="text-slate-500">Competent Sanctioning Authority</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 bg-slate-100 px-5 py-3 border-t border-slate-300 flex items-center justify-between no-print">
          <span className="text-[11px] text-slate-500 font-medium font-mono">
            Vigilance Clearance Dossier · Ref: CAG/MH/2026/SEC-166
          </span>
          <Button
            onClick={onClose}
            className="bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs font-bold px-4 py-1.5"
          >
            Close Audit Dossier
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
