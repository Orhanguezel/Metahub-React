
---

# 💳 **Zahlungsmodul – Technische Analyse für RadanoR**

---

## 🎯 Zweck

Dieses Modul ermöglicht es Benutzern, Zahlungsmethoden (Kreditkarte, Überweisung, Gutschein usw.) zu speichern, mit Bestellungen zu verknüpfen und perspektivisch externe Anbieter wie Stripe, Klarna oder PayPal zu integrieren.

> Der aktuelle Fokus liegt auf der Erfassung von Zahlungsinformationen und deren Verbindung mit Bestellungen.

---

## 🧱 Dateistruktur

```
src/modules/payment/
├── payment.models.ts          // Mongoose-Modell für Zahlungen
├── payment.routes.ts          // Routen (ohne Trennung von Admin/Public)
├── payment.controller.ts      // CRUD-Controller
├── payment.validation.ts      // Validierungslogik
├── index.ts                   // Modul-Export
```

---

## 🔸 Modellstruktur (`payment.models.ts`)

```ts
user: ObjectId                // Verweis auf den Benutzer
method: string                // Zahlungsmethode ("card", "bank", "coupon", ...)
provider: string              // Anbieter (z.B. "stripe", "paypal", "klarna")
accountHolder?: string        // Kontoinhaber
ibanOrCardNumber?: string     // IBAN oder Kartennummer (maskierbar)
paymentToken?: string         // Tokenisierte Zahlungsinfo
isDefault?: boolean           // Standard-Zahlungsmethode?
isActive: boolean             // Soft Delete Unterstützung
```

### 🔐 Sicherheitshinweise

* `paymentToken` ermöglicht sichere Speicherung durch externe Dienste (z.B. Stripe Vault).
* Felder wie `ibanOrCardNumber` sollten für Benutzer maskiert angezeigt werden (z.B. `**** **** **** 1234`) oder nur Admins zugänglich sein.

---

## ⚙️ Controller-Funktionen (`payment.controller.ts`)

### 📥 `createPaymentMethod`

* Erstellt einen neuen Zahlungseintrag.
* Wenn bereits eine Standardmethode (`isDefault`) existiert, kann diese deaktiviert werden.

### 🔄 `updatePaymentMethod`

* Aktualisiert die Zahlungsdaten eines bestehenden Eintrags.
* Maskierte Darstellung möglich.

### ❌ `deletePaymentMethod`

* Setzt `isActive = false` – Soft Delete, keine physische Löschung.

### 📄 `getMyPaymentMethods`

* Gibt alle aktiven Zahlungsmethoden eines Benutzers zurück.

---

## ✅ Validierung (`payment.validation.ts`)

* `method` ist erforderlich und muss ein zulässiger Wert sein (`card`, `bank`, `coupon`).
* Felder wie `ibanOrCardNumber` und `accountHolder` sind je nach `method` verpflichtend.
* Wenn `paymentToken` vorhanden ist, können andere Felder entfallen.

---

## 🔌 Integrationen

### 🧾 Verknüpfung mit Bestellung

* Im `order`-Modul kann jede Bestellung über `paymentId` mit einer Zahlungsmethode verknüpft werden.
* Nach Bestellung keine Änderungen mehr an der Zahlungsmethode erlaubt.

### 🔐 Benutzerbindung

* Zahlungsmethoden sind benutzerbezogen (`userId`) und können nicht geteilt werden.

---

## 🔄 Admin Panel & Meta-System

* Über `generate:meta` werden im Admin Panel:

  * Formulare für Felder wie `method`, `provider`, `iban` automatisch erstellt.
  * Anzeige wie maskierte IBAN, Provider-Logos usw. möglich.
* `isDefault` kann hervorgehoben werden.

---

## 💡 Verbesserungsvorschläge

| Thema                    | Beschreibung                                        |
| ------------------------ | --------------------------------------------------- |
| 🧩 **Externe Anbieter**  | Stripe/Klarna Adapterstruktur vorbereiten           |
| 🔐 **Token-Speicherung** | Keine direkte Speicherung sensibler Daten           |
| 🌍 **Mehrsprachigkeit**  | Validierungs- und Fehlermeldungen i18n-fähig        |
| 🧪 **Sandbox/Testmodus** | Zahlungs-Testumgebungen ermöglichen                 |
| 🖼️ **Frontend-UX**      | Visualisierung von Icons, Masken und Default-Status |

---