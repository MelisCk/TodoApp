# TodoApp

Modern and responsive Todo application - ASP.NET Core Web API + HTML/CSS/JavaScript

## 🚀 Features

- ✅ Add, edit, and delete todos
- ✅ Mark as completed
- ✅ Filter (All/Pending/Completed)
- ✅ Statistics display
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ RESTful API

## 🛠️ Technologies

- **Backend**: ASP.NET Core 6+ Web API
- **Database**: SQLite (Entity Framework Core)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **UI**: Font Awesome Icons

## 📋 Requirements

- .NET 6 SDK or higher
- Visual Studio Code/Visual Studio (optional)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MelisCk/TodoApp.git
   cd TodoApp
   ```

2. **Install NuGet packages:**
   ```bash
   dotnet restore
   ```

3. **Run database migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Run the application:**
   ```bash
   dotnet run
   ```

5. **Open in browser:**
   ```
   http://localhost:5066
   ```

## 📁 Project Structure

```
TodoApp/
├── Controllers/
│   └── TodoController.cs          # API Controller
├── Models/
│   ├── TodoContext.cs            # Entity Framework DbContext
│   └── TodoItem.cs               # Todo model
├── wwwroot/
│   ├── index.html                # Main page
│   ├── css/style.css             # Stylesheet
│   └── js/app.js                 # JavaScript logic
├── Program.cs                    # Application startup
├── appsettings.json             # Configuration
├── .gitignore                   # Git ignore rules
└── LICENSE                      # MIT License
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todo` | Get all todos |
| GET | `/api/todo/{id}` | Get specific todo |
| POST | `/api/todo` | Create new todo |
| PUT | `/api/todo/{id}` | Update todo |
| DELETE | `/api/todo/{id}` | Delete todo |

## 📊 API Testing

Swagger UI access: `http://localhost:5066/swagger`

## 🚀 Deployment

### Deploy to Azure:
1. Create Azure App Service
2. Set up GitHub Actions for automatic deployment
3. Configure connection string in Azure

### Run with Docker:
```bash
# Build Docker image
docker build -t todo-app .

# Run container
docker run -p 5066:80 todo-app
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

Project Owner - [@MelisCk](https://github.com/MelisCk)

Project Link: [https://github.com/MelisCk/TodoApp](https://github.com/MelisCk/TodoApp)



