
---

# 📦 **Order (Bestellung) Modul – Technischer Analysebericht (RadanoR)**

---

## 🎯 Ziel

Dieses Modul dient zur Erfassung, Verwaltung und Nachverfolgung von Bestellungen, die von Benutzern im System aufgegeben werden. Der Bestellprozess ist in zwei Hauptbereiche unterteilt: **Frontend/Öffentlicher Bereich** (z. B. Checkout) und **Admin-Bereich** (z. B. Statusaktualisierungen, Lieferkontrolle).

---

## 🧱 Projektstruktur

```
src/modules/order/
├── order.models.ts
├── order.controller.ts
├── order.routes.ts
├── order.validation.ts
├── admin.order.routes.ts
├── admin.order.controller.ts
└── index.ts
```

---

## 🧩 Modellstruktur (`order.models.ts`)

```ts
user: ObjectId                    // Referenz zum Benutzer
items: OrderItem[]               // Produktliste mit Menge & Preis
totalAmount: number              // Gesamtbetrag
paymentStatus: "pending" | ...   // Zahlungsstatus
deliveryStatus: "pending" | ...  // Lieferstatus
shippingAddress: AddressSchema   // Eingebettete Versandadresse
note?: string                    // Bestellnotiz (optional)
timestamps: true
```

### `OrderItem` Struktur:

```ts
product: ObjectId                // Produkt-Referenz
quantity: number                 // Bestellte Menge
priceAtPurchase: number         // Preis zum Zeitpunkt der Bestellung
```

---

## 🌐 Öffentliche Controller (`order.controller.ts`)

### 🟢 Öffentliche Endpunkte:

* `POST /order`: Erstellt eine neue Bestellung
* `GET /order/my-orders`: Gibt alle Bestellungen des aktuellen Benutzers zurück
* `GET /order/:id`: Einzelne Bestellung (nur zugänglich für Besitzer)

> 🔐 Nur authentifizierte Benutzer (via `req.user.id`) dürfen Bestellungen aufgeben.

---

## 🔒 Admin Controller (`admin.order.controller.ts`)

### 🛠️ Verwaltungsfunktionen:

* `GET /admin/order`: Liste aller Bestellungen
* `GET /admin/order/:id`: Detailansicht einer Bestellung
* `PUT /admin/order/:id/status`: Aktualisiert den Status
* `DELETE /admin/order/:id`: Löschen (empfohlen: Soft-Delete-Strategie)

---

## ✅ Validierung (`order.validation.ts`)

* `items[]`: Muss gültige Produkt-ID, Menge & Preis enthalten
* `shippingAddress`: Pflichtfelder wie `street`, `city`, `zipCode`, etc.
* `note`: Begrenzte Länge (z. B. max. 500 Zeichen)

> Alle Felder werden durch `express-validator` geprüft.

---

## 🔗 Beziehungen

| Feld              | Beziehung                          |
| ----------------- | ---------------------------------- |
| `user`            | Verknüpfung zum `User` Modell      |
| `items.product`   | Verknüpfung zum `radonarprod`      |
| `shippingAddress` | Eingebettetes Schema von `address` |

---

## 🔁 Bestellablauf

1. Benutzer sendet eine Bestellung (`POST /order`)
2. Bestellung wird mit Status `pending` gespeichert
3. Admin aktualisiert den `deliveryStatus` oder `paymentStatus`
4. Bestellung kann archiviert oder gelöscht werden

---

## 🧠 Admin Panel Integration

* Seitenleiste mit „Orders“-Modul
* Tabellenansicht: Benutzer, Produkte, Betrag, Status
* Detailansicht mit Versanddaten & Artikeln
* Statusänderung via Dropdown oder Modal
* Filterung: nach Benutzer, Datum, Status

---

## 📈 Meta-System

* `generate:meta` erzeugt automatisch Metadaten
* Diese werden in Swagger & Admin-Panel verwendet

---

## ✅ Stärken

| Merkmal                 | Beschreibung                                      |
| ----------------------- | ------------------------------------------------- |
| 🔐 Authentifizierung    | Nur eingeloggte Benutzer können bestellen         |
| 🔁 Verknüpfte Modelle   | Nutzer- & Produktbeziehungen                      |
| 🧾 Eingebettete Adresse | Adresse wird direkt in der Bestellung gespeichert |
| ✏️ Admin-Steuerung      | Status-Updates durch Admin möglich                |
| 🧪 Starke Validierung   | Eingabekontrolle mit `express-validator`          |

---

## 🛠️ Erweiterungsvorschläge

1. 📅 Historie für Statusänderungen (`deliveredAt`, `paidAt`)
2. 🧾 Rechnungsmodul Integration (`invoice`)
3. 📊 Statistik für Admin Dashboard (`getStats`)
4. 📧 Automatische Bestätigungs-Mails nach Bestellung
5. 🔐 Admin-Rollen prüfen – nur `admin` oder `staff` dürfen ändern

---
