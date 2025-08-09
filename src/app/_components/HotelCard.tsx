import type { Hotel } from '@/types/api'

type HotelCardProps = {
  hotel: { hotel: Hotel }
  isSelected: boolean
  onSelect: (hotelNo: number) => void
}

export function HotelCard({ hotel, isSelected, onSelect }: HotelCardProps) {
  const hotelInfo = hotel.hotel[0].hotelBasicInfo

  return (
    <button
      type="button"
      className={`flex h-30 w-[calc(100vw-2.5rem)] bg-white rounded-lg shadow-md overflow-hidden border-3 cursor-pointer hover:shadow-lg transition-shadow md:w-100 ${
        isSelected ? 'border-primary' : ''
      }`}
      onClick={() => onSelect(hotelInfo.hotelNo)}
      aria-label={`ホテル${hotelInfo.hotelName}を選択`}
    >
      <div className="flex-shrink-0">
        <img
          src={hotelInfo.hotelImageUrl || 'https://picsum.photos/240/160'}
          className="w-30 h-full object-cover select-none"
          draggable={false}
          alt={hotelInfo.hotelName || 'Hotel Image'}
        />
      </div>
      <div className="flex flex-col justify-center px-3 text-left flex-1 min-w-0">
        <div className="text-sm font-bold truncate">{hotelInfo.hotelName}</div>
        <div className="text-xs text-gray-500 mt-1 truncate">
          {hotelInfo.address1}
          {hotelInfo.address2}
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
    </button>
  )
}
