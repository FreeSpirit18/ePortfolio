using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Post_TagController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public Post_TagController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post_Tag>>> Get()
        {
            return Ok(await _dbContext.Post_Tag.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post_Tag>>> Get(int id)
        {
            var post_tag = await _dbContext.Post_Tag.FindAsync(id);
            if (post_tag == null)
            {
                return BadRequest("Post_Tag not found.");
            }
            return Ok(post_tag);
        }

        [HttpPost]
        public async Task<ActionResult<List<Post_Tag>>> Post(Post_Tag post_tag)
        {
            var post_tags = await _dbContext.Post_Tag.ToListAsync();
            int max = 0;
            foreach (var item in post_tags)
            {
                if (item.Id > max) max = item.Id;
            }
            post_tag.Id = max + 1;
            _dbContext.Post_Tag.Add(post_tag);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Post_Tag.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Post_Tag>>> Put(Post_Tag req)
        {
            var dbPost_Tag = await _dbContext.Post_Tag.FindAsync(req.Id);
            if (dbPost_Tag == null)
                return BadRequest("Post_Tag not found");

            dbPost_Tag.Id = req.Id;
            dbPost_Tag.PostId = req.PostId;
            dbPost_Tag.TagId = req.TagId;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Post_Tag.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Post_Tag>>> Delete(int id)
        {
            var dbPost_Tag = await _dbContext.Post_Tag.FindAsync(id);
            if (dbPost_Tag == null)
                return BadRequest("Post_Tag not found");
            _dbContext.Post_Tag.Remove(dbPost_Tag);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Post_Tag.ToListAsync());
        }
    }
}
