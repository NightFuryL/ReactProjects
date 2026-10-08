import { useRef, useState } from "react";

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [note, setNote] = useState("");

  const intervalRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTimer = () => {
    if (isActive) return;
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    inputRef.current?.focus();
  };
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  return (
    <div className="bg-white p-6 rounded-x1 shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        Таймер фокусування
      </h3>
      <div className="text-center mb-6">
        <span className="text-4x1 font-mono font-bold text-blue-600">
          {formatTime(seconds)}
        </span>
      </div>
      <div className="flex gap-2 mb-4">
        {isActive ? (
          <button
            onClick={stopTimer}
            className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Start
          </button>
        )}
      </div>
      <div>
        <label htmlFor="">Що ви встигли вивчити?</label>
        <input
          type="text"
          ref={inputRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Напишіть коротку нотатку..."
        />
      </div>
    </div>
  );
}
