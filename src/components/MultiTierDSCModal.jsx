import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  KeyRound,
  FileCheck2,
  X,
  Printer,
  ChevronRight,
  Stamp,
  Lock,
  Building2,
  Award
} from 'lucide-react';
import { Button } from './ui/button';
import { MaharashtraSeal, AshokaEmblem } from './OfficialEmblems';

export function MultiTierDSCModal({ open, onClose, challenge, awardedStartup, onCompleteAll }) {
  const [signing, setSigning] = useState(false);
  const [signedTiers, setSignedTiers] = useState(() => {
    const defaultTiers = [
      {
        tier: 1,
        role: 'Executive Engineer (Technical Sponsoring Officer)',
        name: 'Er. S. R. Deshmukh',
        dept: 'Water Supply Department, Pune Municipal Corporation',
        mandate: 'Technical Scrutiny Approval & Pilot Feasibility Certification under Clause 4.2 MPPM',
        status: 'signed',
        dscSerial: 'MH-GOV-DSC-8841-A2',
        timestamp: '07-Sep-2026 11:24:18 IST',
        tokenType: 'Class-3 ePass2003 Token',
        hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b'
      },
      {
        tier: 2,
        role: 'Chief Accounts & Finance Officer (CAFO)',
        name: 'Smt. P. V. Kulkarni',
        dept: 'Finance & Treasury Wing, Pune Municipal Corporation',
        mandate: 'Statutory Budget Concurrence & 30% PFMS Mobilization Advance Disbursement Clearance',
        status: 'signed',
        dscSerial: 'MH-GOV-DSC-4109-F8',
        timestamp: '07-Sep-2026 14:10:45 IST',
        tokenType: 'Class-3 CryptoID Token',
        hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'
      },
      {
        tier: 3,
        role: 'Additional Municipal Commissioner (Special Projects)',
        name: 'Shri R. K. Shinde, IAS',
        dept: 'Municipal Administration, Pune Municipal Corporation',
        mandate: 'Final Statutory Pilot Sanction & GFR Rule 166 Single-Source Exemption Endorsement',
        status: 'pending',
        dscSerial: 'MH-GOV-DSC-0012-IAS',
        timestamp: null,
        tokenType: 'Class-3 Government Hardware Token (NIC)',
        hash: null
      }
    ];

    try {
      if (localStorage.getItem('mahaprocure_dsc_tier3_signed') === 'true') {
        defaultTiers[2].status = 'signed';
        defaultTiers[2].timestamp = localStorage.getItem('mahaprocure_dsc_tier3_time') || '07-Sep-2026 16:45:00 IST';
        defaultTiers[2].hash = 'f8e7d6c5b4a3928170e9f8a7b6c5d4e3f2a1b0c9';
      }
    } catch {}
    return defaultTiers;
  });

  // Keyboard accessibility: Escape key closes modal
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSignTier = (tierIndex) => {
    setSigning(true);
    setTimeout(() => {
      const timestampStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ' ' +
        new Date().toLocaleTimeString('en-GB') +
        ' IST';
      const hashStr = 'f8e7d6c5b4a3928170e9f8a7b6c5d4e3f2a1b0c9';

      setSignedTiers((prev) =>
        prev.map((t, idx) =>
          idx === tierIndex
            ? {
                ...t,
                status: 'signed',
                timestamp: timestampStr,
                hash: hashStr
              }
            : t
        )
      );

      if (tierIndex === 2) {
        try {
          localStorage.setItem('mahaprocure_dsc_tier3_signed', 'true');
          localStorage.setItem('mahaprocure_dsc_tier3_time', timestampStr);
        } catch {}
      }

      setSigning(false);
      if (tierIndex === 2 && onCompleteAll) {
        onCompleteAll();
      }
    }, 900);
  };

  const isAllSigned = signedTiers.every((t) => t.status === 'signed');

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dsc-chain-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-[#0b2545]/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-auto rounded border-2 border-slate-400 bg-white text-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Top Header (Navy) */}
        <div className="shrink-0 bg-[#0b2545] p-4 text-white flex items-center justify-between border-b border-[#163b6d]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/10 text-amber-300 border border-white/20">
              <KeyRound className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">
                  Class-3 DSC Authentication
                </span>
                <span className="text-white/70 text-[11px]">
                  Information Technology Act, 2000
                </span>
              </div>
              <h3 id="dsc-chain-title" className="text-base font-serif font-bold text-white mt-0.5">
                Multi-Tier Municipal Administrative Approval Chain
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            title="Close DSC modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body: 3-Tier Multi-Signature Ledger */}
        <div className="p-5 overflow-y-auto flex-1 min-h-0 space-y-4 text-xs bg-slate-50">
          {/* Statutory Mandate Banner */}
          <div className="rounded border border-blue-200 bg-blue-50/80 p-3.5 flex items-start gap-3 text-blue-950">
            <ShieldCheck className="size-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-xs">
                Statutory Multi-Level Digital Signature (DSC) Validation Protocol:
              </p>
              <p className="text-[11px] text-blue-900 leading-relaxed text-justify">
                Pursuant to <em>Clause 6.3 of the Maharashtra State Public Procurement Manual</em> and <em>Rule 166 GFR 2017</em>, direct single-source pilot sanctions require sequential Class-3 Digital Signatures across Technical, Financial, and Executive Municipal Directorates prior to treasury PFMS disbursement.
              </p>
            </div>
          </div>

          {/* 3-Tier Step Grid */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Sequential Municipal Sanction Tiers:</span>
              <span className="font-mono text-[11px] text-slate-500">
                {signedTiers.filter((t) => t.status === 'signed').length} of 3 Tiers Formally Executed
              </span>
            </h4>

            <div className="space-y-3">
              {signedTiers.map((tier, idx) => {
                const isSigned = tier.status === 'signed';

                return (
                  <div
                    key={tier.tier}
                    className={`rounded border p-4 transition-all ${
                      isSigned
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-slate-300 bg-white ring-1 ring-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex size-7 items-center justify-center rounded-xs font-bold text-xs font-mono shrink-0 mt-0.5 ${
                            isSigned
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#0b2545] text-white'
                          }`}
                        >
                          {isSigned ? <CheckCircle2 className="size-4" /> : `T${tier.tier}`}
                        </span>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{tier.role}</h5>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                isSigned
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}
                            >
                              {isSigned ? 'DSC Signed & Formally Endorsed' : 'Awaiting Digital Signature'}
                            </span>
                          </div>

                          <p className="text-slate-700 font-semibold text-xs">
                            {tier.name} · <span className="font-normal text-slate-600">{tier.dept}</span>
                          </p>

                          <p className="text-[11px] text-slate-600 leading-normal">
                            <strong>Mandate:</strong> {tier.mandate}
                          </p>

                          {isSigned && (
                            <div className="mt-2 pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[10px] text-slate-500">
                              <div>
                                <span>Certificate Serial: </span>
                                <strong className="text-slate-700">{tier.dscSerial}</strong>
                              </div>
                              <div>
                                <span>Signed On: </span>
                                <strong className="text-slate-700">{tier.timestamp}</strong>
                              </div>
                              <div className="sm:col-span-2 truncate">
                                <span>SHA-256 Digest: </span>
                                <strong className="text-slate-700">{tier.hash}</strong>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button for Unsigned Tier */}
                      {!isSigned && (
                        <div className="shrink-0 sm:self-center">
                          <Button
                            onClick={() => handleSignTier(idx)}
                            disabled={signing}
                            className="bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs font-bold gap-1.5 px-3 py-2 shadow-xs cursor-pointer"
                          >
                            <KeyRound className="size-3.5 text-amber-300" />
                            <span>{signing ? 'Verifying Token...' : 'Affix Class-3 DSC'}</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cryptographic Compliance Summary */}
          <div className="rounded border border-slate-300 bg-slate-50 p-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <Lock className="size-3.5 text-emerald-700" />
              <span>CCA (Controller of Certifying Authorities) India Compliant</span>
            </div>
            <span>Audit Chain Digest: <code>SHA256:7e81...904b</code></span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 bg-slate-100 px-5 py-3 border-t border-slate-300 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Permanent Municipal Audit Record · GFR 2017 &amp; Maharashtra Startup Framework
          </span>
          <Button
            onClick={onClose}
            className="bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs font-bold px-4 py-1.5"
          >
            {isAllSigned ? 'All Tiers Executed · Proceed' : 'Close Window'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
