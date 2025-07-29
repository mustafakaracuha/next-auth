"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Navigation from "../components/Navigation";

export default function Profile() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    bio: "Yazılım geliştirici ve teknoloji tutkunu. Modern web teknolojileri ile çalışmayı seviyorum.",
    location: "İstanbul, Türkiye",
    website: "https://example.com",
    phone: "+90 555 123 45 67",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-white/80 text-xl">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Erişim Reddedildi
          </h1>
          <p className="text-white/70 mb-8">
            Bu sayfayı görüntülemek için giriş yapmalısınız.
          </p>
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const getInitial = (email?: string | null) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Profil güncellendi:", formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profil</h1>
          <p className="text-white/70">
            Kişisel bilgilerinizi görüntüleyin ve düzenleyin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              {/* Avatar */}
              <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-2xl">
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

              <h2 className="text-2xl font-bold text-white mb-2">
                {session.user?.name || "Kullanıcı"}
              </h2>
              <p className="text-purple-200 mb-4">{session.user?.email}</p>

              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Üyelik Tarihi</p>
                  <p className="text-white font-medium">Ocak 2024</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Son Giriş</p>
                  <p className="text-white font-medium">Bugün, 14:30</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Hesap Durumu</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-400/20 text-green-400">
                    Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                İstatistikler
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Profil Görüntüleme</span>
                  <span className="text-white font-medium">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Güvenlik Skoru</span>
                  <span className="text-green-400 font-medium">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tamamlanma</span>
                  <span className="text-yellow-400 font-medium">75%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Kişisel Bilgiler
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  {isEditing ? "İptal" : "Düzenle"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Ad Soyad
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-white/5 px-4 py-3 rounded-lg">
                      {formData.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    E-posta
                  </label>
                  <p className="text-white bg-white/5 px-4 py-3 rounded-lg">
                    {formData.email}
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    E-posta adresi değiştirilemez
                  </p>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Telefon
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-white/5 px-4 py-3 rounded-lg">
                      {formData.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Konum
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-white/5 px-4 py-3 rounded-lg">
                      {formData.location}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 bg-white/5 px-4 py-3 rounded-lg block"
                    >
                      {formData.website}
                    </a>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Hakkında
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  ) : (
                    <p className="text-white bg-white/5 px-4 py-3 rounded-lg">
                      {formData.bio}
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    İptal
                  </button>
                </div>
              )}
            </div>

            {/* Security Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">
                Güvenlik Ayarları
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">
                      İki Faktörlü Doğrulama
                    </h4>
                    <p className="text-white/60 text-sm">
                      Hesabınız için ek güvenlik katmanı
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 text-sm mr-3">Aktif</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">
                      E-posta Bildirimleri
                    </h4>
                    <p className="text-white/60 text-sm">
                      Güvenlik olayları için e-posta alın
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 text-sm mr-3">Aktif</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Oturum Geçmişi</h4>
                    <p className="text-white/60 text-sm">
                      Giriş aktivitelerinizi takip edin
                    </p>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                    Görüntüle
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Şifreyi Değiştir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
