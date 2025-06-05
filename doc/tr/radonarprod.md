
---

# 🛍️ **RadonarProduct & Category Modülü – Teknik Analiz Raporu**

---

## 📦 MODÜL 1: `radonarprod` – Ürün Modülü

### 🔹 Amaç:

Ürünlerin (ör. bisiklet, ekipman, hizmet) dinamik şekilde tanımlanması, kategoriye bağlanması ve hem admin hem de ziyaretçi panelinden erişilebilir hale getirilmesidir.

### 📁 Dosya Yapısı:

```
src/modules/radonarprod/
├── radonarprod.model.ts
├── public.radonarprod.routes.ts
├── public.radonar.prod.controller.ts
├── admin.radonarprod.routes.ts
├── admin.radonar.prod.controller.ts
├── radonar.prod.validation.ts
└── index.ts
```

### 🔸 Model Özellikleri (`radonarprod.model.ts`)

```ts
name: { tr, en, de }           // Çok dilli ürün adı
slug: string                   // Otomatik slug
description: { tr, en, de }    // Çok dilli açıklama
price: number                  // Ürün fiyatı
images: ImageObject[]          // Çoklu görsel desteği
category: ObjectId             // Kategori referansı (radonarcategory)
tags: string[]                 // Anahtar kelimeler
isActive: boolean              // Aktiflik
```

> 🔁 `category` alanı doğrudan `radonarcategory` modeline bağlanır (`populate()` ile)

---

### 🧩 Public Controller

`public.radonar.prod.controller.ts`:

* `getAllProductsPublic`: `isActive: true` olan ürünleri getirir.
* `getProductBySlug`: Slug üzerinden detaylı ürün sayfası için veri sağlar.

### 🔐 Admin Controller

`admin.radonar.prod.controller.ts`:

* `createProduct`: Yeni ürün oluşturur
* `updateProduct`: Mevcut ürünü günceller
* `deleteProduct`: Soft delete desteklenebilir
* `toggleActive`: Aktiflik durumunu değiştirir

> ☑️ Tüm işlemlerde validasyon `radonar.prod.validation.ts` ile sağlanır.

---

### 🌐 Routes Yapısı

* `/radonarprod` → Public erişim
* `/admin/radonarprod` → Admin erişim

---

## 📂 MODÜL 2: `radonarcategory` – Kategori Modülü

### 🔹 Amaç:

Ürünlerin kategorilere ayrılmasını sağlar. Böylece frontend'de filtreleme ve içerik düzenleme yapılabilir.

### 📁 Dosya Yapısı:

```
src/modules/radonarcategory/
├── radonarcategory.models.ts
├── radonarcategory.controller.ts
├── radonarcategory.routes.ts
├── radonarcategory.validation.ts
└── index.ts
```

### 🔸 Model Özellikleri (`radonarcategory.models.ts`)

```ts
title: { tr, en, de }           // Kategori adı
slug: string                    // Otomatik oluşturulur
description?: { tr, en, de }    // Açıklama (opsiyonel)
isActive: boolean               // Aktiflik durumu
createdAt, updatedAt           // Zaman damgası
```

> 🎯 Çok dilli destek `title` ve `description` üzerinden doğrudan sağlanıyor.

---

### ⚙️ Controller Fonksiyonları

`radonarcategory.controller.ts`:

* `getAllCategories`: Tüm aktif kategorileri getirir
* `getCategoryById`
* `createCategory`
* `updateCategory`
* `deleteCategory`

> Silme işleminde kategoriye bağlı ürün olup olmadığı kontrol edilmesi önerilir (`populate check`).

---

### 🌐 Routes

* `/radonarcategory` → Standart public/admin route olarak tanımlanmış

---

## 🔗 Entegrasyonlar

### 🔁 Bağlantı Noktaları:

* Her `radonarprod` ürününün `category` alanı `radonarcategory` ile `ObjectId` referansıdır.
* Ürün `populate("category")` ile detay sayfasında kategori bilgilerini içerebilir.
* Frontend filtreleme için kategori listesi `GET /radonarcategory` üzerinden alınır.
* Sidebar, filtre veya anasayfa listelemede bu bağlantı kullanılır.

---

## 📊 Meta & Frontend Kullanımı

* `generate:meta` komutu her iki modülün de meta dosyasını üretir.
* Bu dosyalar admin panelde şu işlevleri sağlar:

  * Sidebar’a modülün gelmesi
  * Form alanlarının otomatik oluşturulması
  * Swagger entegrasyonu

---

## ✅ Güçlü Yönler

| Özellik                         | Açıklama                                        |
| ------------------------------- | ----------------------------------------------- |
| 🌍 Çok dilli alanlar            | Ürün & Kategori isimleri ve açıklamaları        |
| 🔄 Kategori bağlantısı          | Ürünler filtrelenebilir ve ilişkilendirilebilir |
| 🧱 Ayrı admin/public controller | Güvenli ve temiz modül ayrımı                   |
| 📸 Çoklu görsel desteği         | `images[]` alanı sayesinde                      |
| 🧠 Meta sistemi uyumu           | Swagger + Frontend Admin Panel uyumlu           |

---

## 🧩 Öneriler & Geliştirme İpuçları

1. 🔒 Kategori silme işleminde bağlı ürün kontrolü yapılmalı
2. 📦 Ürünlerde `stock` veya `availability` alanı eklenebilir
3. 🏷️ `tags` alanı ile filtreleme yapılacaksa, backend’de tag bazlı endpoint sağlanabilir
4. 📂 Ürün görselleri için thumbnail optimizasyonu yapılabilir (`Cloudinary`, `sharp`)

---
