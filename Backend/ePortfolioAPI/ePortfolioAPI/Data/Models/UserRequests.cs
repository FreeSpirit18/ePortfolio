using System.ComponentModel.DataAnnotations;

namespace ePortfolioAPI.Data.Models
{
    public record UserRequests(int Id, string Email, string Password, string UserName, string Role, DateTime JoinDate);
    public record RegisterUserDto(string UserName, [EmailAddress][Required] string Email, [Required] string Password, string Role);
    public record LoginDto([EmailAddress][Required] string Email, [Required] string Password);
    public record SuccessfulLoginDto(string AccessToken);
}
