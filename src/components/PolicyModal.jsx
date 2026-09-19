import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, FileText, Scale, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

export function PolicyModal({ type, onClose }) {
  React.useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const contentMap = {
    gfr: {
      title: "General Financial Rules (GFR) 2017 — Rule 166 & 173(i)",
      subtitle: "Ministry of Finance & Government of Maharashtra Procurement Guidelines",
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-foreground">
          <div className="rounded bg-amber-soft p-3 border border-accent/20">
            <h4 className="font-bold text-accent mb-1 flex items-center gap-1.5">
              <Scale className="size-4" /> Rule 166: Single Tender Inquiry (Proprietary / Pilot Solutions)
            </h4>
            <p>
              Procurement from a single source may be resorted to when the innovative solution or technology has successfully passed a sanctioned Sandbox pilot benchmark under an authorized State Innovation Society, and no comparable alternative meets the municipal specification.
            </p>
          </div>
          <div className="rounded bg-muted/40 p-3 border border-border">
            <h4 className="font-bold text-primary mb-1 flex items-center gap-1.5">
              <ShieldCheck className="size-4" /> Rule 173(i): Relaxation of Prior Turnover &amp; Prior Experience
            </h4>
            <p>
              As per DoE OM No. F.20/2/2014-PPD and Maharashtra State Innovative Startup Policy 2018, all recognized DPIIT startups are strictly exempt from prior turnover and experience criteria, subject to meeting technical capability benchmarks.
            </p>
          </div>
        </div>
      ),
    },
    registry: {
      title: "Maharashtra Startup Registry (DPIIT & MSInS Integrated)",
      subtitle: "Recognized Innovation Entities under Department for Promotion of Industry and Internal Trade",
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-foreground">
          <p>
            The Maharashtra Public Procurement Sandbox engine queries a live sync of over 2,400+ DPIIT registered startups domiciled in Maharashtra.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            <li>Automatic validation of Certificate of Recognition (DIPP Number)</li>
            <li>Verification of incorporation via DigiLocker / MCA21 integration</li>
            <li>Tax exemption clearance under Section 80-IAC (where applicable)</li>
          </ul>
        </div>
      ),
    },
    gem: {
      title: "MahaGEMS & Government e-Marketplace (GeM) Integration",
      subtitle: "Unified Public Procurement Gateway for Direct Municipal Purchase",
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-foreground">
          <p>
            Upon issuance of the Direct Procurement Dossier, the awarded startup is automatically pre-registered under the <strong>GeM Startup Runway / Direct Purchase (Rule 166)</strong> category.
          </p>
          <div className="rounded bg-muted p-2.5 font-mono text-[11px] text-muted-foreground">
            Integration Endpoint: https://gem.gov.in/api/v2/sandbox/msins/verify<br />
            Auth Protocol: Digital Signature Certificate (DSC Class 3)
          </div>
        </div>
      ),
    },
    terms: {
      title: "Terms & Conditions of Portal Usage",
      subtitle: "Maharashtra State Innovation Society (MSInS) Statutory Terms",
      body: (
        <p className="text-xs text-muted-foreground leading-relaxed">
          This portal is the official property of the Government of Maharashtra. Access is restricted to authorized municipal procurement officers and verified startup representatives. All pilot grant allocations are governed by Maharashtra State Finance Department audit rules.
        </p>
      ),
    },
    privacy: {
      title: "Privacy & Data Protection Policy",
      subtitle: "Digital Personal Data Protection Act (DPDP) 2023 Compliance",
      body: (
        <p className="text-xs text-muted-foreground leading-relaxed">
          All proprietary intellectual property, IoT sensor telemetry data, and patent disclosures submitted by startups during the 60-day sandbox pilot are strictly confidential and protected against commercial disclosure.
        </p>
      ),
    },
    hyperlink: {
      title: "Hyperlinking Policy",
      subtitle: "GIGW Guidelines for Indian Government Websites",
      body: (
        <p className="text-xs text-muted-foreground leading-relaxed">
          We do not object to you linking directly to the information hosted on this portal. Hyperlinks directed to external non-government websites are provided for convenience only.
        </p>
      ),
    },
    copyright: {
      title: "Copyright Policy",
      subtitle: "Government of Maharashtra Intellectual Property",
      body: (
        <p className="text-xs text-muted-foreground leading-relaxed">
          Material featured on this portal may be reproduced free of charge in any format or media without requiring specific permission, subject to the material being reproduced accurately and not being used in a derogatory manner.
        </p>
      ),
    },
    accessibility: {
      title: "Accessibility Statement",
      subtitle: "Compliance with GIGW 3.0 & Web Content Accessibility Guidelines (WCAG) 2.1 AA",
      body: (
        <p className="text-xs text-muted-foreground leading-relaxed">
          This website is designed to be accessible for all users regardless of device, technology or ability. It is built using principles of Universal Design and GIGW 3.0 standards, offering high contrast display, font resizing, and screen reader compatibility.
        </p>
      ),
    },
    rti: {
      title: "Right to Information (RTI) Disclosures",
      subtitle: "Section 4(1)(b) of the Right to Information Act, 2005",
      body: (
        <div className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
          <p>
            Public Authority: Maharashtra State Innovation Society (MSInS), Mumbai.<br />
            Public Information Officer (PIO): Under Secretary, Skill &amp; Innovation Dept.<br />
            Appellate Authority: Chief Executive Officer, MSInS, Mantralaya, Mumbai.
          </p>
        </div>
      ),
    }
  };

  const current = contentMap[type] || contentMap.gfr;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b2545]/70 p-4 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg my-auto rounded-lg border-2 border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <X className="size-4" />
        </button>

        <div className="border-b border-border pb-3 mb-4">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
            GOVERNMENT OF MAHARASHTRA · STATUTORY NOTICE
          </span>
          <h3 id="policy-modal-title" className="text-base font-serif font-bold text-primary mt-0.5">
            {current.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {current.subtitle}
          </p>
        </div>

        <div>{current.body}</div>

        <div className="mt-6 pt-3 border-t border-border text-right">
          <Button onClick={onClose} size="sm" className="px-4">
            Close Notice
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
