import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store";

const roles = [
  { k: "Student", who: "Ananya Deshmukh", label: "APAAR ID", id: "4521 8830 1176", to: "/student" },
  { k: "Institution", who: "Manoj Kulkarni", label: "Institution ID", id: "VJTI-MH-0142", to: "/institution" },
  { k: "AICTE admin", who: "Neha Bhatt", label: "Official email", id: "neha.bhatt@aicte.example", to: "/aicte" },
];
const inp = "w-full rounded-lg border border-slate-200 bg-white/70 px-3 py-2 outline-none transition-colors duration-150 focus:border-teal-500 focus:bg-white";

export default function Login() {
  const go = useNavigate();
  const { notify, log, signIn } = useApp();
  const [i, setI] = useState(0);
  const r = roles[i];
  const submit = (e) => {
    e.preventDefault();
    signIn(r.k);
    log(r.who, "Signed in");
    notify(`Signed in as ${r.k}`);
    go(r.to);
  };
  return (
    <form onSubmit={submit} className="glass p-6 w-full max-w-md mx-auto mt-8">
      <h1 className="text-lg font-semibold mb-4">Sign in</h1>
      <div className="relative grid grid-cols-3 rounded-lg bg-slate-200/50 p-1 mb-5">
        <span className="absolute top-1 bottom-1 left-1 rounded-md bg-white shadow transition-transform duration-300 ease-out" style={{ width: "calc((100% - 0.5rem) / 3)", transform: `translateX(${i * 100}%)` }} />
        {roles.map((x, k) => (
          <button type="button" key={x.k} onClick={() => setI(k)} className={`relative z-10 py-1.5 text-xs font-medium transition-colors duration-200 ${i === k ? "text-navy" : "text-slate-500"}`}>{x.k}</button>
        ))}
      </div>
      <label className="block text-xs text-slate-500 mb-1">{r.label}</label>
      <input key={i} defaultValue={r.id} className={inp} />
      <label className="block text-xs text-slate-500 mt-4 mb-1">Password</label>
      <input type="password" defaultValue="password123" className={inp} />
      <button className="btn btn-p w-full justify-center mt-6 !py-2 text-sm">Sign in as {r.k.toLowerCase()}</button>
      <div className="text-[11px] text-slate-500 mt-3 text-center">Demo only. Any password works.</div>
    </form>
  );
}
