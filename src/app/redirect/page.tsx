"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Shield, LayoutDashboard, ArrowRight } from "lucide-react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [redirectInfo, setRedirectInfo] = useState<{
    destination: string;
    icon: React.ReactNode;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    const roles = session?.user?.roles ?? [];

    if (roles.includes("Admin")) {
      setRedirectInfo({
        destination: "Admin Panel",
        icon: <Shield className="w-8 h-8 text-purple-400" />,
        title: "Yönetici paneline yönlendiriliyorsunuz...",
      });
      setTimeout(() => router.replace("/admin"), 1500);
    } else {
      setRedirectInfo({
        destination: "Dashboard",
        icon: <LayoutDashboard className="w-8 h-8 text-blue-400" />,
        title: "Dashboard'a yönlendiriliyorsunuz...",
      });
      setTimeout(() => router.replace("/dashboard"), 1500);
    }
  }, [status, session, router]);

  if (status === "loading" || !redirectInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Oturum Kontrol Ediliyor
          </h2>
          <p className="text-white/70">Lütfen bekleyin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center max-w-lg w-full">
        {/* Icon and Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-white/10">
            {redirectInfo.icon}
          </div>

          {/* Animated Arrow */}
          <div className="flex items-center justify-center space-x-2 text-white/60">
            <span className="text-sm font-medium">Yönlendiriliyor</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold text-white">
              {redirectInfo.destination}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">Hoş Geldiniz! 🎉</h1>

        {/* Subtitle */}
        <p className="text-xl text-white/90 mb-6">
          {session?.user?.name || "Kullanıcı"}
        </p>

        {/* Redirect Message */}
        <p className="text-white/70 mb-8 leading-relaxed">
          {redirectInfo.title}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full animate-pulse shadow-lg animate-[width_1.5s_ease-in-out]"
            style={{
              animation: "progressBar 1.5s ease-in-out forwards",
              width: "0%",
            }}
          ></div>
        </div>

        {/* User Info */}
        {session?.user?.email && (
          <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
            <p className="text-purple-200 text-sm font-medium break-words">
              {session.user.email}
            </p>
          </div>
        )}

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
