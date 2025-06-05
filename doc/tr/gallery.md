
---

# 🖼️ **Gallery Modülü – Teknik Mimari & Yol Haritası**

---

## 🎯 Modülün Amacı

Gallery modülü; bir sitenin **hero**, **hakkımızda**, **ürün**, **slider**, **tanıtım** gibi bölümlerinde kullanılacak olan görsellerin çok dilli başlıklar, açıklamalar ve kategorilere ayrılmış şekilde yönetilmesini sağlar.

Modül; thumbnail üretimi, optimizasyon, sıralama, yayında/arsivde olma durumu gibi gelişmiş yetenekler sunar.

---

## 📁 Dosya Yapısı

```bash
src/modules/gallery/
├── gallery.models.ts
├── gallery.validation.ts
├── gallery.routes.ts
├── gallery.public.controller.ts
├── gallery.admin.controller.ts (yok ama önerilir)
├── index.ts
└── road.mad.md
```

---

## 🧩 Model Özeti (Tahmini)

```ts
{
  title: { tr, en, de },         // Çok dilli başlık
  description?: { tr, en, de },  // Açıklama
  image: ImageObject,            // url, thumbnail, alt
  category: ObjectId,            // galleryCategory bağlantısı
  isPublished: boolean,          // Yayın durumu
  isActive: boolean,             // Silinmiş mi (soft delete)
  order: number,                 // Kategori içi sıralama
  priority?: number,             // Global öncelik
  createdAt, updatedAt
}
```

---

## 🧠 Controller İşlevleri

### Public Controller (`gallery.public.controller.ts`)

* `getAllGalleryItems`: Yalnızca `isPublished && isActive` olanları getirir
* `getGalleryByCategory`: Belirli kategoriye ait görselleri listeler
* Dil fallback desteği vardır → `title[lang] || title.en || ...`

### Admin Controller (henüz yok)

* `createGalleryItem`
* `updateGalleryItem`
* `togglePublishStatus`
* `softDeleteGalleryItem`
* `restoreGalleryItem`

---

## ✅ Geliştirme Planı (road.mad.md)

Aşağıda roadmap’teki her maddeyi teknik olarak detaylandırıyorum:

### 1. **Thumbnail Ayarı (`.env`)**

```env
THUMBNAIL_WIDTH=400
THUMBNAIL_HEIGHT=300
THUMBNAIL_QUALITY=80
```

* `sharp` ile otomatik webp + thumbnail versiyonu oluşturulur.
* `multer` veya özel middleware'de uygulanabilir.

---

### 2. **Kategori Bazlı Sıralama**

* `order` alanı: kategori içi sıralama
* `priority`: kategori bağımsız öncelik (global carousel gibi durumlarda)
* Controller sorting: `{ category, order }`

---

### 3. **Soft Delete – Restore**

```http
PATCH /gallery/:id/restore
```

* `isActive = true` yapılır.
* Admin panelde silinmişler arşiv olarak tutulabilir.

---

### 4. **Batch İşlemler**

* Çoklu publish/unpublish:

  ```http
  PATCH /gallery/batch/publish
  body: [id1, id2, id3]
  ```
* Çoklu silme:

  ```http
  DELETE /gallery/batch
  body: [id1, id2, id3]
  ```

---

### 5. **Arama & Filtreleme**

* Desteklenen query parametreleri:

  ```
  ?search=title_en:team
  ?isPublished=true&isActive=true
  ```
* `regex` ile dil bazlı arama yapılır

---

### 6. **İstatistik Endpoint’i**

```http
GET /gallery/stats
```

```json
{
  "total": 50,
  "byCategory": {
    "hero": 10,
    "about": 5,
    "products": 20
  },
  "published": 40,
  "archived": 10
}
```

→ Admin dashboard için hazır veri yapısı sağlar.

---

### 7. **Multilingual Fallback Desteği**

```ts
item.title[lang] || item.title.en || item.title.tr
```

* Kullanıcı dili belirli değilse `en`, sonra `tr`, sonra `de` döner.

---

### 8. **WebP Optimizasyon**

* Her görsel yüklemede hem `.jpg` hem `.webp` versiyonu oluşturulmalı
* `sharp().webp().toFile(...)` kullanımı

---

## 🔄 Entegrasyon Önerileri

* Ana sayfa slider → `category = "hero"`
* Hakkımızda → `category = "about"`
* Ürün galerisi → `category = "products"`
* Galeri verileri çoklu dil destekli şekilde alınmalı
* Panelde sıralama sürükle-bırak destekli yapılabilir (future feature)

---

## 📌 Güçlü Yönler

| Özellik            | Açıklama                                 |
| ------------------ | ---------------------------------------- |
| 📸 Çoklu görsel    | thumbnail + webp desteği                 |
| 🌍 Çok dilli       | `title`, `description` alanları          |
| 🧠 Meta uyumu      | Admin panel + Swagger için otomatik meta |
| 🔄 Soft delete     | Yorumlar gibi arşivleme yapılabilir      |
| 📊 Stats endpoint  | Dashboard için veri hazır                |
| 🔍 Gelişmiş filtre | Regex + query ile adminde detaylı arama  |

---

## 🎯 Sonuç

Gallery modülü, hem görsel yönetimini kolaylaştıran hem de performans, i18n ve optimizasyon açısından güçlü bir yapı sunuyor. `road.mad.md` dosyasındaki maddeler sistemli şekilde uygulanırsa bu modül, her projede kullanılabilecek bir **Reusable Visual Content Manager**'a dönüşür.
