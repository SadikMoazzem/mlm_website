import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import StoreButton from '@/components/elements/StoreButton'
import EmbedSelector from '@/components/EmbedSelector'

export const metadata: Metadata = {
  title: 'How we integrate — Free websites & embeddable widgets | MyLocalMasjid',
  description:
    'We give masjids a free website or embeddable widgets that update automatically from your admin. Manage prayer times, Jummah, events and announcements — we help with integration.',
}

export default function HowWeIntegratePage() {
  const demoUrl = 'https://masjid-demo.mylocalmasjid.com'
  const demoMasjidId = '6a75d794-ce79-405f-922d-c28197f57098'

  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MyLocalMasjid',
            url: 'https://mylocalmasjid.com',
            sameAs: ['https://twitter.com/mlmasjid', 'https://www.instagram.com/mylocalmasjidapp'],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '',
                contactType: 'Customer Support',
                email: 'info@mylocalmasjid.com',
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4">
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 px-3 py-1 text-sm font-semibold">
            Free for all masjids
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Easy integration for <span className="text-primary-600">your Masjid</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Choose a simple website or add our lightweight widgets — updates are managed from your admin and appear across app, website and screens instantly.
        </p>
        {/* hero CTAs removed per request */}
      </section>

      {/* Why this matters - slim */}
      <section className="mb-10">
        <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-primary-50 to-white p-4 ring-1 ring-primary-100">
          <div className="flex items-start gap-4">
            {/* Happy face SVG */}
            <svg className="h-8 w-8 text-primary-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <path d="M8 15c1 1 3 1 4 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
            <div>
              <div className="text-sm font-semibold text-primary-700">Why this matters</div>
              <div className="mt-1 text-gray-700 text-sm">
                Worshippers — from local regulars to travellers — should always be connected to their masjid. We make it effortless for masjids to share prayer times, Jummah updates, and events so communities stay informed and engaged.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-white rounded-3xl ring-1 ring-primary-50 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200 overflow-hidden">
          <h2 className="text-2xl font-semibold mb-3">We give your masjid a website</h2>
          <p className="text-gray-700 mb-3">
            A simple, easy, fast website covering your masjid’s digital needs. We can build a bespoke site on request and deploy into your system or host it only if you ask. Always <span className="text-primary-600 font-semibold">free</span>.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Automatic prayer times & jamaat schedule</li>
            <li>Jummah & event pages</li>
            <li>Announcements and contact info</li>
          </ul>
          <div className="mt-4">
            <a href="/solutions/website" aria-label="Learn more about Masjid websites" className="text-sm font-semibold text-primary-600 underline inline-flex items-center gap-2">
              Learn more about Masjid websites
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-3">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white px-5 py-2.5 font-semibold shadow hover:from-primary-700 hover:to-primary-600 transition"
              >
                View example
              </a>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-3xl ring-1 ring-primary-50 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200 overflow-hidden">
          <h2 className="text-2xl font-semibold mb-3">We integrate with your site</h2>
          <p className="text-gray-700 mb-3">
            Add lightweight script snippets or an iframe to your site — quick to install and fully synced with your admin. No extra work for your team.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Lightweight script or iframe</li>
            <li>Live updates from your system</li>
          </ul>
          <div className="mt-4">
            <a href="/solutions/website#embed" aria-label="Learn more about embedding widgets" className="text-sm font-semibold text-primary-600 underline inline-flex items-center gap-2">
              Learn more about embedding widgets
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* App & Masjid Screen sections */}
      <section className="mb-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-white rounded-3xl ring-1 ring-primary-50 shadow-lg overflow-hidden">
            <h2 className="text-2xl font-semibold mb-3">We give the MLM App — for locals & travellers</h2>
            <p className="text-gray-700 mb-3">
              The app keeps worshippers connected to their masjid — locally or on the move. It's privacy-first and kept simple.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
              <li>Nearby masjids & live jamaat times</li>
              <li>Real-time prayer notifications</li>
              <li>Lightweight widgets and offline support</li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <StoreButton store="AppStore" href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734" width={140} height={44} />
              <StoreButton store="GooglePlay" href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid" width={140} height={44} />
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl ring-1 ring-primary-50 shadow-lg overflow-hidden">
            <h2 className="text-2xl font-semibold mb-3">We give a Masjid Screen — for in-masjid displays</h2>
            <p className="text-gray-700 mb-3">
              A simple display solution to show prayer times, announcements and events inside the masjid.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
              <li>Full-screen prayer times layout</li>
              <li>Announcements & event rotation</li>
              <li>Plug-and-play iframe option for displays</li>
            </ul>
            <a href="/solutions/website#embed" className="text-primary-600 font-semibold inline-flex items-center gap-2">
              Learn more about masjid screens <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-2 text-sm text-yellow-600 font-semibold">Coming soon</div>
          </div>
        </div>
      </section>

      {/* Admin features */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-3">Admin access — simple control</h3>
        <p className="text-gray-700 mb-4">
          We give your team an admin panel so you can update prayer times, change Jummah details, post events and announcements. All content is live — updates made in your admin panel immediately reflect on your website, in the mobile app, and on any masjid screens.
        </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded bg-gradient-to-r from-white to-primary-50 border-l-4 border-primary-100 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition">
            <strong className="text-primary-700">Prayer times</strong>
            <div className="text-sm text-gray-600">Accurate, automatic or manual overrides for special days.</div>
              
          </div>
          <div className="p-4 rounded bg-gradient-to-r from-white to-primary-50 border-l-4 border-primary-100 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition">
            <strong className="text-primary-700">Jummah & events</strong>
            <div className="text-sm text-gray-600">Create event pages, set congregation times, and share details.</div>
              
          </div>
          <div className="p-4 rounded bg-gradient-to-r from-white to-primary-50 border-l-4 border-primary-100 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition">
            <strong className="text-primary-700">Announcements</strong>
            <div className="text-sm text-gray-600">Post notices that appear on the website, app, and screens.</div>
              
          </div>
        </div>
      </section>

      {/* Integration examples & demo */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Integration examples</h3>
        <p className="text-gray-700 mb-4">
          Below are a few ways we integrate. Use the demo link or the demo masjid id to preview how each option looks.
        </p>

          <div className="space-y-6">
          <div>
            <EmbedSelector baseUrl="https://mylocalmasjid.com" masjidId={demoMasjidId} />
          </div>
        </div>
      </section>

      {/* Support & contact */}
      <section id="contact" className="mb-16 border-t pt-8">
        <h3 className="text-2xl font-semibold mb-3">We’ll help you get set up — for free</h3>
        <p className="text-gray-700 mb-4">
          Integration is easy and we provide support. If you’d like us to create a website for your masjid or add our widgets to your site, we’ll work with your team.
        </p>
        <div className="flex gap-4">
          <a
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 font-semibold shadow-2xl hover:from-primary-700 hover:to-primary-600 transform hover:-translate-y-0.5 transition"
            aria-label="Request a website"
          >
            Request a website
          </a>
          <a
            href="mailto:hello@mylocalmasjid.com?subject=Help%20with%20Masjid%20Integration"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 text-primary-600 px-6 py-3 font-semibold bg-white shadow hover:bg-primary-50 transition"
            aria-label="Email us"
          >
            Email us
          </a>
        </div>
      </section>
    </main>
  )
}


