import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Sparkles,
  Truck,
} from 'lucide-react';
import SEO from './SEO';
import { PRODUCT, WHATSAPP_NUMBER } from '../constants';
import { cloudinaryTransform } from '../utils/cloudinary';

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

function statusTone(statusRaw?: string) {
  const s = (statusRaw || '').toLowerCase();
  if (!s) return { label: 'Update available', tone: 'neutral' as const };
  if (s.includes('deliver')) return { label: statusRaw!, tone: 'success' as const };
  if (s.includes('out for delivery')) return { label: statusRaw!, tone: 'success' as const };
  if (s.includes('in transit') || s.includes('dispatch') || s.includes('shipped')) return { label: statusRaw!, tone: 'progress' as const };
  if (s.includes('failed') || s.includes('return') || s.includes('rto') || s.includes('cancel')) return { label: statusRaw!, tone: 'danger' as const };
  return { label: statusRaw!, tone: 'neutral' as const };
}

function formatCheckpointTitle(c: TrackCourierCheckpoint) {
  const activity = (c.Activity || '').trim();
  const state = (c.CheckpointState || '').trim();
  if (activity && state && activity.toLowerCase() !== state.toLowerCase()) return `${activity} • ${state}`;
  return activity || state || 'Update';
}

const TrackPage: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ApiResultItem[] | null>(null);

  const heroImage = useMemo(() => {
    // Prefer the lifestyle/model shot so it feels more “for women” and less “admin”.
    const firstColor = PRODUCT.colors?.[0];
    return firstColor?.images?.[0] || firstColor?.images?.[1] || null;
  }, []);

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
      const contentType = r.headers.get('content-type') || '';
      const raw = await r.text();
      let json: any = null;
      if (contentType.includes('application/json')) {
        try {
          json = raw ? JSON.parse(raw) : null;
        } catch {
          // fall through to error below
        }
      }
      if (!r.ok) {
        const extra = raw ? ` — ${raw.slice(0, 180)}` : '';
        throw new Error((json?.error as string) || `Request failed (${r.status})${extra}`);
      }
      if (!json) throw new Error('Unexpected response from server. Please try again.');
      setResults((json?.results ?? []) as ApiResultItem[]);
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 relative overflow-hidden">
      <SEO
        title="Track Order"
        description="Track your Bharat.style order using your courier tracking number (Doc ID)."
        canonicalUrl="https://bharat.style/track"
      />

      {/* soft background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-28 h-72 w-72 rounded-full bg-indigo-200/45 blur-3xl" />
        <div className="absolute -bottom-24 -left-28 h-72 w-72 rounded-full bg-rose-200/45 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-xs font-semibold text-stone-700">
                  <Sparkles size={14} className="text-indigo-600" />
                  Order tracking
                </div>
                <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                  Track your order
                </h1>
                <p className="mt-2 text-stone-600">
                  Enter the <strong>mobile number used in your order</strong> to see courier updates.
                </p>
              </div>

              {heroImage ? (
                <div className="w-full sm:w-auto">
                  <div className="relative w-full sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bs-float">
                    <img
                      src={cloudinaryTransform(heroImage, { w: 520 })}
                      alt="Bharat.style order preview"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width="520"
                      height="390"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
                  </div>
                </div>
              ) : null}
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-start">
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/15 focus:border-stone-300"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-2xl bg-stone-900 text-white px-6 py-4 font-bold hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed transition inline-flex items-center justify-center gap-2"
                >
                  <Truck size={18} className={loading ? 'bs-pulse-soft' : ''} />
                  {loading ? 'Tracking…' : 'Track'}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-sm text-stone-500">
                  Tip: If you can’t find tracking, message us on WhatsApp and we’ll help.
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-green-700 hover:text-green-800 underline decoration-green-300 hover:decoration-green-400 underline-offset-2 inline-flex items-center gap-2"
                >
                  <Phone size={16} />
                  WhatsApp support
                </a>
              </div>

              {error ? (
                <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-red-900 text-sm flex gap-3 items-start">
                  <AlertTriangle size={18} className="mt-0.5 text-red-700" />
                  <div>
                    <div className="font-semibold">We couldn’t fetch tracking</div>
                    <div className="text-red-800">{error}</div>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between gap-3">
                  <div className="w-40 h-4 rounded-full bs-skeleton" />
                  <div className="w-28 h-7 rounded-full bs-skeleton" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-20 rounded-2xl bs-skeleton" />
                    <div className="h-20 rounded-2xl bs-skeleton" />
                    <div className="h-20 rounded-2xl bs-skeleton" />
                  </div>
                  <div className="h-5 w-40 rounded-full bs-skeleton" />
                  <div className="space-y-3">
                    <div className="h-16 rounded-2xl bs-skeleton" />
                    <div className="h-16 rounded-2xl bs-skeleton" />
                    <div className="h-16 rounded-2xl bs-skeleton" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {results ? (
          <div className="mt-8 space-y-4">
            {results.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Package size={20} className="text-stone-700 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">No shipments found</div>
                    <div className="text-stone-600 text-sm mt-1">
                      If you placed an order recently, tracking may take a few hours to appear.
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {results.map((r) => (
              <div key={r.docId} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-sm text-stone-500">Doc ID</div>
                    <div className="text-lg font-bold text-stone-900">{r.docId}</div>
                  </div>
                  <div className="text-sm">
                    {r.ok ? (
                      (() => {
                        const st = statusTone(r.data?.MostRecentStatus || r.data?.ShipmentState);
                        const cls =
                          st.tone === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : st.tone === 'progress'
                              ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                              : st.tone === 'danger'
                                ? 'bg-red-50 text-red-800 border-red-200'
                                : 'bg-stone-50 text-stone-800 border-stone-200';
                        return (
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 border ${cls} ${
                              st.tone === 'progress' ? 'bs-pulse-soft' : ''
                            }`}
                          >
                            {st.tone === 'success' ? <CheckCircle2 size={16} /> : <Truck size={16} />}
                            {st.label}
                          </span>
                        );
                      })()
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-900 px-3 py-1.5 border border-red-200">
                        <AlertTriangle size={16} />
                        Failed
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {r.ok ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-stone-50 border border-stone-100 p-4">
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <Package size={14} />
                            Courier
                          </div>
                          <div className="mt-1 font-semibold text-stone-900">{r.data?.CourierSlug || 'anjani-courier'}</div>
                        </div>
                        <div className="rounded-2xl bg-stone-50 border border-stone-100 p-4">
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <Truck size={14} />
                            Shipment state
                          </div>
                          <div className="mt-1 font-semibold text-stone-900">{r.data?.ShipmentState || '—'}</div>
                        </div>
                        <div className="rounded-2xl bg-stone-50 border border-stone-100 p-4">
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <Clock3 size={14} />
                            Most recent
                          </div>
                          <div className="mt-1 font-semibold text-stone-900">{r.data?.MostRecentStatus || '—'}</div>
                        </div>
                      </div>

                      {r.data?.AdditionalInfo ? (
                        <div className="mt-4 text-sm text-stone-600">{r.data.AdditionalInfo}</div>
                      ) : null}

                      <div className="mt-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-stone-900">Shipment journey</div>
                          <div className="text-xs text-stone-500">Newest updates appear first</div>
                        </div>

                        {(r.data?.Checkpoints ?? []).length === 0 ? (
                          <div className="mt-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm text-stone-700">
                            No checkpoints yet. Please check again in a few hours.
                          </div>
                        ) : (
                          <ol className="mt-4 space-y-3">
                            {(r.data?.Checkpoints ?? []).map((c, idx) => (
                              <li
                                key={idx}
                                className="relative pl-10 bs-reveal-up"
                                style={{ animationDelay: `${Math.min(idx * 60, 420)}ms` }}
                              >
                                <span aria-hidden="true" className="absolute left-[18px] top-0 bottom-0 w-px bg-stone-200" />
                                <span
                                  aria-hidden="true"
                                  className={`absolute left-3 top-4 h-3 w-3 rounded-full ${
                                    idx === 0
                                      ? 'bg-indigo-600 shadow-[0_0_0_6px_rgba(99,102,241,0.15)]'
                                      : 'bg-stone-400'
                                  }`}
                                />

                                <div className="rounded-2xl border border-stone-100 bg-white shadow-sm px-4 py-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="font-semibold text-stone-900">{formatCheckpointTitle(c)}</div>
                                    <div className="text-xs text-stone-500 inline-flex items-center gap-2">
                                      <Clock3 size={14} />
                                      <span>
                                        {c.Date || '—'} {c.Time ? `• ${c.Time}` : ''}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-stone-700">
                                    <div className="inline-flex items-start gap-2">
                                      <MapPin size={16} className="text-stone-500 mt-0.5" />
                                      <span>{c.Location || '—'}</span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-red-900 text-sm flex gap-3 items-start">
                      <AlertTriangle size={18} className="mt-0.5 text-red-700" />
                      <div>
                        <div className="font-semibold">Couldn’t fetch this shipment</div>
                        <div className="text-red-800">{r.error}</div>
                      </div>
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


