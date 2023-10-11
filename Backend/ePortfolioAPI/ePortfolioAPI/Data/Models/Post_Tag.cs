namespace ePortfolioAPI.Data.Models
{
    public class Post_Tag
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int TagId { get; set; }
    }
}
