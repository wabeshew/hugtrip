import { hotelsAtom } from '@/atoms'
import type { ApiError, RakutenHotelResponse } from '@/types/api'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

export function useHotelData() {
  const [hotels, setHotels] = useAtom(hotelsAtom)

  const fetchHotelsData = useCallback(
    async (lat: number, lng: number): Promise<RakutenHotelResponse | null> => {
      if (lat === 0 && lng === 0) return null

      try {
        const response = await fetch(
          `/api/rakuten?latitude=${lat}&longitude=${lng}`,
        )
        if (!response.ok) {
          const errorData: ApiError = await response.json()
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`,
          )
        }
        const data: RakutenHotelResponse = await response.json()

        if (data.hotels && data.hotels.length > 0) {
          setHotels(data.hotels)
          console.log(`Found ${data.hotels.length} hotels.`)
          console.log('Hotels:', data)
        } else {
          console.log('No hotels found near this location.')
        }

        return data
      } catch (error) {
        console.error('Failed to fetch hotels:', error)
        return null
      }
    },
    [setHotels],
  )

  return {
    hotels,
    fetchHotelsData,
  }
}
