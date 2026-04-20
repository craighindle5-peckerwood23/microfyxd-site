"use client";

import { useState } from "react";

type ExecutionResult = {
  stepId: string;
  type: string;
  status: string;
  reason?: string;
  callSid?: string;
  httpStatus?: number;
  responseSnippet?: string;
};

type TaskPlanStep = {
  id: string;
  type: string;
  phone_number?: string;
  script?: string;
  url?: string;
  fields?: Record<string, string>;
  needs_human_input?: boolean;
};

export default function ConsolePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [executionData, setExecutionData] = useState<{
    plan: { steps: TaskPlanStep[] };
    results: ExecutionResult[];
    status: string;
  } | null>(null);

  const handleExecute = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setExecutionData(null);

    try {
      const res = await fetch("/api/tasks/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Execution failed");

      const data = await res.json();
      setExecutionData({
        plan: data.plan,
        results: data.results,
        status: data.status,
      });
    } catch (e) {
      console.error(e);
      alert("Failed to execute task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold font-grotesk">AI Operator Console</h1>
        <p className="text-zinc-400 mt-2 font-inter">
          Execute complex operations: phone calls, form submissions, and automated workflows.
        </p>

        <div className="mt-6">
          <textarea
            className="w-full h-32 rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:border-[#1BC7F1] outline-none transition-colors"
            placeholder="e.g., Call XYZ shop at 310-555-1234 and if they have 245/40R19, submit the warranty form at https://example.com/form with my info."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="mt-3 px-6 py-2 rounded-md bg-gradient-to-r from-[#2EE9D1] via-[#1BC7F1] to-[#007BFF] text-black font-bold disabled:opacity-50 transition-opacity"
            onClick={handleExecute}
            disabled={loading}
          >
            {loading ? "Executing..." : "Execute Task"}
          </button>
        </div>

        {executionData && (
          <div className="mt-8 space-y-6">
            <div className="border border-zinc-800 rounded-lg bg-zinc-950/70 p-6 font-mono text-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#1BC7F1] font-bold uppercase tracking-widest text-xs">Execution Log</span>
                <span className={`px-2 py-1 rounded text-[10px] ${executionData.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {executionData.status.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-4">
                {executionData.plan.steps.map((step, idx) => {
                  const result = executionData.results.find(r => r.stepId === step.id);
                  return (
                    <div key={step.id} className="border-l-2 border-zinc-800 pl-4 py-1">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <span className="text-zinc-500">[{idx + 1}]</span>
                        <span className="font-bold text-white uppercase text-[10px] px-1.5 py-0.5 bg-zinc-800 rounded">
                          {step.type.replace('_', ' ')}
                        </span>
                        <span>{step.type === 'phone_call' ? step.phone_number : step.url}</span>
                      </div>
                      
                      {result && (
                        <div className="mt-2 ml-6 text-xs">
                          <div className="flex items-center gap-2">
                            <span className={result.status === 'initiated' || result.status === 'submitted' ? 'text-green-400' : 'text-red-400'}>
                              {result.status === 'initiated' || result.status === 'submitted' ? '✓' : '✗'}
                            </span>
                            <span className="text-zinc-400">Status:</span>
                            <span className="text-white">{result.status}</span>
                          </div>
                          {result.reason && <div className="text-red-400 mt-1">Reason: {result.reason}</div>}
                          {result.callSid && <div className="text-zinc-500 mt-1">Call SID: {result.callSid}</div>}
                          {result.responseSnippet && (
                            <div className="mt-2 p-2 bg-black rounded border border-zinc-900 text-[10px] text-zinc-500 overflow-hidden whitespace-pre-wrap">
                              {result.responseSnippet}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!executionData && !loading && (
          <div className="mt-8 border border-zinc-800 rounded-lg bg-zinc-950/70 p-4 font-mono text-sm opacity-50">
            <div className="text-zinc-400 mb-2">USER &gt; {input || "Waiting for operator input..."}</div>
            <div className="text-zinc-400">MFXD &gt; Ready for execution.</div>
          </div>
        )}
      </div>
    </main>
  );
}
