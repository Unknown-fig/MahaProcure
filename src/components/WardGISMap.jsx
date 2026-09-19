import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Activity,
  Radio,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Send,
  Layers,
  Zap,
  Clock,
  Droplets,
  Gauge,
  Code2,
  Terminal,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';

const WARDS_DATA = {
  kothrud: {
    name: 'Kothrud (Ward #12, PMC)',
    coords: '18.5074° N, 73.8077° E',
    nodes: [
      { id: 'NODE-101', name: 'Paud Rd Primary Main', x: 22, y: 35, pressure: 3.8, freq: 12.1, status: 'nominal', dma: 'DMA-01', flow: 48.2 },
      { id: 'NODE-102', name: 'Dahanukar Colony Feeder', x: 38, y: 25, pressure: 3.7, freq: 11.9, status: 'nominal', dma: 'DMA-01', flow: 32.1 },
      { id: 'NODE-103', name: 'Karve Road Trunk Line', x: 55, y: 45, pressure: 3.9, freq: 12.4, status: 'nominal', dma: 'DMA-02', flow: 64.5 },
      { id: 'NODE-104', name: 'MIT College Sector 4', x: 42, y: 62, pressure: 2.3, freq: 28.7, status: 'leak', dma: 'DMA-02', leakDist: 'Sub-meter: 0.8m from valve', flow: 18.4 },
      { id: 'NODE-105', name: 'Chandani Chowk Inflow', x: 15, y: 70, pressure: 4.2, freq: 12.0, status: 'nominal', dma: 'DMA-03', flow: 82.0 },
      { id: 'NODE-106', name: 'Mayur Colony Branch', x: 68, y: 32, pressure: 3.6, freq: 11.8, status: 'nominal', dma: 'DMA-03', flow: 29.3 },
      { id: 'NODE-107', name: 'Kothrud Stand Junction', x: 75, y: 58, pressure: 3.5, freq: 12.2, status: 'nominal', dma: 'DMA-04', flow: 41.7 },
      { id: 'NODE-108', name: 'Gujrat Colony Res.', x: 82, y: 20, pressure: 3.8, freq: 12.5, status: 'nominal', dma: 'DMA-04', flow: 22.8 },
    ]
  },
  shivajinagar: {
    name: 'Shivajinagar (Ward #07, PMC)',
    coords: '18.5314° N, 73.8446° E',
    nodes: [
      { id: 'NODE-201', name: 'FC Road Junction Line', x: 25, y: 30, pressure: 4.1, freq: 11.5, status: 'nominal', dma: 'DMA-01', flow: 52.0 },
      { id: 'NODE-202', name: 'COEP River Crossing Feeder', x: 45, y: 35, pressure: 3.9, freq: 12.0, status: 'nominal', dma: 'DMA-01', flow: 68.4 },
      { id: 'NODE-203', name: 'JM Road Commerce Line', x: 60, y: 55, pressure: 3.8, freq: 11.9, status: 'nominal', dma: 'DMA-02', flow: 45.2 },
      { id: 'NODE-204', name: 'Modern College Sector', x: 78, y: 65, pressure: 3.7, freq: 12.2, status: 'nominal', dma: 'DMA-02', flow: 38.0 },
    ]
  },
  hadapsar: {
    name: 'Hadapsar (Ward #21, PMC)',
    coords: '18.5089° N, 73.9260° E',
    nodes: [
      { id: 'NODE-301', name: 'Magarpatta Cyber Inflow', x: 20, y: 40, pressure: 4.3, freq: 12.1, status: 'nominal', dma: 'DMA-01', flow: 94.0 },
      { id: 'NODE-302', name: 'Solapur Highway Trunk', x: 50, y: 30, pressure: 4.0, freq: 11.8, status: 'nominal', dma: 'DMA-01', flow: 78.5 },
      { id: 'NODE-303', name: 'Gadital Depot Feeder', x: 70, y: 60, pressure: 3.6, freq: 12.4, status: 'nominal', dma: 'DMA-02', flow: 31.2 },
    ]
  }
};

