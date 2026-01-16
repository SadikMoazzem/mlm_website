import type { Metadata } from 'next';

/**
 * Metadata for the Add Masjid page
 */
export const metadata: Metadata = {
  title: 'Add a Masjid | My Local Masjid',
  description: 'Help grow our community by adding your local masjid or prayer hall to our map. Share details about prayer times, location, and facilities.',
  keywords: [
    'add masjid',
    'submit masjid',
    'new masjid',
    'prayer hall',
    'islamic centre',
    'community contribution',
  ],
  openGraph: {
    title: 'Add a Masjid | My Local Masjid',
    description: 'Help grow our community by adding your local masjid or prayer hall to our map.',
    type: 'website',
  },
};

/**
 * Layout for the Add Masjid flow
 */
export default function AddMasjidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
