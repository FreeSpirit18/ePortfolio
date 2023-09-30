using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
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
            return Ok(await _dbContext.Tag.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Tag>>> Get(int id)
        {
            var tag = await _dbContext.Tag.FindAsync(id);
            if (tag == null)
            {
                return BadRequest("Tag not found.");
            }
            return Ok(tag);
        }

        [HttpPost]
        public async Task<ActionResult<List<Tag>>> Post(Tag tag)
        {
            var existingTag = await _dbContext.Tag.FirstOrDefaultAsync(t => t.Name == tag.Name);

            if (existingTag != null)
            {
                // A tag with the same name already exists, return a conflict response
                return Conflict("Tag name is not unique.");
            }

            var tags = await _dbContext.Tag.ToListAsync();
            int max = 0;
            foreach (var item in tags)
            {
                if (item.Id > max) max = item.Id;
            }
            tag.Id = max + 1;
            _dbContext.Tag.Add(tag);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Tag.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Tag>>> Put(Tag req)
        {
            var existingTag = await _dbContext.Tag.FirstOrDefaultAsync(t => t.Name == req.Name);

            if (existingTag != null)
            {
                // A tag with the same name already exists, return a conflict response
                return Conflict("Tag name is not unique.");
            }

            var dbTag = await _dbContext.Tag.FindAsync(req.Id);
            if (dbTag == null)
                return BadRequest("Tag not found");

            dbTag.Id = req.Id;
            dbTag.Name = req.Name; 
            

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Tag.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Tag>>> Delete(int id)
        {
            var dbTag = await _dbContext.Tag.FindAsync(id);
            if (dbTag == null)
                return BadRequest("Tag not found");
            _dbContext.Tag.Remove(dbTag);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Tag.ToListAsync());
        }
    }
}
