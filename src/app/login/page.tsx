"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Settings, Shield } from "lucide-react";

export default function Page() {
  const { data: session, status } = useSession();

  const getInitial = (email?: string | null) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Navigation */}
      {session && session.user && <Navigation />}

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-6 pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-lg w-full p-12 text-center mt-6">
          {status === "loading" ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white/80 text-lg font-medium">Yükleniyor...</p>
            </div>
          ) : session ? (
            <>
              {/* Avatar */}
              <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-gradient-to-r from-white to-gray-400 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl font-bold text-white">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    getInitial(session.user?.email)
                  )}
                </div>
              </div>

              <h1 className="text-4xl font-extrabold text-white mb-3">
                Hoşgeldin! 👋🏼
              </h1>
              <h2 className="text-2xl font-semibold text-white/90 mb-6">
                {session.user?.name || "Kullanıcı"}
              </h2>
              <p className="text-purple-200 font-medium break-words mb-8 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                {session.user?.email}
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {session.user?.roles?.includes("User") && (
                  <>
                    <Link
                      href="/dashboard"
                      className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <span>Dashboard'a Git</span>
                      </div>
                    </Link>

                    <Link
                      href="/profile"
                      className="group bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>Profili Görüntüle</span>
                      </div>
                    </Link>
                  </>
                )}

                {/* Admin Link */}
                {session.user?.roles?.includes("Admin") && (
                  <Link
                    href="/admin"
                    className="group bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </div>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8  ">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-4">
                  Güvenli Giriş
                </h1>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Hesabınıza güvenli bir şekilde giriş yapın ve
                  kişiselleştirilmiş deneyiminizi yaşayın.
                </p>
              </div>

              <button
                onClick={() => signIn()}
                className="group w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Giriş Yap</span>
                </div>
              </button>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  Güvenli ve hızlı giriş için NextAuth kullanıyoruz
                </p>
              </div>
            </>
          )}
        </div>

        {/* Features */}
        {!session && (
          <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Güvenli</h3>
              <p className="text-white/60 text-sm">
                Endüstri standardı güvenlik protokolleri
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Hızlı</h3>
              <p className="text-white/60 text-sm">
                Anında giriş ve çıkış işlemleri
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Kolay</h3>
              <p className="text-white/60 text-sm">
                Kullanıcı dostu arayüz tasarımı
              </p>
            </div>
          </div>
        )}

        <footer className="relative z-10 mt-16 text-white/40 text-sm select-none">
          &copy; {new Date().getFullYear()} NextAuth Demo
        </footer>
      </main>
    </>
  );
}
