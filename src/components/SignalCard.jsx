export default function SignalCard({ signal }) {
  const color = signal.signal_type === "buy" ? "text-emerald-400" : signal.signal_type === "sell" ? "text-rose-400" : "text-slate-300";
  const badge = signal.signal_type === "buy" ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/30" : signal.signal_type === "sell" ? "bg-rose-500/10 text-rose-300 border-rose-400/30" : "bg-slate-500/10 text-slate-300 border-slate-400/30";

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-white font-semibold">{signal.symbol} • {signal.timeframe.toUpperCase()}</div>
        <span className={`px-2 py-1 rounded-md text-xs border ${badge}`}>{signal.signal_type.toUpperCase()}</span>
      </div>
      <div className="text-sm text-slate-300">Тип: {signal.asset_type}</div>
      <div className="text-sm text-slate-300">Цена: <span className={color}>{signal.price}</span></div>
      <div className="text-sm text-slate-400 mt-2">{signal.reason}</div>
      {signal.confidence != null && (
        <div className="mt-2 text-sm text-slate-400">Уверенность: {(signal.confidence * 100).toFixed(0)}%</div>
      )}
    </div>
  );
}
