import { QRCodeSVG } from "qrcode.react";
import { Copy, Check } from "lucide-react";
import { useApp } from "../store";
import { cert, verifyUrl } from "../data";
import { G } from "../ui";

export default function Student() {
  const { students, colleges, notify } = useApp();
  const s = students[0];
  const c = colleges.find((x) => x.id === s.college);
  const url = verifyUrl(cert.token);
  const copy = () => { navigator.clipboard?.writeText(url); notify("Verification link copied"); };
  return (
    <>
      <h1 className="text-lg font-semibold">Student portal</h1>
      <G>
        <div className="h2">Profile</div>
        <dl className="grid grid-cols-5 gap-4">
          {[["Name", s.name], ["APAAR ID", s.apaar], ["College", c.name], ["Course", s.course], ["Year", s.year]].map(([k, v]) => (
            <div key={k}><dt className="text-xs text-slate-500">{k}</dt><dd className="font-medium mt-0.5">{v}</dd></div>
          ))}
        </dl>
      </G>
      <G>
        <div className="h2">Degree certificate</div>
        <div className="flex items-center justify-between gap-6 rounded-xl border border-slate-300/80 bg-white/70 p-6">
          <div>
            <div className="text-xs text-slate-500">{c.name}</div>
            <div className="text-xl font-semibold mt-3">{cert.degree}</div>
            <div className="text-slate-600 mt-1">{s.course.replace("B.Tech ", "")}</div>
            <div className="mt-4 text-slate-600">Awarded to</div>
            <div className="text-lg font-semibold">{s.name}</div>
            <div className="text-xs text-slate-500 mt-3">APAAR {s.apaar} &middot; Year of passing {cert.year} &middot; Certificate {cert.token}</div>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0">
            <QRCodeSVG value={url} size={120} fgColor="#12284c" bgColor="transparent" />
            <button className="btn" onClick={copy}><Copy size={13} /> Copy verification link</button>
          </div>
        </div>
      </G>
      <G>
        <div className="h2">Verification status</div>
        <div className="flex items-center">
          {["Submitted", "Checked", "Verified"].map((l, i) => (
            <div key={l} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-teal-600 text-white"><Check size={13} /></span>
                <span className="font-medium">{l}</span>
              </div>
              {i < 2 && <div className="flex-1 h-px bg-teal-600 mx-3" />}
            </div>
          ))}
        </div>
      </G>
    </>
  );
}
