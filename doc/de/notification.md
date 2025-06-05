
---

# 🔔 **Benachrichtigungsmodul – Technischer Bericht für das RadanoR-Projekt**

---

## 🎯 Zweck

Dieses Modul dient dazu, wichtige Systemereignisse (z. B. neue Kommentare, Bestellungen, Zahlungen, Termine) als **Benachrichtigungen zu speichern** und diese sowohl im Admin-Panel als auch im Benutzer-Interface **sichtbar zu machen**.

---

## 📁 Verzeichnisstruktur

```
src/modules/notification/
├── notification.models.ts         // Mongoose-Datenmodell
├── notification.routes.ts         // API-Routen
├── notification.controller.ts     // Hauptcontroller-Funktionen
├── notification.validation.ts     // Validierung mit express-validator
└── index.ts
```

---

## 🧩 Modellstruktur (`notification.models.ts`)

```ts
user: ObjectId                // Zugehöriger Benutzer
type: string                  // Benachrichtigungstyp (z. B. "comment", "order", "feedback")
message: string               // Nachricht (optional mehrsprachig)
isRead: boolean               // Gelesen-Status
data: object                  // Metadaten (z. B. ID, Weiterleitungslink)
isActive: boolean             // Soft Delete (true = aktiv)
timestamps: true              // createdAt / updatedAt
```

> 💡 Das Feld `data` ist flexibel und kann zusätzliche Infos enthalten, z. B. `{ contentId, redirectUrl }`.

---

## 🚀 Controller-Funktionen (`notification.controller.ts`)

### 🔍 `getAllNotifications`

* Listet Benachrichtigungen für Admin oder spezifischen User.
* Filtert nach `isActive: true` und optional `userId`.

### ➕ `createNotification`

* Erstellt eine neue Benachrichtigung.
* Kann von anderen Modulen (z. B. `comment`, `order`) ausgelöst werden.

### ✏️ `markAsRead`

* Markiert eine Benachrichtigung als `isRead: true`.

### 🧹 `deleteNotification`

* Löscht die Benachrichtigung nicht physisch, sondern setzt `isActive: false` (Soft Delete).

---

## 🌐 API-Routen (`notification.routes.ts`)

| Route                       | Beschreibung                   |
| --------------------------- | ------------------------------ |
| `GET /notifications`        | Listet alle Benachrichtigungen |
| `POST /notifications`       | Erstellt neue Benachrichtigung |
| `PUT /notifications/:id`    | Markiert als gelesen           |
| `DELETE /notifications/:id` | Archiviert (Soft Delete)       |

---

## ✅ Validierung (`notification.validation.ts`)

* `type`: Pflichtfeld, nur z. B. `comment`, `order`, `feedback` erlaubt
* `message`: Zwischen 5–500 Zeichen
* `user`: Muss gültige MongoDB ObjectId sein
* `data`: Optional, muss ein gültiges Objekt sein

---

## 🔄 Integrationsszenarien

1. **Kommentarbenachrichtigung**: Bei neuem Kommentar wird Admin informiert
2. **Bestellbenachrichtigung**: Nach Bestellung erhält User eine Info
3. **Feedback-Event**: Admin erhält Meldung bei neuem Feedback
4. **Zahlungseingang**: Zahlung bestätigt → User bekommt Bestätigung

> 🎯 `createNotification` ist wiederverwendbar und kann zentral von allen Modulen aufgerufen werden.

---

## 📲 Integration in die Benutzeroberfläche

* Glockensymbol → `GET /notifications` zeigt letzte 5 Benachrichtigungen
* Admin-Panel kann Vollansicht mit allen Benachrichtigungen anzeigen
* `PUT /notifications/:id` markiert eine Nachricht als gelesen
* Neue, ungelesene Nachrichten können mit Badge-Icon dargestellt werden

---

## ✅ Stärken des Moduls

| Feature                      | Beschreibung                                    |
| ---------------------------- | ----------------------------------------------- |
| 🔁 Modulübergreifend         | Kann aus jedem Modul heraus erstellt werden     |
| 👁️ Gelesen/Ungelesen-Status | Steuerung über `isRead`                         |
| 🧼 Soft Delete               | Kein Datenverlust – nur deaktiviert             |
| 🧠 Flexibles `data`-Feld     | Metadaten für Weiterleitungen, IDs usw. möglich |
| 🌍 Mehrsprachige Nachrichten | Optional erweiterbar mit Lokalisierung          |

---