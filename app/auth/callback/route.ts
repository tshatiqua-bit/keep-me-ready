import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // On Vercel the internal origin differs from the public hostname.
  // x-forwarded-host is always the real public host.
  const host = request.headers.get("x-forwarded-host") ?? new URL(origin).host;
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;

  if (code) {
    // Build the redirect response first so cookies can be written directly
    // onto it. Cookies written via next/headers are NOT automatically
    // included in a separately-constructed NextResponse redirect.
    const redirectResponse = NextResponse.redirect(`${base}${next}`);
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              redirectResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return redirectResponse;
    }
  }

  return NextResponse.redirect(`${base}/auth/login?error=auth_failed`);
}
