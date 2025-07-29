"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ShieldUser, Sparkles } from "lucide-react";
import Navigation from "../components/Navigation";

export default function AdminPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const role = user?.roles && user.roles.length > 0 ? user.roles[0].toUpperCase() : "USER";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <Navigation />

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/20 animate-fade-in">
        <div className="flex flex-col items-center mb-6 space-y-3">
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name || "Kullanıcı"}
              width={72}
              height={72}
              className="rounded-full border-2 border-purple-300 shadow-md"
            />
          )}
          <h1 className="text-white text-3xl font-bold flex items-center gap-2">
            <ShieldUser className="w-6 h-6 text-green-300" />
            Admin Paneli
          </h1>
          <p className="text-white/60 text-sm">Yetkili kullanıcı girişi</p>
        </div>

        <div className="text-white/90 text-lg mb-4">
          Merhaba, <span className="font-semibold">{user?.name}</span>
        </div>
        <div className="text-white/60 text-sm mb-6">{user?.email}</div>

        <div className="inline-block bg-green-500/10 text-green-300 px-4 py-1 rounded-full text-sm font-medium border border-green-400/30 shadow-sm">
          Rol: {role}
        </div>

        <div className="mt-8 text-white/40 text-xs flex justify-center items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Güvenli yönetim paneli
        </div>
      </div>
    </main>
  );
}
