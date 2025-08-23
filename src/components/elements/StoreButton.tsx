'use client'

import Image from 'next/image'
import Link from 'next/link'

interface StoreButtonProps {
  store: 'AppStore' | 'GooglePlay';
  href?: string;
  width?: number;
  height?: number;
  className?: string;
}

const StoreButton: React.FC<StoreButtonProps> = ({
  store,
  href,
  width = 135,
  height = 40,
  className = '',
}) => {
  const appStoreSvg = '/Store=App Store, Type=Light, Language=English.svg';
  const googlePlaySvg = '/Store=Google Play, Type=Light, Language=English.svg';

  if (store === 'AppStore') {
    if (!href) {
      console.warn('StoreButton: href prop is required for AppStore type.');
      return null; // Or some fallback UI
    }
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center transition-all hover:shadow-md ${className}`}
      >
        <Image
          src={appStoreSvg}
          alt="Download on the App Store"
          width={width}
          height={height}
          style={{ objectFit: 'contain' }}
          priority // Good for LCP elements if they are above the fold
        />
      </Link>
    );
  }

  if (store === 'GooglePlay') {
    if (!href) {
      console.warn('StoreButton: href prop is required for GooglePlay type.');
      return null; // Or some fallback UI
    }
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center transition-all hover:shadow-md ${className}`}
      >
        <Image
          src={googlePlaySvg}
          alt="Get it on Google Play"
          width={width}
          height={height}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>
    );
  }

  return null; // Should not happen if store prop is correctly typed
};

export default StoreButton; 