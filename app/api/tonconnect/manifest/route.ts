import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  const manifest = {
    url: origin,
    name: 'Crypto Tycoon - African Investment Empire',
    iconUrl: `${origin}/icon.svg`,
    termsOfUseUrl: `${origin}/terms`,
    privacyPolicyUrl: `${origin}/privacy`,
  };

  return NextResponse.json(manifest);
}

