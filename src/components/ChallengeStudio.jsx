import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  FileCheck,
  Info,
  Scale,
  FileText,
  BadgeCheck,
  MapPin,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { formatINR } from '../lib/utils';
import { DEPARTMENTS } from '../data/mockData';
import { t } from '../data/translations';

function FormField({ label, htmlFor, required = false, badge, hint, error, children }) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
          {label}
          {required && <span className="text-destructive font-bold">*</span>}
        </label>
        {badge && <div>{badge}</div>}
      </div>
      {children}
      {error ? (
        <p className="text-[11px] text-destructive font-semibold flex items-center gap-1">
          <AlertCircle className="size-3 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function ChallengeStudio({ challenge, onChange, onSubmit, currentUser, lang = 'en' }) {
  const isStartup = currentUser?.role === 'startup';
  const [ward, setWard] = useState('Kothrud (Ward No. 12)');
  const [touched, setTouched] = useState({ title: false, kpi: false });

  // Defensive validation logic
  const isTitleValid = Boolean(challenge.title && challenge.title.trim().length >= 10);
  const isBudgetValid = typeof challenge.budget === 'number' && !isNaN(challenge.budget) && challenge.budget >= 100000 && challenge.budget <= 1500000;
  const isKpiValid = Boolean(challenge.kpi && challenge.kpi.trim().length >= 4);
  const isWithinCap = challenge.budget <= 1500000;
  const isFormValid = isStartup || (isTitleValid && isBudgetValid && isKpiValid);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ title: true, kpi: true });
      return;
    }
    onSubmit();
  };

  return (
    <section aria-labelledby="studio-title" className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* Official Government Requisition Header */}
      <div className="mb-5 rounded border border-border bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-xs bg-[#0b2545] text-white font-bold text-xs font-mono">
              01
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
                {t(lang, 'requisition.formCode')}
              </span>
              <h1 id="studio-title" className="text-lg sm:text-xl font-serif font-bold text-primary tracking-tight">
                {t(lang, 'requisition.heading')}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground self-start sm:self-auto font-mono">
            <span className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-medium">
              {t(lang, 'requisition.fiscalYear')}
            </span>
            <span className="rounded bg-slate-100 px-2 py-0.5 border border-slate-300 font-medium">
              Outward: MSInS/PMC/2026/0491
            </span>
          </div>
        </div>

        {/* Gazette / Policy Mandate Notice */}
        <div className="mt-3 flex items-start gap-2.5 rounded bg-[#fffbeb] p-3 text-xs text-[#92400e] border border-amber-200">
          <Scale className="size-4 shrink-0 mt-0.5 text-[#b45309]" />
          <p className="leading-relaxed">
            <strong>Statutory Mandate:</strong> Published under the <em>Maharashtra State Innovative Startup Policy 2018</em> &amp; <em>Rule 166 of General Financial Rules (GFR), 2017</em>. Startups recognized by DPIIT are eligible for direct pilot sanctions with waiver of prior turnover and experience under Rule 173(i).
          </p>
        </div>
      </div>

      {/* Role-Based Segregation of Duties (SOD) Notice */}
      {isStartup && (
        <div className="mb-5 flex items-start gap-2.5 rounded bg-blue-50 p-3.5 text-xs text-blue-900 border border-blue-200">
          <Info className="size-4 shrink-0 mt-0.5 text-blue-700" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px] text-blue-800 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">
              Segregation of Duties (SOD) Active
            </span>
            <p className="mt-1 font-medium leading-relaxed">
              {t(lang, 'requisition.readOnlyBanner')}
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded border border-border bg-card shadow-xs overflow-hidden"
      >
        <div className="bg-[#edf2f7] border-b border-border px-6 py-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] flex items-center gap-1.5">
            <Building2 className="size-4 text-[#0b2545]" />
            1. Department Sponsoring Authority &amp; Scope
          </h2>
          <span className="text-[11px] text-muted-foreground font-medium">
            Fields marked with (<span className="text-destructive font-bold">*</span>) are mandatory
          </span>
        </div>

        <div className="p-6 grid gap-5">
          {/* Sponsoring Department & Ward Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department Selection */}
            <FormField
              label={t(lang, 'requisition.deptLabel')}
              htmlFor="department"
              required={true}
              hint="Public procurement authority issuing the innovation pilot challenge"
            >
              <div className="relative">
                <select
                  id="department"
                  value={challenge.department}
                  disabled={isStartup}
                  onChange={(e) => onChange({ department: e.target.value })}
                  className={`w-full appearance-none rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-[#0b2545] focus:ring-1 focus:ring-[#0b2545] ${
                    isStartup ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-white cursor-pointer"
                  }`}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </FormField>

            {/* Target Municipal Ward */}
            <FormField
              label={t(lang, 'requisition.wardLabel')}
              htmlFor="ward"
              required={true}
              hint="Geographic zone allocated for 60-day sandbox deployment"
            >
              <div className="relative">
                <select
                  id="ward"
                  value={challenge.ward || ward}
                  disabled={isStartup}
                  onChange={(e) => {
                    setWard(e.target.value);
                    onChange({ ward: e.target.value });
                  }}
                  className={`w-full appearance-none rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-[#0b2545] focus:ring-1 focus:ring-[#0b2545] ${
                    isStartup ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-white cursor-pointer"
                  }`}
                >
                  <option value="Kothrud (Ward No. 12)">Kothrud (Ward No. 12) - High Priority</option>
                  <option value="Aundh-Baner (Ward No. 8)">Aundh-Baner (Ward No. 8)</option>
                  <option value="Kasba-Vishrambaug (Ward No. 15)">Kasba-Vishrambaug (Ward No. 15)</option>
                  <option value="Hadapsar-Mundhwa (Ward No. 21)">Hadapsar-Mundhwa (Ward No. 21)</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </FormField>
          </div>

          {/* Challenge Title with validation */}
          <FormField
            label={t(lang, 'requisition.titleLabel')}
            htmlFor="title"
            required={true}
            hint="Must specify problem and infrastructure sector (min. 10 characters)"
            error={!isStartup && touched.title && !isTitleValid ? t(lang, 'requisition.validationErrorTitle') : null}
          >
            <input
              id="title"
              type="text"
              required
              disabled={isStartup}
              value={challenge.title}
              onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
              onChange={(e) => onChange({ title: e.target.value })}
              className={`w-full rounded border px-3 py-2 text-sm font-medium outline-none transition-colors ${
                isStartup
                  ? "border-slate-300 bg-slate-100 text-slate-600 cursor-not-allowed"
                  : touched.title && !isTitleValid
                  ? "border-destructive bg-destructive/5 text-slate-800 focus:border-destructive"
                  : "border-slate-300 bg-white text-slate-800 focus:border-[#0b2545] focus:ring-1 focus:ring-[#0b2545]"
              }`}
              placeholder={t(lang, 'requisition.titlePlaceholder')}
            />
          </FormField>

          {/* Pilot Budget & Financial Ceiling with Validation */}
          <FormField
            label={t(lang, 'requisition.budgetLabel')}
            htmlFor="budget"
            required={true}
            badge={
              <span
                className={
                  isWithinCap
                    ? "inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200"
                    : "inline-flex items-center gap-1 rounded bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800 border border-rose-200"
                }
              >
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                {isWithinCap ? t(lang, 'requisition.budgetWithinCap') : t(lang, 'requisition.budgetExceedsCap')}
              </span>
            }
            hint="Pilots up to ₹15 Lakhs qualify for direct single-source procurement under GFR Rule 166"
            error={!isStartup && !isBudgetValid ? t(lang, 'requisition.validationErrorBudget') : null}
          >
            <div className={`rounded border border-slate-300 p-4 ${isStartup ? "bg-slate-50" : "bg-white"}`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold tabular-nums text-[#0b2545] font-mono">
                    {formatINR(challenge.budget)}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    (HOA: 2217-01-800-01 Municipal Water Infrastructure)
                  </span>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <span>Standard MSInS Cap: <strong className="text-slate-800">₹15,00,000</strong></span>
                </div>
              </div>

              <input
                id="budget"
                type="range"
                min={100000}
                max={1500000}
                step={50000}
                disabled={isStartup}
                value={challenge.budget}
                onChange={(e) => onChange({ budget: Number(e.target.value) })}
                className={`mt-4 w-full accent-[#0b2545] ${isStartup ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              />

              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Minimum Pilot: ₹1,00,000</span>
                <span>Statutory Upper Limit: ₹15,00,000 (GFR 166 Cap)</span>
              </div>

              {/* Real-Time PFMS Tranche Disbursement Breakdown */}
              <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Tranche 1 (30% Mobilization Advance):</span>
                  <strong className="text-emerald-700 font-mono font-bold text-xs">
                    {formatINR(Math.round(challenge.budget * 0.3))} (₹{(Math.round(challenge.budget * 0.3) / 100000).toFixed(2)} Lakhs)
                  </strong>
                  <p className="text-[10px] text-slate-500 mt-0.5">Disbursed directly via PFMS on physical sensor installation</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Tranche 2 (70% Final Deliverable):</span>
                  <strong className="text-[#0b2545] font-mono font-bold text-xs">
                    {formatINR(Math.round(challenge.budget * 0.7))} (₹{(Math.round(challenge.budget * 0.7) / 100000).toFixed(2)} Lakhs)
                  </strong>
                  <p className="text-[10px] text-slate-500 mt-0.5">Released upon certified KPI target verification &amp; inspection</p>
                </div>
              </div>
            </div>
          </FormField>

          {/* Target KPI Benchmark with Validation */}
          <FormField
            label={t(lang, 'requisition.kpiLabel')}
            htmlFor="kpi"
            required={true}
            hint="Measurable metric required for final evaluation and direct procurement conversion (min. 4 characters)"
            error={!isStartup && touched.kpi && !isKpiValid ? t(lang, 'requisition.validationErrorKpi') : null}
          >
            <input
              id="kpi"
              type="text"
              required
              disabled={isStartup}
              value={challenge.kpi}
              onBlur={() => setTouched((prev) => ({ ...prev, kpi: true }))}
              onChange={(e) => onChange({ kpi: e.target.value })}
              className={`w-full rounded border px-3 py-2 text-sm font-medium outline-none transition-colors ${
                isStartup
                  ? "border-slate-300 bg-slate-100 text-slate-600 cursor-not-allowed"
                  : touched.kpi && !isKpiValid
                  ? "border-destructive bg-destructive/5 text-slate-800 focus:border-destructive"
                  : "border-slate-300 bg-white text-slate-800 focus:border-[#0b2545] focus:ring-1 focus:ring-[#0b2545]"
              }`}
              placeholder={t(lang, 'requisition.kpiPlaceholder')}
            />
          </FormField>

          {/* Administrative Certification */}
          <div className="rounded border border-slate-300 bg-slate-50 p-3 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="size-4 shrink-0 text-[#0b2545] mt-0.5" />
            <p className="leading-relaxed">
              <strong>Administrative Certification:</strong> The Sponsoring Officer certifies that this civic requisition has received Administrative Approval (AA Sanction: <code>PMC/CE-WTR/AA-2026/894</code>) and qualifies for direct sandbox pilot scrutiny under the Maharashtra State Innovation Framework.
            </p>
          </div>
        </div>

        {/* Submit Action Guarded by Validation */}
        <div className="bg-[#edf2f7] border-t border-border px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
            {isStartup ? (
              <span className="text-blue-800 font-semibold flex items-center gap-1">
                <Info className="size-3.5" /> Reviewing Official Sponsoring Requisition as DPIIT Startup
              </span>
            ) : isFormValid ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> Form Validated · Ready for Technical Scrutiny
              </span>
            ) : (
              <span className="text-amber-800">
                Please satisfy all mandatory fields marked with (*)
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full sm:w-auto gap-2 px-6 bg-[#0b2545] hover:bg-[#163b6d] text-white font-bold text-xs py-2.5 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{isStartup ? t(lang, 'requisition.readOnlyProceed') : t(lang, 'requisition.submitBtn')}</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </section>
  );
}
