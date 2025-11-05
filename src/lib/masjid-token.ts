/**
 * Masjid Upload Token Utility
 * Handles creation and verification of secure tokens for masjid upload access
 */

import crypto from 'crypto'

/**
 * Create a secure token for masjid upload access
 * @param masjidId - The masjid ID to create token for
 * @returns Base64 encoded token containing payload and hash
 */
export function createMasjidToken(masjidId: string): string {
  const secret = process.env.MASJID_UPLOAD_SECRET
  
  if (!secret) {
    throw new Error('MASJID_UPLOAD_SECRET environment variable is required')
  }
  
  const payload = `MasjidSubmissionForMasjidID:${masjidId}`
  const combined = `${payload}:${secret}`
  const hash = crypto.createHash('sha256').update(combined).digest('hex')
  
  // Return base64 encoded payload + hash
  const token = Buffer.from(`${payload}:${hash}`).toString('base64')
  return token
}

/**
 * Verify a masjid upload token
 * @param token - The token to verify
 * @param masjidId - The masjid ID to verify against
 * @returns True if token is valid, false otherwise
 */
export function verifyMasjidToken(token: string, masjidId: string): boolean {
  try {
    const secret = process.env.MASJID_UPLOAD_SECRET
    
    if (!secret) {
      return false
    }
    
    // Decode base64 token
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    
    // Split by the last colon to separate payload and hash
    const lastColonIndex = decoded.lastIndexOf(':')
    if (lastColonIndex === -1) {
      return false
    }
    
    const payload = decoded.substring(0, lastColonIndex)
    const hash = decoded.substring(lastColonIndex + 1)
    
    // Check if payload matches expected format
    if (!payload.startsWith('MasjidSubmissionForMasjidID:')) {
      return false
    }
    
    // Extract masjid ID from payload
    const tokenMasjidId = payload.split(':')[1]
    if (tokenMasjidId !== masjidId) {
      return false
    }
    
    // Verify hash
    const expectedHash = crypto.createHash('sha256').update(`${payload}:${secret}`).digest('hex')
    if (hash !== expectedHash) {
      return false
    }
    
    return true
  } catch (error) {
    return false
  }
}