export function WardGISMap({ ward, onTelemetryUpdate, userRole = 'startup' }) {
  const getInitialWardKey = (w) => {
    if (!w) return 'kothrud';
    const lower = String(w).toLowerCase();
    if (lower.includes('hadapsar')) return 'hadapsar';
    if (lower.includes('shivajinagar')) return 'shivajinagar';
    return 'kothrud';
  };

  const initialKey = getInitialWardKey(ward);
  const [selectedWardKey, setSelectedWardKey] = useState(initialKey);
  const [nodes, setNodes] = useState(WARDS_DATA[initialKey]?.nodes || WARDS_DATA.kothrud.nodes);
  const [selectedNode, setSelectedNode] = useState(
    (WARDS_DATA[initialKey]?.nodes && WARDS_DATA[initialKey]?.nodes[3]) || WARDS_DATA.kothrud.nodes[0]
  );
  const [packetCount, setPacketCount] = useState(48291);
  const [lastPacketTime, setLastPacketTime] = useState('Just now');
  const [simulating, setSimulating] = useState(false);
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [activeLayer, setActiveLayer] = useState('all');
  const [audioWave, setAudioWave] = useState([18, 35, 24, 65, 42, 88, 54, 30, 22, 45, 76, 32]);

  // Handle ward switch
  const handleWardChange = (wardKey) => {
    setSelectedWardKey(wardKey);
    const wardData = WARDS_DATA[wardKey];
    setNodes(wardData.nodes);
    setSelectedNode(wardData.nodes[0]);
  };

  // Periodic micro-transient wave update
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setAudioWave((prev) => prev.map(() => Math.floor(Math.random() * 70) + 15));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSimulatePacket = () => {
    setSimulating(true);
    setTimeout(() => {
      setPacketCount((prev) => prev + 12);
      setLastPacketTime(new Date().toLocaleTimeString());
      setSimulating(false);
      if (onTelemetryUpdate) {
        onTelemetryUpdate({
          timestamp: new Date().toISOString(),
          node: selectedNode.id,
          pressure: Number((selectedNode.pressure + (Math.random() * 0.1 - 0.05)).toFixed(2)),
          freq: selectedNode.freq
        });
      }
    }, 500);
  };

  // Phase-2: Anomaly Injection Handler
  const handleTriggerAcousticSurge = () => {
    const updatedFreq = 31.4;
    const updatedPressure = 2.1;
    const leakMessage = 'Acoustic Anomaly Localised (0.6m from valve)';
    
    setNodes((prev) =>
      prev.map((n) =>
        n.id === selectedNode.id
          ? {
              ...n,
              freq: updatedFreq,
              pressure: updatedPressure,
              status: 'leak',
              leakDist: leakMessage
            }
          : n
      )
    );
    setSelectedNode((prev) => ({
      ...prev,
      freq: updatedFreq,
      pressure: updatedPressure,
      status: 'leak',
      leakDist: leakMessage
    }));
    setAudioWave([88, 96, 99, 92, 98, 99, 94, 88, 82, 95, 91, 98]);
    setPacketCount((prev) => prev + 24);
    if (onTelemetryUpdate) {
      onTelemetryUpdate({
        timestamp: new Date().toISOString(),
        node: selectedNode.id,
        pressure: updatedPressure,
        freq: updatedFreq
      });
    }
  };

  const currentWard = WARDS_DATA[selectedWardKey];

  return (
    <div className="rounded border border-border bg-card overflow-hidden shadow-xs">
      {/* 1. GIS Map Top Header (Navy) */}
      <div className="bg-[#0b2545] p-3.5 sm:p-4 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-white/10 text-amber-300 border border-white/20">
            <Radio className="size-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">
                Live SCADA Telemetry
              </span>
              <span className="text-white/70 text-[11px] font-mono">
                {currentWard.name}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-white mt-0.5">
              Municipal Hydro-Acoustic IoT Pipeline Monitoring Grid
            </h3>
          </div>
        </div>

        {/* Live Controls & Anomaly Injection Trigger */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Ward Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedWardKey}
              onChange={(e) => handleWardChange(e.target.value)}
              className="bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] px-2.5 py-1 rounded border border-white/30 cursor-pointer outline-none"
            >
              <option value="kothrud" className="text-slate-900">Kothrud (Ward #12)</option>
              <option value="shivajinagar" className="text-slate-900">Shivajinagar (Ward #07)</option>
              <option value="hadapsar" className="text-slate-900">Hadapsar (Ward #21)</option>
            </select>
          </div>

          {/* Anomaly Injection Button */}
          <button
            type="button"
            onClick={handleTriggerAcousticSurge}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded font-bold text-[11px] transition-colors shadow-xs cursor-pointer active:scale-95"
            title="Simulate sudden pipe transient surge / acoustic leak"
          >
            <AlertTriangle className="size-3 text-amber-200 animate-bounce" />
            <span>Inject Acoustic Anomaly</span>
          </button>

          {/* Raw JSON Ingest Toggle */}
          <button
            type="button"
            onClick={() => setShowJsonInspector(!showJsonInspector)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono font-bold border transition-colors cursor-pointer ${
              showJsonInspector
                ? 'bg-amber-400 text-[#0b2545] border-amber-400'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <Terminal className="size-3" />
            <span>JSON Ingest</span>
          </button>

          {/* Transmit Packet Button */}
          <button
            type="button"
            onClick={handleSimulatePacket}
            disabled={simulating}
            className="flex items-center gap-1 bg-[#ff9933] hover:bg-[#e68522] text-[#0b2545] px-2.5 py-1 rounded font-bold text-xs transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            title="Send live simulated acoustic packet"
          >
            {simulating ? <RefreshCw className="size-3 animate-spin" /> : <Send className="size-3" />}
            <span>Transmit</span>
          </button>
        </div>
      </div>

      {/* Synthetic JSON Telemetry Feed Inspector (Phase-2) */}
      {showJsonInspector && (
        <div className="bg-[#051121] text-emerald-400 p-3 font-mono text-[11px] border-b border-white/10 space-y-2">
          <div className="flex items-center justify-between text-white/70 text-[10px]">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Terminal className="size-3" />
              <span>LIVE TELEMETRY INGEST STREAM · RS-485 MODBUS/RTU &gt; MQTT CONVERTER</span>
            </span>
            <span>Integrity: SHA-256 Validated</span>
          </div>

          <pre className="bg-[#020b17] p-2.5 rounded border border-white/10 overflow-x-auto text-[10px] leading-relaxed text-emerald-300">
{JSON.stringify({
  packetHeader: `MH-PMC-IOT-${selectedNode.id}`,
  timestampIST: new Date().toISOString(),
  wardDesignation: currentWard.name,
  geoCoordinates: currentWard.coords,
  sensorNodeId: selectedNode.id,
  pipelineDMA: selectedNode.dma,
  acousticFrequencyKHz: selectedNode.freq,
  hydrostaticPressureBar: selectedNode.pressure,
  flowVelocityLps: selectedNode.flow || 42.6,
  operationalStatus: selectedNode.status.toUpperCase(),
  subMeterPinpointStatus: selectedNode.leakDist || "NOMINAL (NO ANOMALY)",
  scadaProtocol: "Modbus/RTU over LoRaWAN (865-867 MHz)",
  sha256IntegrityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}, null, 2)}
          </pre>
        </div>
      )}

      {/* 2. Interactive Map Canvas + Details Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border">
        {/* Left / Center: Interactive SVG Map Grid */}
        <div className="lg:col-span-8 bg-[#07172c] relative p-4 min-h-[320px] flex flex-col justify-between overflow-hidden select-none">
          {/* Subtle GIS Vector Grid lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Map Layer Toolbar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-white/70">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10 font-mono">
              <MapPin className="size-3 text-amber-400" />
              <span>{currentWard.coords}</span>
            </div>

            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs p-0.5 rounded border border-white/10 text-[10px]">
              <button
                onClick={() => setActiveLayer('all')}
                className={`px-2 py-0.5 rounded ${activeLayer === 'all' ? 'bg-white/20 text-white font-bold' : 'hover:text-white'}`}
              >
                All Grid
              </button>
              <button
                onClick={() => setActiveLayer('sensors')}
                className={`px-2 py-0.5 rounded ${activeLayer === 'sensors' ? 'bg-white/20 text-white font-bold' : 'hover:text-white'}`}
              >
                Sensors
              </button>
              <button
                onClick={() => setActiveLayer('leaks')}
                className={`px-2 py-0.5 rounded ${activeLayer === 'leaks' ? 'bg-rose-500/40 text-rose-200 font-bold' : 'hover:text-white'}`}
              >
                Alerts
              </button>
            </div>
          </div>

          {/* Interactive SVG Pipe Network Schematic */}
          <div className="relative z-10 my-4 flex-1 flex items-center justify-center min-h-[220px]">
            <svg className="w-full h-56 sm:h-64" viewBox="0 0 100 80" preserveAspectRatio="none">
              {/* Municipal Water Trunk Mains (Blue pipelines) */}
              <polyline points="15,70 22,35 38,25 68,32 82,20" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
              <polyline points="22,35 42,62 55,45 75,58" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
              <line x1="38" y1="25" x2="55" y2="45" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1.5 1.5" opacity="0.5" />
              <line x1="68" y1="32" x2="75" y2="58" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1.5 1.5" opacity="0.5" />

              {/* Water Flow Animation Direction Dots */}
              <circle cx="30" cy="30" r="0.8" fill="#38bdf8" className="animate-ping" />
              <circle cx="61" cy="28" r="0.8" fill="#38bdf8" className="animate-ping" />
              <circle cx="48" cy="53" r="0.8" fill="#38bdf8" className="animate-ping" />

              {/* Leak Anomaly Pulse Radius on Leak Node */}
              {selectedNode.status === 'leak' && (
                <>
                  <circle cx={selectedNode.x} cy={selectedNode.y} r="6" fill="#f43f5e" opacity="0.3" className="animate-ping" />
                  <circle cx={selectedNode.x} cy={selectedNode.y} r="10" fill="none" stroke="#f43f5e" strokeWidth="0.6" strokeDasharray="1 1" opacity="0.6" />
                </>
              )}

              {/* Pipeline Route Labels */}
              <text x="24" y="27" fill="#94a3b8" fontSize="2.5" fontFamily="monospace">Paud Rd Main (500mm MS)</text>
              <text x="47" y="38" fill="#94a3b8" fontSize="2.5" fontFamily="monospace">Karve Rd Branch (350mm DI)</text>
              {selectedNode.status === 'leak' && (
                <text x="44" y="72" fill="#fda4af" fontSize="2.8" fontWeight="bold" fontFamily="monospace">
                  ★ CRITICAL LEAK (Pinpoint: 0.6m)
                </text>
              )}

              {/* Sensor Nodes Placement */}
              {nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isLeak = node.status === 'leak';

                if (activeLayer === 'leaks' && !isLeak) return null;

                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sensor node ${node.id}: ${node.name}`}
                    onClick={() => setSelectedNode(node)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedNode(node);
                      }
                    }}
                    className="cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                  >
                    {/* Outer glow ring if selected */}
                    {isSelected && (
                      <circle cx={node.x} cy={node.y} r="3.2" fill="none" stroke="#ff9933" strokeWidth="0.8" />
                    )}

                    {/* Sensor Pin Node */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="1.8"
                      fill={isLeak ? '#f43f5e' : '#10b981'}
                      stroke="#ffffff"
                      strokeWidth="0.6"
                    />

                    {/* Sensor Node ID Pill */}
                    <text
                      x={node.x}
                      y={node.y - 2.8}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="2.4"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Status Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/70 font-mono border-t border-white/10 pt-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Nominal ({nodes.filter(n => n.status !== 'leak').length})
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="size-1.5 rounded-full bg-rose-500 animate-ping" />
                Acoustic Anomalies ({nodes.filter(n => n.status === 'leak').length})
              </span>
            </div>
            <span>Telemetry Sink: PMC Central Command &amp; Control SCADA</span>
          </div>
        </div>

        {/* Right Details Pane: Selected Sensor Live Readings */}
        <div className="lg:col-span-4 bg-card p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Active Sensor Probe
                </span>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                  <span>{selectedNode.id}</span>
                  <span className="text-xs font-normal text-muted-foreground">({selectedNode.dma})</span>
                </h4>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                  selectedNode.status === 'leak'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {selectedNode.status === 'leak' ? 'Leak Detected' : 'Nominal'}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-2 font-medium">
              Location: <strong className="text-foreground">{selectedNode.name}</strong>
            </p>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="rounded border border-border bg-muted/40 p-2.5">
                <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                  <Gauge className="size-3 text-[#0b2545]" />
                  Pressure
                </span>
                <p className="text-base font-bold font-mono text-foreground mt-0.5">
                  {selectedNode.pressure} <span className="text-xs font-normal text-muted-foreground">bar</span>
                </p>
                <span className="text-[9px] text-muted-foreground">Normal: 3.5 - 4.2 bar</span>
              </div>

              <div className="rounded border border-border bg-muted/40 p-2.5">
                <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                  <Activity className="size-3 text-[#b45309]" />
                  Acoustic Freq
                </span>
                <p className="text-base font-bold font-mono text-foreground mt-0.5">
                  {selectedNode.freq} <span className="text-xs font-normal text-muted-foreground">kHz</span>
                </p>
                <span className="text-[9px] text-muted-foreground">Transient Threshold &gt; 25kHz</span>
              </div>
            </div>

            {/* Acoustic Waveform Bar Visualizer */}
            <div className="mt-3 rounded border border-border bg-slate-900 p-2.5 text-white">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5 font-mono">
                <span>Hydro-Acoustic Waveform</span>
                <span className="text-emerald-400">Sampling: 100 Hz</span>
              </div>
              <div className="flex items-end gap-1 h-10 px-1">
                {audioWave.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-xs transition-all duration-300 ${
                      selectedNode.status === 'leak' ? 'bg-rose-500' : 'bg-emerald-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sub-meter Pinpointing Result */}
            {selectedNode.leakDist && (
              <div className="mt-3 rounded border border-rose-300 bg-rose-50 p-2.5 text-xs text-rose-900 leading-snug space-y-0.5">
                <p className="font-bold flex items-center gap-1 text-rose-950">
                  <AlertTriangle className="size-3.5 text-rose-600 shrink-0" />
                  <span>Sub-Meter Pinpoint Coordinate:</span>
                </p>
                <p className="text-[11px] font-mono text-rose-900">
                  {selectedNode.leakDist}
                </p>
                <p className="text-[10px] text-rose-700">
                  Transmitted to PMC Maintenance Van (Crew #4 dispatched).
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span>Last Sync: {lastPacketTime}</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="size-3" /> GFR 166 Audited
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
