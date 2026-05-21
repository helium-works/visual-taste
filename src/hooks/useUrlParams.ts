import { useMemo } from 'react'

export interface BrandParams {
  font: string
  primary: string
  secondary: string
  client: string
  isValid: boolean
  missingParams: string[]
}

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

    const font = params.get('font') || p.get('font') || ''
    const primary = params.get('primary') || p.get('primary') || ''
    const secondary = params.get('secondary') || p.get('secondary') || ''
    const client = params.get('client') || p.get('client') || ''

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
