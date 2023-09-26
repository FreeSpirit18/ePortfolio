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
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Folder> Folder { get; set; }
        public DbSet<Folder_Post> Folder_Post { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<Post_Tag> Post_Tag { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<User> User { get; set; }
    }
}
