import { Icons } from "~/components/icons"
import { type Activity } from "~/types/search.type"

type Props = {
  activity: Activity
}

export function ActivityDetails({ activity }: Props) {
  return (
    <div className="space-y-1">
      <p className="flex items-start text-sm font-medium sm:text-base">
        <Icons.map className="mr-2 mt-1 size-4 shrink-0" />
        <span className="break-words">{activity.provider.name}</span>
      </p>
      {activity.location && (
        <p className="flex items-start text-sm font-medium sm:text-base">
          <Icons.map className="mr-2 mt-1 size-4 shrink-0" />
          <span className="break-words">
            {activity.location.address.address_line}{" "}
            {activity.location.address.city}
          </span>
        </p>
      )}
      <p className="flex items-start text-sm font-medium sm:text-base">
        <Icons.phone className="mr-2 mt-1 size-4 shrink-0" />
        <span className="break-words">{activity.provider.phoneNumber}</span>
      </p>
    </div>
  )
}
