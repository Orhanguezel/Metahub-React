
---

# ⚙️ **Settings (Ayarlar) Modülü – Teknik İnceleme ve Mimari Raporu**

---

## 🎯 Amaç

Bu modül, **global ayarların merkezi olarak yönetilmesini** sağlar. Site başlığı, açıklama, tema, ödeme ayarları, sosyal medya bağlantıları, logo, dil seçenekleri gibi yapılandırmalar buradan yapılır.

RadanoR projesinde bu sistem hem çoklu dil destekli hem de **otomatik meta & frontend** entegrasyonu ile çalışır.

---

## 📁 Dosya Yapısı

```
src/modules/setting/
├── setting.models.ts          # Ayar modeli
├── setting.controller.ts      # CRUD işlemleri
├── setting.routes.ts          # Route tanımı
├── setting.validation.ts      # Validasyon şeması
├── settingKeys.ts             # Tanımlı anahtarlar
├── index.ts                   # Modül export
```

---

## 🧱 Mongoose Modeli (`setting.models.ts`)

```ts
key: string                          // Ayarın anahtarı (ör. site_title)
value: any                           // Herhangi bir veri tipi olabilir
type: "string" | "object" | ...      // Değer tipi
isMultiLang: boolean                 // Çok dilli destek varsa true
isImage: boolean                     // Görsel ayarı mı (ör. logo)
isNestedObject: boolean              // İç içe obje mi
group?: string                       // Ayar grubu (ör. theme, seo)
```

### 🌐 Çok Dilli ve Görsel Destek

* `isMultiLang: true` olanlar JSON formatında değer içerir:

  ```json
  {
    "en": "Welcome",
    "tr": "Hoşgeldiniz",
    "de": "Willkommen"
  }
  ```

* `isImage: true` olanlar bir dosya yükleme süreci ile çalışır. Örneğin `logo`, `favicon`, `coverImage`.

---

## 🧠 `settingKeys.ts` – Ayar Tipleri

Sistemsel olarak hangi ayarların olabileceği, tipi, açıklaması gibi bilgiler burada JSON benzeri yapılarla tanımlanmıştır:

```ts
export const SETTING_KEYS = {
  site_title: {
    type: "string",
    group: "general",
    isMultiLang: true
  },
  logo: {
    type: "string",
    isImage: true,
    group: "branding"
  }
}
```

> Bu yapı, frontend form oluşturma ve validasyon için de kullanılır. Otomasyon sağlar.

---

## 🔧 Controller İşlemleri (`setting.controller.ts`)

### 🔹 `upsertSetting`

* Yeni ayar oluşturur veya var olanı günceller.
* Eğer `isImage: true` ise dosya yükleme ile çalışır (`req.file`).
* Eğer `isMultiLang: true` ise değer çok dilli obje olarak beklenir.
* Aynı key’e sahip veri varsa günceller (`upsert` mantığı).

### 🔹 `getAllSettings`

* Tüm ayarları gruplarına göre listeler.
* `group` parametresiyle filtreleme yapılabilir.
* Frontend admin paneli için kullanılır.

### 🔹 `deleteSetting`

* Ayarı tamamen siler.
* Eğer `isImage: true` ise ilişkili dosya da silinir.

---

## ✅ Validasyon Katmanı (`setting.validation.ts`)

* `key` alanı zorunlu ve string
* `value` alanı dinamik olarak kontrol edilir
* Eğer `isImage`, `isMultiLang`, `isNestedObject` gibi değerler varsa ona uygun validasyon yapılır
* `file` upload desteği bulunur (`multer` veya `uploadMiddleware` ile)

---

## 🌐 Route Tanımları (`setting.routes.ts`)

```
POST    /settings/          → upsertSetting
GET     /settings/          → getAllSettings
DELETE  /settings/:key      → deleteSetting
```

> Tüm işlemler `authenticate` + `authorizeRoles("admin")` ile koruma altındadır.

---

## 🔄 Frontend Entegrasyonu (Admin Panel)

`settingsSlice.ts` ile entegredir. Panelden:

* Mevcut ayarlar listelenir (`getAllSettings`)
* Form üzerinden güncellenir (`upsertSetting`)
* Yeni tema veya dil desteği buradan devreye alınabilir
* Görsel dosyalar doğrudan seçilip yüklenebilir (`logo`, `footer_bg`, `navbar_logo` vb.)

---

## 📊 MetaConfig Entegrasyonu

`generate:meta` komutu çalıştırıldığında:

* Her ayar tipi analiz edilir
* Admin formu otomatik oluşturulacak şekilde JSON schema üretilir
* `meta-configs/` klasöründe setting dosyası oluşur

---

## ✅ Güçlü Yönler

| Özellik              | Açıklama                                                   |
| -------------------- | ---------------------------------------------------------- |
| 🔄 Dinamik yapı      | Yeni ayar eklemek sadece `settingKeys.ts` ile mümkün       |
| 🖼️ Görsel destek    | Dosya yüklemeli ayar (logo, background, vs.)               |
| 🌍 Çok dilli destek  | Global site metni, açıklamalar dil bazlı                   |
| 🧠 Meta-config uyumu | Admin panel formları otomatik oluşturulabilir              |
| ♻️ Reuse yeteneği    | Aynı yapı farklı projelerde rahatça yeniden kullanılabilir |

---

## 🧩 Öneriler

1. 🔐 Ayar düzeyinde değişiklik log sistemi eklenebilir
2. ☁️ CDN destekli görsel yükleme (örn. Cloudinary) aktif hale getirilebilir
3. 🧪 Ayarlar için cache mekanizması (Redis gibi) performans artırabilir
4. 🧩 Bazı ayarlar frontend'e SSR sırasında otomatik inject edilebilir (`/public-settings` route ile)

---