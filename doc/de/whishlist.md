
---

# 💖 **Wishlist (Favoritenliste) Modul – Technischer Analysebericht (RadanoR)**

---

## 🎯 Zweck

Dieses Modul ermöglicht es eingeloggten Nutzern, Produkte als Favorit zu markieren, um sie später schneller wiederzufinden. Jeder Benutzer besitzt genau eine Wishlist, die nur von ihm selbst verwaltet werden kann.

---

## 📁 Dateistruktur

```
src/modules/wishlist/
├── wishlist.controller.ts        // CRUD-Operationen
├── wishlist.models.ts            // Mongoose-Schema
├── wishlist.routes.ts            // Routen
├── wishlist.validation.ts        // Validierungen (optional)
├── index.ts                      // Moduleintragspunkt
```

---

## 📊 Wishlist Modell (`wishlist.models.ts`)

```ts
interface IWishlist {
  user: ObjectId;
  products: ObjectId[];
  timestamps: true;
}
```

### Eigenschaften:

* `user`: Der Benutzer, dem die Favoritenliste gehört
* `products`: Liste von Produkt-IDs (`ref` zu `Product`)
* `timestamps`: Automatisches Tracking von `createdAt` und `updatedAt`

---

## 🔁 Controller-Funktionen (`wishlist.controller.ts`)

| Funktion             | Beschreibung                                   |
| -------------------- | ---------------------------------------------- |
| `getWishlist`        | Gibt alle Lieblingsprodukte des Nutzers zurück |
| `addToWishlist`      | Fügt ein Produkt zur Favoritenliste hinzu      |
| `removeFromWishlist` | Entfernt ein bestimmtes Produkt aus der Liste  |
| `clearWishlist`      | Löscht alle Produkte aus der Favoritenliste    |

---

## 🔐 Sicherheit & Middleware

* Alle Routen sind durch `authenticate` Middleware geschützt.
* Kein Zugriff auf Wishlist ohne Login.
* Vorabprüfung auf gültige MongoDB-IDs (`isValidObjectId`).

---

## 🌐 API-Routen (`wishlist.routes.ts`)

```ts
GET    /api/wishlist/                   → getWishlist
POST   /api/wishlist/add/:productId    → addToWishlist
DELETE /api/wishlist/remove/:productId → removeFromWishlist
DELETE /api/wishlist/clear             → clearWishlist
```

---

## ⚙️ Technische Merkmale

| Merkmal                  | Beschreibung                                  |
| ------------------------ | --------------------------------------------- |
| `express-async-handler`  | Vereinfachte Fehlerbehandlung mit async/await |
| Gültige ID-Überprüfung   | Ungültige ObjectIds werden abgefangen         |
| Einheitliche Statuscodes | Nutzung von 200, 201, 400, 404                |
| 🌍 Sprachenbereit        | Lokalisierte Fehlermeldungen möglich          |

---

## 🔗 Frontend-Integration

* Auf Produktseiten kann ein „Zur Favoritenliste hinzufügen“-Button angezeigt werden.
* Keine Admin-Oberfläche notwendig.
* State-Management über Redux oder Context empfohlen.

---

## ✅ Stärken des Moduls

| Feature                     | Erklärung                                |
| --------------------------- | ---------------------------------------- |
| 👤 Benutzerbasiert          | Jeder Nutzer hat seine eigene Liste      |
| 🧪 Validierung integriert   | Eingaben werden serverseitig geprüft     |
| 🔐 Gesicherte Routen        | Zugriff nur mit Login möglich            |
| ⚡ Schnelle Datenbankabfrage | Alle Produkte in einer Abfrage verfügbar |

---

## 🚀 Erweiterungsvorschläge

1. `populate("products")` für vollständige Produktdetails direkt mitliefern
2. „❤️“-Buttons im Frontend (ein-/ausblenden, toggeln)
3. Wishlist-Ansicht auch für Mobile optimieren
4. Preiswarnung oder Verfügbarkeitsnotifikation für Wishlist-Produkte

---
