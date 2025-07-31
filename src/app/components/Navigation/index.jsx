import { Bell } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              NextAuth Demo
            </Link>
          </div>

          {session && (
            <div className="hidden md:flex items-center space-x-8">
              {session.user?.roles?.includes("user") && (
                <>
                  <Link
                    href="/dashboard"
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Profil
                  </Link>
                </>
              )}
              {session.user?.roles?.includes("admin") && (
                <Link
                  href="/admin"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center space-x-3">
                <div className="relative mr-4">
                  <Bell className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                {session.user?.image && (
                  <img
                    src={session.user?.image}
                    alt={session.user.name || "admin"}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-gray-300"
                  />
                )}
                <div className="hidden md:block">
                  <p className="text-white font-medium text-sm">
                    {session.user?.name}
                  </p>
                  <p className="text-purple-300 uppercase text-xs">
                    {session.user.roles}
                  </p>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="bg-white/20 ml-3 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Çıkış
                </button>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && session && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/dashboard" className="block px-3 py-2 text-white/80">
              Dashboard
            </Link>
            <Link href="/profile" className="block px-3 py-2 text-white/80">
              Profil
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="block w-full text-left px-3 py-2 text-white/80"
            >
              Çıkış
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
