import React, { useEffect, useState } from 'react'
import {
  loadGoogleMapsAPI,
  getNearbyRestaurants,
  getCurrentLocation,
} from './utils/api'
import { RestaurantResponse } from './utils/types'
import Restaurant from './components/Restaurant'
import { ShuffleButton } from './components/ShuffleButton'
import LoadingIndicator from './components/LoadingIndicator'

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([])
  const [currentRestaurant, setCurrentRestaurant] =
    useState<RestaurantResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      getRandomRestaurant()
    })
  }, [])

  const getRandomRestaurant = async (): Promise<void> => {
    try {
      setLoading(true)
      const location = await getCurrentLocation()
      const response = await getNearbyRestaurants(location)
      const filteredRestaurants = response?.filter(
        (restaurant: RestaurantResponse) => restaurant.rating! >= 4.2
      ) as RestaurantResponse[]
      if (filteredRestaurants) {
        setRestaurants(filteredRestaurants)
        setCurrentRestaurant(
          filteredRestaurants[
            Math.floor(Math.random() * filteredRestaurants?.length)
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
    <div className="h-screen flex items-center justify-center flex-col m-12  ">
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

export default App
