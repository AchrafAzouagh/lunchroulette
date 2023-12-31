import { RestaurantResponse } from './types'

export const toRestaurant = (
  result: google.maps.places.PlaceResult
): RestaurantResponse => {
  const url = result.photos?.at(0)?.getUrl({ maxWidth: 400 })
  return {
    name: result.name,
    rating: result.rating,
    placeId: result.place_id,
    photoUrl: url,
    address: result.vicinity,
    googleMapsUrl: result.url,
    distanceToArrive: 'n/a',
    durationToArrive: 'n/a',
    types: result.types,
    location: {
      lat: result.geometry?.location?.lat(),
      lng: result.geometry?.location?.lng(),
    },
  }
}
