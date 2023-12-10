using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public PostController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> Get()
        {
            return Ok(await _dbContext.Post.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post>>> Get(int id)
        {
            var post = await _dbContext.Post.FindAsync(id);
            if (post == null)
            {
                return BadRequest("Post not found.");
            }
            return Ok(post);
        }
        [HttpGet("AllOfUser/{id}")]
        public async Task<ActionResult<List<Post>>> GetAllOfUser(int id)
        {
            var posts = await _dbContext.Post.Where(p => p.OwnerId == id).ToListAsync();
            if (posts == null)
            {
                return BadRequest("Post's not found.");
            }
            return Ok(posts);
        }

        [HttpPost]
        public async Task<ActionResult<List<Post>>> Post(Post post)
        {
            //------Foreig key check-------------------------------
            var existingUser = await _dbContext.User.FirstOrDefaultAsync(t => t.Id == post.OwnerId);
            var existingPost = await _dbContext.Post.FirstOrDefaultAsync(t => t.Location == post.Location);

            if (existingUser == null)
                return Conflict("User dose not exist.");
            if (existingPost != null)
                return Conflict("Failed to create post");
            //---------------------------------------------------------

            var posts = await _dbContext.Post.ToListAsync();
            int max = 0;
            foreach (var item in posts)
            {
                if (item.Id > max) max = item.Id;
            }
            post.Id = max + 1;
            _dbContext.Post.Add(post);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Post.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Post>>> Put(Post req)
        {
            var dbPost = await _dbContext.Post.FindAsync(req.Id);
            if (dbPost == null)
                return BadRequest("Post not found");

            dbPost.Id = req.Id;
            dbPost.Name = req.Name;
            dbPost.OwnerId = req.OwnerId;
            dbPost.Location = req.Location;
            dbPost.Description = req.Description;
            dbPost.CreationDate = DateTime.Now;
            dbPost.Likes = req.Likes;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Post.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Post>>> Delete(int id)
        {
            var dbPost = await _dbContext.Post.FindAsync(id);
            if (dbPost == null)
                return BadRequest("Post not found");
            _dbContext.Post.Remove(dbPost);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Post.ToListAsync());
        }
    }
}
