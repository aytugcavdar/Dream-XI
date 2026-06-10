# 🏆 Dream XI - Retro Draft Simulator

**Dream XI**, tarihi FIFA Dünya Kupası kadrolarından rüya takımınızı oluşturduğunuz, taktiksel dizilişleri ayarladığınız ve nakavt turnuvalarını simüle ettiğiniz retro tarzda bir spor menajerlik ve kadro kurma oyunudur.

Bu uygulama **Next.js 15+ (App Router)**, **Tailwind CSS v4** ve **Framer Motion (motion/react)** teknolojileri ile modern, performanslı ve göz alıcı bir arayüzle geliştirilmiştir.

---

## ✨ Öne Çıkan Özellikler

- 🌟 **Tarihi Kadrolar & Efsanevi Oyuncular:** Brezilya 1970'ten İtalya 2006'ya, efsaneleşmiş millî takımların kadrolarıyla draft yapın.
- 🧬 **Görsel Kimya Bağları (Visual Chemistry Links):** Saha dizilişinde yan yana oynayan ve aralarında güçlü bağ bulunan (aynı ülke, aynı dönem veya efsanevi ortaklık üyeleri) oyuncuların arasına yarı şeffaf, parlayan bağlantı çizgileri (synergy lines) çekilmektedir.
- 🤝 **Efsanevi Ortaklıklar:** Xavi ile Iniesta, Zidane ile Henry, Pele ile Garrincha gibi tarihin efsanevi ikililerini yerleştirdiğinizde özel kimya bonusları kazanın.
- 🏆 **Kupa Vitrini & Başarımlar (Trophy Cabinet):** Kazandığınız kupalara ve özel koşullara göre (örn. Samba Altını, Tiki-Taka Ustası, Klasik Nesil vb.) kilidi açılan, CSS ile modellenmiş harika parıldayan kupalar ve rozetler.
- 🔒 **Mevki Kontrolü:** Kadronuzda bir mevki sınırına ulaştığınızda dinamik uyarılar veren ve "Mevki Dolu" rozetiyle sizi bilgilendiren akıllı seçim paneli.
- 📊 **Detaylı Maç Simülasyonu:** Canlı simülasyon paneli ile maçların dakikalarını, golleri, asistleri, xG istatistiklerini ve oyuncu performanslarını anbean takip edin.

---

## 🛠️ Teknolojik Altyapı

- **Framework:** Next.js 15+ (App Router, Server & Client Components)
- **Styling:** Tailwind CSS v4 (Modern ve yüksek performanslı stil yönetimi)
- **Animasyonlar:** Framer Motion (`motion/react`)
- **İkonlar:** Lucide React (`lucide-react`)
- **Type Safety:** %100 TypeScript

---

## 🚀 Yerel Kurulum (Local Setup)

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Projeyi Klonlayın:**
   ```bash
   git clone <github-repo-linkiniz>
   cd dream-xi
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın:**
   Kök dizindeki `.env.example` dosyasını `.env.local` olarak kopyalayın ve gerekli değerleri girin:
   ```bash
   cp .env.example .env.local
   ```

4. **Geliştirici Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı test edebilirsiniz.

---

## 📦 Proje Kod Derlemesi (Build)

Üretim (Production) ortamı için projeyi derlemek isterseniz:

```bash
npm run build
```

Bu komut projenizi optimize edilmiş statik ve sunucu taraflı sayfalara derleyecektir. Projeyi yerelde production modunda başlatmak için:

```bash
npm run start
```

---

## 🌐 GitHub ve Canlıya (Production) Alma Rehberi

Projeyi GitHub'a yükleyip canlı bir web sitesi olarak barındırmak (Vercel, Netlify veya Cloud Run üzerinde yayınlamak) oldukça kolaydır. 

### 1️⃣ GitHub'a Yükleme Adımları

Yerel klasörünüzde terminali açın ve şu komutları sırasıyla uygulayın:

```bash
# Git deposunu başlatın
git init

# Tüm dosyaları ekleyin (.gitignore sayesinde gereksiz dosyalar filtrelenecektir)
git add .

# İlk commit'i oluşturun
git commit -m "feat: Dream XI Draft Simulator ready for production"

# GitHub'da oluşturduğunuz yeni boş repoyu uzak depo olarak tanımlayın
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git

# Kodu ana dallara gönderin
git branch -M main
git push -u origin main
```

### 2️⃣ Ücretsiz Canlıya Alma (Vercel ile Tavsiye Edilen)

Next.js projeleri için en sorunsuz ve en hızlı yayınlama platformu **Vercel**'dir.

1. **[Vercel](https://vercel.com/)** üzerinde ücretsiz bir hesap açın.
2. **Add New Project** seçeneğine tıklayarak GitHub hesabınızı bağlayın.
3. Bu projeyi listesinden seçin ve **Import** edin.
4. **Environment Variables** bölümüne eğer kullanıyorsanız `.env.example` dosyasındaki çevre değişkenlerini ekleyin.
5. **Deploy** butonuna basın. Vercel projenizi otomatik olarak derleyecek ve size canlı bir URL (`https://dream-xi.vercel.app` benzeri) verecektir.

Her GitHub push işleminde Vercel projenizi otomatik olarak güncelleyecektir!

---

## 📄 Lisans

Bu proje kişisel gelişim ve eğlence amaçlı hazırlanmış olup, tamamen ücretsizdir.
