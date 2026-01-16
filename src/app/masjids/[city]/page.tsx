/**
 * @deprecated This route is deprecated and redirects to /location/[city]
 *
 * The redirect is configured in next.config.ts:
 * /masjids/:city → /location/:city (301 permanent)
 *
 * This file is kept for reference and will be removed in a future cleanup.
 * All new links should use /location/[slug] directly.
 *
 * @see src/app/location/[slug]/page.tsx - The new unified location page
 */

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Users, ChevronRight, Building2 } from "lucide-react";
import { cities } from "@/data/cities";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city: cityId } = await params;
  const city = cities.find((c) => c.id === cityId);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  // Calculate total masjids across all areas
  const totalMasjids = city.areas.reduce(
    (sum, area) => sum + area.masjid_count,
    0,
  );

  return {
    title: `Masjids in ${city.name} - Find Prayer Times & Islamic Centers`,
    description: `Find ${totalMasjids}+ masjids and Islamic centers across ${city.areas.length} areas in ${city.name}. Get prayer times, jamaat times, facilities info and directions.`,
    keywords: [
      // Primary location keywords
      `masjids in ${city.name}`,
      `mosques in ${city.name}`,
      `${city.name} mosques`,
      `${city.name} masjids`,

      // Prayer times keywords (high search volume)
      `prayer times ${city.name}`,
      `${city.name} prayer times`,
      `jamaat times ${city.name}`,
      `salah times ${city.name}`,

      // All area names (from cities.ts areas)
      ...city.areas.map((area) => `masjids ${area.name}`),
      ...city.areas.map((area) => `mosques ${area.name}`),
      ...city.areas.map((area) => `${area.name} prayer times`),

      // Near me variations
      `masjids near ${city.name}`,
      `mosques near me ${city.name}`,
      `nearest mosque ${city.name}`,

      // Islamic center variations
      `islamic centers ${city.name}`,
      `muslim community ${city.name}`,
    ],
    openGraph: {
      title: `Masjids in ${city.name}`,
      description: `Find masjids and prayer times in ${city.name}`,
      type: "website",
    },
    alternates: {
      canonical: `/masjids/${cityId}`,
    },
  };
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.id,
  }));
}

// Revalidate city pages weekly (7 days = 604800 seconds)
export const revalidate = 604800;

export default async function CityPage({ params }: CityPageProps) {
  const { city: cityId } = await params;
  const city = cities.find((c) => c.id === cityId);

  if (!city) {
    notFound();
  }

  // Calculate total masjids from area counts
  const totalMasjids = city.areas.reduce(
    (sum, area) => sum + area.masjid_count,
    0,
  );

  // Generate breadcrumb schema
  const breadcrumbData = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Masjids", url: "/masjids" },
    { name: city.name, url: `/masjids/${city.id}` },
  ]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <Link
              href="/masjids"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Find Masjids
            </Link>
            <ChevronRight className="w-4 h-4 text-text-muted" />
            <span className="text-text-primary font-medium">{city.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
              <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-4 tracking-tight">
              Masjids in {city.name}
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Explore Islamic centers and masjids across different areas in{" "}
              {city.name}, {city.country}. Find prayer times, facilities, and
              connect with your local community.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-bg-card rounded-2xl p-4 shadow-sm border border-[var(--border)] mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>{city.areas.length} Areas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>{totalMasjids}+ Masjids</span>
              </div>
            </div>
          </div>

          {/* Areas Grid */}
          <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
            <h3 className="font-medium text-text-primary mb-6 text-center">
              Browse Areas in {city.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {city.areas.map((area) => (
                <AreaCard
                  key={area.name}
                  area={area}
                  cityId={city.id}
                  cityName={city.name}
                />
              ))}
            </div>
          </div>

          {/* Coming Soon CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">
              More Areas Coming Soon
            </h3>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              We&apos;re continuously expanding our coverage. Don&apos;t see
              your area listed? Help us grow by adding your local masjid.
            </p>
            <Link
              href="/add-masjid"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
            >
              Add Your Masjid
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AreaCardProps {
  area: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  cityId: string;
  cityName: string;
}

function AreaCard({ area, cityId }: AreaCardProps) {
  return (
    <Link
      href={`/masjids/${cityId}/${area.id}`}
      className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {area.name}
          </p>
          <p className="text-sm text-text-muted truncate">
            View masjids
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0" />
    </Link>
  );
}
