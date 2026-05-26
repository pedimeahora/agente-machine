import React, { useState, useEffect, useRef } from "react";
import { Terminal, Code, Eye, FileText, CheckCircle2, Play } from "lucide-react";

interface Step {
  type: "info" | "command" | "success" | "error";
  text: string;
  delay?: number;
}

interface AgentInteractionShowcaseProps {
  prompt: string;
  steps: Step[];
  code: string;
  fileName: string;
  preview: React.ReactNode;
}

export function AgentInteractionShowcase({
  prompt,
  steps,
  code,
  fileName,
  preview,
}: AgentInteractionShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"terminal" | "code" | "preview">("terminal");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const cleanupRef = useRef<() => void>(() => {});

  const runSimulation = () => {
    // Clear any previous simulation
    cleanupRef.current();

    setTerminalLines([]);
    setIsTyping(false);
    setProgress(0);
    setShowProgress(false);
    setCompleted(false);
    setActiveTab("terminal");

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    let cumulativeDelay = 300;

    steps.forEach((step) => {
      const stepDelay = step.delay ?? 700;

      // Show typing cursor slightly before the text appears
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
      }, cumulativeDelay);
      timeouts.push(typingTimer);

      cumulativeDelay += stepDelay;

      const lineTimer = setTimeout(() => {
        setIsTyping(false);
        const prefix =
          step.type === "command"
            ? "> "
            : step.type === "success"
            ? "✔ "
            : step.type === "error"
            ? "✖ "
            : "";
        setTerminalLines((prev) => [...prev, `${prefix}${step.text}`]);
      }, cumulativeDelay);
      timeouts.push(lineTimer);

      cumulativeDelay += 150;
    });

    // Show progress bar after all steps
    const progressStartTimer = setTimeout(() => {
      setShowProgress(true);
      setIsTyping(false);
      let val = 0;
      const interval = setInterval(() => {
        val += 5;
        setProgress(val);
        if (val >= 100) {
          clearInterval(interval);
          setCompleted(true);
          const switchTimer = setTimeout(() => {
            setActiveTab("preview");
          }, 800);
          timeouts.push(switchTimer);
        }
      }, 80);
      intervals.push(interval);
    }, cumulativeDelay + 200);
    timeouts.push(progressStartTimer);

    cleanupRef.current = () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  };

  useEffect(() => {
    runSimulation();
    return () => cleanupRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetSimulation = () => {
    runSimulation();
  };

  const formatLine = (line: string) => {
    if (line.startsWith(">")) return "text-cyan-400 font-bold";
    if (line.startsWith("✔")) return "text-emerald-400 font-bold";
    if (line.startsWith("✖")) return "text-red-400 font-bold";
    return "text-zinc-400";
  };

  return (
    <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-900/80 rounded-2xl overflow-hidden shadow-2xl relative text-left">
      {/* IDE Header */}
      <div className="bg-zinc-950 border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[10px] font-mono text-zinc-500 pl-4 truncate max-w-[120px]">
            {fileName}
          </span>
        </div>
        <div className="flex items-center space-x-1 bg-zinc-900/50 p-0.5 rounded-lg border border-zinc-800/40">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-colors ${
              activeTab === "terminal"
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Terminal className="w-3 h-3" />
            Terminal
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-colors ${
              activeTab === "code"
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Code className="w-3 h-3" />
            Código
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-colors ${
              activeTab === "preview"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Eye className="w-3 h-3" />
            Vista Previa
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[360px] overflow-auto flex flex-col">
        {activeTab === "terminal" && (
          <div className="flex-1 p-5 font-mono text-[11px] leading-relaxed text-zinc-300 flex flex-col justify-between h-full">
            <div className="flex-1 overflow-auto">
              {/* Task Header */}
              <div className="mb-4 bg-purple-500/10 border border-purple-500/20 rounded-xl p-3.5">
                <div className="text-[9px] text-purple-400 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Task assigned to Agent
                </div>
                <div className="text-zinc-300 text-[10px] whitespace-pre-wrap leading-relaxed">
                  {prompt}
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-1.5">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className={formatLine(line)}>
                    {line}
                  </div>
                ))}
                {isTyping && (
                  <span className="inline-block w-1.5 h-3 bg-purple-500 animate-pulse ml-1 align-middle" />
                )}
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-4 pt-3 border-t border-zinc-900/60 shrink-0">
              {showProgress && !completed && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                    <span>Compilando y construyendo...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {completed && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>¡INTEGRACIÓN EXITOSA! COMPILADO OK.</span>
                  </div>
                  <button
                    onClick={resetSimulation}
                    className="flex items-center gap-1 text-[8px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors"
                  >
                    <Play className="w-2.5 h-2.5" /> REINICIAR
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="flex-1 p-5 font-mono text-[10.5px] leading-normal text-zinc-400 bg-zinc-950 overflow-auto flex">
            <div className="text-zinc-700 select-none pr-4 text-right border-r border-zinc-900 shrink-0">
              {code.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="pl-4 text-zinc-300 whitespace-pre overflow-x-auto w-full">
              <code>{code}</code>
            </pre>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="flex-1 relative w-full min-h-[300px] bg-[#0a0516] overflow-hidden">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}
