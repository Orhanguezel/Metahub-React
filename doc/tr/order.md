
---

# 📦 **Order (Sipariş) Modülü – Teknik Analiz Raporu (RadanoR)**

---

## 🎯 Amaç

Bu modül, ziyaretçiler tarafından verilen siparişlerin backend tarafında kayıt altına alınması, yönetilmesi ve admin panelde takip edilmesi için geliştirilmiştir. Sipariş akışı hem kullanıcı tarafı (checkout) hem de admin yönetimi (sipariş durumu, teslimat vs.) açısından ikiye ayrılır.

---

## 🧱 Dosya Yapısı

```
src/modules/order/
├── order.models.ts
├── order.controller.ts
├── order.routes.ts
├── order.validation.ts
├── admin.order.routes.ts
├── admin.order.controller.ts
└── index.ts
```

---

## 🧩 Sipariş Modeli (`order.models.ts`)

```ts
user: ObjectId                    // Siparişi veren kullanıcı
items: OrderItem[]               // Ürünler (adet, fiyat, ürün referansı)
totalAmount: number              // Genel toplam
paymentStatus: "pending" | ...   // Ödeme durumu
deliveryStatus: "pending" | ...  // Teslimat durumu
shippingAddress: AddressSchema   // Gömülü adres bilgisi
note?: string                    // Sipariş notu (opsiyonel)
timestamps: true
```

### `OrderItem` yapısı:

```ts
product: ObjectId                // Ürün referansı
quantity: number                 // Sipariş edilen miktar
priceAtPurchase: number         // Sipariş anındaki fiyat
```

---

## 🌐 Public Controller (`order.controller.ts`)

### 🟢 Kullanıcıya Açık Uçlar:

* `POST /order`: Sipariş oluşturur
* `GET /order/my-orders`: Kullanıcının geçmiş siparişlerini getirir
* `GET /order/:id`: Tekil sipariş bilgisi (sadece kendi siparişi)

> 💳 Sipariş oluşturma esnasında kullanıcı doğrulaması (`req.user.id`) zorunludur.

---

## 🔒 Admin Controller (`admin.order.controller.ts`)

### 🔧 Yönetsel Fonksiyonlar:

* `GET /admin/order`: Tüm siparişleri listeler (filter, sort desteklenebilir)
* `GET /admin/order/:id`: Sipariş detayı
* `PUT /admin/order/:id/status`: Durum güncellemesi (teslimat, ödeme)
* `DELETE /admin/order/:id`: Sipariş silme (opsiyonel – soft delete mantığı önerilir)

---

## ✅ Validasyon (`order.validation.ts`)

Sipariş oluştururken kontrol edilenler:

* `items[]` → ürün ID + miktar + fiyat bilgisi zorunlu
* `shippingAddress` → `street`, `city`, `zipCode` vs.
* `note` alanı sınırlı uzunlukta olmalı (örn. max 500 karakter)

> ✨ Tüm alanlar `express-validator` ile kontrol altında.

---

## 🔗 Bağlantılar

| Alan              | İlişki                                  |
| ----------------- | --------------------------------------- |
| `user`            | `User` modelinden referans              |
| `items.product`   | `Product` (`radonarprod`) referansı     |
| `shippingAddress` | Adres modülünden türetilmiş gömülü alan |

---

## 🔁 Sipariş Lifecycle

1. Ziyaretçi ödeme/sipariş ekranından `POST /order` ile siparişi tamamlar.
2. Sipariş `pending` durumunda kayıt edilir.
3. Admin panel üzerinden `deliveryStatus` ve `paymentStatus` güncellenir.
4. Gerekirse sipariş silinebilir veya arşivlenebilir.

---

## 🧠 Admin Panel Entegrasyonu

* Sidebar’da "Orders" modülü
* Sipariş tablosu: kullanıcı, ürün sayısı, tutar, durum, tarih
* Detay modal veya sayfa: shipping info, ürün detayları
* Durum güncelleme (dropdown veya modal)
* Arama & filtreleme (kullanıcı, tarih, durum bazlı)

---

## 📈 Meta & Otomatik Entegrasyon

* `generate:meta` ile otomatik meta dosyası oluşturulur
* Swagger + Frontend admin yapılandırması bu dosya ile sağlanır

---

## ✅ Güçlü Yönler

| Özellik                  | Açıklama                                 |
| ------------------------ | ---------------------------------------- |
| 🔒 Kimlik doğrulama      | Sipariş sadece login kullanıcıya açık    |
| 🔁 Product & User bağlı  | İlişkili veri yönetimi kolay             |
| 🧾 Gömülü adres desteği  | Siparişle birlikte adres de kayıt edilir |
| ✏️ Admin güncelleyebilir | Durumlar dinamik olarak güncellenebilir  |
| 🧪 Validasyon güçlü      | Sipariş yapısı detaylıca kontrol edilir  |

---

## 📬 Geliştirme Önerileri

1. 📦 Sipariş durumu için enum + tarih log yapısı (ör. `deliveredAt`)
2. 🧾 Fatura modülü entegrasyonu (`invoice`)
3. 📊 Sipariş istatistikleri (`dashboard`)
4. 🧠 Otomatik email bildirimleri (`email` modülü)
5. 🔐 Admin panelde yetkilendirme (sadece `admin`, `staff` görsün)

---
