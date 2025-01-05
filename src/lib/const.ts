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
    REVIEW: (activitySlug: string) => `${activity}/${activitySlug}/review/`,
    REVIEW_SINGLE: (activitySlug: string, reviewId: string) =>
      `${activity}/${activitySlug}/review/${reviewId}`,
  },
  USER_REVIEWS: "activities/reviews/mine/",
} as const

export const ROUTES = {
  ROOT: {
    HOME: "/",
    SIGN_UP: "/user/sign-up",
    SIGN_IN: "/user/sign-in",
    PROFILE: "/profile",
  },
  ACTIVITY: "/activity",
  COMPANY: {
    ROOT: "/company",
    SIGN_UP: "/company/sign-up",
    SIGN_IN: "/company/sign-in",
  },
} as const
