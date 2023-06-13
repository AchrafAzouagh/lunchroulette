import { RestaurantResponse } from './types'

export const filterRestaurants = (
  restaurants: RestaurantResponse[]
): RestaurantResponse[] => {
  return restaurants.filter((restaurant) => {
    const regex = /hotel/i // 'i' flag makes the search case-insensitive

    // Remove accents from the restaurant name and convert to lowercase
    const normalizedRestaurant = restaurant.name
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

    return !regex.test(normalizedRestaurant!) && restaurant.rating! >= 4.2
  })
}
