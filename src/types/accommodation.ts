export interface Accommodation {
  id: string
  name: string
  description: string
  location: {
    address: string
    city: string
    prefecture: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  price: {
    min: number
    max: number
    currency: string
  }
  amenities: string[]
  familyFriendly: {
    childrenWelcome: boolean
    babyCribAvailable: boolean
    playgroundNearby: boolean
    familyRooms: boolean
  }
  images: string[]
  rating: number
  reviewCount: number
  availability: boolean
  maxGuests: number
}
