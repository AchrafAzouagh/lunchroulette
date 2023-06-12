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

const RestaurantCard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([])
  const [currentRestaurant, setCurrentRestaurant] =
    useState<RestaurantResponse | null>(null)
  const [loading, setLoading] = useState(false)

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

      const filteredRestaurants = response?.filter(
        (restaurant: RestaurantResponse) => restaurant.rating! >= 4.2
      ) as RestaurantResponse[]

      const fetchedDetails = buildRestaurantDetails(
        location,
        filteredRestaurants
      )

      await delay(1000)

      if (fetchedDetails) {
        setRestaurants(fetchedDetails)
        setCurrentRestaurant(
          filteredRestaurants[
            Math.floor(Math.random() * fetchedDetails?.length)
          ]
        )
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleNextRestaurant = async () => {
    let nextRestaurant: RestaurantResponse | null = null
    while (
      !nextRestaurant ||
      nextRestaurant.placeId === currentRestaurant?.placeId
    ) {
      nextRestaurant =
        restaurants[Math.floor(Math.random() * restaurants.length)]
    }
    setCurrentRestaurant(nextRestaurant)
  }
  return (
    <div className="h-screen flex items-center justify-center flex-col m-9">
      {loading ? (
        LoadingIndicator
      ) : (
        <>
          {currentRestaurant && (
            <>
              <Restaurant
                name={currentRestaurant.name}
                placeId={currentRestaurant.placeId}
                photoUrl={currentRestaurant.photoUrl}
                rating={currentRestaurant.rating}
                address={currentRestaurant.address}
                url={currentRestaurant.googleMapsUrl}
                duration={currentRestaurant.durationToArrive}
                distance={currentRestaurant.distanceToArrive}
              />
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
