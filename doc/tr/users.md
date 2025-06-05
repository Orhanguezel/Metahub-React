
---

# 👤 **Users Modülü – Teknik Mimari Raporu**

## 📌 Amaç

`users` modülü, kullanıcıların kimlik doğrulama, hesap yönetimi, profil işlemleri ve sistem içi rol & durum kontrolü gibi temel işlemlerini kapsar. Ayrıca `address` modülü üzerinden adres yönetimi yapılır.

---

## 🧱 Modül Yapısı

**Ana klasör**: `src/modules/users`

İçerdiği temel dosyalar:

* `users.models.ts`: Kullanıcı şeması ve interface'leri
* `auth.controller.ts`: Register/login/logout ve MFA işlemleri
* `auth.advanced.controller.ts`: E-posta doğrulama, OTP, MFA
* `account.controller.ts`: Profil görüntüleme ve güncelleme
* `crud.controller.ts`: Admin'e özel CRUD işlemleri
* `status.controller.ts`: Rol ve aktiflik yönetimi
* `users.routes.ts`: Tüm route tanımları

---

## 🔐 Kimlik Doğrulama Yapısı

### Auth İşlemleri

* **registerUser**: Parola hashlenir, email doğrulama token’ı oluşturulur ve kullanıcı pasif olarak kaydedilir.
* **loginUser**: Şifre kontrolü, email doğrulama, MFA kontrolü ve JWT token üretimi yapılır.
* **logoutUser**: Cookie temizlenerek oturum sonlandırılır.

### Gelişmiş Doğrulamalar

* **OTP (Two-Factor)**: `auth.advanced.controller.ts` altında SMS ve MFA (speakeasy, qrcode) desteklenir.
* **Email Verification**: Token ile doğrulama yapılır, geçerlilik süresi 6 saat.

---

## 🧠 Kullanıcı Modeli (`users.models.ts`)

### Ana Özellikler

* Roller: `"admin" | "user" | "customer" | "moderator" | "staff"`
* İlişkiler: `addresses`, `orders`, `cart`, `profile`, `payment`, `favorites`
* Güvenlik: `password`, `emailVerificationToken`, `otpCode`, `mfaSecret` gibi alanlar `select: false`
* Diğer: `profileImage`, `bio`, `notifications`, `deleted`, `language`, `birthDate`

### Parola işlemleri:

* `hashPassword` ile otomatik hashlenir (`pre-save`)
* `comparePassword` metodu: instance üzerinde kullanılabilir

---

## 📂 Alt Controller Yapısı

### `account.controller.ts`

* `getMyProfile`: Kullanıcı bilgileri populate edilir
* `updateMyProfile`: İsim, mail, telefon, dil güncellenebilir
* `updateMyPassword`: Geçerli şifre kontrolü ve yeni şifre hashlenmesi yapılır

### `crud.controller.ts`

* Yalnızca admin erişimli
* Kullanıcı listeleme, tekil görüntüleme, profil resmi güncelleme (cloudinary veya local), silme gibi işlemleri içerir

### `status.controller.ts`

* `updateUserRole`: Rol güncelleme
* `toggleUserStatus`: Aktif/pasif hale getirme

---

## 📬 Adres Modülü Entegrasyonu

**Modül klasörü**: `src/modules/address`

Kullanıcının adres bilgileri `User.addresses` alanında tutulur (ObjectId\[])

### Öne Çıkan İşlemler:

* `getUserAddresses`, `createAddress`, `updateAddress`, `deleteAddress`
* `updateAllUserAddresses`: toplu güncelleme yapılır
* Silinen adres `User` kaydından da `pull` edilir

### Model:

```ts
interface IAddress {
  userId: ObjectId;
  street: string;
  houseNumber: string;
  city: string;
  zipCode: string;
  country?: string;
  isDefault?: boolean;
}
```

---

## 🛡️ Güvenlik ve Doğrulama

* Tüm route'lar `authenticate` ve `authorizeRoles` ile korunur.
* `users.admin.validation.ts` içinde express-validator ile kapsamlı validasyon yer alır.
* `validateApiKey` middleware ile API erişimi doğrulanabilir.
* Cookie tabanlı JWT token yönetimi vardır (httpOnly).

---

## 🌐 Çok Dilli Destek (i18n)

Tüm hata ve başarı mesajları:

* `req.locale` üzerinden
* Almanca, Türkçe ve İngilizce dil seçenekleri ile dinamik döndürülür.

---

## ✅ Postman Test Desteği

Tüm endpoint’ler modül modül Postman collection’ları ile test edilebilir.
Örnek path:

```
/home/orhan/Dokumente/RadonaR/backend/postman/users_collection.json
```

---

## 🔄 Kullanıcı Modülü Lifecycle’ı

1. Kullanıcı kayıt olur → email doğrulama linki alır.
2. Email doğrulandıktan sonra aktifleşir.
3. Giriş yaptıktan sonra MFA gerekiyorsa doğrulama istenir.
4. Kullanıcı profilini ve adreslerini yönetebilir.
5. Admin panelden kullanıcılar yönetilir.

---

## 🔍 Modülün Öne Çıkan Avantajları

| Özellik                    | Açıklama                    |
| -------------------------- | --------------------------- |
| 🔐 MFA / OTP desteği       | Ekstra güvenlik             |
| 🌍 Çok dilli destek        | DE / EN / TR                |
| 🖼️ Profil resmi yönetimi  | Cloudinary + local          |
| 📫 Adres sistemi           | Çoklu adres / default logic |
| 🔁 Token tabanlı auth      | httpOnly cookie             |
| ♻️ Reusable controller’lar | Tek modül, çok amaçlı       |
| 🧪 Postman ile test        | Modül bazlı kolay test      |

---
