using Microsoft.AspNetCore.Identity;

namespace ePortfolioAPI.Auth.Entities
{
    public class PortfolioRestUser : IdentityUser
    {
        [PersonalData]
        public DateTime JoinDate { get; set; }
    }
}
