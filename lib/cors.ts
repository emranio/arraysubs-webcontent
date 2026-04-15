const CORS_HEADER_MAP = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
} as const;

export function buildCorsHeaders(additionalHeaders: HeadersInit = {}): Headers {
  const headers = new Headers(additionalHeaders);

  for (const [key, value] of Object.entries(CORS_HEADER_MAP)) {
    headers.set(key, value);
  }

  return headers;
}
