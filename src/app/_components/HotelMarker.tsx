import type { Hotel } from '@/types/api'
import { AdvancedMarker } from '@vis.gl/react-google-maps'

type HotelMarkerProps = {
  hotel: { hotel: Hotel }
  isSelected: boolean
  onSelect: (hotelNo: number) => void
}

export function HotelMarker({ hotel, isSelected, onSelect }: HotelMarkerProps) {
  const hotelInfo = hotel.hotel[0].hotelBasicInfo

  return (
    <AdvancedMarker
      position={{
        lat: hotelInfo.latitude || 0,
        lng: hotelInfo.longitude || 0,
      }}
      onClick={() => onSelect(hotelInfo.hotelNo)}
    >
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transform transition-all duration-200 ${
            isSelected
              ? 'bg-primary scale-125 shadow-xl'
              : 'bg-blue-500 hover:scale-110'
          }`}
        >
          <span className="icon-[hugeicons--hotel-01] text-white text-lg" />
        </div>
      </div>
    </AdvancedMarker>
  )
}
