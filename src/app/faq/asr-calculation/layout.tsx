import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asr Time: Standard vs Hanafi - MyLocalMasjid',
  description: 'Understanding the difference between Standard and Hanafi Asr prayer time calculations and which one to choose.',
  openGraph: {
    title: 'Asr Time: Standard vs Hanafi',
    description: 'Learn why Asr prayer time differs between calculation methods.',
    type: 'article',
  },
};

export default function AsrCalculationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
