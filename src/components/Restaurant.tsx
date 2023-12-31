import { FC } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import LoadingIndicator from './LoadingIndicator'
import { truncateStringToLength } from '../utils/utils'
import MapsIcon from '../assets/images/google-maps.svg'
import { RestaurantResponse } from '../utils/types'

interface Props {
  currentRestaurant: RestaurantResponse
}

const Restaurant: FC<Props> = ({ currentRestaurant }) => {
  return (
    <div className="h-100 w-50">
      <a href={currentRestaurant.googleMapsUrl} target="_blank">
        <h1 className="text-white text-center font-bold mb-3 text-xl hover:text-gray-300 font-heading">
          {currentRestaurant.name}
        </h1>
      </a>
      <ProgressiveImage
        src={currentRestaurant.photoUrl as string}
        placeholder={currentRestaurant.name}
      >
        {(src, loading) => {
          return loading ? (
            LoadingIndicator
          ) : (
            <a
              className="flex justify-center"
              href={currentRestaurant.googleMapsUrl}
              target="_blank"
            >
              <img
                className="hover:opacity-75 transition easy-in-out rounded image"
                key={currentRestaurant.placeId}
                src={src}
                alt={currentRestaurant.name}
              />
            </a>
          )
        }}
      </ProgressiveImage>
      <div className="flex flex-row mt-4 justify-between">
        <div>
          <h4 className="text-white text-base font-heading">
            {truncateStringToLength(currentRestaurant.address, 25)}
          </h4>
          <div className="flex">
            <svg
              className="fill-current text-white-500 w-4"
              viewBox="0 0 24 24"
            >
              <g data-name="Layer 2">
                <path
                  d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                  data-name="star"
                />
              </g>
            </svg>
            <h4 className="text-white ml-1 text-base font-heading">
              {currentRestaurant.rating}
            </h4>
          </div>
          <a href={currentRestaurant.googleMapsUrl} target="_blank">
            <div className="flex text-white text-base font-heading hover:opacity-75">
              <MapsIcon />
              <div className="ml-2">See in Maps</div>
            </div>
          </a>
        </div>
        <div>
          <h4 className="text-white text-base font-heading">
            {currentRestaurant.distanceToArrive}
          </h4>
          <h4 className="text-white text-base font-heading">
            {currentRestaurant.durationToArrive}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Restaurant
