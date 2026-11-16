# Devam eden geliştirmeler

Arama/filtreleme ve genel gezi notu arayüzleri tamamlanmıştır. Genel not kartı kullanıcı kabul kontrolleri ve tamamlama commit bağlantısı eklendikten sonra kapatılır. Bütçe ve PDF görevlerinin başlangıç kodları hazırdır; bu iki özellik henüz arayüze bağlı değildir.

| Görev | Başlanan çalışma | Kalan işler |
| --- | --- | --- |
| Gezi bütçesi hesaplama | `src/features/budget.js`: gider doğrulama ve kuruş hassasiyetinde toplam; testleri. | Form, gezi başına kayıt, arayüz testleri. |
| Gezilerde arama ve filtreleme | `src/features/search.js`: Türkçe arama ve tarih bazlı durum filtresi; testleri. | Arayüz tamamlandı; kullanıcı kabul kontrolleri ve commit bağlantısının karta eklenmesi. |
| Gezi planını PDF indirme | `src/features/pdf-plan.js`: günlere ayrılmış ve saat sıralı çıktı verisi; testi. | PDF üretimi, Türkçe font, sayfalama, indirme düğmesi. |
| Geziye genel not ekleme | `src/features/notes.js`: ayrı genel not alanı, sınır doğrulaması ve temizleme; testleri. | Form, kayıt, düzenleme ve temizleme tamamlandı; kullanıcı kabul kontrolleri ve commit bağlantısı. |

## Panoda güncelleme
Arama/filtreleme değişiklikleri ayrı commit olarak gönderilir ve bağlantısı ilgili karta eklenir. README'deki 10. deneme adımları doğrulandıktan sonra kriterler işaretlenip kart Tamamlandı'ya taşınır. Genel not için README 11. adımları doğrulanıp ayrı commit bağlantısı karta eklenir; sonra kart Tamamlandı’ya taşınır. Bütçe ve PDF kartları Devam Ediyor durumunda kalır. Testler `npm test` ile çalıştırılır.
