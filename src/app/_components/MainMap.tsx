'use client'
import { hotelsAtom, selectedHotelAtom } from '@/atoms'
import type { ApiError, RakutenHotelResponse } from '@/types/api'
import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
} from '@vis.gl/react-google-maps'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'

export function MainMap() {
  const [hotel, setHotels] = useAtom(hotelsAtom)
  const [, setSelectedHotel] = useAtom(selectedHotelAtom)
  const map = useMap()
  const [mapCenter, setMapCenter] = useState({ lat: 35.6762, lng: 139.6503 })
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''

  const handleIdle = useCallback(() => {
    console.log('🚀 ~ handleIdle ~ handleIdle')

    if (map) {
      const center = map.getCenter()
      if (center) {
        const newCenter = {
          lat: center.lat(),
          lng: center.lng(),
        }
        setMapCenter(newCenter)
        void fetchHotelsData(newCenter.lat, newCenter.lng)
      }
    }
  }, [map])

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

  return (
    <GoogleMap
      defaultCenter={{ lat: 35.6762, lng: 139.6503 }}
      defaultZoom={10}
      mapId={mapId}
      className="h-full w-full"
      onIdle={handleIdle}
    >
      {hotel.map((h) => (
        <AdvancedMarker
          key={h.hotel[0].hotelBasicInfo.hotelNo}
          position={{
            lat: h.hotel[0].hotelBasicInfo.latitude || 0,
            lng: h.hotel[0].hotelBasicInfo.longitude || 0,
          }}
          onClick={() => {
            setSelectedHotel(h.hotel[0].hotelBasicInfo.hotelNo)
          }}
        />
      ))}
    </GoogleMap>
  )
}
