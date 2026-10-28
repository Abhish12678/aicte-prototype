import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../store";
import { G, Tag, Ring } from "../ui";

const byCourse = [{ c: "Computer", n: 312 }, { c: "IT", n: 268 }, { c: "Electronics", n: 236 }, { c: "Mechanical", n: 198 }, { c: "Civil", n: 170 }];
const ax = { fontSize: 11, fill: "#51648a" };
const lab = (value, extra) => ({ value, fontSize: 11, fill: "#51648a", ...extra });
const tone = { Pending: "amber", Approved: "green", Rejected: "slate" };
const sev = { High: "red", Medium: "amber", Low: "slate" };
const fmt = (n) => n.toLocaleString("en-IN");

export default function InstDash() {
  const { colleges, flagged, audit } = useApp();
  const c = colleges[0];
  const mine = flagged.filter((f) => f.college === "VJTI");
  const open = mine.filter((f) => f.status === "Pending").length;
  const pct = Math.min(100, Math.round((c.enrolled / c.intake) * 100));
  const acts = audit.filter((a) => ["VJTI", "System", "Manoj Kulkarni"].includes(a.actor)).slice(0, 5);
  const tiles = [
    ["Students enrolled", fmt(c.enrolled), "this year"],
    ["Approved intake", fmt(c.intake), "set by AICTE"],
    ["Data quality score", c.score + "%", "latest upload"],
    ["Records flagged", open, "waiting for AICTE"],
  ];
  return (
    <>
      <div>
        <h1 className="text-lg font-semibold">Institution dashboard</h1>
        <div className="text-xs text-slate-500">{c.name}, Mumbai</div>
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
      <div className="grid grid-cols-3 gap-4">
        <G className="col-span-2">
          <div className="h2">Students by course</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byCourse} margin={{ top: 4, right: 8, left: 4, bottom: 20 }}>
              <CartesianGrid stroke="#dbe4f0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="c" tick={ax} label={lab("Course", { position: "insideBottom", offset: -14 })} />
              <YAxis tick={ax} label={lab("Students", { angle: -90, position: "insideLeft" })} />
              <Tooltip />
              <Bar dataKey="n" name="Students" fill="#2f9a94" radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </G>
        <G className="flex flex-col items-center justify-center gap-2">
          <div className="h2 !mb-0 self-start">Intake used</div>
          <Ring value={pct} />
          <div className="text-xs text-slate-500">{fmt(c.enrolled)} of {fmt(c.intake)} seats</div>
        </G>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <G className="!p-0 overflow-hidden">
          <div className="h2 px-4 pt-4 !mb-2">Flagged records</div>
          {mine.length === 0 ? (
            <div className="px-4 pb-4 text-slate-500">No flagged records for this college.</div>
          ) : (
            <table className="w-full">
              <thead><tr>{["Record", "Reason", "Severity", "Status"].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
              <tbody>
                {mine.map((f) => (
                  <tr key={f.id} className="hover:bg-white/50 transition-colors duration-150">
                    <td className="td font-medium">{f.student}</td>
                    <td className="td">{f.reason}</td>
                    <td className="td"><Tag tone={sev[f.severity]}>{f.severity}</Tag></td>
                    <td className="td"><Tag tone={tone[f.status]}>{f.status}</Tag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </G>
        <G>
          <div className="h2">Recent activity</div>
          <ul>
            {acts.map((a, i) => (
              <li key={i} className="flex gap-3 py-2 border-b border-slate-100/80">
                <span className="text-xs text-slate-500 w-12 shrink-0 tabular-nums">{a.t}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </G>
      </div>
    </>
  );
}
