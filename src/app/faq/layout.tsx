import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - MyLocalMasjid',
  description: 'Frequently asked questions about MyLocalMasjid, prayer times, and Islamic practices.',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
