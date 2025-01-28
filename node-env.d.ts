declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_SECRET_SESSION: string
    NEXT_PUBLIC_URL_API: string
    NEXT_PUBLIC_TTL: number
    NEXT_PUBLIC_REDIRECT: string
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_WEATHERSTACK_KEY: string
    NEXT_PUBLIC_WEATHERSTACK_URL: string
    NODE_OPTIONS: string
  }
}
