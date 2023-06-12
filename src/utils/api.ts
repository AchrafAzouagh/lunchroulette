import { Loader } from '@googlemaps/js-api-loader'
import { toRestaurant } from './mapper'
import { RestaurantResponse } from './types'
import { SEARCH_RADIUS } from './constants'

const loader = new Loader({
  apiKey: process.env.MAPS_API_KEY as string,
  version: 'weekly',
})

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const loadGoogleMapsAPI = async () => {
  await loader.importLibrary('places')
  await loader.importLibrary('routes')
}

export const getCurrentLocation = (): Promise<google.maps.LatLngLiteral> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve({ lat: latitude, lng: longitude })
      },
      (error) => reject(error)
    )
  })
}

export const getNearbyRestaurants = (location: {
  lat: number
  lng: number
}): Promise<RestaurantResponse[]> => {
  return new Promise((resolve, reject) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement('div')
    )
    placesService.nearbySearch(
      {
        location,
        openNow: true,
        radius: SEARCH_RADIUS,
        type: 'restaurant',
      },
      (results: google.maps.places.PlaceResult[] | null) => {
        if (results) resolve(results.map((result) => toRestaurant(result)))
        reject('No results')
      }
    )
  })
}

export const getRestaurantDetails = (
  restaurantId: string
): Promise<google.maps.places.PlaceResult | null> => {
  const placesService = new google.maps.places.PlacesService(
    document.createElement('div')
  )
  return new Promise((resolve, reject) => {
    placesService.getDetails(
      { placeId: restaurantId },
      (result: google.maps.places.PlaceResult | null) => {
        if (result) resolve(result)
        reject('No results')
      }
    )
  })
}

export const getDistanceToRestaurant = (
  restaurant: RestaurantResponse,
  location: google.maps.LatLngLiteral
): Promise<google.maps.DistanceMatrixResponse | null> => {
  const distanceService = new google.maps.DistanceMatrixService()
  const options = {
    origins: [location],
    destinations: [
      new window.google.maps.LatLng({
        lat: restaurant.location.lat as number,
        lng: restaurant.location.lng as number,
      }),
    ],
    travelMode: google.maps.TravelMode.WALKING,
  }
  return new Promise((resolve, reject) => {
    distanceService.getDistanceMatrix(
      options,
      (response: google.maps.DistanceMatrixResponse | null) => {
        if (response) resolve(response)
        reject('No results')
      }
    )
  })
}
