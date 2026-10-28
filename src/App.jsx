import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Building2, KeyRound, GraduationCap, ShieldCheck, LayoutDashboard } from "lucide-react";
import { useApp } from "./store";
import Login from "./pages/Login";
import InstDash from "./pages/InstDash";
import Institution from "./pages/Institution";
import Student from "./pages/Student";
import Verify from "./pages/Verify";
import Aicte from "./pages/Aicte";

const items = [
  { to: "/student", label: "Student", icon: GraduationCap, roles: ["Student"], el: <Student /> },
  { to: "/institution", label: "Institution dashboard", icon: Building2, roles: ["Institution"], el: <InstDash /> },
  { to: "/staff", label: "Staff login", icon: KeyRound, roles: ["Institution"], el: <Institution /> },
  { to: "/aicte", label: "AICTE dashboard", icon: LayoutDashboard, roles: ["AICTE admin"], el: <Aicte /> },
  { to: "/verify", label: "Verification", icon: ShieldCheck, roles: null, el: <Verify /> },
];
const home = { Student: "/student", Institution: "/institution", "AICTE admin": "/aicte" };
const who = { Student: "Student, Ananya Deshmukh", Institution: "Institution admin, VJTI", "AICTE admin": "AICTE admin, Neha Bhatt" };

function Guard({ it }) {
  const { role } = useApp();
  if (!it.roles) return it.el;
  if (!role) return <Navigate to="/login" replace />;
  return it.roles.includes(role) ? it.el : <Navigate to={home[role]} replace />;
}

export default function App() {
  const { pathname } = useLocation();
  const go = useNavigate();
  const { toast, role, signOut, notify } = useApp();
  const links = [...(role ? [] : [{ to: "/login", label: "Login", icon: LogIn }]), ...items.filter((i) => !i.roles || i.roles.includes(role))];
  const out = () => { signOut(); notify("Signed out"); go("/login"); };
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob" style={{ top: -100, left: "30%", background: "#7dd3c8" }} />
        <div className="blob" style={{ bottom: -140, right: "8%", background: "#a5b4fc", animationDelay: "-7s" }} />
      </div>
      <div className="flex gap-4 p-4 min-h-screen">
        <aside className="glass w-56 shrink-0 p-3 sticky top-4 self-start h-[calc(100vh-2rem)] flex flex-col">
          <div className="flex items-center gap-2 px-2 pb-3 mb-2 border-b border-slate-200/70">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 text-white text-xs font-bold">A</span>
            <span className="text-xs font-semibold text-slate-600">Portals</span>
          </div>
          {links.map(({ to, label, icon: I }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg mb-1 transition-all duration-200 ${isActive ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md" : "hover:bg-white/70 hover:translate-x-0.5"}`}>
              <I size={16} />
              {label}
            </NavLink>
          ))}
          {role && (
            <div className="mt-auto pt-3 border-t border-slate-200/70">
              <div className="px-2 mb-2 text-xs text-slate-500">Signed in as <span className="text-navy font-medium">{role}</span></div>
              <button className="btn w-full justify-center" onClick={out}><LogOut size={13} /> Sign out</button>
            </div>
          )}
        </aside>
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <header className="glass px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">AICTE | Student Data & Verification</div>
            <div className="text-xs text-slate-500">Viewing as: <span className="text-navy font-medium">{role ? who[role] : "Not signed in"}</span></div>
          </header>
          <main key={pathname} className="page flex flex-col gap-4">
            <Routes>
              <Route path="/" element={<Navigate to={role ? home[role] : "/login"} replace />} />
              <Route path="/login" element={<Login />} />
              {items.map((it) => <Route key={it.to} path={it.to} element={<Guard it={it} />} />)}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
        {toast && <div className="fixed bottom-6 right-6 glass px-4 py-2 text-xs font-medium">{toast}</div>}
      </div>
    </>
  );
}
