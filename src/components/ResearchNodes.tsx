import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Dna, Atom, Activity, Zap, CheckCircle2 } from "lucide-react";
import { ResearchNode } from "../types";

export default function ResearchNodes() {
  const [activeNodeId, setActiveNodeId] = useState("node-1");
  const [telemetryTicks, setTelemetryTicks] = useState(0);

  // Simulated fluctuating telemetry to make the system feel "alive"
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTicks((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nodes: ResearchNode[] = [
    {
      id: "node-1",
      name: "Enterprise Networking & Cisco Rack Labs",
      subtitle: "Academy Domain Alpha",
      description: "Hands-on configuration and debugging of physical Cisco routers (ISR 4000s) and Catalyst switches. Students learn real-world IP subnetting, dynamic routing protocols (OSPFv3, BGP), VLAN trunking, and redundant WAN architecture under the CCNA & CCNP syllabus.",
      metricLabel: "Lab Throughput Bandwidth",
      metricValue: "10 Gbps Fiber Uplinks",
      fidelity: 99.98,
      tags: ["Cisco CCNA/CCNP", "OSPF & BGP Routing", "VLAN & WAN Trunking"],
    },
    {
      id: "node-2",
      name: "Cyber Security & Red-Team Testing Sandbox",
      subtitle: "Academy Domain Beta",
      description: "An isolated environment for cyber security training, vulnerability assessments, and penetration testing. Students deploy firewalls, analyze network packets via Wireshark, audit cryptographic protocols, and master ethical hacking techniques to protect high-stakes corporate networks.",
      metricLabel: "Threat Intrusion Prevention",
      metricValue: "99.8% Accuracy Rate",
      fidelity: 98.65,
      tags: ["Ethical Hacking", "Kali Linux & Wireshark", "Firewall & IPS Audit"],
    },
    {
      id: "node-3",
      name: "Full Stack Development & Cloud Systems",
      subtitle: "Academy Domain Gamma",
      description: "Bridging code with cloud scaling. Students design modern, scalable web applications using React, Node.js, and Python, followed by automated deployments on AWS and VMware virtualization. Covers basic software foundations, OOP, and databases.",
      metricLabel: "Cloud Deployment Speed",
      metricValue: "140ms Global CDN Latency",
      fidelity: 97.42,
      tags: ["Full Stack React & Node", "Python Programming", "VMware & AWS Cloud"],
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  // Fluctuating values for real-time visual telemetry effect
  const activeFidelity = (activeNode.fidelity + Math.sin(telemetryTicks * 0.3) * 0.02).toFixed(2);
  const activeResonance = Math.round(95 + Math.sin(telemetryTicks * 0.5) * 4);

  const getIcon = (id: string) => {
    switch (id) {
      case "node-1":
        return <Cpu size={18} className="text-cyan-400" />;
      case "node-2":
        return <Zap size={18} className="text-amber-400" />;
      case "node-3":
        return <Atom size={18} className="text-violet-400" />;
      default:
        return <Activity size={18} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Node selection column */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1 block">
          Select Active Testing & Training Domain
        </span>
        {nodes.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                isActive
                   ? "bg-white/5 border-zinc-700 shadow-xl"
                   : "bg-black/30 border-zinc-900 hover:border-zinc-800 hover:bg-white/2"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-500 to-violet-500"
                />
              )}
              <div className="flex items-start gap-3.5">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? "bg-white/10" : "bg-zinc-900 group-hover:bg-zinc-800"
                }`}>
                  {getIcon(node.id)}
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    {node.subtitle}
                  </span>
                  <h4 className={`font-display text-sm md:text-base font-semibold mt-0.5 transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                  }`}>
                    {node.name}
                  </h4>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {node.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="font-mono text-[9px] bg-zinc-900/80 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main telemetry details monitor */}
      <div className="lg:col-span-7">
        <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LAB_NETWORK_ONLINE
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              <div>
                <span className="font-mono text-[10px] tracking-wider text-cyan-400 uppercase">
                  {activeNode.subtitle} Active Configuration Matrix
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-1">
                  {activeNode.name}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mt-3">
                  {activeNode.description}
                </p>
              </div>

              {/* Live Telemetry Specs Grid */}
              <div className="grid grid-cols-2 gap-4 bg-black/40 border border-zinc-900 p-4 rounded-xl">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    Syllabus Standard Match
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      {activeFidelity}%
                    </span>
                    <span className="text-[9px] text-zinc-500">COGNITIVE_ACC</span>
                  </div>
                  {/* Small visual bar */}
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-1.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeNode.fidelity}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                    />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    {activeNode.metricLabel}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-mono font-bold text-cyan-400">
                      {activeNode.metricValue}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-1.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "95%" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                    />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    System Uplink State
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Zap size={14} className="text-cyan-400 animate-pulse" />
                    <span className="text-sm font-mono font-bold text-cyan-300">
                      UPLINK_{activeResonance}%_STABLE
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    Industry Certification Accreditation
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span className="text-xs text-zinc-300">NSDC / ISO Approved</span>
                  </div>
                </div>
              </div>

              {/* Keywords and metadata tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
                  Core Frameworks Covered:
                </span>
                {activeNode.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
