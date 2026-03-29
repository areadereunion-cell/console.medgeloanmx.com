// /api/captcha/route.ts

let store: Record<string, number> = {};

export async function GET() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;

  const id = Math.random().toString(36).substring(2);

  store[id] = a * b;

  return Response.json({
    captcha_id: id,
    a,
    b
  });
}