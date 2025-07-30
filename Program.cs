using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

var builder = WebApplication.CreateBuilder(args);

// DbContext'i SQLite ile yapılandır (PostgreSQL yerine)
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// API Controller'ları ekle
builder.Services.AddControllers();

// CORS politikası ekle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Swagger/OpenAPI için
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Development ortamında Swagger'ı etkinleştir
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS'u etkinleştir
app.UseCors("AllowAll");

// Static dosyaları serve et (HTML, CSS, JS)
app.UseStaticFiles();
app.UseDefaultFiles();

app.UseAuthorization();

// Controller route'larını map et
app.MapControllers();

// Test endpoint'i (geçici)
app.MapGet("/api/test", () => "API çalışıyor!");

// Ana sayfa için yönlendirme (artık index.html'e gidecek)
app.MapFallbackToFile("index.html");

// Weather forecast minimal API (test için)
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}