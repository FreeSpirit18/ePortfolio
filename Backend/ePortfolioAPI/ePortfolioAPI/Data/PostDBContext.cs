using ePortfolioAPI.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Data
{
    public class PostDBContext : DbContext
    {
        public PostDBContext(DbContextOptions<PostDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseIdentityColumns();
        }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Folder> Folders { get; set; }
        public DbSet<Folder_Post> Folder_Posts { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Post_Tag> Post_Tags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
