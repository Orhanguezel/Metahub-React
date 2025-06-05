
---

# 💳 **Payment (Ödeme) Modülü – RadanoR Teknik Analizi**

---

## 🎯 Amaç

Bu modül, kullanıcıların ödeme yöntemlerini (kart, havale, kupon vb.) tanımlamasını, siparişle ilişkilendirilmesini ve gelecekte dış ödeme sistemleriyle (Stripe, Klarna, PayPal vs.) entegre edilebilir hale gelmesini sağlar.

> Şu anki yapı, temel `payment info` saklama ve siparişle ilişkilendirme odaklıdır.

---

## 🧱 Dosya Yapısı

```
src/modules/payment/
├── payment.models.ts          // Ödeme modeli
├── payment.routes.ts          // Route tanımlamaları (genel/admin ayrımı yok)
├── payment.controller.ts      // CRUD işlemleri
├── payment.validation.ts      // Validasyon kuralları
├── index.ts                   // Modül export
```

---

## 🔸 Model Yapısı (`payment.models.ts`)

```ts
user: ObjectId                // Ödemeyi yapan kullanıcı
method: string                // Ödeme yöntemi ("card", "bank", "coupon", vs.)
provider: string              // Sağlayıcı (örn. "stripe", "paypal", "klarna")
accountHolder?: string        // Hesap sahibi
ibanOrCardNumber?: string     // IBAN ya da kart numarası (maskeleme gerekebilir)
paymentToken?: string         // Tokenize edilmiş ödeme bilgisi
isDefault?: boolean           // Varsayılan ödeme mi?
isActive: boolean             // Soft delete için kullanılır
```

### 🔐 Güvenlik Notları

* `paymentToken` dış servislerdeki güvenli saklama sistemine (örn. Stripe vault) uygundur.
* `ibanOrCardNumber` gibi alanlar sadece admin görümüne açılabilir ya da maskelenmelidir (`**** **** **** 1234` gibi).

---

## ⚙️ Controller İşlevleri (`payment.controller.ts`)

### 📥 `createPaymentMethod`

* Yeni bir ödeme yöntemi kaydı oluşturur.
* Aynı kullanıcıya ait `isDefault` işaretli başka yöntem varsa onu kaldırabilir (isteğe bağlı mantık).

### 🔄 `updatePaymentMethod`

* Mevcut ödeme yöntemi bilgilerini günceller.
* Maskelenmiş kart numarası gibi alanlar kullanıcıya gösterilebilir.

### ❌ `deletePaymentMethod`

* Gerçek silme değil; `isActive = false` yapılarak soft delete işlemi yapılır.

### 📄 `getMyPaymentMethods`

* Kullanıcıya ait tüm aktif ödeme yöntemlerini listeler.

---

## ✅ Validasyon (`payment.validation.ts`)

* `method` zorunludur ve sadece desteklenen değerleri alabilir (örn. `card`, `bank`, `coupon`)
* `ibanOrCardNumber`, `accountHolder` gibi alanlar `method` değerine bağlı olarak zorunlu olabilir (conditional validation)
* `paymentToken` varsa `ibanOrCardNumber` girilmesine gerek olmayabilir

---

## 🔌 Entegrasyonlar

### 🧾 Sipariş Bağlantısı

* `order` modülünde her siparişin içinde `paymentId` olarak ödeme bilgisi referans verilebilir.
* Sipariş sonrası ödeme yöntemi değiştirilemez (readonly)

### 🔐 Kullanıcı Bağlantısı

* Ödeme yöntemleri sadece `userId` üzerinden kullanıcıya özeldir.

---

## 🔄 Admin Panel & Meta Desteği

* `generate:meta` ile admin panelde:

  * Form alanları (`method`, `provider`, `iban`) otomatik oluşur
  * Liste görünümü (`maskelenmiş IBAN`, `provider logosu`) desteklenebilir
* `isDefault` ödeme yöntemi öne çıkartılabilir

---

## 💡 Geliştirme Önerileri

| Konu                     | Açıklama                                                               |
| ------------------------ | ---------------------------------------------------------------------- |
| 🧩 **External provider** | Stripe/Klarna gibi servisler için adapter yapısı                       |
| 🔐 **Token storage**     | Ödeme bilgilerini doğrudan değil, token ile saklamak                   |
| 🌍 **Çoklu dil desteği** | Hata mesajları için i18n desteği                                       |
| 🧪 **Test ve sandbox**   | Test ödeme senaryoları için özel flag'ler                              |
| 🖼️ **Frontend**         | Kart ikonu, IBAN maskesi, varsayılan işareti gibi görsel geliştirmeler |

---
