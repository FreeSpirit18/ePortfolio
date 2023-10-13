using System.ComponentModel.DataAnnotations;

namespace ePortfolioAPI.Data.Models
{
    public record UserRequests(string Id, string Email, string Password, string UserName, int Role, DateTime JoinDate);
    public record RegisterUserDto(string UserName, [EmailAddress][Required] string Email, [Required] string Password, int Role);
    public record LoginDto([EmailAddress][Required] string Email, [Required] string Password);
    public record SuccessfulLoginDto(string AccessToken);
}
