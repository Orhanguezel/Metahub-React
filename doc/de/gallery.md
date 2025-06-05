
---

# 🖼️ **Galerie-Modul – Technische Architektur & Roadmap (RadanoR)**

---

## 🎯 Ziel des Moduls

Das Galerie-Modul dient zur Verwaltung von Bildern, die auf der Website verwendet werden (z. B. Hero-Bereich, Über-uns, Produkte, Banner, etc.). Die Bilder können nach Kategorien gruppiert, mehrsprachig beschriftet, optimiert und in der Anzeige priorisiert werden.

---

## 📁 Projektstruktur

```bash
src/modules/gallery/
├── gallery.models.ts
├── gallery.validation.ts
├── gallery.routes.ts
├── gallery.public.controller.ts
├── gallery.admin.controller.ts (optional empfohlen)
├── index.ts
└── road.mad.md
```

---

## 🧩 Modellübersicht (Erwartet)

```ts
{
  title: { tr, en, de },         // Mehrsprachiger Titel
  description?: { tr, en, de },  // Beschreibung
  image: ImageObject,            // Bild-URL + Thumbnail + Alt
  category: ObjectId,            // Referenz zur Kategorie (galleryCategory)
  isPublished: boolean,          // Veröffentlichungsstatus
  isActive: boolean,             // Soft Delete
  order: number,                 // Sortierreihenfolge in Kategorie
  priority?: number,             // Globale Priorität
  createdAt, updatedAt
}
```

---

## 🧠 Controller-Funktionen

### Öffentlicher Controller (`gallery.public.controller.ts`)

* `getAllGalleryItems`: Liefert nur veröffentlichte + aktive Bilder
* `getGalleryByCategory`: Filtert nach Kategorie
* Unterstützt Sprach-Fallbacks (title\[lang] || title.en ...)

### Admin-Controller (empfohlen)

* `createGalleryItem`
* `updateGalleryItem`
* `togglePublishStatus`
* `softDeleteGalleryItem`
* `restoreGalleryItem`

---

## ✅ Entwicklungsplan aus `road.mad.md`

### 1. **Thumbnail-Konfiguration (.env)**

```env
THUMBNAIL_WIDTH=400
THUMBNAIL_HEIGHT=300
THUMBNAIL_QUALITY=80
```

→ Thumbnails automatisch mit `sharp` erzeugen (webp, kleinformatig)

---

### 2. **Sortierung nach Kategorie**

* `order`: Reihenfolge innerhalb der Kategorie
* `priority`: Globale Priorität für carousels
* Sortierung in Controller kombinierbar

---

### 3. **Soft Delete & Wiederherstellung**

```http
PATCH /gallery/:id/restore
```

* `isActive = true` → wiederhergestellt

---

### 4. **Batch-Funktionen**

* Mehrere Items veröffentlichen:

  ```http
  PATCH /gallery/batch/publish
  ```
* Mehrere löschen (soft delete):

  ```http
  DELETE /gallery/batch
  ```

---

### 5. **Suche & Filter**

* Parameter:

  ```
  ?search=title_en:team
  ?isPublished=true&isActive=true
  ```
* Sprachbasierte Suche über Regex

---

### 6. **Statistik-Endpunkt**

```http
GET /gallery/stats
```

Beispiel-Antwort:

```json
{
  "total": 50,
  "byCategory": {
    "hero": 10,
    "about": 5,
    "products": 20
  },
  "published": 40,
  "archived": 10
}
```

---

### 7. **Mehrsprachige Fallbacks**

```ts
item.title[lang] || item.title.en || item.title.tr
```

---

### 8. **WebP-Optimierung**

* Beim Upload: `.webp`-Version erzeugen
* Tools: `sharp().webp().toFile(...)`

---

## 🔄 Integrationsempfehlungen

* Hero-Slider → `category = "hero"`
* Über-uns Seite → `category = "about"`
* Produkt-Galerie → `category = "products"`
* Sprachwechsel auf der Website → automatische Titel-Fallbacks
* Admin-Panel mit Drag-and-Drop Sortierung denkbar

---

## 📌 Stärken des Moduls

| Merkmal                  | Beschreibung                                        |
| ------------------------ | --------------------------------------------------- |
| 📸 Mehrere Bildformate   | Thumbnail + WebP-Unterstützung                      |
| 🌍 Mehrsprachigkeit      | Titel und Beschreibung in TR/EN/DE                  |
| 🧠 Meta-Unterstützung    | Automatische Meta-Dateien für Swagger & Admin Panel |
| 🔄 Soft Delete möglich   | Bilder werden archiviert statt gelöscht             |
| 📊 Statistik-Endpunkt    | Übersicht für Admin Dashboards                      |
| 🔍 Leistungsfähige Suche | Kombinierte Parameter-Suche im Admin                |

---

## 🎯 Fazit

Das Galerie-Modul bietet eine leistungsstarke, wiederverwendbare Grundlage für visuelle Inhalte in mehrsprachigen Webprojekten. Die Umsetzung der Roadmap macht das Modul zu einem **universell einsetzbaren Content-Manager für Bilder** im RadanoR-Ökosystem.

---