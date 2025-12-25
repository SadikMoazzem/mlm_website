import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qibla Compass Calibration - MyLocalMasjid',
  description: 'Learn how to calibrate your phone compass for accurate Qibla direction. Understand accuracy levels and troubleshoot common issues.',
  openGraph: {
    title: 'Qibla Compass Calibration',
    description: 'How to calibrate your compass for accurate Qibla direction.',
    type: 'article',
  },
};

export default function CompassCalibrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
