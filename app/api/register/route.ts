import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cuenta = String(body?.cuenta || "").trim();
    const password = String(body?.password || "").trim();
    const captcha = String(body?.captcha || "").trim();

    if (!cuenta || !password || !captcha) {
      return NextResponse.json(
        { error: "Campos incompletos" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO register (cuenta, password, captcha)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [cuenta, password, captcha]
    );

    return NextResponse.json(
      {
        message: "Guardado correctamente",
        data: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERROR REGISTER:", error);
    return NextResponse.json(
      { error: "Error al guardar" },
      { status: 500 }
    );
  }
}