import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Basic redirect of /app when not signed in. In a real app use server session.
  if (url.pathname.startsWith('/app')) {
    // Let frontend handle auth; could add a lightweight check here.
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*']
};

