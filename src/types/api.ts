export type RakutenHotelResponse = {
  pagingInfo: PagingInfo
  hotels: { hotel: Hotel }[]
}

export type PagingInfo = {
  recordCount: number | null
  pageCount: number | null
  page: number | null
  first: number | null
  last: number | null
}

export type Hotel = {
  hotelBasicInfo: HotelBasicInfo
  hotelRatingInfo: HotelRatingInfo
  hotelDetailInfo: HotelDetailInfo
  hotelFacilitiesInfo: HotelFacilitiesInfo
  hotelPolicyInfo: HotelPolicyInfo
  hotelOtherInfo: HotelOtherInfo
}[]

export type HotelBasicInfo = {
  hotelNo?: number | null
  hotelName?: string | null
  hotelInformationUrl?: string | null
  planListUrl?: string | null
  dpPlanListUrl?: string | null
  reviewUrl?: string | null
  hotelKanaName?: string | null
  hotelSpecial?: string | null
  hotelMinCharge?: number | null
  latitude?: number | null
  longitude?: number | null
  postalCode?: string | null
  address1?: string | null
  address2?: string | null
  telephoneNo?: string | null
  faxNo?: string | null
  access?: string | null
  parkingInformation?: string | null
  nearestStation?: string | null
  hotelImageUrl?: string | null
  hotelThumbnailUrl?: string | null
  roomImageUrl?: string | null
  roomThumbnailUrl?: string | null
  hotelMapImageUrl?: string | null
  reviewCount?: number | null
  reviewAverage?: number | null
  userReview?: string | null
}

export type HotelRatingInfo = {
  serviceAverage?: number | null
  locationAverage?: number | null
  roomAverage?: number | null
  equipmentAverage?: number | null
  bathAverage?: number | null
  mealAverage?: number | null
}

export type HotelDetailInfo = {
  reserveTelephoneNo?: string | null
  middleClassCode?: string | null
  smallClassCode?: string | null
  areaName?: string | null
  hotelClassCode?: string | null
  checkinTime?: string | null
  checkoutTime?: string | null
  lastCheckinTime?: string | null
}

export type FacilityItem = {
  item?: string | null
}

export type MealPlace = {
  breakfastPlace?: string | null
  dinnerPlace?: string | null
}

export type BathInfo = {
  bathType?: string | null
  bathQuality?: string | null
  bathBenefits?: string | null
}

export type HotelFacilitiesInfo = {
  hotelRoomNum?: number | null
  roomFacilities?: FacilityItem[] | null
  hotelFacilities?: FacilityItem[] | null
  aboutMealPlace?: MealPlace[] | null
  aboutBath?: BathInfo[] | null
  aboutLeisure?: string | null
  handicappedFacilities?: FacilityItem[] | null
  linguisticLevel?: string | null
}

export type CreditCard = {
  card?: string | null
}

export type HotelPolicyInfo = {
  note?: string | null
  cancelPolicy?: string | null
  availableCreditCard?: CreditCard[] | null
  aboutCreditCardNote?: string | null
  aboutPointAdd?: string | null
  aboutMileageAdd?: string | null
}

export type HotelOtherInfo = {
  privilege?: string | null
  otherInformation?: string | null
}

export interface ApiError {
  error: string
}
