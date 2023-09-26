using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public FolderController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Folder>>> Get()
        {
            return Ok(await _dbContext.Folder.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Folder>>> Get(int id)
        {
            var folder = await _dbContext.Folder.FindAsync(id);
            if (folder == null)
            {
                return BadRequest("Folder not found.");
            }
            return Ok(folder);
        }

        [HttpPost]
        public async Task<ActionResult<List<Folder>>> Post(Folder folder)
        {
            var folders = await _dbContext.Folder.ToListAsync();
            int max = 0;
            foreach (var item in folders)
            {
                if (item.Id > max) max = item.Id;
            }
            folder.Id = max + 1;
            _dbContext.Folder.Add(folder);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Folder>>> Put(Folder req)
        {
            var dbFolder = await _dbContext.Folder.FindAsync(req.Id);
            if (dbFolder == null)
                return BadRequest("Folder not found");

            dbFolder.Id = req.Id;
            dbFolder.OwnerId = req.OwnerId;
            dbFolder.Name = req.Name;
            dbFolder.IsPublic = req.IsPublic;
            dbFolder.Description = req.Description;
            dbFolder.CreationDate = DateTime.Now;


            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Folder>>> Delete(int id)
        {
            var dbFolder = await _dbContext.Folder.FindAsync(id);
            if (dbFolder == null)
                return BadRequest("Folder not found");
            _dbContext.Folder.Remove(dbFolder);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder.ToListAsync());
        }
    }
}
