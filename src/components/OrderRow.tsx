'use client';
import { useState } from 'react';

type Props = {
  order: any; 
  onStatusChange?: () => void; 
};

export default function OrderRow({ order, onStatusChange }: Props) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (!confirm(`Change status to ${newStatus}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Update failed');
      setStatus(newStatus);
      onStatusChange?.();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">Order {order.id}</div>
          <div className="text-sm">By: {order.user?.email}</div>
          <div className="text-sm">Status: {status}</div>
        </div>
        <div className="text-right">
          <div>Total: ${Number(order.total).toFixed(2)}</div>
          <div>{new Date(order.createdAt).toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map((s) =>
          s !== status ? (
            <button
              key={s}
              disabled={loading}
              onClick={() => handleStatusChange(s)}
              className="px-2 py-1 border rounded bg-blue-600 text-white text-sm"
            >
              {s}
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}
