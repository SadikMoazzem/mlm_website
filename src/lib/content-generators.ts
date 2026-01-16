import { MasjidData } from "@/types/api";

/**
 * Generate "About" section content
 */
export function generateAboutContent(masjid: MasjidData): string {
  const name = masjid.name;
  const city = masjid.location?.city || "your area";
  const area = masjid.location?.full_address
    ? masjid.location.full_address.split(",")[0]
    : "";

  return `${name} is an Islamic place of worship located in ${area ? `${area}, ` : ""}${city}. The masjid provides daily prayer services including Fajr, Dhuhr, Asr, Maghrib, and Isha prayers with congregation (jamaat) times available.`;
}

/**
 * Generate "Prayer Times" section content
 */
export function generatePrayerTimesContent(masjid: MasjidData): string | null {
  if (!masjid.current_prayer_times) return null;

  const name = masjid.name;

  return `Find today's prayer times at ${name}. The masjid offers five daily prayers with both start times and jamaat (congregation) times. Prayer times are updated regularly to ensure accuracy throughout the year.`;
}

/**
 * Generate "Facilities" section content
 */
export function generateFacilitiesContent(masjid: MasjidData): string | null {
  const facilities = masjid.facilities?.filter((f) => f.status === "open");
  if (!facilities || facilities.length === 0) return null;

  const name = masjid.name;
  const facilityNames = facilities.map((f) => f.name.toLowerCase());

  return `${name} offers various facilities for worshippers including ${facilityNames.join(", ")}.`;
}

/**
 * Generate "Getting There" section content
 */
export function generateGettingThereContent(masjid: MasjidData): string | null {
  if (!masjid.location?.full_address) return null;

  const name = masjid.name;
  const address = masjid.location.full_address;
  const city = masjid.location.city || "";

  return `${name} is located at ${address}. The masjid serves the local Muslim community in ${city} and surrounding areas.`;
}
