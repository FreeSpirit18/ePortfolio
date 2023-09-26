using ePortfolioAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var policyName = "_myAllowSpecificOrigins";
builder.Services.AddControllers();
builder.Services.AddDbContext<PostDBContext>(
    o =>{
    o.UseMySQL(builder.Configuration.GetConnectionString("ePortfolioDB"));
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
                      builder =>
                      {
                          builder
                            .AllowAnyOrigin()
                            .WithMethods("GET")
                            .WithMethods("DELETE")
                            .WithMethods("POST")
                            .WithMethods("PUT")
                            .AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(policyName);

app.Run();
