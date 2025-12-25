import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'London Fajr Times Explained - MyLocalMasjid',
  description: 'Understanding why Fajr times may differ between London masjids and how to pray together as one community using the London Unified Prayer Timetable.',
  openGraph: {
    title: 'London Fajr Times Explained',
    description: 'Why Fajr times differ in London and how to stay in sync with your community.',
    type: 'article',
  },
};

export default function LondonFajrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
