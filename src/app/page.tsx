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
} from '@vis.gl/react-google-maps'

export default function Home() {
  const dragProps = useDragScroll({ direction: 'horizontal' })

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
      <APIProvider apiKey={''}>
        <GoogleMap
          defaultCenter={{ lat: 35.6762, lng: 139.6503 }}
          defaultZoom={10}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''}
          className="h-full w-full"
        >
          <AdvancedMarker position={{ lat: 35.6762, lng: 139.6503 }} />
        </GoogleMap>
      </APIProvider>
    </main>
  )
}
