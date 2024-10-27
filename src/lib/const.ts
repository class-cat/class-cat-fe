export const MOBILE_BREAKPOINT = 768

export const ENDPOINTS = {
  MAP: "ops/map-source/",
  ACTIVITIES: "activities/activity/",
  SEARCH: {
    ACTIVIES: "activities/search-combined/",
    MAP: "activities/map-search-combined/",
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
