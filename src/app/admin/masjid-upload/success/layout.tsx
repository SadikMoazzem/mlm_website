import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submission Successful - MyLocalMasjid',
  description: 'Thank you for your submission. Your masjid information has been received successfully.',
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

