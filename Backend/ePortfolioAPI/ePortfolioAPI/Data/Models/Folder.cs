namespace ePortfolioAPI.Data.Models
{
    public class Folder
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public DateTime CreationDate { get; set; }

    }
}
