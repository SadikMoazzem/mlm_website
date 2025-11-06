import { NextResponse } from 'next/server'

type Payload = {
  masjidIds?: string[]
}

const DEFAULT_CONCURRENCY = 5
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_RETRIES = 2

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

async function warmUrl(url: string, timeoutMs = DEFAULT_TIMEOUT_MS, retries = DEFAULT_RETRIES) {
  let attempt = 0
  while (attempt <= retries) {
    try {
      const res = await fetchWithTimeout(url, timeoutMs)
      return { ok: res.ok, status: res.status, headers: Object.fromEntries(res.headers.entries()) }
    } catch (err) {
      attempt++
      if (attempt > retries) return { ok: false, error: String(err) }
      await sleep(100 * Math.pow(2, attempt))
    }
  }
}

async function warmIds(ids: string[], baseUrl: string) {
  const concurrency = DEFAULT_CONCURRENCY
  const results: any[] = []
  const queue = ids.slice()

  const workers = Array.from({ length: concurrency }).map(async () => {
    while (queue.length > 0) {
      const id = queue.shift()
      if (!id) break
      const url = `${baseUrl.replace(/\/$/, '')}/embed/${encodeURIComponent(id)}/prayer-times`
      const r = await warmUrl(url)
      results.push({ id, url, r })
    }
  })

  await Promise.all(workers)
  return results
}

function getBaseUrl() {
  // Prefer explicit env var, fall back to Vercel URL or localhost
  if (process.env.PREBUILD_BASE_URL) return process.env.PREBUILD_BASE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'https://www.mylocalmasjid.com'
}

export async function POST(request: Request) {
  const secret = request.nextUrl.searchParams.get('secret') || process.env.PREBUILD_SECRET
  if (!secret || secret !== (process.env.PREBUILD_SECRET || secret)) {
    return NextResponse.json({ error: 'missing or invalid secret' }, { status: 401 })
  }

  const body: Payload = await request.json().catch(() => ({}))
  const ids = body.masjidIds && body.masjidIds.length ? body.masjidIds : (process.env.PREBUILD_MASJID_IDS ? process.env.PREBUILD_MASJID_IDS.split(',').map(s => s.trim()).filter(Boolean) : [])
  if (ids.length === 0) return NextResponse.json({ error: 'no masjid ids provided' }, { status: 400 })

  const baseUrl = getBaseUrl()
  const results = await warmIds(ids, baseUrl)
  const summary = { total: results.length, success: results.filter(r => r.r.ok).length, failed: results.filter(r => !r.r.ok).length }
  return NextResponse.json({ summary, results })
}

export async function GET(request: Request) {
  // Allow GET for simple cron calls with query param ?ids=id1,id2&secret=...
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret') || process.env.PREBUILD_SECRET
  if (!secret || secret !== (process.env.PREBUILD_SECRET || secret)) {
    return NextResponse.json({ error: 'missing or invalid secret' }, { status: 401 })
  }

  const idsParam = url.searchParams.get('ids') || ''
  const ids = idsParam.split(',').map(s => s.trim()).filter(Boolean)
  const envIds = process.env.PREBUILD_MASJID_IDS ? process.env.PREBUILD_MASJID_IDS.split(',').map(s => s.trim()).filter(Boolean) : []
  const finalIds = ids.length ? ids : envIds
  if (finalIds.length === 0) return NextResponse.json({ error: 'no masjid ids provided' }, { status: 400 })

  const baseUrl = getBaseUrl()
  const results = await warmIds(finalIds, baseUrl)
  const summary = { total: results.length, success: results.filter(r => r.r.ok).length, failed: results.filter(r => !r.r.ok).length }
  return NextResponse.json({ summary, results })
}


