import { Download, Check, X } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useApp } from "../store";
import { G, Tag } from "../ui";

const ax = { fontSize: 11, fill: "#51648a" };
const lab = (value, extra) => ({ value, fontSize: 11, fill: "#51648a", ...extra });
const sev = { High: "red", Medium: "amber", Low: "slate" };
const stat = { Reporting: "green", "Under review": "amber", Pending: "slate" };
const barCol = (s) => (s >= 85 ? "bg-emerald-500" : s >= 70 ? "bg-amber-400" : "bg-red-400");
const fmt = (n) => n.toLocaleString("en-IN");

export default function Aicte() {
  const { colleges, flagged, months, resolve, notify, log } = useApp();
  const pending = flagged.filter((f) => f.status === "Pending").length;
  const tiles = [
    ["Colleges reporting", colleges.filter((c) => c.status !== "Pending").length, `of ${colleges.length} colleges`],
    ["Students on record", fmt(colleges.reduce((a, c) => a + c.enrolled, 0)), "across all colleges"],
    ["Flagged records", pending, "waiting for review"],
    ["Seats over intake", fmt(colleges.reduce((a, c) => a + Math.max(0, c.enrolled - c.intake), 0)), "enrolled above approved intake"],
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">AICTE dashboard</h1>
        <button className="btn btn-p" onClick={() => { notify("Report downloaded"); log("Dr. Sunita Rao", "Downloaded national report"); }}>
          <Download size={14} /> Download report
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {tiles.map(([l, v, s]) => (
          <G key={l} className="lift tile">
            <div className="text-xs text-slate-500">{l}</div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{v}</div>
            <div className="text-[11px] text-slate-500 mt-1">{s}</div>
          </G>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <G>
          <div className="h2">Approved intake and enrolled, by college</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={colleges} margin={{ top: 4, right: 8, left: 4, bottom: 20 }}>
              <CartesianGrid stroke="#dbe4f0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="short" tick={{ ...ax, fontSize: 10 }} label={lab("College", { position: "insideBottom", offset: -14 })} />
              <YAxis tick={ax} label={lab("Seats", { angle: -90, position: "insideLeft" })} />
              <Tooltip />
              <Legend verticalAlign="top" height={24} iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="intake" name="Approved intake" fill="#b7c7dc" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="enrolled" name="Enrolled" fill="#2f9a94" radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </G>
        <G>
          <div className="h2">Admissions by month, 2026</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={months} margin={{ top: 4, right: 12, left: 4, bottom: 20 }}>
              <CartesianGrid stroke="#dbe4f0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" tick={ax} label={lab("Month", { position: "insideBottom", offset: -14 })} />
              <YAxis tick={ax} label={lab("Admissions", { angle: -90, position: "insideLeft" })} />
              <Tooltip />
              <Line type="monotone" dataKey="n" name="Admissions" stroke="#0d9488" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </G>
      </div>
      <G className="!p-0 overflow-hidden">
        <div className="h2 px-4 pt-4 !mb-2">Colleges</div>
        <table className="w-full">
          <thead>
            <tr>{["College", "State", "Intake", "Enrolled", "Quality score", "Status"].map((h) => <th key={h} className="th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {colleges.map((c) => (
              <tr key={c.id} className="hover:bg-white/50 transition-colors duration-150">
                <td className="td font-medium">{c.name}</td>
                <td className="td">{c.state}</td>
                <td className="td tabular-nums">{fmt(c.intake)}</td>
                <td className={`td tabular-nums ${c.enrolled > c.intake ? "text-red-600 font-medium" : ""}`}>{fmt(c.enrolled)}</td>
                <td className="td">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-slate-200"><div className={`h-full rounded-full transition-all duration-700 ${barCol(c.score)}`} style={{ width: c.score + "%" }} /></div>
                    <span className="text-xs tabular-nums">{c.score}%</span>
                  </div>
                </td>
                <td className="td"><Tag tone={stat[c.status]}>{c.status}</Tag></td>
              </tr>
            ))}
          </tbody>
        </table>
      </G>
      <G className="!p-0 overflow-hidden">
        <div className="h2 px-4 pt-4 !mb-2">Flagged review queue <span className="text-slate-500 font-normal">({pending} pending)</span></div>
        <table className="w-full">
          <thead>
            <tr>{["Record", "College", "Reason", "Severity", ""].map((h, i) => <th key={i} className="th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {flagged.map((f) => (
              <tr key={f.id} className={`transition-colors duration-150 hover:bg-white/50 ${f.status !== "Pending" ? "opacity-60" : ""}`}>
                <td className="td"><div className="font-medium">{f.student}</div><div className="text-[11px] text-slate-500">APAAR {f.apaar}</div></td>
                <td className="td">{f.college}</td>
                <td className="td">{f.reason}</td>
                <td className="td"><Tag tone={sev[f.severity]}>{f.severity}</Tag></td>
                <td className="td">
                  {f.status === "Pending" ? (
                    <div className="flex gap-2 justify-end">
                      <button className="btn" onClick={() => resolve(f.id, true)}><Check size={13} /> Approve</button>
                      <button className="btn" onClick={() => resolve(f.id, false)}><X size={13} /> Reject</button>
                    </div>
                  ) : (
                    <div className="text-right"><Tag tone={f.status === "Approved" ? "green" : "slate"}>{f.status}</Tag></div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </G>
    </>
  );
}
