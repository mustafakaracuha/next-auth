import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Oturum bilgisini JWT tokenından alıyoruz
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  console.log(token, "Token:", pathname, "Pathname:", req.nextUrl);
  

  // Eğer token yoksa, giriş sayfasına yönlendiriyoruz
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Yalnızca admin rolü olanlar /admin'e erişebilsin
  if (pathname.startsWith("/admin")) {
    const roles: string[] = Array.isArray(token?.roles) ? token?.roles : [];

    if (!roles.includes("admin")) {
      const unauthorizedUrl = req.nextUrl.clone();
      unauthorizedUrl.pathname = "/unauthorized";
      return NextResponse.redirect(unauthorizedUrl);
    }
  }
  // Yalnızca user rolü olanlar /profile ve /dashboard'a erişebilsin
  if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
    const roles: string[] = Array.isArray(token?.roles) ? token?.roles : [];

    if (roles.includes("user") && !roles.includes("admin")) {
      const unauthorizedUrl = req.nextUrl.clone();
      unauthorizedUrl.pathname = "/unauthorized";
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // // Giriş yapılmamışsa (token yoksa), giriş sayfasına yönlendir
  // if (!token) {
  //   // Giriş yapılması gereken sayfaya gidiliyorsa
  //   if (req.nextUrl.pathname.startsWith("/protected")) {
  //     // Giriş sayfasına yönlendir (callbackUrl ile geri dönebilir)
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/login"; // Giriş sayfanızın yolu
  //     url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  //     return NextResponse.redirect(url);
  //   }
  // }

  // Token varsa veya korumasız sayfa ise isteği olduğu gibi geçir
  return NextResponse.next();
}

// Middleware sadece belirli sayfalarda çalışsın (opsiyonel)
export const config = {
  matcher: ["/profile", "/dashboard", "/", "/admin/:path*"],
};
