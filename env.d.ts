declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NEXT_BASE_URL: string
    NEXT_SECRET_SESSION: string
    NEXT_URL_API: string
    NEXT_TTL: number
  }
}
