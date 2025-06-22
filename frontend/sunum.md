## RADANOR — Ein unabhängiger, vollständig dynamischer Tenant auf einer modernen Multi-Tenant E-Commerce Plattform


Die Entwicklung ist fast abgeschlossen – der finale Launch ist für nächste Woche geplant.

Im folgenden Abschnitt präsentiere ich Ihnen das moderne Nutzer- und Admin-Management von Radanor: Wie Endnutzer sich registrieren, einloggen und verifizieren können – sowie wie das gesamte System zentral und vollständig dynamisch über das Admin-Panel gesteuert wird. Außerdem zeige ich, das mehrsprachige (Multi-Language) System von Radanor funktioniert 





Auf der Radanor-Plattform gibt es umfassende und *vollständig dynamische* Mehrsprachigkeitsunterstützung für jede Seite und jeden Benutzer.**


  * Übersetzungen und Sprachinhalte werden vollständig in der Datenbank und im Admin-Panel verwaltet;
  * Neue Sprachen können in wenigen Minuten über das Panel hinzugefügt werden.


*Eine neue Sprache hinzufügen und verwalten ist so einfach wie das Hinzufügen einer Option im Panel!

---

### 2. Moderne und sichere Nutzerverwaltung: Login/Register & E-Mail/SMS-Verifizierung

**Registrierungs- und Login-Prozesse in Radanor erfüllen aktuelle Sicherheitsstandards.**

* **1. E-Mail-Verifizierung:**

  * Nutzer geben beim Registrieren ihre E-Mail-Adresse ein und erhalten automatisch eine Bestätigungs-E-Mail.
  * Ohne Klick auf den Verifizierungslink wird das Konto nicht aktiviert – so werden Spam- und Fake-Accounts verhindert.

* **2. OTP (Einmal-Code) / SMS-Verifizierung:**

  * Optional erhält der Nutzer einen 6-stelligen Verifizierungscode (per E-Mail oder SMS).
  * Der Code muss im Panel eingegeben werden, um einen zweiten Sicherheitsfaktor zu bieten.

* **3. Starke Passwörter & Validierung:**

  * Die Passwortsicherheit wird automatisch geprüft; schwache Passwörter werden nicht akzeptiert.

* **Login:**

  * Ohne abgeschlossene E-Mail- oder OTP-Verifizierung ist kein Login möglich.
  * Nach erfolgreicher Anmeldung wird ein sicheres JWT & HTTP-only Cookie verwendet.


---

### 3. Backend und Multi-Tenant-Architektur: Die Position von Radanor

Eine zentrale Multi-Tenant-Plattform, die *zahlreiche Marken und Projekte (Tenants) auf einer einzigen Backend hostet.

* **Radanor:**
  Nutzt als unabhängiger Tenant auf dieser Plattform alle Vorteile – vollständig unabhängig und individuell konfigurierbar.

* **Unabhängigkeit für jeden Tenant:**

  * Radanor verwaltet Design, Logo, Sprachen, Inhalte und Module flexibel und unabhängig im eigenen Panel.
  * Kunden-, Bestell-, Produkt- und Inhaltsdaten gehören ausschließlich Radanor und sind isoliert gespeichert.

* **Panel statt Code!**

  * Alle Operationen – Produkte/Kategorien/Sprachen hinzufügen, Design ändern, Inhalte aktualisieren – *werden über das Panel und vollständig dynamisch erledigt*; keine Codeänderung oder Deployment nötig.

---

### 4. Anwendungsszenario: Radanor Fahrrad-E-Commerce-Seite

* **Im Radanor Admin-Panel** können Produkte und Kategorien hinzugefügt und bearbeitet, Designs oder Sprachen angepasst, Aktionen gestartet sowie Nutzer und Bestellungen verwaltet werden.
* All das erfolgt ohne Programmierkenntnisse, vollständig über Panel und Datenbank.

---

### 5. Allgemeine Vorteile von Metahub

* **Ein Backend, unbegrenzt viele Tenants:**

  * Jede Marke/jedes Projekt wird als Tenant auf einer zentralen Backend gehostet, alle Updates werden zentral verwaltet.
* **Super Admin Panel:**

  * Ein globaler Super-Admin kann alle Tenants zentral überwachen und verwalten; Radanor und andere Tenants pflegen trotzdem ihr eigenes, unabhängiges Content- & Designmanagement.

---

### 6. Slogan und Abschluss

> **„KEIN CODE, NUR PANEL! — Neue Marken/Projekte eröffnen und verwalten – ohne Deploy oder Programmierung – ist jetzt mit Radanor möglich.“**

---

**Kurzfassung:**
Radanor ist auf der Metahub-Plattform ein komplett unabhängiger, vollständig dynamisch und zentral über das Panel verwaltbarer Tenant.

---
