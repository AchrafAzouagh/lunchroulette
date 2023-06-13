import React, { useEffect, useState } from 'react'
import {
  loadGoogleMapsAPI,
  getNearbyRestaurants,
  getCurrentLocation,
  getRestaurantDetails,
  delay,
  getDistanceToRestaurant,
} from '../utils/api'
import { RestaurantResponse } from '../utils/types'
import Restaurant from './Restaurant'
import { ShuffleButton } from './ShuffleButton'
import LoadingIndicator from './LoadingIndicator'
import { filterRestaurants, removeObjectById } from '../utils/utils'

const RestaurantCard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([])
  const [currentRestaurant, setCurrentRestaurant] =
    useState<RestaurantResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      getRandomRestaurant()
    })
  }, [])

  const buildRestaurantDetails = (
    location: google.maps.LatLngLiteral,
    restaurants: RestaurantResponse[]
  ): RestaurantResponse[] => {
    restaurants.forEach(async (restaurant) => {
      try {
        const details = await getRestaurantDetails(restaurant?.placeId!)
        const distanceResponse = await getDistanceToRestaurant(
          restaurant,
          location
        )
        const distanceElements = distanceResponse?.rows[0]?.elements[0]
        restaurant.googleMapsUrl = details?.url
        restaurant.distanceToArrive = distanceElements?.distance.text
        restaurant.durationToArrive = distanceElements?.duration.text
      } catch (error) {
        setLoading(false)
      }
    })
    return restaurants
  }

  const getRandomRestaurant = async (): Promise<void> => {
    try {
      setLoading(true)
      const location = await getCurrentLocation()
      const response = await getNearbyRestaurants(location)

      const filteredRestaurants = filterRestaurants(response)

      const fetchedDetails = buildRestaurantDetails(
        location,
        filteredRestaurants
      )

      await delay(1000)

      if (fetchedDetails) {
        setRestaurants(fetchedDetails)
        setCurrentRestaurant(
          fetchedDetails[Math.floor(Math.random() * fetchedDetails?.length)]
        )
      }
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleNextRestaurant = async () => {
    if (restaurants.length === 1) getRandomRestaurant()
    let nextRestaurant: RestaurantResponse | null = null
    nextRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)]
    setCurrentRestaurant(nextRestaurant)
    const newRestaurants = removeObjectById(restaurants, nextRestaurant.placeId)
    setRestaurants(newRestaurants)
  }
  if (error)
    return (
      <div className="h-screen flex items-center justify-center flex-col m-9">
        {error}
      </div>
    )

  return (
    <div className="h-screen flex items-center justify-center flex-col m-9">
      {loading ? (
        LoadingIndicator
      ) : (
        <>
          {currentRestaurant && (
            <>
              <Restaurant currentRestaurant={currentRestaurant} />
              <ShuffleButton disabled={loading} onClick={handleNextRestaurant}>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Shuffle
                </span>
              </ShuffleButton>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default RestaurantCard
