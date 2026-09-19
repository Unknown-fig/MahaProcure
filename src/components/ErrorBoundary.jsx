import React from 'react';
import { AlertTriangle, RotateCcw, Home, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { MaharashtraSeal, AshokaEmblem } from './OfficialEmblems';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production, can log to administrative audit logger
    console.error("MahaProcure Application Exception Caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/?stage=1&role=buyer';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-[#0b2545] selection:bg-accent/20">
          {/* Top Tiranga Strip */}
          <div className="flex h-1.5 w-full">
            <div className="flex-1 bg-[#ff9933]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#138808]" />
          </div>

          <header className="border-b border-slate-300 bg-[#0b2545] text-white p-4">
            <div className="mx-auto max-w-4xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-white">
                  <MaharashtraSeal className="size-10" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-base text-white">
                    महाराष्ट्र शासन | Government of Maharashtra
                  </h1>
                  <p className="text-xs text-slate-300">
                    MahaProcure Public Procurement Sandbox Portal
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-rose-500 text-white font-bold px-2 py-0.5 rounded">
                APPLICATION EXCEPTION SAFEGUARD
              </span>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-xl rounded border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-rose-100 text-rose-700 shrink-0">
                  <ShieldAlert className="size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    सिस्टम त्रुटी निवारण / EXCEPTION SHIELD
                  </span>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-[#0b2545] mt-1">
                    An Unexpected Error Occurred in the Application
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    The portal encountered an unhandled client state exception. To protect session data and prevent a blank screen during your evaluation, the ErrorBoundary prevented an application crash.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded bg-[#0b2545] hover:bg-[#163b6d] text-white font-bold text-xs py-2.5 px-4 cursor-pointer transition-colors shadow-xs"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Reload Current Page</span>
                </button>

                <button
                  type="button"
                  onClick={this.handleReset}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-[#0b2545] font-bold text-xs py-2.5 px-4 cursor-pointer transition-colors"
                >
                  <Home className="size-3.5" />
                  <span>Return to Stage 1 (Safe Mode)</span>
                </button>
              </div>

              {/* Technical Audit Accordion */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                  className="flex items-center justify-between w-full text-[11px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <span>Technical Diagnostics &amp; Stack Trace</span>
                  {this.state.showDetails ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>

                {this.state.showDetails && (
                  <pre className="mt-2 bg-slate-900 text-slate-200 p-3 rounded font-mono text-[10px] overflow-x-auto leading-relaxed max-h-48">
                    {this.state.error && this.state.error.toString()}
                    {'\n\n'}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            </div>
          </main>

          <footer className="border-t border-slate-300 bg-slate-100 py-3 text-center text-xs text-slate-500 font-mono">
            MahaProcure Exception Safeguard · GIGW 3.0 &amp; IT Act 2000 Compliant
          </footer>
        </div>
      );
    }

    return this.props.children;
  }
}
