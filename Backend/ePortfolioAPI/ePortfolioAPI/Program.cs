using ePortfolioAPI.Auth.Entities;
using ePortfolioAPI.Auth.Services;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var policyName = "_myAllowSpecificOrigins";
builder.Services.AddControllers();
/*
builder.Services.AddIdentity<PortfolioRestUser, IdentityRole>()
    .AddEntityFrameworkStores<PostDBContext>()
    .AddDefaultTokenProviders();
*/
builder.Services.AddDbContext<PostDBContext>(
    o =>{
    o.UseMySQL(builder.Configuration.GetConnectionString("ePortfolioDB"));
    });
builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();

/*
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
  {
      options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
      options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
      options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
  });
*/

//-------------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//--------------------------------------------

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
                      builder =>
                      {
                          builder
                            .AllowAnyOrigin()
                            .WithMethods("GET", "DELETE", "POST", "PUT")
                            .AllowAnyHeader();
                      });
});

var app = builder.Build();

//-----------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//--------------------------------------
app.UseHttpsRedirection();
app.MapControllers();
app.UseAuthorization();
app.UseAuthentication();
app.UseCors(policyName);
app.Run();
