export const MOBILE_BREAKPOINT = 768

export const activity = "activities/activity"

// !!! Do not use endpoints with variables on server components
export const ENDPOINTS = {
  MAP: "ops/map-source/",
  SEARCH: {
    ACTIVIES: "activities/search-combined/",
    MAP: "activities/map-search-combined/",
  },
  ACTIVITIES: {
    ROOT: `${activity}/`,
    DETAIL: (id: string) => `${activity}/${id}/`,
    REVIEW: (activitySlug: string) => `${activity}/${activitySlug}/review/`,
    REVIEW_SINGLE: (activitySlug: string, reviewId: string) =>
      `${activity}/${activitySlug}/review/${reviewId}`,
  },
  USER_REVIEWS: "activities/reviews/mine/",
  EMPLOYEES: {
    ROOT: "employees/",
    DETAIL: (id: string) => `employees/${id}/`,
  },
  LOCATIONS: {
    ROOT: "locations/",
    DETAIL: (id: string) => `locations/${id}/`,
  },
} as const

export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  ACTIVITY: "/activity",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  DASHBOARD: "/dashboard",
  ACTIVITIES: "/activities",
  ACTIVITIES_NEW: "/activities/new",
  CALENDAR: "/calendar",
  EMPLOYEES: "/employees",
  LOCATIONS: "/locations",
  SETTINGS: "/settings",
} as const
