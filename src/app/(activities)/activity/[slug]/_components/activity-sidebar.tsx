"use client"
        
import { OtherActivities } from "./other-activities"
import { SimilarActivities } from "./simmilar-activities"

interface ActivitySidebarProps {
  providerSlug: string
  activitySlug: string
}

export function ActivitySidebar({ providerSlug, activitySlug }: ActivitySidebarProps) {
  return (
    <div className="cardSmall space-y-8">
      <OtherActivities slug={providerSlug} />
      <SimilarActivities slug={activitySlug} />
    </div>
  )
} 