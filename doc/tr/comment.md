
---

# 💬 **Comment (Yorum) Modülü – RadanoR Projesi Teknik Raporu**

---

## 🎯 Amaç

Bu modül, ürünler (ve ileride blog, hizmet gibi içerikler) için ziyaretçilerin yorum bırakmasını, admin/moderatörlerin ise bu yorumları denetlemesini sağlar. Yorumlar çoklu içerik tipiyle ilişkilidir (`product`, `blog`, `service`) ve `soft delete` ile güvenli şekilde arşivlenebilir.

---

## 🧱 Dosya Yapısı

```
src/modules/comment/
├── comment.models.ts             // Mongoose şema tanımı
├── comment.routes.ts             // Route tanımlamaları (public + admin)
├── comment.controller.ts         // Tüm işlem fonksiyonları
├── comment.validation.ts         // Express-validator ile doğrulama
├── index.ts                      // Modül export
└── comment-module.md             // Açıklayıcı dokümantasyon
```

---

## 🧩 Model Yapısı (`comment.models.ts`)

```ts
contentType: "product" | "blog" | "service"  // Dinamik içerik türü
contentId: ObjectId                          // İlişkili içerik (ör. ürün ID)
name: string                                 // Yorum yapan kişinin adı
email: string                                // Email (select:false olabilir)
comment: string                              // Yorum içeriği
isPublished: boolean                         // Yayın durumu
isActive: boolean                            // Silinip silinmediği
timestamps: true                             // createdAt / updatedAt
```

### 🔐 Güvenlik ve Normalizasyon

* `email` alanı validasyon sonrası normalize edilebilir (`toLowerCase`, `trim`).
* `comment` alanı XSS'e karşı sanitize edilebilir.
* `contentType` enum olarak kontrol altında.

---

## 🌍 Public API Uçları

### ➕ `POST /api/comments/`

* Ziyaretçi yorum gönderir.
* Validasyon sonrası kayıt edilir.
* Otomatik olarak `isPublished: false` olarak kaydedilir → admin onayı gerekir.

### 🔍 `GET /api/comments/:type/:id`

* Belirli bir ürün/blog/hizmet için yorumları listeler.
* Sadece `isPublished: true && isActive: true` olan yorumlar gelir.

---

## 🔒 Admin API Uçları

### 📋 `GET /api/comments/`

* Tüm yorumları listeler.
* Admin panelde gösterim içindir.

### ✏️ `PUT /api/comments/:id/toggle`

* Yorumun yayın durumunu değiştirir.
* Örn: `false → true` veya `true → false`.

### 🗑️ `DELETE /api/comments/:id`

* Yorum silinmez.
* `isActive: false` yapılarak sistemden gizlenir (`soft delete`).

---

## 🧠 Validasyon Mantığı (`comment.validation.ts`)

* `name`: 2–50 karakter arası, trim edilir.
* `email`: Geçerli format, normalize edilebilir.
* `comment`: 5–500 karakter
* `contentType`: Sadece `product`, `blog`, `service` kabul edilir.
* `contentId`: Geçerli MongoDB ObjectId olmalıdır.

> 🚫 Spam ve injection önlenmesi için içerik uzunluğu ve içerik tipi kontrollü.

---

## 🔄 Frontend Entegrasyonu

* Ürün detay sayfasında `GET /api/comments/product/:id` ile yorumlar çekilir.
* Yorum formu üzerinden `POST /api/comments/` yapılabilir.
* Admin panelde `GET /api/comments` ile tüm yorumlar listelenir.
* Onaylama: `PUT /api/comments/:id/toggle`
* Arşivleme: `DELETE /api/comments/:id`

---

## ✅ Güçlü Yönler

| Özellik                    | Açıklama                                                |
| -------------------------- | ------------------------------------------------------- |
| 🔄 İçerik tipine bağlı     | `product`, `blog`, `service` gibi içerikler desteklenir |
| 🔐 Yayın/onay süreci       | Moderasyon kontrollü yapı                               |
| 🛑 Soft delete desteği     | Yorumlar silinmez, arşivlenir                           |
| 🧪 Validasyon katmanı      | Sıkı input kontrolü (adı, email, içerik vs.)            |
| 🌍 Genel & yönetici uçları | Ayrı ayrı route yapısı ile güvenli mimari               |
| 💬 Çok sayfalı yorumlar    | (Henüz yok ama `limit`, `skip` eklenebilir)             |

---

## 🔗 Entegrasyon Önerileri (RadanoR)

* `radonarprod` detay sayfasında yorumları göster.
* Yorum bırakan kişilere `email` ile teşekkür/teyit gönderimi ileride eklenebilir.
* Spam için CAPTCHA koruması veya rate limit entegre edilebilir.
* `notification` modülü ile yeni yorum geldiğinde admin bilgilendirilebilir.
* Frontend admin yorum modülü meta ile otomatik açılabilir (`generate:meta` desteği var).

---