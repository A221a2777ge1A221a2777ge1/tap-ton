import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

// Simplified SSE endpoint that emits mock logs
export async function GET(req: NextRequest) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const send = (data: unknown) => writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  writer.write(encoder.encode('event: open\n\n'));
  let i = 0;
  const interval = setInterval(() => {
    i += 1;
    send({ ts: Date.now(), level: 'INFO', msg: `log ${i}` });
    if (i >= 10) {
      clearInterval(interval);
      writer.close();
    }
  }, 500);
  return new Response(readable, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } });
}

