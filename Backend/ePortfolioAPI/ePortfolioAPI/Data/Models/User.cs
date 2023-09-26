namespace ePortfolioAPI.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public int Role { get; set; }
        public DateTime JoinDate { get; set; }

    }
}
