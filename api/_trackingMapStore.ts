export type TrackingMap = Record<string, string[]>;

function normalizeMobile(mobile: string): string {
  // Keep digits only; last 10 digits (India-friendly) to reduce formatting differences.
  const digits = mobile.replace(/[^\d]/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function normalizeDocIds(docIds: unknown): string[] {
  const arr = Array.isArray(docIds) ? docIds : typeof docIds === 'string' ? docIds.split(/[\s,]+/g) : [];
  const cleaned = arr
    .map((v) => (typeof v === 'string' || typeof v === 'number' ? String(v) : ''))
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/[^\d]/g, ''))
    .filter(Boolean);

  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of cleaned) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

async function safeReadJsonFromFs(filePath: string): Promise<any | null> {
  try {
    const { readFile } = await import('node:fs/promises');
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function safeReadJsonFromHttp(url: string): Promise<any | null> {
  try {
    const r = await fetch(url, { headers: { accept: 'application/json' } });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function inferBaseUrl(): string {
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  const publicBase = process.env.PUBLIC_BASE_URL;
  if (publicBase) return publicBase.replace(/\/$/, '');
  return 'https://bharat.style';
}

export async function readTrackingMap(): Promise<TrackingMap> {
  // Production: prefer fetching the deployed JSON (functions don't reliably have /public on disk).
  // Local/dev: read from filesystem.
  const baseUrl = inferBaseUrl();
  const fromHttp = process.env.NODE_ENV === 'production' ? await safeReadJsonFromHttp(`${baseUrl}/tracking-map.json`) : null;

  const { default: path } = await import('node:path');
  const DATA_PATH = path.resolve(process.cwd(), 'data', 'tracking-map.json');
  const PUBLIC_PATH = path.resolve(process.cwd(), 'public', 'tracking-map.json');

  const fromData = await safeReadJsonFromFs(DATA_PATH);
  const fromPublic = await safeReadJsonFromFs(PUBLIC_PATH);

  const base = (fromHttp ?? fromData ?? fromPublic ?? {}) as TrackingMap;

  // Normalize to { mobile: string[] }
  const normalized: TrackingMap = {};
  for (const [k, v] of Object.entries(base)) {
    const mobile = normalizeMobile(k);
    const ids = normalizeDocIds(v as any);
    if (!mobile || ids.length === 0) continue;
    normalized[mobile] = ids;
  }
  return normalized;
}

export async function upsertTrackingMapEntry(params: {
  mobile: string;
  docIds: unknown;
}): Promise<{ mobile: string; docIds: string[] }> {
  const mobile = normalizeMobile(params.mobile);
  const docIds = normalizeDocIds(params.docIds);
  if (!mobile) throw new Error('Invalid mobile number');
  if (docIds.length === 0) throw new Error('Provide at least one docId');

  const map = await readTrackingMap();
  map[mobile] = docIds;

  // Writing is only reliable in local/dev. Production serverless FS is read-only.
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Updating tracking-map.json is not supported in production (serverless filesystem is read-only). Update the JSON in git, or connect a KV/DB store.'
    );
  }

  const { default: path } = await import('node:path');
  const { mkdir, writeFile } = await import('node:fs/promises');
  const DATA_PATH = path.resolve(process.cwd(), 'data', 'tracking-map.json');
  const PUBLIC_PATH = path.resolve(process.cwd(), 'public', 'tracking-map.json');

  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  const json = JSON.stringify(map, null, 2) + '\n';
  await writeFile(DATA_PATH, json, 'utf8');
  await writeFile(PUBLIC_PATH, json, 'utf8');

  return { mobile, docIds };
}


