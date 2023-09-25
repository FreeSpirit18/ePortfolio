using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public TagController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tag>>> Get()
        {
            return Ok(await _dbContext.Tags.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Tag>>> Get(int id)
        {
            var tag = await _dbContext.Tags.FindAsync(id);
            if (tag == null)
            {
                return BadRequest("Tag not found.");
            }
            return Ok(tag);
        }

        [HttpPost]
        public async Task<ActionResult<List<Tag>>> Post(Tag tag)
        {
            var tags = await _dbContext.Tags.ToListAsync();
            int max = 0;
            foreach (var item in tags)
            {
                if (item.Id > max) max = item.Id;
            }
            tag.Id = max + 1;
            _dbContext.Tags.Add(tag);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Tags.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Tag>>> Put(Tag req)
        {
            var dbTag = await _dbContext.Tags.FindAsync(req.Id);
            if (dbTag == null)
                return BadRequest("Tag not found");

            dbTag.Id = req.Id;
            dbTag.Name = req.Name; 
            

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Tags.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Tag>>> Delete(int id)
        {
            var dbTag = await _dbContext.Tags.FindAsync(id);
            if (dbTag == null)
                return BadRequest("Tag not found");
            _dbContext.Tags.Remove(dbTag);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Tags.ToListAsync());
        }
    }
}
