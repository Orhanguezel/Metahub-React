
---

# 📦 RadanoR – Modül Sistemi Açıklaması

RadanoR Backend projesi, tamamen **modüler ve ölçeklenebilir** bir yapıdadır. Her fonksiyonel alan kendi modülü olarak geliştirilir ve yönetilir. Bu sayede sistem:

* Dinamik şekilde genişletilebilir
* Özelleştirilebilir (her projede farklı modül aktif olabilir)
* Reuse (modül bazlı) mimari sağlar

---

## 📁 Modül Yapısı

Tüm modüller `src/modules` klasörü altında yer alır:

```
src/modules/
├── about/
├── address/
├── cart/
├── ...
```

Her modül en az aşağıdaki yapıyı içerir:

```bash
modulename/
├── modulename.controller.ts
├── modulename.routes.ts
├── modulename.validation.ts 
├── modulename.model.ts        
├── __tests__/                 # opsiyonel
└── index.ts
```

---

## 🔁 Dinamik Yükleme Mantığı

1. `APP_ENV=radanor` gibi bir env parametresi ile hangi projenin çalıştığı belirlenir.
2. `.env.radanor` gibi proje bazlı `.env` dosyasındaki `ENABLED_MODULES` alanı okunur:

```env
ENABLED_MODULES=users,product,order,...
```

3. Yalnızca bu listede olan modüller:

   * Meta sistemine dahil edilir (`generate:meta`)
   * Swagger’a yüklenir
   * Admin panelde Sidebar'da görünür
   * Express Router tarafından otomatik mount edilir

---

## 🧠 Meta & Frontend Entegrasyonu

* `bun run generate:meta` komutu her modülün rotalarını ve validasyonlarını analiz eder.
* Sonuçta her modül için `meta-configs/{env}/{modulename}.meta.json` dosyası oluşur.
* Bu meta dosyaları:

  * Swagger UI'da görünür
  * Frontend admin panelinde modül yapılandırmasını belirler

> Her şey tamamen otomatik ve dosya bazlıdır. Kod içinde bir liste tutulmaz.

---

## ⚙️ Express Router Dinamiği

Tüm modüller aşağıdaki gibi dinamik şekilde mount edilir:

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

## ➕ Yeni Modül Ekleme

1. `src/modules/modulename/` altında klasör oluştur
2. Standart dosyaları ekle (`*.controller.ts`, `*.routes.ts`, vs.)
3. `.env.radanor` dosyasındaki `ENABLED_MODULES` alanına `modulename` ekle
4. `bun run generate:meta` çalıştır
5. Bitti! Modül:

   * Express'e eklendi
   * Meta dosyası üretildi
   * Admin panelde görünüyor

---

## 🚫 İzole Mimari

Her modül:

* **Bağımsızdır** – başka bir modüle bağlı değildir.
* **Test edilebilir** – Postman koleksiyonu ile test yapılır.
* **Geliştirilebilir** – sadece ilgili modül üzerinde geliştirme yapılabilir.
* **Yeniden kullanılabilir** – başka bir projeye taşınabilir.

---

## 📝 Örnek `.env.radanor`

```env
APP_ENV=radanor
ENABLED_MODULES=users,product,order,cart,notification,...
```

---
