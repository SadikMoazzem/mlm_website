import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer Notifications Not Working - MyLocalMasjid',
  description: 'Troubleshooting guide to fix prayer time notification issues on iOS and Android devices.',
  openGraph: {
    title: 'Prayer Notifications Not Working',
    description: 'Step-by-step guide to fix notification issues.',
    type: 'article',
  },
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
