import React from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Scale,
  Award,
  Printer,
  Stamp,
  Building2,
  FileText,
  BadgeCheck,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { MaharashtraSeal, AshokaEmblem } from './OfficialEmblems';

export function AIMatchExplanationModal({ startup, challenge, open, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !startup) return null;

  const evaluationMatrix = [
    {
      srNo: '01',
      parameter: 'Problem Statement Technical Alignment',
      statutoryNorm: 'Compliance with PMC Ward acoustic leak pinpointing (<1m margin of error)',
      vendorEvidence: 'Acoustic frequency analysis (10Hz-5kHz), high-frequency transients, patent US10928231 validated with COEP Hydro-Acoustic Dataset',
      weightage: '35%',
      scoreAwarded: '96 / 100',
      compliance: 'Fully Compliant',
      remark: 'Exceeds municipal hydraulic requirements. Sub-meter precision verified.'
    },
    {
      srNo: '02',
      parameter: 'Technology Readiness Level (TRL)',
      statutoryNorm: 'Minimum TRL-6 (Prototype operational in municipal water distribution network)',
      vendorEvidence: 'TRL-7 certified by IIT Bombay Incubation Cell. Successful testing in 4.2 bar pipeline.',
      weightage: '25%',
      scoreAwarded: '92 / 100',
      compliance: 'Fully Compliant',
      remark: 'Qualifies under Clause 4.2 Maharashtra Innovative Startup Policy.'
    },
    {
      srNo: '03',
      parameter: 'Civic SCADA & Protocol Interoperability',
      statutoryNorm: 'Seamless transmission to PMC Central SCADA without proprietary gateway lock-in',
      vendorEvidence: 'Native Modbus/RTU over RS-485, MQTT telemetry sink, and LoRaWAN dual-mode transmitter verified.',
      weightage: '20%',
      scoreAwarded: '95 / 100',
      compliance: 'Fully Compliant',
      remark: 'Full interoperability with existing PMC command & control software.'
    },
    {
      srNo: '04',
      parameter: 'Statutory Eligibility & GFR Exemption',
      statutoryNorm: 'DoE OM F.20/2/2014-PPD & GFR Rule 173(i) Startup Prior Experience & Turnover Waiver',
      vendorEvidence: 'DPIIT Certificate No. DIPP123847 valid. Entity incorporated < 10 years, turnover < ₹100 Cr.',
      weightage: '20%',
      scoreAwarded: '100 / 100',
      compliance: 'Waived & Eligible',
      remark: 'Statutory relaxation granted as per Government of India public procurement norms.'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scrutiny-sheet-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-[#0b2545]/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-auto rounded border-2 border-slate-400 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800">
        {/* Top Control Bar (Navy) */}
        <div className="shrink-0 bg-[#0b2545] px-4 py-2.5 text-white flex items-center justify-between no-print border-b border-[#163b6d]">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-[#ff9933]" />
            <span id="scrutiny-sheet-title" className="text-xs font-bold uppercase tracking-wider">
              प्रपत्र तांत्रिक मूल्यमापन अहवाल / FORM-TEC-SCRUTINY-2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors cursor-pointer border border-white/20"
              title="Print official scrutiny sheet"
            >
              <Printer className="size-3" />
              <span>Print Sheet</span>
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

        {/* Official Printable Scrutiny Sheet Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 min-h-0 space-y-4 text-xs bg-white govt-watermark">
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
              तांत्रिक मूल्यमापन समिती अहवाल (TECHNICAL EVALUATION COMMITTEE REPORT)
            </p>
            <p className="text-[10px] text-slate-600 font-medium">
              महाराष्ट्र राज्य नवउद्यम संस्था (MSInS) · पुणे महानगरपालिका (PMC) सँडबॉक्स कक्ष
            </p>
          </div>

          {/* Reference & Audit Details Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded border border-slate-300 font-mono text-[11px]">
            <div>
              <span className="text-slate-500 block text-[10px]">SCRUTINY ID:</span>
              <strong className="text-[#0b2545]">TEC-2026/0841</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">EVALUATION DATE:</span>
              <strong className="text-[#0b2545]">07-Sep-2026</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">STATUTORY BASIS:</span>
              <strong className="text-[#0b2545]">GFR Rule 166/173(i)</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">STATUS:</span>
              <strong className="text-emerald-700 font-bold">RECOMMENDED (L-1)</strong>
            </div>
          </div>

          {/* Candidate Startup Summary Strip */}
          <div className="rounded border border-slate-300 bg-white p-3 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Candidate Entity:</span>
                <h4 className="text-sm font-bold text-[#0b2545]">{startup.name}</h4>
                <p className="text-[11px] text-slate-600">
                  DPIIT Reg: <strong>DIPP123847</strong> · Incorporated: Pune, Maharashtra · MSInS Empaneled
                </p>
              </div>
              <div className="sm:text-right">
                <div className="govt-stamp-green text-[10px]">
                  QUALIFIED (L-1)
                </div>
              </div>
            </div>

            <div className="pt-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
              <div>
                <span>Target Challenge: </span>
                <strong className="text-[#0b2545]">{challenge.title}</strong>
              </div>
              <div>
                <span>Composite Merit Index: </span>
                <strong className="text-[#b45309] text-sm font-mono">{startup.match}% (Score: 95.8/100)</strong>
              </div>
            </div>
          </div>

          {/* Official Evaluation Matrix Table */}
          <div className="overflow-x-auto border border-slate-300 rounded-xs">
            <table className="govt-table text-[11px]">
              <thead>
                <tr>
                  <th className="w-10 text-center">Sr.</th>
                  <th className="w-44">Evaluation Parameter</th>
                  <th>Prescribed Statutory Benchmark</th>
                  <th className="w-14 text-center">Weight</th>
                  <th className="w-16 text-center">Score</th>
                  <th className="w-24 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {evaluationMatrix.map((item) => (
                  <tr key={item.srNo}>
                    <td className="text-center font-mono font-bold text-slate-600">{item.srNo}</td>
                    <td>
                      <strong className="text-slate-800 block">{item.parameter}</strong>
                      <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">{item.remark}</span>
                    </td>
                    <td className="text-slate-700 leading-tight text-[10px]">
                      {item.statutoryNorm}
                      <p className="text-[9px] text-slate-500 font-mono mt-1 border-t border-slate-200 pt-0.5">
                        Proof: {item.vendorEvidence}
                      </p>
                    </td>
                    <td className="text-center font-mono text-slate-600">{item.weightage}</td>
                    <td className="text-center font-mono font-bold text-[#0b2545]">{item.scoreAwarded}</td>
                    <td className="text-center">
                      <span className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-1.5 py-0.5 rounded-xs text-[9px]">
                        {item.compliance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statutory Finding & Recommendation */}
          <div className="rounded border border-amber-300 bg-[#fffbeb] p-3 text-xs leading-relaxed text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-[#92400e]">
              <Scale className="size-4 shrink-0" />
              <span>COMMISSION &amp; SCRUTINY COMMITTEE FINDINGS:</span>
            </p>
            <p className="text-justify text-[11px]">
              The candidate solution from <strong>{startup.name}</strong> satisfies the mandatory technical conditions under <em>Rule 166 of GFR, 2017</em>. Startup India turnover exemptions under <em>OM No. F.20/2/2014-PPD</em> stand admitted. The committee recommends immediate issuance of 60-day pilot sanction with 30% mobilization advance via PFMS.
            </p>
          </div>

          {/* Official Signatures & DSC Cryptographic Block */}
          <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Digital Signature Verification */}
            <div className="p-2.5 rounded bg-slate-50 border border-slate-300 text-[10px] space-y-1 font-mono">
              <div className="flex items-center gap-1 font-bold text-emerald-800">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>CLASS-3 DIGITAL SIGNATURE CERTIFICATE (DSC)</span>
              </div>
              <p className="text-slate-600">Signatory: Er. S. R. Deshmukh (EE, Water Supply, PMC)</p>
              <p className="text-slate-500 truncate">Certificate Hash: 8f2a91b402e1c9447d918c5e0034a7</p>
              <p className="text-slate-500">NIC e-Pramaan Timestamp: 07-Sep-2026 22:30:15 IST</p>
            </div>

            {/* Committee Endorsement Stamp */}
            <div className="text-right flex flex-col justify-end">
              <p className="font-serif font-bold text-xs text-[#0b2545]">
                Er. S. R. Deshmukh
              </p>
              <p className="text-[11px] text-slate-600 font-medium">
                Executive Engineer &amp; Nodal Officer
              </p>
              <p className="text-[10px] text-slate-500">
                Water Supply Department, Pune Municipal Corporation
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer (Navy) */}
        <div className="shrink-0 bg-slate-100 px-4 py-3 border-t border-slate-300 flex items-center justify-between no-print">
          <span className="text-[11px] text-slate-500 font-medium">
            Standard Technical Evaluation Document · GFR 2017 &amp; Maharashtra Startup Policy 2018
          </span>
          <Button
            onClick={onClose}
            className="bg-[#0b2545] hover:bg-[#163b6d] text-white text-xs font-bold px-4 py-1.5 h-auto"
          >
            Close Scrutiny Sheet
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
