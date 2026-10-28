import { useState } from "react";
import { Upload, Bell, ArrowRightLeft } from "lucide-react";
import { useApp } from "../store";
import { sampleRows } from "../data";
import { G, Tag, Ring } from "../ui";

const steps = ["Upload", "Auto-fix", "Validate", "Duplicate scan", "Save"];
const cols = [["name", "Name"], ["apaar", "APAAR ID"], ["dob", "Date of birth"], ["course", "Course"]];

export default function Institution() {
  const { students, alerts, transfer, addFlags, log } = useApp();
  const [rows, setRows] = useState(null);
  const [fixed, setFixed] = useState(false);
  const [step, setStep] = useState(-1);
  const [res, setRes] = useState(null);
  const [note, setNote] = useState("");
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState("");
  const load = (n) => { setRows(sampleRows); setFixed(false); setStep(-1); setRes(null); setFile(n); };
  const pick = (f) => f && load(f.name);
  const busy = step >= 0 && step < 5;

  const finish = () => {
    const r = fixed ? { a: 7, x: 0, s: 1 } : { a: 3, x: 3, s: 2 };
    const f = [{ student: "Mohammed Faizan Shaikh", apaar: "8815 2290 6043", college: "VJTI", reason: "Same student in two colleges", severity: "High" }];
    if (!fixed) f.push({ student: "Sneha Kulkarni", apaar: "7340 1189 227", college: "VJTI", reason: "Invalid APAAR ID", severity: "Low" });
    addFlags(f);
    log("VJTI", `Submitted upload of 8 rows: ${r.a} accepted, ${r.x} rejected, ${r.s} sent to AICTE`);
    log("System", "Duplicate scan found a possible match and sent it to AICTE review");
    setRes(r);
  };

  const submit = () => {
    setRes(null);
    setStep(0);
    let s = 0;
    const i = setInterval(() => {
      s++;
      if (s >= 5) { clearInterval(i); finish(); }
      setStep(s);
    }, 600);
  };

  const cell = (r, f) => {
    const b = r.bad?.[f];
    const ok = b && fixed && b.fix;
    return { v: ok ? b.fix : r[f], issue: b && !ok ? b.msg : null };
  };

  return (
    <>
      <h1 className="text-lg font-semibold">Staff login</h1>
      <G>
        <div className="flex items-center justify-between mb-3">
          <div className="h2 !mb-0">Upload student data{file && <span className="ml-2 text-xs font-normal text-slate-500">{file}</span>}</div>
          <div className="flex gap-2">
            <button className="btn btn-p" disabled={busy} onClick={() => load("sample-students.csv")}><Upload size={14} /> Use sample file</button>
            <button className="btn" disabled={!rows || fixed || busy} onClick={() => setFixed(true)}>Apply fixes</button>
            <button className="btn btn-p" disabled={!rows || busy} onClick={submit}>Submit</button>
          </div>
        </div>
        {!rows ? (
          <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }} className={`flex flex-col items-center gap-1 border-2 border-dashed rounded-xl py-10 cursor-pointer transition-colors duration-200 ${drag ? "border-teal-500 bg-teal-50/60 text-teal-700" : "border-slate-300 text-slate-500 hover:border-teal-400 hover:bg-white/50"}`}><Upload size={20} /><span>Drop a CSV file here, or click to browse</span><input type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => pick(e.target.files[0])} /></label>
        ) : (
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0">
              <table className="w-full">
                <thead><tr><th className="th">#</th>{cols.map(([k, l]) => <th key={k} className="th">{l}</th>)}</tr></thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td className="td text-slate-500">{i + 1}</td>
                      {cols.map(([k]) => {
                        const { v, issue } = cell(r, k);
                        return (
                          <td key={k} className={`td ${issue ? "bg-red-50 text-red-700" : ""}`}>
                            <span className="whitespace-pre">{v}</span>
                            {issue && <span className="ml-2 text-[11px] text-red-500">{issue}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <Ring value={fixed ? 96 : 64} />
              <div className="text-xs text-slate-500">Data quality score</div>
            </div>
          </div>
        )}
      </G>
      {step >= 0 && (
        <G>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${i < step ? "w-full bg-teal-600" : i === step ? "w-full shimmer" : "w-0"}`} /></div>
                <div className={`text-[11px] mt-1 ${i <= step ? "text-navy" : "text-slate-400"}`}>{s}</div>
              </div>
            ))}
          </div>
          {res && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[["Accepted", res.a, "green"], ["Rejected, college must fix", res.x, "red"], ["Sent to AICTE for review", res.s, "amber"]].map(([l, n, t]) => (
                <div key={l} className="rounded-xl bg-white/60 border border-white/70 p-3">
                  <div className="text-xs text-slate-500 mb-1">{l}</div>
                  <div className="flex items-center gap-2"><span className="text-xl font-semibold">{n}</span><Tag tone={t}>rows</Tag></div>
                </div>
              ))}
            </div>
          )}
        </G>
      )}
      <div className="grid grid-cols-2 gap-4">
        <G>
          <div className="h2 flex items-center gap-2"><Bell size={15} /> Recent changes <span className="tag bg-teal-600 text-white border-teal-600">{alerts.length}</span></div>
          <ul className="space-y-2">
            {alerts.map((a) => (
              <li key={a.id} className="rounded-lg bg-white/60 border border-white/70 px-3 py-2">
                <div>{a.text}</div>
                <div className="text-[11px] text-slate-500">{a.t}</div>
              </li>
            ))}
          </ul>
        </G>
        <G>
          <div className="h2">Students at VJTI</div>
          {students.filter((s) => s.college === 1).map((s) => (
            <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-100/80">
              <div><div className="font-medium">{s.name}</div><div className="text-[11px] text-slate-500">APAAR {s.apaar}</div></div>
              <button className="btn" onClick={() => setNote(transfer(s.id))}><ArrowRightLeft size={13} /> Transfer</button>
            </div>
          ))}
          {note && <div className="mt-3 text-xs text-teal-700">{note}</div>}
        </G>
      </div>
    </>
  );
}
