// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {

    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
      return NextResponse.rewrite(
        new URL("/", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/staff") && req.nextauth.token?.role !== "user")
      return NextResponse.rewrite(
        new URL("/", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/staff/:path*", "/staff/:path*"],
};


