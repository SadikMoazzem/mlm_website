import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Data Collection - MyLocalMasjid',
  description: 'Learn how MyLocalMasjid protects your privacy. We don\'t store your location, collect minimal data, and give you full control.',
  openGraph: {
    title: 'Privacy & Data Collection',
    description: 'How we protect your privacy and what data the app uses.',
    type: 'article',
  },
};

export default function PrivacyFAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
