'use client'

import { type Activity } from "~/types/search.type"
import { BadgeCheck } from "lucide-react"

interface Props {
  activity: Activity
}

export const ActivityDetails = ({ activity }: Props) => {
  return (
    <div className="space-y-1">
      <p className="flex items-center text-sm font-medium sm:text-base">
        <span className="break-words">{activity?.provider?.name}</span>
        {activity?.provider?.isVerified && (
          <BadgeCheck className="ml-2 size-4 text-green-600" />
        )}
      </p>
      {activity.location && (
        <p className="flex items-start text-sm font-medium sm:text-base">
          <span className="break-words">
            {activity?.location.address.addressLine}{" "}
            {activity.location.address.city}
          </span>
        </p>
      )}
    </div>
  )
}
