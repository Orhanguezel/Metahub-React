
---

# ⚙️ **Settings-Modul – Technischer Analysebericht für das RadanoR-Projekt**

---

## 🎯 Zweck

Dieses Modul dient zur **zentralen Verwaltung globaler Konfigurationen**. Dazu zählen z. B. Website-Titel, Beschreibung, Logo, Spracheinstellungen, Social Media Links, Designoptionen und viele weitere allgemeine Parameter.

Das System unterstützt **Mehrsprachigkeit** und ist **vollständig mit dem Meta-System und dem Frontend verbunden**.

---

## 📁 Dateistruktur

```
src/modules/setting/
├── setting.models.ts           # Mongoose-Modell
├── setting.controller.ts       # CRUD-Logik
├── setting.routes.ts           # API-Endpunkte
├── setting.validation.ts       # Validierung mit express-validator
├── settingKeys.ts              # Definierte Schlüssel mit Typen
├── index.ts                    # Modulausgabe
```

---

## 🧱 Mongoose-Modell (`setting.models.ts`)

```ts
key: string                           // Einstellungs-Schlüssel (z. B. site_title)
value: any                            // Beliebiger Datentyp
type: "string" | "object" | ...       // Typ der gespeicherten Daten
isMultiLang: boolean                  // Mehrsprachiger Wert?
isImage: boolean                      // Bildbasierter Wert? (z. B. Logo)
isNestedObject: boolean               // Verschachteltes Objekt?
group?: string                        // Gruppierung (z. B. theme, seo, general)
```

### 🌐 Mehrsprachigkeit & Bildunterstützung

* Wenn `isMultiLang: true`, ist der Wert ein Sprachobjekt:

  ```json
  {
    "en": "Welcome",
    "tr": "Hoşgeldiniz",
    "de": "Willkommen"
  }
  ```

* Wenn `isImage: true`, wird der Wert über einen Dateiupload geliefert (`req.file`).

---

## 🧠 `settingKeys.ts` – Definierte Konfigurationsschlüssel

Die Datei enthält alle **möglichen Einstellungs-Typen**, die das System unterstützt. Sie wird für Validierung, UI-Generierung und Meta-Erstellung verwendet:

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

---

## 🔧 Controller-Funktionen (`setting.controller.ts`)

### 🔹 `upsertSetting`

* Erstellt oder aktualisiert eine Einstellung.
* Erkennt automatisch, ob es sich um ein Bild, Mehrsprachigkeit oder verschachteltes Objekt handelt.
* Nutzt `key` zur eindeutigen Identifizierung.

### 🔹 `getAllSettings`

* Gibt alle Einstellungen gruppiert zurück.
* Unterstützt Gruppierungsfilter (z. B. nur `general` oder `seo`).

### 🔹 `deleteSetting`

* Entfernt einen Einstellungseintrag.
* Bei Bildern wird auch die Datei gelöscht.

---

## ✅ Validierung (`setting.validation.ts`)

* `key`: erforderlich, nur String
* `value`: dynamisch je nach `type`
* Unterstützung für:

  * Dateiuploads
  * Sprachdaten
  * Objektdaten
* Integration mit Express Middleware

---

## 🌐 API-Routen (`setting.routes.ts`)

```
POST    /settings/           → upsertSetting
GET     /settings/           → getAllSettings
DELETE  /settings/:key       → deleteSetting
```

> 🔐 Alle Endpunkte sind durch `authenticate` und `authorizeRoles("admin")` geschützt.

---

## 💻 Frontend-Integration (Admin Panel)

Verbindung über `settingsSlice.ts` im Redux Store.

* Anzeige aller Konfigurationen
* Automatisierte Formulare durch `settingKeys.ts`
* Upload-Funktion für Bilder (z. B. Logo)
* Spracheinstellungen pro Einstellung konfigurierbar

---

## 📊 Meta-Konfigurationssystem

Bei Ausführung von `generate:meta` wird:

* Eine JSON-basierte Schema-Datei für jedes Setting erzeugt
* Das Admin-Panel nutzt diese Datei zur UI-Generierung
* Swagger & API-Dokumentation automatisch ergänzt

---

## ✅ Vorteile

| Eigenschaft              | Beschreibung                                              |
| ------------------------ | --------------------------------------------------------- |
| 🔄 Dynamisch erweiterbar | Neue Einstellungen nur durch `settingKeys.ts` definierbar |
| 🖼️ Bildunterstützung    | Für Logos, Favicons etc.                                  |
| 🌍 Mehrsprachigkeit      | Texte in TR, DE, EN möglich                               |
| 🧠 Meta-Integration      | Automatische Integration ins Admin-Panel und Swagger      |
| ♻️ Wiederverwendbar      | Kann leicht auf andere Projekte angewendet werden         |

---

## 🧩 Empfehlungen

1. 🛡️ Änderungshistorie/Logging für Settings-Änderungen einführen
2. ☁️ Integration mit CDN (z. B. Cloudinary) für Bild-Einstellungen
3. 🚀 Redis-Caching für häufig geladene Einstellungen
4. 🌐 Bereitstellung einer öffentlichen Route wie `/public-settings` für SSR

---
