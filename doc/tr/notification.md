
---

# 🔔 **Notification (Bildirim) Modülü – RadanoR Teknik Raporu**

---

## 🎯 Amaç

Bu modül, sistemde oluşan önemli olayları (örneğin: yeni yorum, sipariş, ödeme gibi) **bildirim olarak kaydetmek** ve admin panelde veya kullanıcı arayüzünde bunları **listelenebilir hale getirmek** için tasarlanmıştır.

---

## 📁 Dosya Yapısı

```
src/modules/notification/
├── notification.models.ts         // Mongoose veri modeli
├── notification.routes.ts         // Route tanımları
├── notification.controller.ts     // Ana controller işlemleri
├── notification.validation.ts     // Express-validator kontrolleri
└── index.ts
```

---

## 🧩 Model Yapısı (`notification.models.ts`)

```ts
user: ObjectId                // Bildirimin kime ait olduğu
type: string                  // Bildirim tipi (ör: "comment", "order", "feedback")
message: string               // Gösterilecek mesaj (çok dilli olabilir)
isRead: boolean               // Okunma durumu
data: object                  // Ek meta veri (detay linki, ID, vb.)
isActive: boolean             // Silinip silinmediği (soft delete)
timestamps: true              // createdAt / updatedAt otomatik
```

> 💡 `data` alanı JSON olarak esnek yapıdadır. Örn: `{ contentId, redirectUrl }`

---

## 🚀 Controller Fonksiyonları (`notification.controller.ts`)

### 🔍 `getAllNotifications`

* Admin veya kullanıcıya ait bildirimleri listeler.
* `isActive: true` ve isteğe bağlı olarak `userId` filtresi içerir.

### ➕ `createNotification`

* Yeni bildirim oluşturur.
* Diğer modüller (örneğin `comment`, `payment`, `order`) buraya tetikleyici olarak erişebilir.

### ✏️ `markAsRead`

* Belirli bir bildirimi `isRead: true` olarak işaretler.

### 🧹 `deleteNotification`

* Bildirimi silmez, `isActive: false` yaparak arşivler.

---

## 🌐 Routes (`notification.routes.ts`)

| Route                       | Açıklama                   |
| --------------------------- | -------------------------- |
| `GET /notifications`        | Bildirimleri listeler      |
| `POST /notifications`       | Yeni bildirim oluşturur    |
| `PUT /notifications/:id`    | Okundu olarak işaretler    |
| `DELETE /notifications/:id` | Bildirimi soft-delete eder |

---

## ✅ Validasyon (`notification.validation.ts`)

* `type`: Boş olamaz, örnek tipler `comment`, `order`, `feedback` gibi sabitlenebilir.
* `message`: 5–500 karakter
* `user`: Geçerli bir MongoDB ObjectId olmalı
* `data`: Opsiyonel, object formatında olmalı

---

## 🔄 Entegrasyon Senaryoları

1. **Yorum Onayı**: Yeni bir yorum geldiğinde admin’e otomatik bildirim
2. **Yeni Sipariş**: Sipariş sonrası kullanıcıya "Siparişiniz alındı" bildirimi
3. **Geri Bildirim**: Yeni feedback geldiğinde admin’e bilgilendirme
4. **Ödeme Bildirimi**: Ödeme sonrası kullanıcıya "Ödeme alındı" mesajı

> 🎯 `createNotification` fonksiyonu doğrudan diğer modüller tarafından tetiklenebilir. Reusable mantıkta yazılmıştır.

---

## 📲 Kullanıcı Arayüzü Entegrasyonu

* Bildirim simgesi (bell icon) ile `GET /notifications` üzerinden son 5 bildirim alınabilir.
* Panel içi bildirim listesi tam sayfa `GET /notifications` ile çekilebilir.
* `PUT /notifications/:id` ile okundu olarak işaretlenebilir.
* Yeni bildirim varsa "badge" gösterilebilir.

---

## ✅ Güçlü Yönler

| Özellik                          | Açıklama                                   |
| -------------------------------- | ------------------------------------------ |
| 🔁 Modüller arası tetiklenebilir | Her modülde notification üretilebilir      |
| 👁️ Okundu/okunmadı durumu       | `isRead` flag ile kontrol edilir           |
| 🧼 Soft delete desteği           | `isActive: false` ile arşivleme            |
| 🧠 Esnek `data` alanı            | Ek bilgi taşımak için meta desteği         |
| 🌍 Çok dilli destek (opsiyonel)  | `message` alanı için genişletilebilir yapı |

---
