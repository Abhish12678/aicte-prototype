import { createContext, useContext, useState, useEffect } from "react";
import * as D from "./data";

const Ctx = createContext();
export const useApp = () => useContext(Ctx);
const now = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

export function Provider({ children }) {
  const [colleges, setColleges] = useState(D.colleges);
  const [students, setStudents] = useState(D.students);
  const [flagged, setFlagged] = useState(D.flagged);
  const [alerts, setAlerts] = useState(D.alerts);
  const [audit, setAudit] = useState(D.audit);
  const [months, setMonths] = useState(D.months);
  const [settings, setSettings] = useState({ consent: true, mfa: true, email: false });
  const [toast, setToast] = useState("");
  const [role, setRole] = useState(() => { try { return sessionStorage.getItem("role") || ""; } catch { return ""; } });
  const signIn = (r) => { setRole(r); try { sessionStorage.setItem("role", r); } catch {} };
  const signOut = () => { setRole(""); try { sessionStorage.removeItem("role"); } catch {} };

  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2500);
  };
  const log = (actor, text) => setAudit((a) => [{ t: now(), actor, text }, ...a]);

  useEffect(() => {
    const i = setInterval(() => {
      setColleges((cs) => cs.map((c) => (Math.random() < 0.4 ? { ...c, enrolled: c.enrolled + 1 + Math.floor(Math.random() * 2) } : c)));
      setMonths((ms) => ms.map((m, k) => (k === ms.length - 1 ? { ...m, n: m.n + 3 + Math.floor(Math.random() * 9) } : m)));
    }, 9000);
    return () => clearInterval(i);
  }, []);

  const resolve = (id, ok) => {
    const f = flagged.find((x) => x.id === id);
    setFlagged((l) => l.map((x) => (x.id === id ? { ...x, status: ok ? "Approved" : "Rejected" } : x)));
    log("Dr. Sunita Rao", `${ok ? "Approved" : "Rejected"} flag: ${f.reason} (${f.college})`);
    notify(ok ? "Record approved" : "Record rejected");
  };

  const addFlags = (list) =>
    setFlagged((f) => [...list.map((x, i) => ({ id: Date.now() + i, status: "Pending", ...x })), ...f]);

  const transfer = (sid) => {
    const s = students.find((x) => x.id === sid);
    const to = colleges.find((c) => c.id !== s.college && c.enrolled < c.intake);
    const from = colleges.find((c) => c.id === s.college);
    setStudents((l) => l.map((x) => (x.id === sid ? { ...x, college: to.id } : x)));
    setColleges((l) => l.map((c) => (c.id === from.id ? { ...c, enrolled: c.enrolled - 1 } : c.id === to.id ? { ...c, enrolled: c.enrolled + 1 } : c)));
    setAlerts((a) => [{ id: Date.now(), text: `${s.name} transferred to ${to.short}`, t: "Just now" }, ...a]);
    log(from.short, `Transferred ${s.name} (APAAR ${s.apaar}) to ${to.short}`);
    return `${s.name} moved to ${to.name}. Seat freed at previous college.`;
  };

  const v = { colleges, students, flagged, alerts, audit, months, settings, setSettings, role, signIn, signOut, toast, notify, log, resolve, addFlags, transfer };
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}
