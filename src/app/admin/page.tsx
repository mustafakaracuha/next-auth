"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-white/20">
        <div className="flex flex-col items-center mb-6">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "Kullanıcı"}
              width={64}
              height={64}
              className="rounded-full border-2 border-white shadow-sm"
            />
          )}
          <h1 className="mt-4 text-2xl font-semibold">Admin Paneli</h1>
          <p className="text-sm text-white/70">Yalnızca yetkili erişim</p>
        </div>

        <p className="text-white/80">
          Hoş geldin <strong>{session?.user?.name}</strong> (
          {session?.user?.email})
        </p>
      </div>
    </main>
  );
}
