'use client'
import { hotelsAtom, selectedHotelAtom } from '@/atoms'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useDragScroll } from '@/hooks/useDragScroll'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useAtom } from 'jotai'
import { MainMap } from './_components/MainMap'

export default function Home() {
  const [hotels] = useAtom(hotelsAtom)
  const [selectedHotel] = useAtom(selectedHotelAtom)
  const dragProps = useDragScroll({ direction: 'horizontal' })
  const isSelected = (hotelNo: number) => {
    return selectedHotel === hotelNo
  }
  return (
    <main className="relative h-full overflow-hidden">
      <div className="w-full absolute bottom-1 left-1 z-10">
        <ScrollArea
          ref={dragProps.scrollRef}
          className="whitespace-nowrap"
          onMouseDown={dragProps.onMouseDown}
          style={dragProps.style}
        >
          <div className="flex space-x-4 p-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.hotel[0].hotelBasicInfo.hotelNo}
                className={`flex w-100 bg-white rounded-lg shadow-md overflow-hidden border-3
                  ${
                    isSelected(hotel.hotel[0].hotelBasicInfo.hotelNo)
                      ? 'border-primary'
                      : ''
                  }`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={
                      hotel.hotel[0].hotelBasicInfo.hotelImageUrl ||
                      'https://picsum.photos/240/160'
                    }
                    className="w-30 h-full object-cover select-none"
                    draggable={false}
                    alt={
                      hotel.hotel[0].hotelBasicInfo.hotelName || 'Hotel Image'
                    }
                  />
                </div>
                <div className="p-3">
                  <div className="text-base font-bold">
                    {hotel.hotel[0].hotelBasicInfo.hotelName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {hotel.hotel[0].hotelBasicInfo.address1}
                    {hotel.hotel[0].hotelBasicInfo.address2}
                  </div>
                  <ul className="text-xs mt-1 flex items-center gap-2">
                    <li className="icon-[ic--round-star] text-primary text-xl" />
                  </ul>
                  <ul className="text-xs mt-1 flex items-center gap-2">
                    <li className="flex items-center justify-center rounded-full bg-primary text-white w-7 h-7 p-1 box-border">
                      <span className="icon-[hugeicons--baby-bed-01] text-xl font-bold" />
                    </li>
                  </ul>
                </div>
              </div>
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
