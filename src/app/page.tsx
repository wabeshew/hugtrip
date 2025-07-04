'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useDragScroll } from '@/hooks/useDragScroll'
import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useRef, useState } from 'react'

async function fetchRakutenHotels(latitude: number, longitude: number) {
  const applicationId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID || "YOUR_RAKUTEN_APP_ID_PLACEHOLDER";
  const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&latitude=${latitude}&longitude=${longitude}&searchRadius=1&datumType=1&applicationId=${applicationId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching hotels: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched hotel data:', data);
    if (data.hotels && data.hotels.length > 0) {
      console.log(`Found ${data.hotels.length} hotels.`);
    } else {
      console.log('No hotels found near this location.');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch Rakuten hotels:', error);
    // Depending on how you want to handle errors, you might re-throw or return a specific error object
    throw error;
  }
}

export default function Home() {
  const dragProps = useDragScroll({ direction: 'horizontal' })
  const defaultCenter = { lat: 35.6762, lng: 139.6503 }
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleCameraChange = useCallback((event: MapCameraChangedEvent) => {
    const newCenter = event.detail.center
    setMapCenter(newCenter)
  }, [])

  console.log('mapCenter', mapCenter)

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    debounceTimeoutRef.current = setTimeout(() => {
      if (mapCenter.lat !== 0 && mapCenter.lng !== 0) {
        fetchRakutenHotels(mapCenter.lat, mapCenter.lng)
      }
    }, 500)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [mapCenter])

  const works = [
    { id: 1, title: 'Artwork 1', address: 'Tokyo, Japan' },
    { id: 2, title: 'Artwork 2', address: 'Tokyo, Japan' },
    { id: 3, title: 'Artwork 3', address: 'Tokyo, Japan' },
    { id: 4, title: 'Artwork 4', address: 'Tokyo, Japan' },
    { id: 5, title: 'Artwork 5', address: 'Tokyo, Japan' },
    { id: 6, title: 'Artwork 6', address: 'Tokyo, Japan' },
    { id: 7, title: 'Artwork 7', address: 'Tokyo, Japan' },
    { id: 8, title: 'Artwork 8', address: 'Tokyo, Japan' },
    { id: 9, title: 'Artwork 9', address: 'Tokyo, Japan' },
    { id: 10, title: 'Artwork 10', address: 'Tokyo, Japan' },
  ]
  return (
    <main className="relative h-full overflow-hidden">
      <div className="w-full absolute top-1 left-1 z-10">
        <ScrollArea
          ref={dragProps.scrollRef}
          className="whitespace-nowrap"
          onMouseDown={dragProps.onMouseDown}
          style={dragProps.style}
        >
          <div className="flex space-x-4 p-4">
            {works.map((artwork) => (
              <div
                key={artwork.id}
                className="w-64 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div>
                  <img
                    src={`https://picsum.photos/240/160?random=${artwork.id}`}
                    className="w-full h-40 object-cover "
                    alt={artwork.title}
                  />
                </div>
                <div className="p-4">
                  <div>{artwork.title}</div>
                  <div>{artwork.address}</div>
                  <ul>
                    <li>アイコンがきます</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          defaultCenter={defaultCenter}
          defaultZoom={10}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''}
          className="h-full w-full"
          onCameraChanged={handleCameraChange}
        >
          <AdvancedMarker position={{ lat: 35.6762, lng: 139.6503 }} />
        </GoogleMap>
      </APIProvider>
    </main>
  )
}
