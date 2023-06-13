import { EXCLUDED_ESTABLISHMENTS, MINIMUM_RATING } from './constants'
import { RestaurantResponse } from './types'

export const filterRestaurants = (
  restaurants: RestaurantResponse[]
): RestaurantResponse[] => {
  return restaurants.filter((restaurant) => {
    const goodRating = restaurant.rating! >= MINIMUM_RATING

    const isPureRestaurant = !restaurant.types?.some((item) =>
      EXCLUDED_ESTABLISHMENTS.includes(item)
    )

    return goodRating && isPureRestaurant
  })
}

export const truncateStringToLength = (
  string: string | undefined,
  length: number
) => {
  return string?.length! > length
    ? `${string?.substring(0, length)}...`
    : string
}

export const removeObjectById = (arr: any, id: any) => {
  const objWithIdIndex = arr.findIndex((obj: any) => obj.placeId === id)

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1)
  }

  return arr
}
