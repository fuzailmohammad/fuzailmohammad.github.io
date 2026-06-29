import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;

    const update = () => {
      const elapsed = performance.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
          Mohammad Fuzail
        </h1>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-lg mt-4">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
