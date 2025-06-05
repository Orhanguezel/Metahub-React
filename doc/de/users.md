
---

# 👤 **Users Modul – Technischer Architekturbericht**

## 📌 Zweck

Das `users`-Modul deckt grundlegende Funktionen wie **Benutzerauthentifizierung**, **Kontoverwaltung**, **Profilbearbeitung** sowie **Rollen- und Statussteuerung** ab. Zusätzlich ist es eng mit dem `address`-Modul für Adressverwaltung integriert.

---

## 🧱 Modulstruktur

**Hauptordner**: `src/modules/users`

Wichtige Dateien:

* `users.models.ts`: Benutzer-Schema und Interfaces
* `auth.controller.ts`: Registrierung, Login, Logout, MFA
* `auth.advanced.controller.ts`: E-Mail-Verifizierung, OTP, MFA
* `account.controller.ts`: Profil anzeigen und aktualisieren
* `crud.controller.ts`: Admin-spezifische Benutzerverwaltung
* `status.controller.ts`: Rollen- und Aktivitätsverwaltung
* `users.routes.ts`: Zentrale Routing-Konfiguration

---

## 🔐 Authentifizierungsstruktur

### Basis-Auth-Funktionen

* **registerUser**: Passwort wird gehasht, ein E-Mail-Verifizierungstoken wird generiert, Benutzer wird passiv gespeichert.
* **loginUser**: Passwortprüfung, E-Mail-Verifizierungsstatus, MFA-Prüfung, JWT-Token-Erstellung.
* **logoutUser**: Entfernt httpOnly-Cookies.

### Erweiterte Authentifizierung

* **OTP / Zwei-Faktor**: Unterstützung für SMS und MFA über Speakeasy & QR-Code.
* **E-Mail-Verifizierung**: Token-basiert, Ablaufzeit 6 Stunden.

---

## 🧠 Benutzermodell (`users.models.ts`)

### Kernfelder

* Rollen: `"admin" | "user" | "customer" | "moderator" | "staff"`
* Verknüpfungen: `addresses`, `orders`, `cart`, `profile`, `payment`, `favorites`
* Sicherheit: Felder wie `password`, `emailVerificationToken`, `otpCode`, `mfaSecret` mit `select: false`
* Weitere: `profileImage`, `bio`, `notifications`, `deleted`, `language`, `birthDate`

### Passwort-Handling

* Hashing via `hashPassword` (Mongoose pre-save Hook)
* Vergleich via `comparePassword` Instanzmethode

---

## 📂 Sub-Controller-Struktur

### `account.controller.ts`

* `getMyProfile`: Gibt vollständige Benutzerinformationen inkl. Populates zurück
* `updateMyProfile`: Aktualisiert Name, E-Mail, Sprache, Telefonnummer
* `updateMyPassword`: Validiert aktuelles Passwort, speichert neues gehasht

### `crud.controller.ts`

* Nur für Admins zugänglich
* Auflisten, Anzeigen, Bildaktualisierung (Cloudinary oder lokal), Löschen

### `status.controller.ts`

* `updateUserRole`: Benutzerrolle aktualisieren
* `toggleUserStatus`: Aktiv/Inaktiv setzen

---

## 📬 Integration des Address-Moduls

**Modulordner**: `src/modules/address`

Die Benutzeradresse wird über das Feld `User.addresses` (ObjectId\[]) verwaltet.

### Wichtige Funktionen:

* `getUserAddresses`, `createAddress`, `updateAddress`, `deleteAddress`
* `updateAllUserAddresses`: Stapelweise Adressänderung
* Entfernte Adressen werden automatisch aus dem Benutzer entfernt (`$pull`)

### Datenmodell:

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

## 🛡️ Sicherheit & Validierung

* Alle Routen geschützt durch `authenticate` + `authorizeRoles`
* Validierung mit express-validator (`users.admin.validation.ts`)
* API-Key-Validierung durch `validateApiKey`
* JWT Authentifizierung via httpOnly-Cookie

---

## 🌐 Mehrsprachigkeit (i18n)

Alle Rückmeldungen (Fehler/Erfolg):

* Sprachabhängig durch `req.locale`
* Unterstützte Sprachen: **Deutsch, Englisch, Türkisch**

---

## ✅ Postman Testunterstützung

Modulbasierte Tests mit Postman Collection:

Pfad-Beispiel:

```
/home/orhan/Dokumente/RadonaR/backend/postman/users_collection.json
```

---

## 🔄 Ablauf des User-Moduls

1. Benutzer registriert sich → erhält Verifizierungslink
2. Nach Bestätigung wird Benutzer aktiv
3. MFA wird ggf. beim Login abgefragt
4. Profil & Adresse können verwaltet werden
5. Admins können Benutzer im Panel verwalten

---

## 🔍 Modul-Highlights

| Feature                         | Beschreibung                      |
| ------------------------------- | --------------------------------- |
| 🔐 MFA / OTP                    | Erhöhte Sicherheit                |
| 🌍 Mehrsprachigkeit             | DE / EN / TR                      |
| 🖼️ Profilbild-Handling         | Cloudinary + lokale Speicherung   |
| 📫 Adressverwaltung             | Mehrere Adressen, Default-Adresse |
| 🔁 Tokenbasierte Authent.       | Sicher über httpOnly Cookie       |
| ♻️ Wiederverwendbare Controller | Einheitliche Struktur             |
| 🧪 Postman-Tests                | Modulspezifische Testbarkeit      |

---
