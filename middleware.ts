import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always", // always redirect /contact → /en/contact
});

export const config = {
  matcher: [
    // Run on every path except Next.js internals and static assets
    "/((?!api|_next/static|_next/image|favicon\\.ico|images|icons|fonts).*)",
  ],
};