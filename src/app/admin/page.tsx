"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Users,
  Settings,
  Database,
  Shield,
  Plus,
  Activity,
  TrendingUp,
  AlertTriangle,
  Lock,
} from "lucide-react";
import Navigation from "../components/Navigation";

export default function AdminPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");

  const user = session?.user;
  const role =
    user?.roles && user.roles.length > 0
      ? user.roles[0].toUpperCase()
      : "ADMIN";

  const stats = [
    {
      label: "Toplam Kullanıcı",
      value: "2,847",
      change: "+12%",
      positive: true,
      icon: Users,
    },
    {
      label: "Aktif Oturumlar",
      value: "1,234",
      change: "+8%",
      positive: true,
      icon: Activity,
    },
    {
      label: "Güvenlik Olayları",
      value: "23",
      change: "-15%",
      positive: true,
      icon: Shield,
    },
    {
      label: "Sistem Sağlığı",
      value: "99.9%",
      change: "+0.1%",
      positive: true,
      icon: TrendingUp,
    },
  ];

  const recentActivities = [
    {
      action: "Yeni kullanıcı kaydı",
      user: "john.doe@example.com",
      time: "2 dakika önce",
      type: "success",
    },
    {
      action: "Başarısız giriş denemesi",
      user: "suspicious@email.com",
      time: "5 dakika önce",
      type: "warning",
    },
    {
      action: "Sistem güncellemesi",
      user: "System",
      time: "1 saat önce",
      type: "info",
    },
    {
      action: "Kullanıcı silindi",
      user: "old.user@example.com",
      time: "2 saat önce",
      type: "danger",
    },
  ];

  const quickActions = [
    {
      title: "Kullanıcı Ekle",
      icon: Plus,
      color: "bg-blue-500",
      href: "/admin/users/add",
    },
    {
      title: "Sistem Ayarları",
      icon: Settings,
      color: "bg-purple-500",
      href: "/admin/settings",
    },
    {
      title: "Güvenlik Raporu",
      icon: Shield,
      color: "bg-green-500",
      href: "/admin/security",
    },
    {
      title: "Yedekleme",
      icon: Database,
      color: "bg-orange-500",
      href: "/admin/backup",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        stat.positive
                          ? "text-green-400 bg-green-400/20"
                          : "text-red-400 bg-red-400/20"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-white/80 text-sm font-medium mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Hızlı İşlemler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href} className="group">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group-hover:scale-105">
                      <div
                        className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold">
                        {action.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">Hızlı erişim</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Son Aktiviteler
              </h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            activity.type === "success"
                              ? "bg-green-400"
                              : activity.type === "warning"
                              ? "bg-yellow-400"
                              : activity.type === "danger"
                              ? "bg-red-400"
                              : "bg-blue-400"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">
                            {activity.action}
                          </p>
                          <p className="text-white/60 text-xs">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Güvenlik Merkezi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">
                    Güvenlik Durumu
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Firewall</span>
                    <span className="text-green-400 text-sm">Aktif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">SSL Sertifikası</span>
                    <span className="text-green-400 text-sm">Geçerli</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">
                      İki Faktörlü Doğrulama
                    </span>
                    <span className="text-green-400 text-sm">Zorunlu</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">
                    Güvenlik Uyarıları
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                      3 başarısız giriş denemesi tespit edildi
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Son 1 saat içinde
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-white/60 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Erişim Reddedildi
          </h1>
          <p className="text-white/70 mb-8">
            Bu sayfayı görüntülemek için admin yetkisi gereklidir.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
              {role}
            </div>
          </div>

          <p className="text-white/70">
            Admin paneline hoşgeldiniz. Sistem durumunu kontrol edin ve yönetim
            işlemlerini gerçekleştirin.
          </p>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
