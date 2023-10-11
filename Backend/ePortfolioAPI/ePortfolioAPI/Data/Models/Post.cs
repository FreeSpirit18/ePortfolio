namespace ePortfolioAPI.Data.Models
{
    public class Post
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public int Likes { get; set; } 
        public string Location { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }

    }
}
