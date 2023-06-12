export interface RestaurantResponse {
  name: string | undefined
  placeId: string | undefined
  photoUrl: string | undefined
  rating: number | undefined
  address: string | undefined
  location: { lat: number | undefined; lng: number | undefined }
}
