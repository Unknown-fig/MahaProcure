import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Store,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Download,
  Building2,
  FileCheck,
  Award,
  ArrowRight,
  Printer,
  FileText,
  BadgeCheck,
  Scale
} from 'lucide-react';
import { Button } from './ui/button';
import { formatINR } from '../lib/utils';
import { MaharashtraSeal, DigitalIndiaLogo, AshokaEmblem } from './OfficialEmblems';

export function GeMOnboardingModal({ open, onClose, awardedStartup, challenge }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('gateway'); // 'gateway' or 'pac1'

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const gemCatalogId = "GEM-MH-2026-INNOV-8821";
  const portalUrl = `https://gem.gov.in/innovation/sandbox-graduates/${gemCatalogId}`;

  const handleCopyLink = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(portalUrl).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintPAC = () => {
    window.print();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gem-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-[#0b2545]/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl my-auto rounded border-2 border-slate-400 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800">
        {/* Modal Header (Navy) */}
        <div className="shrink-0 bg-[#0b2545] text-white p-4 flex items-center justify-between border-b border-[#163b6d] no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/10 text-amber-300 border border-white/20">
              <Store className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">
                  National Procurement Marketplace
                </span>
                <span className="text-white/70 text-[11px]">
                  Government e-Marketplace (GeM) &amp; MahaGEMS
                </span>
              </div>
              <h3 id="gem-modal-title" className="text-base font-serif font-bold text-white mt-0.5">
                GeM Green Channel &amp; Proprietary Article Certificate (PAC-1)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'pac1' && (
              <button
                type="button"
                onClick={handlePrintPAC}
                className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors cursor-pointer border border-white/20"
                title="Print PAC-1 Certificate"
              >
                <Printer className="size-3" />
                <span>Print PAC-1</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Close gateway"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher (Gateway vs PAC-1 Form) */}
        <div className="shrink-0 bg-slate-100 border-b border-slate-300 px-5 py-2 flex items-center gap-3 text-xs no-print">
          <button
            type="button"
            onClick={() => setActiveTab('gateway')}
            className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
              activeTab === 'gateway'
                ? 'bg-[#0b2545] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0b2545]'
            }`}
          >
            1. GeM Green Channel Sync
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pac1')}
            className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pac1'
                ? 'bg-[#0b2545] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0b2545]'
            }`}
          >
            <FileText className="size-3.5 text-amber-600" />
            <span>2. Form PAC-1 (Proprietary Certificate)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-5 text-xs">
          {activeTab === 'gateway' ? (
            <>
              {/* Graduation Success Banner */}
              <div className="rounded border border-emerald-300 bg-emerald-50 p-4 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-emerald-700 text-white mt-0.5 shrink-0">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-950 text-sm">
                      Sandbox Graduate Certified: Direct Pan-India Municipal Procurement Approved
                    </span>
                    <p className="mt-0.5 text-xs text-emerald-800 leading-relaxed">
                      Vendor <strong>{awardedStartup || "JalDrishti Telematics Pvt Ltd"}</strong> has completed 60-day sandbox trial under MSInS &amp; PMC. GFR 166 direct purchase authorization is active.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 bg-emerald-800 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-xs">
                  MahaGEMS Verified
                </span>
              </div>

              {/* Sync Progression Steps */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileCheck className="size-3.5 text-[#0b2545]" />
                  <span>National Marketplace Direct Onboarding Status:</span>
                </h4>

                <div className="grid gap-2.5">
                  <div className="rounded border border-slate-300 bg-slate-50 p-3 flex items-start gap-3">
                    <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 text-xs">1. MSInS Innovation Certificate Formally Synced</strong>
                        <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">Passed</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Digitally signed pilot completion dossier transmitted to MahaGEMS State Nodal Repository.
                      </p>
                    </div>
                  </div>

                  <div className="rounded border border-slate-300 bg-slate-50 p-3 flex items-start gap-3">
                    <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 text-xs">2. GeM Green Channel Product Listing Created</strong>
                        <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">Active</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Product listed under GeM Category: <em>Municipal Acoustic IoT Water Network Analyzers (Cat: 411032)</em>.
                      </p>
                    </div>
                  </div>

                  <div className="rounded border border-slate-300 bg-slate-50 p-3 flex items-start gap-3">
                    <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 text-xs">3. Pan-India ULB Direct Procurement (Rule 166)</strong>
                        <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">Authorized</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Any civic body in India (BMC, NMC, PCMC, BBMP) can issue direct work orders on GeM without re-tendering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Procurement Link & Catalog Details */}
              <div className="rounded border border-slate-300 bg-white p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      GeM Innovation Product Catalog ID
                    </span>
                    <p className="text-sm font-bold font-mono text-[#0b2545]">{gemCatalogId}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                    Category: Urban Tech Sandbox
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={portalUrl}
                    className="w-full rounded border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-700 select-all outline-none"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="shrink-0 gap-1.5 border-slate-300 text-xs"
                  >
                    {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Link'}</span>
                  </Button>
                </div>
              </div>

              {/* Action: Switch to PAC-1 Certificate */}
              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => setActiveTab('pac1')}
                  className="bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs font-bold gap-2 px-4"
                >
                  <span>View Official GeM Form PAC-1 Certificate</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </>
          ) : (
            /* TAB 2: PROPRIETARY ARTICLE CERTIFICATE (PAC-1) */
            <div className="p-4 sm:p-6 bg-white border border-slate-300 rounded space-y-4 govt-watermark">
              {/* PAC Header */}
              <div className="text-center border-b-2 border-slate-400 pb-3">
                <div className="flex items-center justify-center gap-3 mb-1.5">
                  <MaharashtraSeal className="size-10" gold={true} />
                  <AshokaEmblem className="h-9 w-auto" />
                </div>
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#0b2545]">
                  Government e-Marketplace (GeM) — Form PAC-1
                </h4>
                <p className="font-serif text-xs font-bold text-slate-800">
                  PROPRIETARY ARTICLE CERTIFICATE (Rule 166 of GFR 2017)
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Ref No: GeM/PAC-1/2026/MH-PMC-0941 · State of Maharashtra
                </p>
              </div>

              {/* Statutory Declarations */}
              <div className="space-y-2.5 text-[11px] leading-relaxed text-slate-800">
                <p className="font-semibold text-slate-900">
                  Certified that the goods/services specified below qualify as Proprietary Articles under Rule 166(i) of General Financial Rules, 2017:
                </p>

                <div className="bg-slate-50 p-3 rounded border border-slate-300 space-y-1 font-mono text-[10px]">
                  <p><strong>1. Description of Goods/Services:</strong> {challenge.title} (Acoustic IoT Sub-Meter Leak Analysis System)</p>
                  <p><strong>2. Proprietary Vendor Name:</strong> {awardedStartup || "JalDrishti Telematics Pvt Ltd"}</p>
                  <p><strong>3. DPIIT Recognition Number:</strong> DIPP123847 / Maharashtra Startup Hub</p>
                  <p><strong>4. Indenting Department:</strong> {challenge.department}, Pune Municipal Corporation</p>
                  <p><strong>5. Financial Sanction Value:</strong> {formatINR(challenge?.budget || 300000)} (Within ₹15L Statutory Sandbox Ceiling)</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <p className="text-justify">
                    <strong>(i)</strong> The indented goods/services are manufactured/developed exclusively by M/s <strong>{awardedStartup || "JalDrishti Telematics Pvt Ltd"}</strong> under proprietary acoustic transient algorithms.
                  </p>
                  <p className="text-justify">
                    <strong>(ii)</strong> No other make or model will be acceptable to the Municipal Corporation for the reason that this technology was empirically verified under the 60-day MSInS Sandbox, achieving <strong>22.4% reduction in non-revenue water loss</strong> (exceeding the 20% statutory target).
                  </p>
                  <p className="text-justify">
                    <strong>(iii)</strong> Concurrence of the Finance Wing (CAFO) has been obtained under File No. <code>CAFO/PMC/2026/SANCTION-8841</code>. The price has been evaluated as reasonable compared to conventional PWD survey estimates.
                  </p>
                </div>
              </div>

              {/* Official Signatures */}
              <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-2 gap-4 text-[10px]">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800">Er. S. R. Deshmukh</p>
                  <p className="text-slate-600">Executive Engineer (Water Supply)</p>
                  <p className="text-slate-500">Pune Municipal Corporation</p>
                  <p className="font-mono text-emerald-800 font-bold">DSC Signed: Class-3 Token</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="font-bold text-slate-800">Shri R. K. Shinde, IAS</p>
                  <p className="text-slate-600">Additional Municipal Commissioner</p>
                  <p className="text-slate-500">Competent Authority under GFR 166</p>
                  <p className="font-mono text-emerald-800 font-bold">Approved for GeM Direct Buy</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 bg-slate-100 px-5 py-3 border-t border-slate-300 flex items-center justify-between no-print">
          <span className="text-[11px] text-slate-500 font-medium">
            MahaGEMS &amp; GeM Pan-India Direct Procurement Module · Rule 166 GFR
          </span>
          <Button
            onClick={onClose}
            className="bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs font-bold px-4 py-1.5"
          >
            Close Gateway
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
