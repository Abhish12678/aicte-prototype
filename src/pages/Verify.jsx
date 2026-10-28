import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useApp } from "../store";
import { cert, verifyUrl } from "../data";
import { G } from "../ui";

export default function Verify() {
  const { students, colleges, settings } = useApp();
  const s = students[0];
  const c = colleges.find((x) => x.id === s.college);
  const [v, setV] = useState("");
  const [r, setR] = useState(null);
  const check = (t) => { if (t.trim()) setR(t.trim().split("/").pop() === cert.token ? "ok" : "bad"); };
  const set = (t) => { setV(t); check(t); };
  return (
    <>
      <h1 className="text-lg font-semibold">Verification portal</h1>
      <G>
        <div className="h2">Verify a certificate</div>
        <div className="flex gap-2">
          <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Paste certificate link or token" className="flex-1 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 outline-none focus:border-teal-500 transition-colors duration-150" />
          <button className="btn btn-p" onClick={() => check(v)}>Verify</button>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="btn" onClick={() => set(verifyUrl(cert.token))}>Try a valid certificate</button>
          <button className="btn" onClick={() => set(verifyUrl("AC26-VJTI-004781"))}>Try a tampered one</button>
        </div>
        <div className="text-xs text-slate-500 mt-3">
          {settings.consent ? "Records are shown only with the student's consent." : "Consent check is turned off in Admin settings."}
        </div>
      </G>
      {r === "ok" && (
        <G className="!border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-3"><CheckCircle2 size={18} /> Verified</div>
          <dl className="grid grid-cols-5 gap-4">
            {[["Name", s.name], ["Degree", cert.degree], ["College", c.name], ["Year", cert.year], ["APAAR ID", s.apaar]].map(([k, x]) => (
              <div key={k}><dt className="text-xs text-slate-500">{k}</dt><dd className="font-medium mt-0.5">{x}</dd></div>
            ))}
          </dl>
        </G>
      )}
      {r === "bad" && (
        <G className="!border-red-200">
          <div className="flex items-center gap-2 text-red-700 font-semibold"><XCircle size={18} /> Not verified</div>
          <div className="text-slate-600 mt-2">No matching certificate was found for this link. It may have been changed or is not issued by a registered college.</div>
        </G>
      )}
    </>
  );
}
