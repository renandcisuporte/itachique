declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NEXT_BASE_URL: string
    NEXT_SECRET_SESSION: string
    NEXT_URL_API: string
    NEXT_TTL: number | string
    DATABASE_URL: string
    NEXT_REDIRECT: string
    NEXT_BASE_URL: string
    NEXT_WEATHERSTACK_KEY: string
    NEXT_WEATHERSTACK_URL: string
    NODE_OPTIONS: string
  }
}
