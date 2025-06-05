
````markdown
# 🚲 RADANOR Fahrrad-Webprojekt

Radanor ist eine moderne, mehrsprachige und themenfähige modulare E-Commerce-Plattform für Fahrräder.  
Das Projekt ist fullstack aufgebaut: Das Backend basiert auf **Express + TypeScript + MongoDB**, das Frontend auf **React + Redux Toolkit + Styled Components**.

---

## 🔗 Inhaltsverzeichnis

- [Features](#features)
- [Installation](#installation)
- [Projektarchitektur](#projektarchitektur)
- [Modulsystem](#modulsystem)
- [Sprach- & Theme-Management](#sprach--theme-management)
- [Entwicklungsrichtlinien](#entwicklungsrichtlinien)
- [Beitrag & Entwicklung](#beitrag--entwicklung)
- [Lizenz](#lizenz)

---

## 🚀 Features

- **Vollständig modulares System:** Jede Seite und Funktion ist als separates Modul strukturiert.
- **Mehrsprachigkeit:** Inhalte und Daten sind in drei Sprachen (DE, EN, TR) verfügbar.
- **Theme-Management:** Hell-/Dunkelmodus und anpassbare Farbschemata.
- **State Management mit Redux Toolkit**
- **Component-basiertes Styling mit Styled Components**
- **Public & Admin Panel:** Jedes Modul verfügt über einen Nutzer- und einen Adminbereich.
- **Animierte Benutzeroberfläche dank GSAP**
- **Leicht erweiterbar:** Neue Module und Funktionen können einfach hinzugefügt werden.

---

## 🛠️ Installation

### 1. Backend (Express + TypeScript + MongoDB)

```bash
# Wechsel in das Backend-Verzeichnis
cd backend

# Abhängigkeiten installieren (mit npm, yarn oder bun)
npm install
# oder
bun install

# .env-Datei anlegen und Umgebungsvariablen eintragen
cp .env.example .env

# Anwendung starten
npm run dev
````

### 2. Frontend (React + Redux Toolkit + Styled Components)

```bash
# Wechsel in das Frontend-Verzeichnis
cd frontend

# Abhängigkeiten installieren
npm install
# oder
bun install

# Anwendung starten
npm run dev
```

> Hinweis: Standardmäßig läuft das Frontend auf `localhost:3000` und das Backend auf `localhost:5000`.

---

## 🏗️ Projektarchitektur

```
root/
├── backend/
│   └── src/
│       ├── modules/
│       │   ├── bikes/
│       │   ├── users/
│       │   └── ...
│       ├── core/
│       ├── routes/
│       └── ...
├── frontend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── bikes/
│   │   │   ├── home/
│   │   │   ├── navbar/
│   │   │   └── ...
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── ...
│   └── public/
└── README.md
```

* Jedes **Modul** besitzt eigene `public`- und `admin`-Unterverzeichnisse.
* Gemeinsame Styles und Themes befinden sich im `/styles`-Verzeichnis.
* Das Routing wird zentral im `/routes`-Verzeichnis verwaltet.

---

## 📦 Modulsystem

Jedes **Modul** (z.B. `bikes`, `home`) folgt dieser Struktur:

```
modules/
└── bikes/
    ├── public/
    │   └── pages/
    │       ├── BikeListPage.jsx
    │       └── BikeDetailPage.jsx
    ├── admin/
    │   └── pages/
    │       └── BikeAdminPage.jsx
    ├── slice/
    │   └── bikeSlice.js
    ├── i18n/
    │   └── bikes.json
    └── index.js
```

> Die Abhängigkeiten nach außen werden minimal gehalten. Jedes Modul enthält seinen eigenen Slice, die Sprachdatei und Komponenten.

---

## 🌐 Sprach- & Theme-Management

* **Mehrsprachigkeit:**

  * Mit i18n sind drei Sprachen (DE, EN, TR) unterstützt.
  * Die Sprachwahl erfolgt über die Navbar.
  * Sprachdateien werden pro Modul oder zentral verwaltet.
* **Theme-Management:**

  * Mit `styled-components` + `ThemeProvider` lassen sich Themes dynamisch umschalten.
  * Sowohl globale als auch komponentenbasierte Styles sind möglich.

---

## 🧑‍💻 Entwicklungsrichtlinien

* **Modularität:** Der Code ist nach dem Single-Responsibility-Prinzip in Module unterteilt.
* **Routing:**

  * Alle Routen werden zentral über `routes/index.jsx` verwaltet.
  * Verschiedene Layouts (`VisitorLayout`, `AdminLayout`, `UserLayout`) werden auf Routenebene zugewiesen.
* **State Management:**

  * Jedes Modul verwaltet seinen eigenen State über einen eigenen Slice.
  * Globales State- und Theme-Management ist zentral organisiert.
* **API-Kommunikation:**

  * Sämtliche API-Aufrufe laufen über zentrale Hilfsfunktionen (`api.js`).
  * Für mehrere Umgebungen werden .env-Dateien genutzt.

---

## 🤝 Beitrag & Entwicklung

So kannst du beitragen:

1. Forke das Repository und lege einen neuen Branch an:
   `git checkout -b feature/neuesfeature`
2. Schreibe und teste deinen Code.
3. Öffne einen Pull Request.

Achte auf Lesbarkeit und Modularität!

---

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.

---
