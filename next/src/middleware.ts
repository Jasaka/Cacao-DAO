export { default } from "next-auth/middleware"

export const config = { matcher: ["/townsquare/:path*", "/decisions/:path*", "/voting/:path*", "/proposals/:path*", "/admin/:path*", "/profile"] }
