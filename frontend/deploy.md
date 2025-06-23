Evet, şimdi frontend'i tekrar build edip PM2 ile başlatmamız gerekiyor. Aşağıdaki adımları takip edelim:

### 1. Önceki Build Dosyalarını Silme:

Öncelikle, eski build dosyalarını silerek temize başlıyoruz.

```bash
# Frontend klasörüne gidiyoruz
cd /var/www/RadanoR/frontend

# Eski build dosyalarını siliyoruz
rm -rf dist
rm -rf build
rm -rf .turbo
rm -rf .next
rm -rf node_modules/.cache
```

### 2. Yeni Build Yapma:

Şimdi, yeni bir build oluşturuyoruz.

```bash
# Build işlemi yapıyoruz
bun run build
# veya
npm run build
```

### 3. PM2 ile Frontend'i Başlatma:

Build işlemi tamamlandıktan sonra, PM2 ile frontend'i başlatabiliriz.

```bash
# PM2 ile frontend'i başlatıyoruz
pm2 start /var/www/RadanoR/frontend/dist/index.html --name "radanor-frontend"

# PM2 durumunu kontrol ediyoruz
pm2 status
```

### 4. Sorunsuz Çalıştığını Kontrol Etme:

Şimdi frontend'in çalışıp çalışmadığını kontrol edelim. Tarayıcı üzerinden `http://localhost:5173`'e giderek uygulamanın düzgün çalışıp çalışmadığını test edin.

---

Bu adımları takip ettikten sonra frontend'iniz başarıyla başlatılacak ve API ile bağlantı kurabilecektir. Eğer başka bir sorunla karşılaşırsanız, devam edebiliriz.
