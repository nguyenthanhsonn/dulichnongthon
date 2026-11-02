export const ROUTES = {
  HOME: "/",
  DESTINATIONS: "/destinations",
  DESTINATION_DETAIL: (slug: string) => `/destinations/${slug}`,
  TOURS: "/tours",
  TOUR_DETAIL: (slug: string) => `/tours/${slug}`,
  EXPERIENCES: "/experiences",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
  
  // Auth routes
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },

  // User / Dashboard
  DASHBOARD: {
    ROOT: "/dashboard",
    BOOKINGS: "/dashboard/bookings",
    PROFILE: "/dashboard/profile",
  },
} as const;
