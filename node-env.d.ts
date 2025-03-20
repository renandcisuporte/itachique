declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_SECRET_SESSION: string
    NEXT_PUBLIC_URL_API: string
    NEXT_PUBLIC_TTL: number
    NEXT_PUBLIC_REDIRECT: string
    NEXT_PUBLIC_BASE_IMG: string
    NEXT_PUBLIC_WEATHERSTACK_KEY: string
    NEXT_PUBLIC_WEATHERSTACK_URL: string
    NEXT_PUBLIC_SMTP_HOST: string
    NEXT_PUBLIC_SMTP_PORT: number
    NEXT_PUBLIC_SMTP_SECURE: boolean
    NEXT_PUBLIC_SMTP_USER: string
    NEXT_PUBLIC_SMTP_PASSWORD: string
    NODE_OPTIONS: string
  }
}
