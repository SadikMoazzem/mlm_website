import { Metadata } from 'next'
import { metadata as siteMetadata } from './metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return siteMetadata
} 