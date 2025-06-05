
---

## 🚩 **ChatGPT-Daueranleitung für das Radanor-Projekt**

### 1. **Code- und Projektsprache**

* **Im gesamten Code und in allen Kommentaren KEIN Türkisch!**

  * Code, Variablennamen, Funktionsnamen, Kommentare und Erklärungen **nur auf Englisch**.
  * Übersetzungsdateien werden dreisprachig erstellt: Englisch, Türkisch, Deutsch.
  * Beispiel:

    * ✅ `// Returns the bike details`
    * ❌ `// Bisiklet detaylarını döndürür`

### 2. **Übersetzungs- (i18n) Management**

* Für jedes neue Wort, jede Überschrift oder Inhaltsänderung **immer Übersetzungsdateien in drei Sprachen** (EN, TR, DE) vorschlagen und erzeugen.
* i18n-Dateien sind im JSON-Format, key-value-Struktur.
* Englisch ist die **Default-/Basis-Sprache**, Türkisch und Deutsch als Zusatz.

### 3. **Code-Übertragung & Transformation**

* Wenn Beispielcode (z.B. aus Next.js) kommt, **immer nach Radanor-Projektarchitektur und modularer Struktur anpassen**:

  * Ordnerstruktur: Alles modular, mit `public`, `admin`, `slice`, `i18n`, `index.js` pro Modul.
  * State Management: Kompatibel mit Redux Toolkit Slice und zentralem Store.
  * Styling: **Nur styled-components** verwenden!
  * Sprach- und Theme-Support immer integriert.

### 4. **Code-Standards & Architektur**

* **Jeder Code modular, klar und ohne Wiederholungen.**
* Jede Funktion (z.B. Produktdetail) als eigenständiges Modul.
* Jedes Modul:

  * Hat `public`- und `admin`-Bereich.
  * Enthält eigenen Slice, i18n und Index-Datei.
* Routing, Layout, Theme, Sprache usw. werden zentral verwaltet.
* API-Aufrufe nur über zentrale Helper (`api.js` oder `apiCall.js`).

### 5. **Frontend-Technologien**

* **Ausschließlich React + Redux Toolkit + styled-components!**
* Kein klassisches SCSS, CSS Modules oder andere Stilmethoden verwenden!
* Nur Function Components und Hooks schreiben.
* Keine unnötigen Abhängigkeiten oder Third-Party-Libs, kein alter React-Syntax!

### 6. **Backend-Kommunikation**

* API-Endpunkte und Modellnamen immer auf Englisch.
* Beispiele müssen zu Express, TypeScript und MongoDB passen.
* Field Mapping und Datentypen zwischen Frontend und Backend immer abstimmen.

### 7. **Architekturtreue**

* Halte IMMER die Struktur für Routing, Layout, Slice und Modulkaskade ein.
* Bei neuen Funktionen oder Modulen **zuerst Modulschema und Dateiorganisation skizzieren**.

### 8. **Klarheit bei Fragen**

* Bei Refactoring, Konvertierung oder neuen Features **jeden Schritt erklären, ggf. Schritt-für-Schritt**.
* Für fehlende oder unklare Bereiche immer Vorschläge oder Rückfragen liefern.

### 9. **Testing und Validierung**

* In Codebeispielen stets einfache Validierung, Fehlerbehandlung und Type Checking.
* In Slice-Beispielen immer loading/error States zeigen.

### 10. **Notation und Kommentare**

* Kommentare nur kurz, funktional und professionell auf Englisch.

---

## **Kurzfassung:**

* **Kein Türkisch im Code!**
* **Alles modular, mehrsprachig, Theme-/Redux-kompatibel und mit styled-components!**
* **Jeder Fremdcode wird nach Radanor-Muster umgebaut!**
* **Übersetzungen immer EN, TR, DE!**
* **Alle Beispiele sauber, verständlich und nachhaltig.**

---

> **Sollte ich gegen diese Vorgaben verstoßen, erinnere mich bitte daran! Jeder Code muss exakt nach Radanor-Architektur und diesen Standards erstellt werden!**

---

* Keine TypeScript-Typen oder Interfaces verwenden.
* Nur pures ES6+ JavaScript, Redux Toolkit.
* Alle Strings und Notation sind ausschließlich auf Englisch.
* API-Aufrufe zu 100% passend zu apiCall- und payload.data-Standard.
* Keine Redundanzen, der Code ist klar und nachhaltig.
* Jeder Reducer und asyncThunk ist frontend-ready geschrieben.

---