# 🛡️ Next.js + Auth0 OAuth2.0 + JWT Kimlik Doğrulama Sistemi

Güvenli, ölçeklenebilir ve taşınabilir bir kimlik doğrulama & yetkilendirme sistemi.

---

## 🚀 Özellikler

✅ Auth0 ile OAuth2.0 entegrasyonu  
✅ JWT tabanlı oturum yönetimi  
✅ Middleware ile role-based yetkilendirme  
✅ Next.js 14+ App Router kullanımı  
✅ SOLID prensiplerine uygun modüler yapı  
✅ 12Factor App uyumlu yapılandırma (.env)  
✅ TailwindCSS ile responsive login UI  
✅ TypeScript ile güvenli kod  
✅ Git branching: `dev/v1.0.0` → `prod/v1.0.0`

---

## 🧱 Teknolojiler

| Teknoloji       | Açıklama                              |
|----------------|----------------------------------------|
| [Next.js 14+](https://nextjs.org) | Modern React tabanlı framework        |
| [Auth0](https://auth0.com)       | OAuth2.0 sağlayıcısı                  |
| [NextAuth.js](https://next-auth.js.org) | Kimlik doğrulama kütüphanesi          |
| [JWT](https://jwt.io/)           | JSON Web Token tabanlı oturum yönetimi |
| [TailwindCSS](https://tailwindcss.com) | UI tasarımı için yardımcı sınıflar     |
| TypeScript       | Tip güvenliği için statik dil         |
| Git / GitHub     | Sürüm kontrol ve iş birliği          |

---

## 📁 Proje Yapısı

```

.
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── admin/
│   └── not-found.tsx
├── components/
├── middleware.ts
├── /api/auth/\[...nextauth].ts
├── public/
├── styles/
├── .env.local
├── README.md
└── tsconfig.json

````

---

## Kurulum

### 1. Repositories

```bash
git clone https://github.com/mustafakaracuha/next-auth.git
cd next-auth
git checkout -b dev/v1.0.0
````

### 2. .env.local Ayarları

```env
AUTH0_CLIENT_ID=xxxxxx
AUTH0_CLIENT_SECRET=xxxxxx
AUTH0_ISSUER=https://your-tenant.auth0.com
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. Paketleri Yükle

```bash
npm install
```

### 4. Geliştirme Sunucusu

```bash
npm run dev
```

---

## 🔐 Auth0 & NextAuth Entegrasyonu

* Auth0 Dashboard üzerinden bir uygulama oluştur
* `Callback URL`: `http://localhost:3000/api/auth/callback/auth0`
* `Allowed Logout URLs`: `http://localhost:3000`

---

## 🧩 Role Tabanlı Yetkilendirme

```ts
// middleware.ts içinde
if (pathname.startsWith("/admin") && !roles.includes("Admin")) {
  return NextResponse.redirect("/unauthorized");
}
```

Role bilgisi, JWT token içinden alınır ve middleware tarafından işlenir.

---

## 🧪 Test Senaryoları

* [x] Giriş yapmamış kullanıcı `/dashboard` → redirect
* [x] "user" rolündeki kullanıcı `/admin` → `/unauthorized`
* [x] Admin kullanıcı `/admin` → erişim başarılı
* [x] Invalid token → logout & redirect
* [x] Yetkisiz erişim → `/unauthorized` sayfasına yönlendirme

---

## ✨ Ekran Görüntüsü

![Login Sayfası](https://github.com/mustafakaracuha/next-auth/blob/prod/v1.0.0/src/assets/screenshots/login.png)
![Dashboard Sayfası](https://github.com/mustafakaracuha/next-auth/blob/prod/v1.0.0/src/assets/screenshots/dashboard.png)

```
