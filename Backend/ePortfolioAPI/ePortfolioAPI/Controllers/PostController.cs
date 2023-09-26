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

        [HttpPost]
        public async Task<ActionResult<List<Post>>> Post(Post post)
        {
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
