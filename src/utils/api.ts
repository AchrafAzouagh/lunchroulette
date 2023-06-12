import { Loader } from '@googlemaps/js-api-loader'
import { toRestaurant } from './mapper'
import { RestaurantResponse } from './types'

const API_KEY = 'AIzaSyABLzdlTHzz10iABKeV_k72SKB4k6RzvEU'

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
})

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const loadGoogleMapsAPI = async () => {
  await loader.importLibrary('places')
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

export const getNearbyRestaurants = async (location: {
  lat: number
  lng: number
}): Promise<RestaurantResponse[]> => {
  const service = new google.maps.places.PlacesService(
    document.createElement('div')
  )
  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        openNow: true,
        radius: 1500,
        type: 'restaurant',
      },
      (results: google.maps.places.PlaceResult[] | null) => {
        if (results) resolve(results.map((result) => toRestaurant(result)))
        reject('No results')
      }
    )
  })
}
