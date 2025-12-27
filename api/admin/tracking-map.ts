import { readTrackingMap, upsertTrackingMapEntry } from '../_trackingMapStore';

function getPassword(req: any): string {
  const fromHeader = typeof req.headers?.['x-admin-password'] === 'string' ? req.headers['x-admin-password'] : '';
  const fromBody = typeof req.body?.password === 'string' ? req.body.password : '';
  return fromHeader || fromBody || '';
}

function isAuthed(req: any): boolean {
  const expected = process.env.TRACKING_ADMIN_PASSWORD || 'thetidbit2026';
  return getPassword(req) === expected;
}

export async function processAdminTrackingMapRequest(req: {
  method?: string;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, any>;
}): Promise<{ status: number; headers: Record<string, string>; json: any }> {
  const method = req.method ?? 'GET';

  if (!isAuthed(req)) {
    return { status: 401, headers: { 'cache-control': 'no-store' }, json: { error: 'Unauthorized' } };
  }

  if (method === 'GET') {
    const map = await readTrackingMap();
    return { status: 200, headers: { 'cache-control': 'no-store' }, json: { map } };
  }

  if (method === 'POST') {
    const mobile = String(req.body?.mobile ?? '');
    const docIds = req.body?.docIds ?? req.body?.docId ?? '';
    const updated = await upsertTrackingMapEntry({ mobile, docIds });
    return { status: 200, headers: { 'cache-control': 'no-store' }, json: { ok: true, updated } };
  }

  return { status: 405, headers: { 'cache-control': 'no-store' }, json: { error: 'Method not allowed' } };
}

export default async function handler(req: any, res: any) {
  try {
    const out = await processAdminTrackingMapRequest({
      method: req?.method,
      query: req?.query,
      body: req?.body,
      headers: req?.headers,
    });
    for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
    res.status(out.status).json(out.json);
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message ?? e) });
  }
}


