
---

## 🚩 **Radanor Projesi için ChatGPT Sürekli Talimatlar**

### 1. **Kod ve Proje Dili**

* **TÜM kodlarda ve açıklamalarda Türkçe kullanma!**

  * Kod, değişken, fonksiyon isimleri, yorumlar, açıklamalar **sadece İngilizce** olacak.
  * Yalnızca çeviri dosyaları için İngilizce, Türkçe, Almanca içerik üretilecek.
  * Örnek:

    * ✅ `// Returns the bike details`
    * ❌ `// Bisiklet detaylarını döndürür`

### 2. **Çeviri (i18n) Yönetimi**

* Her yeni kelime, başlık veya içerik değişikliği için **üç dilde** (EN, TR, DE) çeviri dosyası öner ve üret.
* i18n dosyaları JSON formatında, anahtar-değer yapısı ile hazırlanmalı.
* İngilizce **default/base** dil, Türkçe ve Almanca ek diller olacak.

### 3. **Kod Aktarımı & Dönüştürme**

* Farklı bir projeden (örneğin Next.js) örnek kod veya bileşen atarsam, **her zaman Radanor projesinin mimarisine ve modüler yapısına göre** uyarlayarak dönüştür:

  * Klasör yapısı: Her şey modül bazında, `public`, `admin`, `slice`, `i18n`, `index.js` mantığı korunacak.
  * State management: Redux Toolkit slice yapısı ve store kullanımı ile uyumlu olacak.
  * Styling: Sadece **styled-components** ile stil yazılacak.
  * Dil desteği ve tema desteği entegre olacak.

### 4. **Kod Standartları & Mimarisi**

* **Her kod örneği modüler, sade, tekrar içermeyen şekilde yazılacak.**
* Her fonksiyonel alanı (örneğin bir bisiklet detayı) bağımsız bir modül olarak ele al.
* Her modülde:

  * `public` ve `admin` alt bölümleri olacak.
  * Kendi slice, i18n ve index dosyasını barındıracak.
* Routing, layout, tema, dil vs. merkezi dosyalardan yönetilecek.
* API istekleri, merkezi bir api helper (ör: `api.js` veya `apiCall.js`) üzerinden yapılacak.

### 5. **Frontend Teknolojileri**

* Yalnızca **React + Redux Toolkit + Styled Components** tabanlı kod üret.
* Klasik SCSS, CSS Module, veya başka stil yöntemi **KULLANMA**.
* Kod örneklerinde **function component** ve **hooks** kullan.
* Gereksiz bağımlılık, üçüncü parti kütüphane, eski React syntax **KULLANMA**.

### 6. **Backend İletişimi**

* API endpoint ve model isimleri İngilizce olacak.
* Express, TypeScript ve MongoDB ile uyumlu örnekler göster.
* Frontend ve backend arasında field mapping ve veri tipi uyuşmazlığına dikkat et.

### 7. **Proje Mimarisine Sadık Kal**

* Route, layout, slice ve modül hiyerarşisini **her zaman** koru.
* Yeni fonksiyon veya modül geliştirirken **önce modül şeması** ve dosya organizasyonunu öner.

### 8. **Sorularda Açıklık**

* Kod dönüştürme, refactoring, veya yeni bir işlev geliştirirken **her adımı açıklayıcı, gerekirse step-by-step anlat**.
* Kendi içinde eksik kalan alanlar için tamamlayıcı tavsiye veya soru öner.

### 9. **Test ve Validasyon**

* Kod örneklerinde basit de olsa validasyon, hata yönetimi ve type checking ekle.
* Slice örneklerinde loading/error state'leri göster.

### 10. **Notasyon ve Açıklamalar**

* Kodda açıklama gerekiyorsa sadece İngilizce olarak kısa, fonksiyonel ve profesyonel notlar ekle.

---

## **Kısaca:**

* **Türkçe asla kodda olmasın!**
* **Her şey modüler, dil/tema uyumlu, Redux uyumlu ve styled-components ile olsun!**
* **Dışarıdan gelen kodu Radanor mimarisine birebir adapte et!**
* **Çeviri dosyaları: EN, TR, DE üçlü olacak!**
* **Her kod örneği sürdürülebilir, anlaşılır ve temiz olacak.**

---

> **Bu talimatlara aykırı kod veya örnek verirsem, beni düzelt! Her kodu Radanor mimarisine ve bu standartlara göre yaz!**


Hiçbir yerde TypeScript tipi veya interface kullanma.

Sadece saf ES6+ JavaScript, Redux Toolkit.

Stringler ve tüm notasyon tamamen İngilizce.

apiCall yapına ve payload.data standardına %100 uygun.

Kod tekrarı yok, sade ve sürdürülebilir.

Her reducer ve async thunk, frontend'de kullanılmaya hazır olacak sekilde kod yaz. 