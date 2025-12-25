import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Widgets Not Updating - MyLocalMasjid',
  description: 'Troubleshooting guide for iOS and Android widget issues. Fix prayer times widgets that are stuck or not refreshing.',
  openGraph: {
    title: 'Widgets Not Updating',
    description: 'How to fix widget issues on iOS and Android.',
    type: 'article',
  },
};

export default function WidgetsNotUpdatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
