import { Card } from "./card"

export interface LessonType {
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
export function LessonCard({ lesson }: { lesson: LessonType }) {
  const { day, hour } = lesson

  return (
    <Card lesson={lesson}>
      <Card.RightSlot className="flex flex-col gap-1 text-right">
        <span className="text-2xl font-bold">{hour}</span>
        <span className="text-xl font-semibold">{dayTranslations[day]}</span>
      </Card.RightSlot>
    </Card>
  )
}