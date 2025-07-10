import type { Hotel } from '@/types/api'
import { atom } from 'jotai'

// Hotel data atoms
export const hotelsAtom = atom<{ hotel: Hotel }[]>([])
export const selectedHotelAtom = atom<number>(0)
