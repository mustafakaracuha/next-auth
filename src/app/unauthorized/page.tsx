export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-lg w-full p-12 text-center mt-6">
        <h1 className="text-2xl font-semibold text-white">Yetkisiz Erişim</h1>
        <p className="text-white/40 mt-2">
          Bu sayfayı görüntüleme yetkiniz bulunmamaktadır.
        </p>
      </div>
    </main>
  );
}
