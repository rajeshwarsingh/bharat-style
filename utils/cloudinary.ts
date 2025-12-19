type TransformOpts = {
  w?: number;
  q?: string; // e.g. "auto:good"
  f?: string; // e.g. "auto"
};

export function cloudinaryTransform(url: string, opts: TransformOpts): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformParts: string[] = [];
  transformParts.push(`f_${opts.f ?? 'auto'}`);
  transformParts.push(`q_${opts.q ?? 'auto'}`);
  if (opts.w) transformParts.push(`w_${opts.w}`);

  const transform = transformParts.join(',');
  return `${parts[0]}/upload/${transform}/${parts[1]}`;
}

export function cloudinarySrcSet(url: string, widths: number[]): string {
  return widths
    .map((w) => `${cloudinaryTransform(url, { w })} ${w}w`)
    .join(', ');
}


