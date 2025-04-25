'use client';
import { useEffect, useState } from 'react';
import Spiner from '../components/others/Spiner';
import { useRouter } from 'next/navigation';

const LogsViewer = () => {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const val = prompt('Passkey');
    if (val !== 'logs') {
      router.push('/');
    } else {
      const fetchLogs = async () => {
        const res = await fetch('/api/log');
        const data = await res.json();
        setLogs(data);
      };
      // Fetch logs every 5 seconds
      fetchLogs();
      const interval = setInterval(fetchLogs, 14000);

      return () => clearInterval(interval);
    }
  }, [router]);

  return (
    <div className="section">
      <div className="my-4">
        <h1 className="text-center font-semibold text-3xl">Live Logs</h1>
      </div>
      <div className="bg-gray-800 p-4 rounded-md max-h-[500px] overflow-y-auto shadow">
        <div className="float-right">
          <Spiner />
        </div>
        {logs.map((log, i) => (
          <p
            key={i}
            className="text-gray-400 p-2 border-b border-gray-600 text-sm font-mono"
          >
            {i + 1} - {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LogsViewer;
