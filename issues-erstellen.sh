# Vor der Nutzung: gh auth login ausführen!

# ====== USERS ======
gh issue create --title "[ERLEDIGT] Users Backend & Admin Panel implementiert" \
  --body "Das Backend-Modul für Benutzer (Model, CRUD, Validierung, Postman-Tests, Admin-Panel, Mehrsprachigkeit) ist komplett implementiert." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Users: MFA & Rollenverwaltung im Frontend" \
  --body "Die Integration von MFA/OTP im Frontend sowie rollenbasierte Benutzerverwaltung sind noch ausstehend. Internationalisierung (i18n) für alle Sprachen prüfen." \
  --repo Orhanguezel/RadanoR

# ====== WISHLIST ======
gh issue create --title "[ERLEDIGT] Wishlist Backend (Favoriten) abgeschlossen" \
  --body "Wishlist-Modell, Controller, Sicherheit und Validierung sind vollständig implementiert. Backend-Integration abgeschlossen." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Wishlist: Frontend-Integration" \
  --body "Favoriten-Button, Anzeige im Benutzerpanel sowie Benachrichtigungen und Preisalarm müssen noch implementiert werden." \
  --repo Orhanguezel/RadanoR

# ====== SETTINGS ======
gh issue create --title "[ERLEDIGT] Settings: Backend, Frontend und Admin-Panel abgeschlossen" \
  --body "Einstellungen-Modell, Bild-/Sprachunterstützung, Validierung und Administration sind fertiggestellt." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Settings: CDN & Cloudinary Integration" \
  --body "Bild-Uploads (CDN/Cloudinary) für Einstellungen müssen vollständig integriert werden. Zukunft: Caching & SSR untersuchen." \
  --repo Orhanguezel/RadanoR

# ====== PRODUKTE & KATEGORIEN ======
gh issue create --title "[ERLEDIGT] Produkte- und Kategoriemodul (Backend) fertiggestellt" \
  --body "Mehrsprachiges Produkt- und Kategorie-Modell, CRUD, Validierung und Backend-Integration sind abgeschlossen." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Produkte & Kategorien: Frontend-Integration" \
  --body "Produktverwaltung und Filter im Frontend fehlen noch. Tag-basierte Filterung und Thumbnail-Optimierung als Option." \
  --repo Orhanguezel/RadanoR

# ====== ORDER (BESTELLUNG) ======
gh issue create --title "[ERLEDIGT] Order-Modul (Backend & Admin) abgeschlossen" \
  --body "Bestellmodell, Controller, Validierung, Admin-Panel und alle Backoffice-Funktionen sind implementiert." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Bestellung: Frontend & Dashboard-Statistiken" \
  --body "Frontend-Integration für Bestellübersicht sowie Statistiken/Charts im Dashboard fehlen. Automatische E-Mail-Benachrichtigung steht aus." \
  --repo Orhanguezel/RadanoR

# ====== PAYMENT ======
gh issue create --title "[ERLEDIGT] Payment-Backend implementiert" \
  --body "Zahlungsmodell, Validierung, Controller und Grundfunktionen im Backend sind vollständig." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Payment: Externe Provider & Frontend" \
  --body "Integration von Stripe/Klarna sowie Tokenisierung und Maskierung im Frontend fehlen noch." \
  --repo Orhanguezel/RadanoR

# ====== NOTIFICATION (BENACHRICHTIGUNG) ======
gh issue create --title "[ERLEDIGT] Notification-Modul Backend abgeschlossen" \
  --body "Backend für Systembenachrichtigungen mit Model, Validierung und Controller ist abgeschlossen." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Notification: Frontend-UI & i18n" \
  --body "Frontend-Benachrichtigungsanzeige sowie mehrsprachige Nachrichten fehlen noch." \
  --repo Orhanguezel/RadanoR

# ====== GALLERY ======
gh issue create --title "[ERLEDIGT] Gallery Backend implementiert" \
  --body "Galerie-Modell, Controller, Validierung (inkl. Mehrsprachigkeit und Thumbnail-Logik) im Backend abgeschlossen." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Gallery: Admin-Panel, Batch-Features & Frontend" \
  --body "Admin-Oberfläche für Galerie-Management, Batch-/Sortierungsfunktionen sowie vollständige Frontend-Integration fehlen." \
  --repo Orhanguezel/RadanoR

# ====== COMMENT (KOMMENTARE) ======
gh issue create --title "[ERLEDIGT] Kommentar-Modul Backend abgeschlossen" \
  --body "Kommentarmodell, Validierung, Adminpanel und API-Endpunkte sind fertiggestellt." \
  --repo Orhanguezel/RadanoR

gh issue create --title "[OFFEN] Kommentare: Frontend, Captcha & Moderation" \
  --body "Frontend-Kommentarformular, Captcha/Spam-Schutz und Admin-Benachrichtigungen fehlen noch." \
  --repo Orhanguezel/RadanoR
