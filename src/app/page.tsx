'use client'
import { hotelsAtom, selectedHotelAtom } from '@/atoms'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useDragScroll } from '@/hooks/useDragScroll'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useAtom } from 'jotai'
import { HotelCard } from './_components/HotelCard'
import { MainMap } from './_components/MainMap'

export default function Home() {
  const [hotels] = useAtom(hotelsAtom)
  const [selectedHotel, setSelectedHotel] = useAtom(selectedHotelAtom)
  const dragProps = useDragScroll({ direction: 'horizontal' })
  const isSelected = (hotelNo: number) => {
    return selectedHotel === hotelNo
  }
  return (
    <main className="relative h-full overflow-hidden">
      <div className="w-full absolute bottom-1 md:left-1 z-10">
        <ScrollArea
          ref={dragProps.scrollRef}
          className="whitespace-nowrap"
          onMouseDown={dragProps.onMouseDown}
          style={dragProps.style}
        >
          <div className="flex space-x-3 p-5">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.hotel[0].hotelBasicInfo.hotelNo}
                hotel={hotel}
                isSelected={isSelected(hotel.hotel[0].hotelBasicInfo.hotelNo)}
                onSelect={setSelectedHotel}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
      <APIProvider apiKey="">
        <MainMap />
      </APIProvider>
    </main>
  )
}
