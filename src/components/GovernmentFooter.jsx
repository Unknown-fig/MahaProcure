import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, HelpCircle, FileText, Lock } from 'lucide-react';
import { MaharashtraSeal } from './OfficialEmblems';

export function GovernmentFooter({ onOpenPolicyModal }) {
  const [visitorCount] = useState(1429812);

  return (
    <footer className="w-full bg-[#07172c] text-white border-t-4 border-accent mt-auto text-xs no-print">
      {/* 1. National & State Government Portals Link Strip */}
      <div className="border-b border-white/10 bg-[#051121] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs border border-white/20">
              <MaharashtraSeal className="size-8" />
            </div>
            <div>
              <p className="font-bold text-xs tracking-wide">MAHARASHTRA STATE INNOVATION SOCIETY</p>
              <p className="text-[10px] text-white/60">Government of Maharashtra Public Procurement Sandbox</p>
            </div>
          </div>

          {/* Quick External Government Links */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/70">
            <a href="https://aaplesarkar.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              Aaple Sarkar <ExternalLink className="size-2.5" />
            </a>
            <span>•</span>
            <a href="https://gem.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              GeM (Govt e-Marketplace) <ExternalLink className="size-2.5" />
            </a>
            <span>•</span>
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              National Portal of India <ExternalLink className="size-2.5" />
            </a>
            <span>•</span>
            <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              Open Data (Data.gov.in) <ExternalLink className="size-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Mandatory GIGW Legal & Policy Links */}
      <div className="py-6 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-[11px] text-white/80 font-medium">
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('terms')}
              className="hover:text-saffron transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('privacy')}
              className="hover:text-saffron transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('hyperlink')}
              className="hover:text-saffron transition-colors cursor-pointer"
            >
              Hyperlinking Policy
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('copyright')}
              className="hover:text-saffron transition-colors cursor-pointer"
            >
              Copyright Policy
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('accessibility')}
              className="hover:text-saffron transition-colors cursor-pointer"
            >
              Accessibility Statement
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('rti')}
              className="hover:text-saffron transition-colors cursor-pointer"
            >
              RTI (Right to Information)
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('gfr')}
              className="hover:text-saffron transition-colors cursor-pointer text-saffron"
            >
              GFR 166 Sandbox Rules
            </button>
          </div>

          {/* Department & NIC Disclaimer */}
          <div className="mt-4 text-[11px] text-white/60 leading-relaxed space-y-1">
            <p>
              Website Content Managed by <strong>Maharashtra State Innovation Society (MSInS)</strong>, Skill, Employment, Entrepreneurship &amp; Innovation Department, Government of Maharashtra.
            </p>
            <p>
              Designed, Developed and Hosted by <strong>National Informatics Centre (NIC) / MahaOnline</strong>, Ministry of Electronics &amp; Information Technology, Government of India.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Security Certification, Visitor Counter & Timestamps */}
      <div className="py-3 bg-[#030b17] text-[10px] text-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 border border-white/10 text-emerald-400">
              <ShieldCheck className="size-3" />
              STQC / CERT-In Certified Safe to Host
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 border border-white/10 text-white/70">
              <Lock className="size-2.5" />
              SSL 256-Bit Encrypted
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <span>Page Last Reviewed: <strong>06-09-2026</strong></span>
            <span>•</span>
            <span>Total Visitors: <strong className="text-white/80">{visitorCount.toLocaleString('en-IN')}</strong></span>
            <span>•</span>
            <span>v2.4.1-gov</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
