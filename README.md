# Todo App

Modern ve responsive Todo uygulaması - ASP.NET Core Web API + HTML/CSS/JavaScript

##  Özellikler

-  Todo ekleme, düzenleme, silme
-  Tamamlandı olarak işaretleme
-  Filtreleme (Tümü/Bekleyen/Tamamlanan)
-  İstatistikler gösterimi
-  Responsive tasarım
-  Modern UI/UX
-  RESTful API

##  Teknolojiler

- **Backend**: ASP.NET Core 6+ Web API
- **Database**: SQLite (Entity Framework Core)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **UI**: Font Awesome Icons

##  Gereksinimler

- .NET 6 SDK veya üstü
- Visual Studio Code/Visual Studio (opsiyonel)

##  Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/MelisCK/todo-app.git
   cd todo-app
   ```

2. **NuGet paketlerini yükleyin:**
   ```bash
   dotnet restore
   ```

3. **Database migration'larını çalıştırın:**
   ```bash
   dotnet ef database update
   ```

4. **Uygulamayı çalıştırın:**
   ```bash
   dotnet run
   ```

5. **Tarayıcıda açın:**
   ```
   http://localhost:5066
   ```

##  Proje Yapısı

```
TodoApp/
├── Controllers/
│   └── TodoController.cs          # API Controller
├── Models/
│   ├── TodoContext.cs            # Entity Framework DbContext
│   └── TodoItem.cs               # Todo model
├── wwwroot/
│   ├── index.html                # Ana sayfa
│   ├── css/style.css             # Stil dosyası
│   └── js/app.js                 # JavaScript logic
├── Program.cs                    # Uygulama başlangıcı
└── appsettings.json             # Konfigürasyon

```

##  API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/todo` | Tüm todo'ları listele |
| GET | `/api/todo/{id}` | Belirli todo'yu getir |
| POST | `/api/todo` | Yeni todo oluştur |
| PUT | `/api/todo/{id}` | Todo'yu güncelle |
| DELETE | `/api/todo/{id}` | Todo'yu sil |

##  API Test

Swagger UI'ye erişim: `http://localhost:5066/swagger`

##  Deploy

### Azure'a deploy için:
1. Azure App Service oluşturun
2. GitHub Actions ile otomatik deploy ayarlayın
3. Connection string'i Azure'da ayarlayın

### Docker ile çalıştırma:
```bash
# Docker image build et
docker build -t todo-app .

# Container çalıştır
docker run -p 5066:80 todo-app
```

##  Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

##  Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

##  İletişim

Proje Sahibi - [@github_MelisCK](https://github.com/MelisCK)

Proje Linki: [https://github.com/MelisCK/todo-app](https://github.com/MElisCK/todo-app)