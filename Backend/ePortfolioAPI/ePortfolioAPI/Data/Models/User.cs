namespace ePortfolioAPI.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string UserName { get; set; }
        public int Role { get; set; }// 0 - user 1 - admin 2 - guest
        public DateTime JoinDate { get; set; }

    }
}
