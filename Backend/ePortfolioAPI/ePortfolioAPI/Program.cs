using ePortfolioAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Microsoft.EntituFrameworkCore.SqlServer
// dotnet tool install --global dotnet-ef

builder.Services.AddControllers();

builder.Services.AddDbContext<PostDBContext>();


var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
