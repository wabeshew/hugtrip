import type { Accommodation } from '@/types/accommodation'
import { atom } from 'jotai'

// Search and filter atoms
export const searchQueryAtom = atom('')
export const selectedFiltersAtom = atom<string[]>([])
export const loadingAtom = atom(false)

// Accommodation data atoms
export const accommodationsAtom = atom<Accommodation[]>([])
export const selectedAccommodationAtom = atom<Accommodation | null>(null)

// Filter options atoms
export const priceRangeAtom = atom<{ min: number; max: number }>({
  min: 0,
  max: 50000,
})
export const guestCountAtom = atom(2)
export const amenityFiltersAtom = atom<string[]>([])

// UI state atoms
export const mapViewAtom = atom(false)
export const sortByAtom = atom<'price' | 'rating' | 'distance'>('rating')
