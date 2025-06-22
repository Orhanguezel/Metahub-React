
---

# 📒 **Radanor Frontend & MetaHub Backend Entegrasyon Dokümanı**

---

## 1️⃣ **Genel Mimari**

* **Backend**: [MetaHub](https://github.com/xxx/metahub-backend) (Çok kiracılı, tenant-aware, REST API)
* **Frontend**: Radanor için özel Vite + React projesi (ör. `radanor-frontend`)
* **Tenant (Kiracı) İsmi**: `radanor`
* Her frontend kendi domaininden (ör: `radanor.com` veya lokal geliştirirken `localhost:5173`) MetaHub backend API’sine istek atacak.
* **Her tenant (ör: radanor) kendi veritabanı, ortam değişkenleri, teması ve API bağlantıları ile çalışır.**

---

## 2️⃣ **Backend API Bağlantısı ve Tenant Bilgisi**

* **MetaHub backend**, API isteklerinden hangi tenant’a hizmet vereceğini anlamak için şu yolları kullanır:

  * 1. **x-tenant** HTTP Header (en güvenli ve önerilen yol)
  * 2. **Host veya Origin** başlığındaki domain (kendi mapping’inde çözülür)
  * 3. Localhost için `.env` veya fallback tenant

### **Her API isteğinde mutlaka tenant’ı belirtin!**

* Lokal geliştirirken veya production’da:

  * **API çağrılarında mutlaka `x-tenant` header’ını gönderin ve değerini `"radanor"` yapın.**

**Örnek axios ayarı:**

```js
// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.metahub.com", // ya da "http://localhost:5019"
  withCredentials: true,
  headers: {
    "x-tenant": "radanor", // Kiracı ismi!
  },
});

export default api;
```

> Eğer başka axios örneği açıyorsan, her isteğe header olarak `"x-tenant": "radanor"` eklemeyi UNUTMA.

---

## 3️⃣ **Vite .env Ayarları**

**Örnek:**
`.env.local` veya `.env` dosyanıza aşağıdakileri ekleyin:

```
VITE_API_URL=http://localhost:5019    # Lokal geliştirme
# VITE_API_URL=https://api.metahub.com  # Production
VITE_TENANT=radanor
```

API çağrılarınızda bu değişkenleri kullanın:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "x-tenant": import.meta.env.VITE_TENANT,
  },
});
```

---

## 4️⃣ **Auth (Giriş/Çıkış) ve Cookie**

* **MetaHub backend** HTTP-only cookie ile oturum yönetir.
* API çağrılarında `withCredentials: true` kullanılması ZORUNLUDUR.
* Farklı domain/subdomain’de çalışıyorsanız:

  * Backend’de **CORS ayarları** (origin, credentials) doğru olmalı (MetaHub zaten çok tenant’lı için ayarlı).
  * Frontend’de ise isteklerde `withCredentials` mutlaka true olmalı.

---

## 5️⃣ **API Çağrıları İçin Rehber**

* Tüm `fetch`, `axios`, `apiCall` fonksiyonlarında:

  * `baseURL` ve `x-tenant` doğru ayarlanmalı
  * `withCredentials: true` eklenmeli

**Kendi yardımcı fonksiyonunuzu şu şekilde ayarlayın:**

```js
// src/api/apiCall.js (örnek)
import api from "./api";

export default async function apiCall(method, url, data = null, options = {}) {
  const config = {
    method,
    url,
    data,
    ...options,
    withCredentials: true,
    headers: {
      ...options.headers,
      "x-tenant": import.meta.env.VITE_TENANT,
    },
  };
  return api(config);
}
```

---

## 6️⃣ **Özel Temalar / Konfigürasyon**

* Her tenant’ın backend’de kendine ait tema/ayar/branding verisi olabilir (`/settings`, `/company` gibi endpointlerle çekebilirsiniz).
* Frontend’de gelen ayarlara göre logo, renkler, footer vs. dinamik yapılmalı (isteğe göre backend’den çekilebilir).

---

## 7️⃣ **Güvenlik & Hatalar**

* Her API çağrısında `401 Unauthorized` veya `403 Forbidden` gelirse:

  * Oturumunuz düşmüş olabilir, tekrar giriş yapın.
  * API çağrılarında `x-tenant` eksik olabilir, kontrol edin.
  * CORS hatası alırsanız, backend CORS ayarlarını kontrol edin.

---

## 8️⃣ **Özet Kontrol Listesi**

* [ ] API çağrılarında `baseURL` MetaHub backend mi?
* [ ] Her istekle `"x-tenant": "radanor"` header’ı gönderiliyor mu?
* [ ] `withCredentials: true` tüm auth ve korumalı endpointlerde var mı?
* [ ] .env dosyanızda `VITE_API_URL` ve `VITE_TENANT` doğru mu?
* [ ] Oturum açınca backend’den cookie geliyor mu?
* [ ] Tenant’a özel tema veya ayar endpointlerinden veri çekiliyor mu?

---

## 9️⃣ **Ek Notlar ve SSS**

* **Aynı backend’e farklı frontendlere sahip farklı projeler bağlanabilir.**
* Her frontend kendi “tenant” adı ile çalışmalı.
* Domain mapping (örn: radanor.com, demo.radanor.com) backend’in `tenants.json`’unda tanımlı olmalı.
* Yeni frontend eklerken `x-tenant` header’ı doğru şekilde göndermek yeterli!

---

## 1️⃣0️⃣ **İletişim & Destek**

* Sorun yaşarsanız:

  * Backend loglarında `"tenant"` alanını kontrol edin.
  * API response’larında `tenant` ile ilgili hata mesajlarına bakın.
  * Geliştirici olarak backend ve frontend loglarını karşılaştırın.

---

## 🎁 **Örnek Kullanım Akışı (Lokal)**

1. MetaHub backend’i başlat:

   ```bash
   pnpm start # veya npm run start
   ```
2. Radanor frontend’i başlat:

   ```bash
   pnpm dev # veya npm run dev
   ```
3. Frontend’den örnek API isteği:

   ```js
   const response = await apiCall("get", "/products");
   // => Otomatik olarak x-tenant header’ı ve cookie ile istek gidecek
   ```

---

> **Sonuç:**
> Radanor ekibi, MetaHub backend’e eksiksiz ve güvenli şekilde bağlanmak için sadece doğru tenant bilgisini ve oturum yönetimini gözetmeli. Herkesin anlayabileceği sade kurallarla yukarıdaki rehberi uygulayın, tüm sistem problemsiz çalışacaktır.

---
