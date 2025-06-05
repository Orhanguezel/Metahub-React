
---

# 📦 RadanoR – Modulsystem Beschreibung

Das **RadanoR Backend** ist ein vollständig **modulares und skalierbares** System. Jeder funktionale Bereich wird als eigenes Modul entwickelt und verwaltet. Dadurch wird das System:

* Dynamisch erweiterbar
* Anpassbar für jedes Projekt (unterschiedliche Module pro Projekt)
* Wiederverwendbar durch modulare Architektur

---

## 📁 Modulstruktur

Alle Module befinden sich im Verzeichnis `src/modules`:

```
src/modules/
├── about/
├── address/
├── cart/
├── ...
```

Jedes Modul enthält mindestens die folgende Struktur:

```bash
modulname/
├── modulname.controller.ts
├── modulname.routes.ts
├── modulname.validation.ts 
├── modulname.model.ts        
├── __tests__/                 # optional
└── index.ts
```

---

## 🔁 Dynamisches Laden der Module

1. Die aktive Umgebung wird über eine Umgebungsvariable wie `APP_ENV=radanor` definiert.
2. In der `.env.radanor`-Datei wird das Feld `ENABLED_MODULES` ausgewertet:

```env
ENABLED_MODULES=users,product,order,...
```

3. Nur die dort aufgeführten Module werden:

   * ins Meta-System aufgenommen (`generate:meta`)
   * im Swagger-Dokument sichtbar gemacht
   * im Admin-Panel in der Sidebar angezeigt
   * automatisch durch Express als Routen eingebunden

---

## 🧠 Meta- und Frontend-Integration

* Der Befehl `bun run generate:meta` analysiert alle Routen und Validierungen eines Moduls.
* Für jedes Modul wird eine Meta-Datei erstellt: `meta-configs/{env}/{modulename}.meta.json`
* Diese Meta-Dateien:

  * erscheinen in der Swagger-Oberfläche
  * steuern das Verhalten und die Sichtbarkeit im Admin-Panel

> Alles geschieht automatisch, ohne manuelle Listen im Code.

---

## ⚙️ Express-Router Dynamik

Alle Module werden zur Laufzeit dynamisch wie folgt eingebunden:

```ts
const modulesPath = path.join(__dirname, "modules");

fs.readdirSync(modulesPath).forEach((mod) => {
  if (enabledModules.includes(mod)) {
    const routerPath = path.join(modulesPath, mod, `${mod}.routes.ts`);
    if (fs.existsSync(routerPath)) {
      const { router } = require(routerPath);
      app.use(`/${mod}`, router);
      console.log(`✅ [OK] Mounted /${mod} (${mod})`);
    }
  } else {
    console.log(`⏭️  [SKIP] ${mod} is not listed in ENABLED_MODULES`);
  }
});
```

---

## ➕ Neues Modul hinzufügen

1. Ordner `src/modules/modulename/` erstellen
2. Standard-Dateien anlegen (`*.controller.ts`, `*.routes.ts`, etc.)
3. Modulname zur `.env.radanor` Datei im Feld `ENABLED_MODULES` hinzufügen
4. `bun run generate:meta` ausführen
5. Fertig! Das Modul ist jetzt:

   * im Express-Router aktiv
   * im Meta-System enthalten
   * im Admin-Panel sichtbar

---

## 🚫 Isoliertes Modulsystem

Jedes Modul ist:

* **Unabhängig** – es gibt keine Abhängigkeit zu anderen Modulen
* **Testbar** – Tests erfolgen über Postman-Collections
* **Wartbar** – Änderungen betreffen nur das jeweilige Modul
* **Wiederverwendbar** – kann in anderen Projekten eingesetzt werden

---

## 📝 Beispiel `.env.radanor`

```env
APP_ENV=radanor
ENABLED_MODULES=users,product,order,cart,notification,...
```

---