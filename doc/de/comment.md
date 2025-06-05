
---

# 💬 **Kommentar-Modul – Technischer Bericht für das RadanoR-Projekt**

---

## 🎯 Zweck

Dieses Modul ermöglicht es Besuchern, Kommentare zu Produkten (und zukünftig auch zu Blogs und Dienstleistungen) abzugeben. Administratoren/Moderatoren können diese Kommentare überprüfen und freigeben. Kommentare sind mit mehreren Inhaltstypen verknüpft (`product`, `blog`, `service`) und werden durch „Soft Delete“ sicher archiviert.

---

## 🧱 Dateistruktur

```
src/modules/comment/
├── comment.models.ts             // Mongoose-Schema
├── comment.routes.ts             // Routen (öffentlich + Admin)
├── comment.controller.ts         // Alle Controller-Funktionen
├── comment.validation.ts         // Validierung mit express-validator
├── index.ts                      // Modulausgabe
└── comment-module.md             // Erläuternde Dokumentation
```

---

## 🧩 Modelldefinition (`comment.models.ts`)

```ts
contentType: "product" | "blog" | "service"  // Dynamischer Inhaltstyp
contentId: ObjectId                          // Zugehöriger Inhalt (z. B. Produkt-ID)
name: string                                 // Name des Kommentierenden
email: string                                // E-Mail (select:false optional)
comment: string                              // Kommentartext
isPublished: boolean                         // Veröffentlichungsstatus
isActive: boolean                            // Soft-Delete-Status
timestamps: true                             // createdAt / updatedAt
```

### 🔐 Sicherheit und Normalisierung

* `email` kann normalisiert werden (`toLowerCase`, `trim`).
* `comment` kann gegen XSS-Angriffe bereinigt werden.
* `contentType` ist streng auf erlaubte Werte beschränkt (Enum).

---

## 🌍 Öffentliche API-Endpunkte

### ➕ `POST /api/comments/`

* Besucher reichen Kommentare ein.
* Nach Validierung wird der Kommentar gespeichert.
* Standardmäßig `isPublished: false` → Freigabe durch Admin erforderlich.

### 🔍 `GET /api/comments/:type/:id`

* Kommentare für ein bestimmtes Produkt/Blog/Dienstleistung abrufen.
* Nur `isPublished: true && isActive: true` Einträge werden geliefert.

---

## 🔒 Admin-API-Endpunkte

### 📋 `GET /api/comments/`

* Listet alle Kommentare für das Admin-Panel auf.

### ✏️ `PUT /api/comments/:id/toggle`

* Ändert den Veröffentlichungsstatus eines Kommentars.
* Beispiel: `false → true` oder umgekehrt.

### 🗑️ `DELETE /api/comments/:id`

* Kommentar wird nicht gelöscht, sondern mit `isActive: false` archiviert („Soft Delete“).

---

## 🧠 Validierungslogik (`comment.validation.ts`)

* `name`: 2–50 Zeichen, wird getrimmt.
* `email`: Muss gültig und normalisierbar sein.
* `comment`: 5–500 Zeichen erlaubt.
* `contentType`: Nur `"product"`, `"blog"`, `"service"` zugelassen.
* `contentId`: Muss eine gültige MongoDB ObjectId sein.

> 🚫 Schutz vor Spam/Injection durch Längen- und Typkontrollen.

---

## 🔄 Frontend-Integration

* In Produktdetailseiten via `GET /api/comments/product/:id` laden.
* Kommentarfeld nutzt `POST /api/comments/`.
* Admin-Übersicht via `GET /api/comments`.
* Freigabe: `PUT /api/comments/:id/toggle`
* Archivierung: `DELETE /api/comments/:id`

---

## ✅ Stärken des Moduls

| Merkmal                                | Beschreibung                                             |
| -------------------------------------- | -------------------------------------------------------- |
| 🔄 Unterstützung mehrerer Typen        | Verknüpfung mit `product`, `blog`, `service` möglich     |
| 🔐 Moderiertes Veröffentlichungsmodell | Nur geprüfte Inhalte werden angezeigt                    |
| 🛑 Soft-Delete-Unterstützung           | Kommentare werden archiviert, nicht gelöscht             |
| 🧪 Umfassende Validierung              | Starke Kontrolle über Namen, E-Mail, Inhalt etc.         |
| 🌍 Öffentliche & Admin-Routen          | Klare Trennung für Sicherheit und Wartbarkeit            |
| 💬 Pagination möglich                  | (Noch nicht umgesetzt, `limit/skip` leicht integrierbar) |

---

## 🔗 Integrationsvorschläge (RadanoR)

* Kommentare im `radonarprod`-Detailbereich einbinden.
* Dankes-/Bestätigungs-E-Mails nach Kommentarübermittlung möglich.
* CAPTCHA oder Rate-Limiting zur Spam-Vermeidung integrieren.
* `notification`-Modul: Admin bei neuem Kommentar benachrichtigen.
* Admin-Kommentarmodul im Frontend durch `generate:meta` aktivierbar.

---
