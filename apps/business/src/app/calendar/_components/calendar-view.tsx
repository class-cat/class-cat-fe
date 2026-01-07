"use client"

import { useState } from "react"
import { Button } from "@class-cat/ui"
import { Icons } from "~/components/icons"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns"
import { cn } from "@class-cat/ui"
import { ActivityDialog } from "./activity-dialog"
import type { ActivityFormSchemaType } from "../../activities/new/_schema/activity-form-schema.zod"

export interface CalendarActivity {
  id: string
  name: string
  description: string
  start: Date
  end: Date
  locationId?: string
  employeeId?: string
  categories: string[]
  color?: string
}

const mockActivities: CalendarActivity[] = [
  {
    id: "1",
    name: "Piłka nożna - grupa A",
    description: "Zajęcia piłki nożnej dla dzieci w wieku 8-12 lat",
    start: new Date(2025, 0, 15, 10, 0),
    end: new Date(2025, 0, 15, 11, 30),
    locationId: "1",
    employeeId: "1",
    categories: ["football"],
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Koszykówka - początkujący",
    description: "Zajęcia koszykówki dla początkujących",
    start: new Date(2025, 0, 15, 14, 0),
    end: new Date(2025, 0, 15, 15, 30),
    locationId: "1",
    categories: ["basketball"],
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Tenis - zaawansowani",
    description: "Zajęcia tenisa dla zaawansowanych graczy",
    start: new Date(2025, 0, 20, 16, 0),
    end: new Date(2025, 0, 20, 17, 30),
    locationId: "1",
    categories: ["tennis"],
    color: "bg-purple-500",
  },
]

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [activities, setActivities] = useState<CalendarActivity[]>(mockActivities)
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<CalendarActivity | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getActivitiesForDay = (date: Date) => {
    return activities.filter((activity) => isSameDay(activity.start, date))
  }

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setSelectedActivity(null)
      setIsActivityDialogOpen(true)
    }
  }

  const handleActivityClick = (activity: CalendarActivity) => {
    setSelectedActivity(activity)
    setIsActivityDialogOpen(true)
  }

  const handleSaveActivity = (activityData: ActivityFormSchemaType, startTime: string, endTime: string) => {
    if (!selectedDate) return

    const [startHours, startMinutes] = startTime.split(":").map(Number)
    const [endHours, endMinutes] = endTime.split(":").map(Number)

    const start = new Date(selectedDate)
    start.setHours(startHours, startMinutes, 0, 0)

    const end = new Date(selectedDate)
    end.setHours(endHours, endMinutes, 0, 0)

    const activity: CalendarActivity = {
      id: selectedActivity?.id || Date.now().toString(),
      name: activityData.name,
      description: activityData.description,
      start,
      end,
      locationId: activityData.locationId,
      employeeId: activityData.employeeId,
      categories: activityData.categories,
      color: "bg-blue-500", // Default color, can be customized
    }

    if (selectedActivity) {
      // Update existing activity
      setActivities(activities.map((a) => (a.id === activity.id ? activity : a)))
    } else {
      // Add new activity
      setActivities([...activities, activity])
    }
    setIsActivityDialogOpen(false)
    setSelectedActivity(null)
    setSelectedDate(undefined)
  }

  const handleDeleteActivity = (activityId: string) => {
    setActivities(activities.filter((a) => a.id !== activityId))
    setIsActivityDialogOpen(false)
    setSelectedActivity(null)
    setSelectedDate(undefined)
  }

  // Get first day of week for the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = monthStart.getDay()
  const daysToPrepend = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1 // Convert to Monday = 0

  // Create array with empty cells for days before month starts
  const emptyCells = Array.from({ length: daysToPrepend }, (_, i) => i)
  
  // Get days from previous month to fill the grid
  const previousMonthDays = Array.from({ length: daysToPrepend }, (_, i) => {
    const date = new Date(monthStart)
    date.setDate(date.getDate() - (daysToPrepend - i))
    return date
  })

  // Calculate how many days we need to add at the end
  const totalCells = daysToPrepend + daysInMonth.length
  const remainingCells = 42 - totalCells // 6 weeks * 7 days = 42
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => {
    const date = new Date(monthEnd)
    date.setDate(date.getDate() + i + 1)
    return date
  })

  const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"]

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold capitalize">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousMonth}
            >
              <Icons.chevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
            >
              Dzisiaj
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
            >
              <Icons.chevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button onClick={() => {
          setSelectedDate(new Date())
          setSelectedActivity(null)
          setIsActivityDialogOpen(true)
        }}>
          <Icons.add className="mr-2 h-4 w-4" />
          Dodaj zajęcia
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="cardSmall">
        <div className="grid grid-cols-7 gap-1">
          {/* Week day headers */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-semibold text-foregroundMuted"
            >
              {day}
            </div>
          ))}

          {/* Previous month days (grayed out) */}
          {previousMonthDays.map((date, idx) => (
            <div
              key={`prev-${idx}`}
              className="min-h-[100px] border border-secondary rounded-lg p-2 opacity-30"
            >
              <div className="text-sm text-foregroundMuted">
                {format(date, "d")}
              </div>
            </div>
          ))}

          {/* Current month days */}
          {daysInMonth.map((date) => {
            const dayActivities = getActivitiesForDay(date)
            const isCurrentDay = isToday(date)
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            return (
              <div
                key={date.toISOString()}
                className={cn(
                  "min-h-[100px] border rounded-lg p-2 cursor-pointer transition-colors",
                  isCurrentDay && "border-primary border-2 bg-primary/5",
                  isSelected && "border-primary border-2 bg-primary/10",
                  !isCurrentDay && !isSelected && "border-secondary hover:bg-secondary/50"
                )}
                onClick={() => handleDateSelect(date)}
              >
                <div
                  className={cn(
                    "text-sm font-medium mb-1",
                    isCurrentDay && "text-primary font-bold"
                  )}
                >
                  {format(date, "d")}
                </div>
                <div className="space-y-1">
                  {dayActivities.slice(0, 3).map((activity) => (
                    <div
                      key={activity.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActivityClick(activity)
                      }}
                      className={cn(
                        "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80",
                        activity.color || "bg-primary text-white"
                      )}
                      title={activity.name}
                    >
                      {format(activity.start, "HH:mm")} - {activity.name}
                    </div>
                  ))}
                  {dayActivities.length > 3 && (
                    <div className="text-xs text-foregroundMuted">
                      +{dayActivities.length - 3} więcej
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Next month days (grayed out) */}
          {nextMonthDays.map((date, idx) => (
            <div
              key={`next-${idx}`}
              className="min-h-[100px] border border-secondary rounded-lg p-2 opacity-30"
            >
              <div className="text-sm text-foregroundMuted">
                {format(date, "d")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Dialog */}
      <ActivityDialog
        open={isActivityDialogOpen}
        onOpenChange={setIsActivityDialogOpen}
        selectedDate={selectedDate}
        activity={selectedActivity}
        onSave={handleSaveActivity}
        onDelete={handleDeleteActivity}
      />
    </div>
  )
}

