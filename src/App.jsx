import { useState } from "react";
import SignalForm from "./components/SignalForm";
import SignalCard from "./components/SignalCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

async function apiGenerateSignal(payload) {
  const res = await fetch(`${BACKEND_URL}/api/signals/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return await res.json();
}

async function apiListSignals(payload) {
  const res = await fetch(`${BACKEND_URL}/api/signals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Ошибка загрузки истории");
  return await res.json();
}

function App() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = async (payload) => {
    const s = await apiGenerateSignal(payload);
    setLatest(s);
    try {
      const list = await apiListSignals({
        asset_type: payload.asset_type,
        symbol: payload.symbol,
        timeframe: payload.timeframe,
        limit: 10,
      });
      setHistory(list);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.07),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.06),transparent_35%)]" />

      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Точные трейдинг-сигналы</h1>
          <p className="text-blue-200/80">Криптовалюты и Форекс. Сигналы формируются на основе устойчивых индикаторов (EMA, RSI) из надёжных источников рыночных данных.</p>
        </header>

        <div className="grid gap-6">
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <SignalForm onGenerate={handleGenerate} />
          </section>

          {latest && (
            <section className="grid gap-3">
              <h2 className="text-white font-semibold">Последний сигнал</h2>
              <SignalCard signal={latest} />
            </section>
          )}

          {history && history.length > 0 && (
            <section className="grid gap-3">
              <h2 className="text-white font-semibold">История сигналов</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {history.map((s, idx) => (
                  <SignalCard key={idx} signal={s} />
                ))}
              </div>
            </section>
          )}

          <footer className="text-center text-sm text-slate-400 pt-4">
            Источники данных: Binance (крипто), TwelveData (форекс). Для более стабильных форекс-данных можно добавить API ключ TwelveData как переменную окружения.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
