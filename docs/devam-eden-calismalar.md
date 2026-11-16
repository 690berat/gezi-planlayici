# Devam eden geliştirmeler

Bu dört görevin iş kuralları ve ilk otomatik testleri hazırlanmıştır. Henüz kullanıcı arayüzüne bağlanmamıştır; özellikler bitmiş değildir. Mevcut uygulama arayüzü aynı kalır.

| Görev | Başlanan çalışma | Kalan işler |
| --- | --- | --- |
| Gezi bütçesi hesaplama | `src/features/budget.js`: gider doğrulama ve kuruş hassasiyetinde toplam; testleri. | Form, gezi başına kayıt, arayüz testleri. |
| Gezilerde arama ve filtreleme | `src/features/search.js`: Türkçe arama ve tarih bazlı durum filtresi; testleri. | Arama kutusu, filtre seçenekleri, boş sonuç görünümü. |
| Gezi planını PDF indirme | `src/features/pdf-plan.js`: günlere ayrılmış ve saat sıralı çıktı verisi; testi. | PDF üretimi, Türkçe font, sayfalama, indirme düğmesi. |
| Geziye genel not ekleme | `src/features/notes.js`: ayrı genel not alanı, sınır doğrulaması ve temizleme; testleri. | Not formu, localStorage bağlantısı, kullanıcı denemeleri. |

## Panoda güncelleme
Bu dosyalar gerçek commitlerle gönderildikten sonra dört kart Devam Ediyor sütununa taşınabilir. Kartlara ilgili commit bağlantısını ve yukarıdaki başlanan çalışma bilgisini ekleyin. Mevcut kartlardaki form/indirme/kalıcı kayıt kriterleri henüz karşılanmadığından işaretlenmemelidir. Testler `npm test` ile çalıştırılır.
