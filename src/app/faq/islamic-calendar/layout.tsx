import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Calendar & Fasting Days - MyLocalMasjid',
  description: 'Understanding the Hijri calendar, when the Islamic day changes at Maghrib, and recommended Sunnah fasting days like Ayyam al-Bid and Ashura.',
  openGraph: {
    title: 'Islamic Calendar & Fasting Days',
    description: 'Learn about the Hijri calendar and recommended fasting days.',
    type: 'article',
  },
};

export default function IslamicCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
