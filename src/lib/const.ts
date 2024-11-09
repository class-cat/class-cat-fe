export const MOBILE_BREAKPOINT = 768

export const activity = "activities/activity"
export const ENDPOINTS = {
  MAP: "ops/map-source/",
  SEARCH: {
    ACTIVIES: "activities/search-combined/",
    MAP: "activities/map-search-combined/",
  },
  ACTIVITIES: {
    ROOT: `${activity}/`,
    REVIEW: (activitySlug: string) => `${activity}/${activitySlug}/review/`,
    REVIEW_SINGLE: (activitySlug: string, reviewId: string) =>
      `${activity}/${activitySlug}/review/${reviewId}`,
  },
} as const

export const ROUTES = {
  ROOT: {
    HOME: "/",
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
    PROFILE: "/profile",
  },
  ACTIVITY: "/activity",
  COMPANY: {
    ROOT: "/company",
    SIGN_UP: "/company/sign-up",
    SIGN_IN: "/company/sign-in",
  },
} as const
