import { useState } from "react";

export default function SignalForm({ onGenerate }) {
  const [assetType, setAssetType] = useState("crypto");
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1h");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onGenerate({ asset_type: assetType, symbol, timeframe });
    } catch (e) {
      setError(e.message || "Ошибка генерации сигнала");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Тип актива</label>
          <select
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-white"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="crypto">Крипто</option>
            <option value="forex">Форекс</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Символ</label>
          <input
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-400"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="BTCUSDT или EURUSD"
          />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Таймфрейм</label>
          <select
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2.5 text-white"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="1h">1ч</option>
            <option value="4h">4ч</option>
            <option value="1d">1д</option>
          </select>
        </div>
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition rounded-lg px-4 py-2 text-white font-medium"
      >
        {loading ? "Генерация..." : "Сгенерировать сигнал"}
      </button>
    </form>
  );
}
