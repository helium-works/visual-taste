import { useMemo } from 'react'

export interface BrandParams {
  font: string
  primary: string
  secondary: string
  client: string
  isValid: boolean
  missingParams: string[]
}

const isHex = (s: string) => /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(s)
const isFontName = (s: string) => /^[A-Za-z0-9 +\-]{1,50}$/.test(s)

export function useUrlParams(): BrandParams {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)

    // HashRouter puts params after the hash, try both
    let searchString = window.location.search
    if (!searchString && window.location.hash) {
      const hashParts = window.location.hash.split('?')
      if (hashParts.length > 1) searchString = '?' + hashParts[1]
    }

    const p = new URLSearchParams(searchString.replace(/^\?/, ''))

    const rawFont = params.get('font') || p.get('font') || ''
    const rawPrimary = params.get('primary') || p.get('primary') || ''
    const rawSecondary = params.get('secondary') || p.get('secondary') || ''
    const rawClient = params.get('client') || p.get('client') || ''

    const font = isFontName(rawFont) ? rawFont : ''
    const primary = isHex(rawPrimary.replace('#', '')) ? rawPrimary.replace('#', '') : ''
    const secondary = isHex(rawSecondary.replace('#', '')) ? rawSecondary.replace('#', '') : ''
    const client = rawClient.slice(0, 100)

    const missingParams: string[] = []
    if (!font) missingParams.push('font')
    if (!primary) missingParams.push('primary')
    if (!secondary) missingParams.push('secondary')
    if (!client) missingParams.push('client')

    return {
      font: font || 'DM Sans',
      primary: primary || '121012',
      secondary: secondary || 'c6e6c0',
      client: client || 'Friend',
      isValid: missingParams.length === 0,
      missingParams,
    }
  }, [])
}
