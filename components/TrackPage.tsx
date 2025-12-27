import React, { useState } from 'react';
import SEO from './SEO';

type TrackCourierCheckpoint = {
  Time?: string;
  Date?: string;
  Location?: string;
  Activity?: string;
  CourierName?: string;
  CheckpointState?: string;
};

type TrackCourierResponse = {
  Result?: string;
  TrackingNumber?: string;
  MostRecentStatus?: string;
  ShipmentState?: string;
  CourierSlug?: string;
  Checkpoints?: TrackCourierCheckpoint[];
  AdditionalInfo?: string;
};

type ApiResultItem =
  | { docId: string; ok: true; data: TrackCourierResponse }
  | { docId: string; ok: false; error: string };

function normalizeMobile(input: string): string {
  const digits = input.replace(/[^\d]/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

const TrackPage: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ApiResultItem[] | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);

    const m = normalizeMobile(mobile);
    if (!m || m.length < 10) {
      setError('Please enter your 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const r = await fetch('/api/track-by-mobile', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ courierSlug: 'anjani-courier', mobile: m }),
      });
      const json = await r.json();
      if (!r.ok) {
        throw new Error(json?.error || `Request failed (${r.status})`);
      }
      setResults((json?.results ?? []) as ApiResultItem[]);
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50">
      <SEO
        title="Track Order"
        description="Track your Bharat.style order using your courier tracking number (Doc ID)."
        canonicalUrl="https://bharat.style/track"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Track your order</h1>
          <p className="mt-2 text-stone-600">
            Enter the <strong>mobile number used in your order</strong> to see the latest courier tracking updates.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/15 focus:border-stone-300"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm text-stone-500">
                Tip: If you can’t find tracking, message us on WhatsApp and we’ll help.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-xl bg-stone-900 text-white px-5 py-3 font-bold hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Tracking…' : 'Track'}
              </button>
            </div>

            {error ? (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
                {error}
              </div>
            ) : null}
          </form>
        </div>

        {results ? (
          <div className="mt-8 space-y-4">
            {results.map((r) => (
              <div key={r.docId} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="text-sm text-stone-500">Doc ID</div>
                    <div className="text-lg font-bold text-stone-900">{r.docId}</div>
                  </div>
                  <div className="text-sm">
                    {r.ok ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 border border-emerald-200">
                        {r.data?.MostRecentStatus || r.data?.ShipmentState || 'Status available'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-50 text-red-800 px-3 py-1 border border-red-200">
                        Failed
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {r.ok ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                          <div className="text-xs text-stone-500">Courier</div>
                          <div className="font-semibold text-stone-900">{r.data?.CourierSlug || 'anjani-courier'}</div>
                        </div>
                        <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                          <div className="text-xs text-stone-500">Shipment state</div>
                          <div className="font-semibold text-stone-900">{r.data?.ShipmentState || '—'}</div>
                        </div>
                        <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                          <div className="text-xs text-stone-500">Most recent</div>
                          <div className="font-semibold text-stone-900">{r.data?.MostRecentStatus || '—'}</div>
                        </div>
                      </div>

                      {r.data?.AdditionalInfo ? (
                        <div className="mt-4 text-sm text-stone-600">{r.data.AdditionalInfo}</div>
                      ) : null}

                      <div className="mt-6">
                        <div className="text-sm font-semibold text-stone-900">Checkpoints</div>
                        <div className="mt-3 overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead className="text-stone-600">
                              <tr className="border-b border-stone-100">
                                <th className="text-left font-semibold py-2 pr-4">Date</th>
                                <th className="text-left font-semibold py-2 pr-4">Time</th>
                                <th className="text-left font-semibold py-2 pr-4">Location</th>
                                <th className="text-left font-semibold py-2 pr-4">Activity</th>
                                <th className="text-left font-semibold py-2">State</th>
                              </tr>
                            </thead>
                            <tbody className="text-stone-900">
                              {(r.data?.Checkpoints ?? []).map((c, idx) => (
                                <tr key={idx} className="border-b border-stone-50">
                                  <td className="py-2 pr-4 whitespace-nowrap">{c.Date || '—'}</td>
                                  <td className="py-2 pr-4 whitespace-nowrap">{c.Time || '—'}</td>
                                  <td className="py-2 pr-4">{c.Location || '—'}</td>
                                  <td className="py-2 pr-4">{c.Activity || '—'}</td>
                                  <td className="py-2 whitespace-nowrap">{c.CheckpointState || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
                      {r.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TrackPage;


