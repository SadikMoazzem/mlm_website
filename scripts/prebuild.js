#!/usr/bin/env node
// Simple prebuild script to warm Next.js ISR pages for embed prayer times
// Usage:
//   node scripts/prebuild.js --ids=id1,id2 --baseUrl=https://www.mylocalmasjid.com

const DEFAULT_CONCURRENCY = 5
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_RETRIES = 3

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

async function warmUrl(url, timeoutMs = DEFAULT_TIMEOUT_MS, retries = DEFAULT_RETRIES) {
  let attempt = 0
  while (attempt <= retries) {
    try {
      const res = await fetchWithTimeout(url, timeoutMs)
      return { ok: res.ok, status: res.status, headers: Object.fromEntries(res.headers.entries()) }
    } catch (err) {
      attempt++
      if (attempt > retries) return { ok: false, error: String(err) }
      // exponential backoff
      await sleep(100 * Math.pow(2, attempt))
    }
  }
}

async function run(ids, baseUrl, options = {}) {
  const concurrency = options.concurrency || DEFAULT_CONCURRENCY
  const results = []

  const queue = ids.slice()
  const workers = Array.from({ length: concurrency }).map(async () => {
    while (queue.length > 0) {
      const id = queue.shift()
      if (!id) break
      const url = `${baseUrl.replace(/\/$/, '')}/embed/${encodeURIComponent(id)}/prayer-times`
      const res = await warmUrl(url, options.timeoutMs || DEFAULT_TIMEOUT_MS, options.retries || DEFAULT_RETRIES)
      results.push({ id, url, result: res })
      console.log(`Warmed ${id}:`, res.status || res.error || res)
    }
  })

  await Promise.all(workers)
  return results
}

function parseArgs() {
  const argv = process.argv.slice(2)
  const out = {}
  argv.forEach(arg => {
    if (arg.startsWith('--')) {
      const [k, v] = arg.slice(2).split('=')
      out[k] = v !== undefined ? v : true
    }
  })
  return out
}

async function main() {
  const args = parseArgs()
  const baseUrl = args.baseUrl || process.env.PREBUILD_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mylocalmasjid.com'
  const idsArg = args.ids || process.env.PREBUILD_MASJID_IDS || ''
  const ids = typeof idsArg === 'string' && idsArg.length ? idsArg.split(',').map(s => s.trim()).filter(Boolean) : []

  if (ids.length === 0) {
    console.error('No masjid ids provided. Use --ids=id1,id2 or set PREBUILD_MASJID_IDS env var')
    process.exit(2)
  }

  console.log(`Starting prebuild for ${ids.length} masjid(s) against ${baseUrl}`)
  const results = await run(ids, baseUrl, { concurrency: Number(args.concurrency) || DEFAULT_CONCURRENCY, timeoutMs: Number(args.timeoutMs) || DEFAULT_TIMEOUT_MS, retries: Number(args.retries) || DEFAULT_RETRIES })

  const failed = results.filter(r => !r.result.ok)
  console.log(`Prebuild complete. ${results.length - failed.length} succeeded, ${failed.length} failed`)
  if (failed.length > 0) {
    console.error('Failures:', failed)
    process.exit(1)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})



