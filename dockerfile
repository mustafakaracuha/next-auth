# Temel image
FROM node:18-alpine

# Çalışma dizini
WORKDIR /app

# Bağımlılıkların yüklenmesi
COPY package*.json ./
RUN npm install

# Proje dosyalarının kopyalanması
COPY . .

# Build işlemi (Next.js production için)
RUN npm run build

# Port açılması
EXPOSE 3000

# Uygulamanın başlatılması
CMD ["npm", "run", "dev"]
