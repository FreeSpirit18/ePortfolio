using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class Folder_PostController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public Folder_PostController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Folder_Post>>> Get()
        {
            return Ok(await _dbContext.Folder_Posts.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Folder_Post>>> Get(int id)
        {
            var folder_post = await _dbContext.Folder_Posts.FindAsync(id);
            if (folder_post == null)
            {
                return BadRequest("Folder_Post not found.");
            }
            return Ok(folder_post);
        }

        [HttpPost]
        public async Task<ActionResult<List<Folder_Post>>> Post(Folder_Post folder_post)
        {
            var folder_posts = await _dbContext.Folder_Posts.ToListAsync();
            int max = 0;
            foreach (var item in folder_posts)
            {
                if (item.Id > max) max = item.Id;
            }
            folder_post.Id = max + 1;
            _dbContext.Folder_Posts.Add(folder_post);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder_Posts.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Folder_Post>>> Put(Folder_Post req)
        {
            var dbFolder_Post = await _dbContext.Folder_Posts.FindAsync(req.Id);
            if (dbFolder_Post == null)
                return BadRequest("Folder_Post not found");

            dbFolder_Post.Id = req.Id;
            dbFolder_Post.FolderId = req.FolderId;
            dbFolder_Post.PostId = req.PostId;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder_Posts.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Folder_Post>>> Delete(int id)
        {
            var dbFolder_Post = await _dbContext.Folder_Posts.FindAsync(id);
            if (dbFolder_Post == null)
                return BadRequest("Folder_Post not found");
            _dbContext.Folder_Posts.Remove(dbFolder_Post);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder_Posts.ToListAsync());
        }
    }
}
