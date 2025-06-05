
---

````markdown
# 🚲 RADANOR – Modulare E-Commerce-Plattform für Fahrräder

**Radanor** ist eine moderne, mehrsprachige und themenfähige Fullstack-E-Commerce-Plattform für Fahrräder.  
Das Projekt besteht aus zwei Hauptteilen:  
- **Backend:** Express + TypeScript + MongoDB (modular, Meta/Swagger-automatisiert)
- **Frontend:** React + Redux Toolkit + Styled Components (komplett modular & themenfähig)

---

## 🔗 Inhaltsverzeichnis

- [Features](#features)
- [Installation](#installation)
- [Projektarchitektur](#projektarchitektur)
- [Modulsystem](#modulsystem)
- [Sprach- & Theme-Management](#sprach--theme-management)
- [Entwicklungsrichtlinien](#entwicklungsrichtlinien)
- [Backend: MetaHub API-System](#backend-metahub-api-system)
- [Beitrag & Entwicklung](#beitrag--entwicklung)
- [Lizenz](#lizenz)
- [Kontakt](#kontakt)

---

## 🚀 Features

- **100% Modularität:** Jedes Feature als eigenes Modul.
- **Mehrsprachigkeit:** Komplett in Deutsch, Englisch & Türkisch (DE/EN/TR).
- **Theming:** Hell-/Dunkelmodus, Retro-Look & anpassbare Themes.
- **State Management:** Redux Toolkit pro Modul.
- **Komponenten-basiertes Styling:** Styled Components, zentrales Theme.
- **Admin & Public Panel:** Jede Funktion mit öffentlichem & Admin-Teil.
- **Dynamische UI:** Animierte Oberflächen mit GSAP & Motion.
- **Automatisierte API-Dokumentation:** Swagger, Meta-Config & CLI.
- **Leicht erweiterbar:** Plug & Play für neue Module und Integrationen.

---

## 🛠️ Installation

### 1. Backend (Express + TypeScript + MongoDB)

```bash
cd backend
npm install        # oder bun install
cp .env.example .env
npm run dev        # oder bun run dev
````

### 2. Frontend (React + Redux Toolkit + Styled Components)

```bash
cd frontend
npm install        # oder bun install
npm run dev
```

> Standardmäßig läuft das Frontend auf `localhost:3000` und das Backend auf `localhost:5000`.

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

> Jedes **Modul** besitzt eigene `public`- und `admin`-Unterverzeichnisse.
> Gemeinsame Styles und Themes befinden sich in `/styles`.
> Routing & Layouts werden zentral organisiert.

---

## 📦 Modulsystem

Jedes Modul (z.B. `bikes`, `home`) folgt dieser Struktur (Frontend & Backend identisch):

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

* **Backend:**
  Jede API ist ein eigenes Modul, mit Controller, Model, Validation, Route, Meta-Config und Test.
* **Frontend:**
  Jedes Modul mit eigenem Slice, Sprachdatei und Komponenten.

---

## 🌐 Sprach- & Theme-Management

* **Mehrsprachigkeit:**

  * 3 Sprachen (DE, EN, TR) werden mit i18n unterstützt.
  * Sprachwahl in der Navbar.
  * Übersetzungsdateien pro Modul.
* **Theme-Management:**

  * Dynamischer Theme-Switch mit `styled-components` + `ThemeProvider`.
  * Globale & komponentenbasierte Styles.

---

## 🧑‍💻 Entwicklungsrichtlinien

* **Modularität:**
  Jedes Modul folgt dem Single-Responsibility-Prinzip.
* **Routing:**
  Zentral verwaltet (Frontend & Backend), verschiedene Layouts pro Bereich (Visitor/Admin/User).
* **State Management:**
  Pro Modul ein eigener Redux Slice, zentrales Theme-Management.
* **API-Kommunikation:**
  Zentrale Hilfsfunktionen, .env für Umgebungen.
* **Testing:**
  Backend: Jest + Supertest, Tests pro Modul.
  Frontend: Komponententests (Empfehlung).

---

## 🛠️ Backend: MetaHub API-System

**MetaHub** ist die Backend-Basis von Radanor – vollmodular, multi-project-fähig und automatisiert.
Alle Backend-Features werden via **Meta-System** automatisch als Swagger & Adminpanel-Doku generiert!

### Hauptfunktionen

* Multi-Project Support (.env für jedes Projekt)
* 100% modular (jedes Modul: Model, Route, Controller, Validation, Tests)
* Automatisierte Swagger-Generierung (Meta-Dateien, Versionierung, Git-Tracking)
* CLI-Tools: Modulgenerator, Meta-Generator, Embeddings
* Mehrsprachigkeit: Labels, Fehlertexte, Validierung in DE/EN/TR
* Integration: Pinecone, OpenAI, Ollama, WebSockets
* Unit- & Integrationstests (Jest + Supertest)
* PM2 Deployment, Git Webhook, CI/CD Support
* Token-Auth mit httpOnly Cookies, Secure Uploads, CORS, Helmet, Rate-Limiter

### Beispiel `.env`

```dotenv
APP_ENV=radanor
PORT=5000
MONGO_URI=mongodb://localhost:27017/radanor
SWAGGER_BASE_URL=http://localhost:5000/api
PROJECT_NAME=RADANOR API
PROJECT_DESCRIPTION=Modulares REST API System für Radanor
PINECONE_API_KEY=xxx
OPENAI_API_KEY=xxx
SMTP_HOST=smtp.hostinger.com
SMTP_USER=info@deine-domain.de
SMTP_PASS=securepassword
```

### Meta & CLI

* Meta-Daten werden mit

  ```bash
  bun run generate:meta
  ```

  generiert.
* Neue Module via CLI:

  ```bash
  bun run scripts/createModule.ts modulname
  ```

### Swagger

* Swagger UI: [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)
* Swagger JSON: [`http://localhost:5000/swagger.json`](http://localhost:5000/swagger.json)

---

## 🤝 Beitrag & Entwicklung

**Mitmachen?**

1. Repository forken, neuen Branch anlegen:
   `git checkout -b feature/neuesfeature`
2. Code schreiben, testen.
3. Pull Request öffnen.
   Achte auf Lesbarkeit, Modularität und Best Practices!

---

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.

---

✨ **Pro-Tipp:**
Nutze immer den CLI-Modulgenerator für neue Module!
Alles ist plug & play erweiterbar – ob Pinecone, Ollama, Embeddings oder Neues!

---

➡️ **Fragen, spezielle Integrationen oder mehr Doku gewünscht?
Einfach ein Issue erstellen! 🚀**

```
