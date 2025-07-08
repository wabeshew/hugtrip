import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude parameters' },
      { status: 400 },
    )
  }

  const lat = Number.parseFloat(latitude)
  const lng = Number.parseFloat(longitude)

  if (Number.isNaN(lat) || Number.isNaN(lng) || lat === 0 || lng === 0) {
    return NextResponse.json(
      { error: 'Invalid latitude or longitude provided' },
      { status: 400 },
    )
  }

  const applicationId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID
  if (!applicationId) {
    console.error('Missing Rakuten API application ID')
    return NextResponse.json(
      { error: 'Missing Rakuten API application ID' },
      { status: 500 },
    )
  }

  const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&latitude=${lat}&longitude=${lng}&searchRadius=1&datumType=1&applicationId=${applicationId}&responseType=large`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(
        `Error fetching hotels: ${response.status} ${response.statusText}`,
      )
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    if (data.hotels && data.hotels.length > 0) {
      console.log(`Found ${data.hotels.length} hotels.`)
    } else {
      console.log('No hotels found near this location.')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch Rakuten hotels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 },
    )
  }
}
