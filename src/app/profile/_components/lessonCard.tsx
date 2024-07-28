import Image from "next/image"
import { Icons } from "~/components/icons"

interface LessonType {
  id: number
  title: string
  avatar: string
  address: string
  providerName: string
  phoneNumber: string
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  hour: string
}

const dayTranslations = {
  monday: "poniedziałek",
  tuesday: "wtorek",
  wednesday: "środa",
  thursday: "czwartek",
  friday: "piątek",
  saturday: "sobota",
  sunday: "niedziela",
}
export function LessonCard({
  lesson: { avatar, title, address, providerName, phoneNumber, day, hour },
}: {
  lesson: LessonType
}) {
  return (
    <div className="pSmall flex  flex-row justify-between gap-4 rounded-2xl bg-white">
      <div className="flex justify-between gap-4">
        <Image
          src={avatar}
          alt="lesson avi"
          width={144}
          height={144}
          className="hidden rounded-xl md:block"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-1">
            <Icons.map className="h-4 w-4" />
            <p className="text-xs text-foregroundMuted">{providerName}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-row items-center gap-1 pt-1">
              <Icons.store className="h-4 w-4" />
              <p className="text-xs text-foregroundMuted">{address}</p>
            </div>
            <div className="flex items-center gap-1 pt-1">
              <Icons.phone className="h-4 w-4" />
              <p className="text-xs text-foregroundMuted">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-right">
        <span className="text-2xl font-bold">{hour}</span>
        <span className="text-xl font-semibold">{dayTranslations[day]}</span>
      </div>
    </div>
  )
}
