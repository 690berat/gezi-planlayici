# Gezi Planlayıcı
Gezi Planlayıcı, gezilecek yerleri, ziyaret saatlerini ve notları tek bir günlük planda toplar. Seyahat bilgilerini farklı yerlerde tutmak yerine düzenli bir rota oluşturmak isteyen öğrenciler ve bireysel gezginler için geliştirilmiştir. Kullanıcı şehir ve tarih aralığıyla gezi oluşturur; günlere durak ekler, kayıtlarını düzenler veya siler.

## İş Takip Panosu
**Panoya erişim:** [Gezi Planlayıcı — Geliştirme Panosu](https://github.com/users/690berat/projects/1/views/1)

Geliştirme görevleri **Yapılacak**, **Devam Ediyor** ve **Tamamlandı** sütunlarında takip edilir. Kartlarda görev açıklaması, kabul kriterleri ve ilgili commit/PR bağlantıları yer alır.

## Teknolojiler
React, Vite, CSS ve tarayıcı localStorage. Fotoğraflar proje içinden yüklenir; [görsel kaynakları](docs/gorsel-kaynaklari.md) dosyasında listelenmiştir.

## Kurulum ve çalıştırma
Node.js 22 veya üzeri ve npm gereklidir. ZIP’i çıkarın veya depoyu klonlayın. Terminali `package.json` dosyasının bulunduğu proje klasöründe açıp komutları sırayla çalıştırın:

```bash
npm install
npm run dev
```

Terminalde gösterilen bağlantıyı açın; genellikle http://localhost:5173 olur. Durdurmak için **Ctrl + C** kullanın. API anahtarı ve veritabanı kurulumu gerekmez. PowerShell’de komutların başına `PS ...>` veya `>>` işaretlerini yazmayın.

## Özellikleri deneme
### 1. Gezi oluşturma
**Yeni gezi oluştur** düğmesine basın. Gezi adı olarak `Hafta sonu keşfi`, şehir olarak `Şanlıurfa`, başlangıç olarak `05.12.2026`, bitiş olarak `07.12.2026` girip **Gezimi oluştur** düğmesine basın.

**Beklenen:** Gezi kartı ve üç günlük plan oluşur. Bitiş başlangıçtan önce seçilirse kayıt engellenir. Bir gezi en fazla 60 gün olabilir.

### 2. Günlük plana durak ekleme ve saat sıralaması
Gezinin **1. Gün** seçeneğini açın. Yer adı `Balıklıgöl`, saat `10:00`, not `Sabah yürüyüşü` girip **Durağı plana ekle** düğmesine basın. Aynı güne `Göbeklitepe` durağını `09:00` saatiyle ekleyin. Ardından **2. Gün** seçeneğine geçin.

**Beklenen:** İlk günde Göbeklitepe, Balıklıgöl’den önce görünür. İkinci günde bu duraklar gösterilmez. Not eklemek isteğe bağlıdır.

### 3. Gezi düzenleme
Gezi kartındaki **Düzenle** düğmesine basın. Gezi adını veya şehrini değiştirip **Değişiklikleri kaydet** düğmesine basın.

**Beklenen:** Kart ve plan başlığı güncellenir; mevcut duraklar korunur. Durakların tarihlerini dışarıda bırakan yeni tarih aralığı seçilirse değişiklik engellenir.

### 4. Gezi silme
Karttaki **Sil** düğmesine basın. Önce işlemi iptal ederek gezinin korunduğunu kontrol edin. Tekrar silmeyi seçip bu kez onaylayın.

**Beklenen:** Onaylanan gezi ve ona bağlı tüm duraklar kaldırılır. Son gezi silindiğinde ilk geziyi oluşturma alanı görünür.

### 5. Durak düzenleme
Durağın altındaki **Düzenle** düğmesine basın. Sağdaki forma gelen yer, saat veya notu değiştirip **Değişiklikleri kaydet** düğmesine basın. Örneğin `10:00` saatini `08:00` yapın.

**Beklenen:** Durak bilgileri güncellenir ve yeni saate göre sıralanır. **Düzenlemekten vazgeç** seçildiğinde kaydedilmemiş değişiklikler uygulanmaz.

### 6. Durak silme
Durağın altındaki **Sil** düğmesine basın. Önce iptal edin; ardından tekrar deneyip onaylayın.

**Beklenen:** İptalde durak korunur. Onayda yalnızca seçilen durak kaldırılır; diğer duraklar ve gezi korunur.

### 7. Kayıtların korunması
Bir gezi ve durak oluşturun, bilgilerinde değişiklik yapın ve tarayıcı sayfasını yenileyin. Silme işlemi sonrasında da sayfayı yenileyin.

**Beklenen:** Mevcut kayıtlar ve düzenlemeler korunur; silinen kayıtlar geri gelmez. Veriler yalnızca aynı tarayıcı ve uygulama adresinde saklanır. Tarayıcı verilerini temizlemek kayıtları siler; cihazlar arasında eşitleme yapılmaz.

### 8. Hazır rota kartları
**Rota ilhamı** bölümündeki Kapadokya, Antalya, Şanlıurfa, Trabzon, İstanbul, Efes, Mardin veya Nemrut kartlarından birine tıklayın. Tarihleri seçip geziyi kaydedin.

**Beklenen:** Gezi formu seçilen rotanın gezi adı ve şehir bilgisiyle açılır. Efes için şehir İzmir, Nemrut için Adıyaman’dır. Hazır rota seçimi durak eklemez; günlük durakları kullanıcı oluşturur.

### 9. Mobil görünüm
Uygulamayı tarayıcının geliştirici araçlarında mobil ekran görünümüyle açın. Gezi kartlarını, gün seçimini ve ekleme/düzenleme formlarını deneyin.

**Beklenen:** Sayfa yatay taşmadan kullanılabilir; kartlar ve formlar ekran genişliğine uyum sağlar. Çok sayıda gün olduğunda gün seçenekleri kendi alanında yatay kaydırılabilir.

### 10. Gezilerde arama ve filtreleme
**Gezilerim** bölümünde gezi adı veya şehir yazın; örneğin `şanlıurfa` araması Şanlıurfa gezilerini bulmalıdır. **Gezi durumu** alanından Yaklaşan, Devam eden veya Tamamlanan seçin. Durumlar gezinin tarihleriyle bugünün tarihine göre belirlenir; başlangıç ve bitiş günü devam eden kapsamındadır.

**Beklenen:** Arama büyük/küçük harften bağımsızdır ve durum filtresiyle birlikte çalışır. Eşleşme yoksa açıklayıcı mesaj gösterilir. **Filtreleri temizle** veya **Tüm gezileri göster** ile tüm kartlar geri gelir. Filtreye uymayan seçili gezinin detay planı da gizlenir; geziler silinmez.

## Kontroller
Otomatik kontroller için `npm test`, üretim derlemesi için `npm run build` çalıştırın. Derleme `dist` klasörüne yazılır; `npm run preview` ile yerel olarak incelenebilir. Otomatik kontroller iş kurallarını kapsar; yukarıdaki arayüz senaryoları ayrıca elle doğrulanmalıdır.

## Gelecek geliştirmeler
Bütçe hesaplama, PDF indirme, harita, yedekleme, durak kategorileri ve ziyaret edildi işaretleme sonraki geliştirmeler olarak planlanmıştır; mevcut sürümde bulunmaz.

**Geliştirici:** Berat Kolsuzoğlu · Güncel Yazılım Geliştirme Süreçleri ve DevOps bireysel projesi.

## Devam eden çalışmalar
Arama/filtreleme özelliği arayüze bağlanmıştır. Bütçe, PDF ve genel gezi notu için ilk iş kuralları ile otomatik testler hazırlanmıştır; bu üç modül henüz arayüze bağlı değildir. Başlanan ve kalan işler: [geliştirme durumu](docs/devam-eden-calismalar.md).
