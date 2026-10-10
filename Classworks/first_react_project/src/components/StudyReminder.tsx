import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
// було трохи складно із react-hot-toast, але розібрався за допомогою ші
export default function StudyReminder() {
  const [text, setText] = useState("хуки ");
  const [seconds, setSeconds] = useState<number>(5);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleStartTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    const delay = (Number(seconds) || 1) * 1000;
    setIsRunning(true);
    toast.success(`Таймер встановлено на ${seconds} сек.`);

    const id = window.setTimeout(() => {
      toast(text || "Нагадування про навчання!", {
        icon: "⏰",
        duration: 4000,
      });
      timerRef.current = null;
      setIsRunning(false);
    }, delay);

    timerRef.current = id;
  };

  const handleCancelTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
      toast("Таймер скасовано");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase text-gray-500">
          Текст нагадування
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введіть нагадування..."
          className="px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase text-gray-500">
          Час (у секундах)
        </label>
        <input
          type="number"
          min="1"
          value={seconds}
          onChange={(e) => setSeconds(Math.max(1, Number(e.target.value)))}
          className="px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleStartTimer}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
        >
          {isRunning ? "Перезапустити таймер" : "Встановити таймер"}
        </button>

        {isRunning && (
          <button
            onClick={handleCancelTimer}
            className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors text-sm font-medium cursor-pointer"
          >
            Скасувати
          </button>
        )}
      </div>
    </div>
  );
}
