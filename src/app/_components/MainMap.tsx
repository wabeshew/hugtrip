'use client'
import { selectedHotelAtom } from '@/atoms'
import { Map as GoogleMap, useMap } from '@vis.gl/react-google-maps'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { HotelMarker } from './HotelMarker'
import { useHotelData } from './hooks/useHotelData'

export function MainMap() {
  const { hotels, fetchHotelsData } = useHotelData()
  const [selectedHotel, setSelectedHotel] = useAtom(selectedHotelAtom)
  const map = useMap()
  const [mapCenter, setMapCenter] = useState({ lat: 35.6762, lng: 139.6503 })
  const [isProgrammaticPan, setIsProgrammaticPan] = useState(false)
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''

  const handleIdle = useCallback(() => {
    console.log('🚀 ~ handleIdle ~ handleIdle')

    // プログラムによるパンの場合はAPI通信をスキップ
    if (isProgrammaticPan) {
      setIsProgrammaticPan(false)
      return
    }

    if (map) {
      const zoom = map.getZoom()
      console.log('🚀 ~ handleIdle ~ zoom:', zoom)
      if (zoom && zoom < 15) {
        return
      }

      const center = map.getCenter()
      if (center) {
        const newCenter = {
          lat: center.lat(),
          lng: center.lng(),
        }
        setMapCenter(newCenter)
        fetchHotelsData(newCenter.lat, newCenter.lng)
      }
    }
  }, [map, fetchHotelsData, isProgrammaticPan])

  // selectedHotelが変更されたときに、そのホテルの座標をmapCenterにセット
  useEffect(() => {
    if (selectedHotel && hotels.length > 0) {
      const selectedHotelData = hotels.find(
        (hotel) => hotel.hotel[0].hotelBasicInfo.hotelNo === selectedHotel,
      )

      if (selectedHotelData) {
        const hotelLocation = {
          lat: selectedHotelData.hotel[0].hotelBasicInfo.latitude || 35.6762,
          lng: selectedHotelData.hotel[0].hotelBasicInfo.longitude || 139.6503,
        }

        // パン操作前にフラグを設定
        setIsProgrammaticPan(true)

        // マップの中心を選択されたホテルの位置に移動
        if (map) {
          map.panTo(hotelLocation)
        }
      }
    }
  }, [selectedHotel, hotels, map])

  return (
    <GoogleMap
      defaultCenter={{ lat: 35.6762, lng: 139.6503 }}
      defaultZoom={10}
      mapId={mapId}
      className="h-full w-full"
      onIdle={handleIdle}
    >
      {hotels.map((hotel) => (
        <HotelMarker
          key={hotel.hotel[0].hotelBasicInfo.hotelNo}
          hotel={hotel}
          isSelected={selectedHotel === hotel.hotel[0].hotelBasicInfo.hotelNo}
          onSelect={setSelectedHotel}
        />
      ))}
    </GoogleMap>
  )
}
