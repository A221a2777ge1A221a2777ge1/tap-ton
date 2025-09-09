// Auth0 v4 no longer exposes handleAuth directly. Implement a minimal placeholder route
export async function GET() {
  return new Response('Auth route not implemented. Configure Auth0 routes via middleware or pages.', { status: 501 });
}
