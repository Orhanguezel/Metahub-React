
---

## 🚩 **Stałe Instrukcje dla ChatGPT – Projekt Radanor**

### 1. **Język kodu i projektu**

* **NIE używaj języka tureckiego w żadnym kodzie ani komentarzach!**

  * Nazwy zmiennych, funkcji, komentarze i opisy mają być wyłącznie **po angielsku**.
  * Wyjątek: pliki tłumaczeń – tam generuj treści po angielsku, turecku i niemiecku.
  * Przykład:

    * ✅ `// Returns the bike details`
    * ❌ `// Zwraca szczegóły roweru`

### 2. **Zarządzanie tłumaczeniami (i18n)**

* Dla każdego nowego słowa, tytułu lub treści – **zawsze podawaj tłumaczenia w trzech językach**: EN, TR, DE.
* Pliki tłumaczeń powinny być w formacie JSON, jako klucz-wartość.
* Domyślnym językiem jest **angielski**, pozostałe to turecki i niemiecki.

### 3. **Przenoszenie i konwersja kodu**

* Jeśli przesyłam przykład z innego projektu (np. Next.js), **zawsze konwertuj i dostosuj do architektury i modularnego stylu projektu Radanor**:

  * Struktura folderów: Wszystko modułowe, z `public`, `admin`, `slice`, `i18n`, `index.js` w każdym module.
  * Zarządzanie stanem: Zgodnie z Redux Toolkit slice i store.
  * Stylowanie: Tylko **styled-components**.
  * Wsparcie dla tłumaczeń i motywów musi być zachowane.

### 4. **Standardy kodowania i architektury**

* **Każdy przykład kodu powinien być modularny, prosty i pozbawiony powtórzeń**.
* Każda funkcjonalność (np. szczegóły roweru) jako niezależny moduł.
* W każdym module:

  * Oddzielne części `public` i `admin`.
  * Własne pliki slice, i18n i index.
* Routing, layout, motyw i język zarządzane centralnie.
* Żądania API przez centralny helper (`api.js` lub `apiCall.js`).

### 5. **Technologie frontendowe**

* Generuj kod tylko z użyciem **React + Redux Toolkit + Styled Components**.
* **NIE używaj** klasycznego SCSS, CSS Modules ani innych sposobów stylowania.
* Używaj tylko **function components** i **hooks**.
* Nie używaj zbędnych bibliotek, third-party zależności ani starej składni React.

### 6. **Komunikacja z backendem**

* Nazwy endpointów i modeli w języku angielskim.
* Przykłady zgodne z Express, TypeScript i MongoDB.
* Uważaj na mapowanie pól i typy danych między frontendem a backendem.

### 7. **Trzymaj się architektury projektu**

* **Zawsze** zachowuj hierarchię routingu, layoutów, slice i modułów.
* Przy nowych funkcjach lub modułach **najpierw zaproponuj schemat modułu i strukturę plików**.

### 8. **Jasność wyjaśnień**

* Przy refaktoryzacji, migracji lub nowych funkcjach – **wyjaśniaj każdy krok**; jeśli trzeba, krok po kroku.
* Jeśli czegoś brakuje, zasugeruj uzupełnienie lub zadaj pytanie.

### 9. **Testowanie i walidacja**

* W przykładach kodu zawsze dodawaj walidację, obsługę błędów i sprawdzanie typów.
* W slice pokazuj loading/error state’y.

### 10. **Notacja i komentarze**

* Jeśli potrzebny jest komentarz – tylko krótki i profesjonalny, wyłącznie po angielsku.

---

## **W skrócie:**

* **Nigdy nie używaj tureckiego w kodzie!**
* **Wszystko modularne, z obsługą języka/motywu, zgodne z Redux i styled-components!**
* **Kod z innych projektów zawsze konwertuj pod architekturę Radanor!**
* **Pliki tłumaczeń: EN, TR, DE!**
* **Kod czysty, zrozumiały i zgodny z zasadami projektowymi.**

---

> **Jeśli instrukcje nie będą przestrzegane, popraw mnie! Każdy kod dostosuj do architektury i tych standardów projektu Radanor!**

---
