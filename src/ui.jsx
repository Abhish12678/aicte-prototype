import { useState, useEffect } from "react";

export const G = ({ className = "", children }) => <div className={`glass p-4 ${className}`}>{children}</div>;

const tones = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};
export const Tag = ({ tone = "slate", children }) => <span className={`tag ${tones[tone]}`}>{children}</span>;

export function useCount(t) {
  const [v, setV] = useState(t);
  useEffect(() => {
    const i = setInterval(() => setV((x) => (x === t ? x : x + Math.sign(t - x))), 25);
    return () => clearInterval(i);
  }, [t]);
  return v;
}

export function Ring({ value }) {
  const v = useCount(value);
  const c = 2 * Math.PI * 44;
  return (
    <div className="relative w-28 h-28">
      <svg viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#dbe4f0" strokeWidth="8" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#0d9488" strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-xl font-semibold">{v}%</div>
    </div>
  );
}
