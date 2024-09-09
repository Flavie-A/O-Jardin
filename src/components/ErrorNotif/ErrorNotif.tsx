import React from 'react';
import { Info } from 'react-feather';

interface ErrorNotifProps {
  error: string;
}
function ErrorNotif({ error }: ErrorNotifProps) {
  return (
    <div className="w-full mx-auto bg-red-100 border-t-4 border-red-600 rounded-b text-red-600 py-3 mt-6">
      <div className="rounded-lg" />
      <div>
        <Info className="absolute ml-2" />
        <p className="ml-10">{error}</p>
      </div>
    </div>
  );
}

export default ErrorNotif;
