using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
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
            return Ok(await _dbContext.Folder_Post.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Folder_Post>>> Get(int id)
        {
            var folder_post = await _dbContext.Folder_Post.FindAsync(id);
            if (folder_post == null)
            {
                return BadRequest("Folder_Post not found.");
            }
            return Ok(folder_post);
        }

        [HttpPost]
        public async Task<ActionResult<List<Folder_Post>>> Post(Folder_Post folder_post)
        {
            //------Foreig key check-------------------------------
            var existingFolder = await _dbContext.Folder.FirstOrDefaultAsync(t => t.Id == folder_post.FolderId);
            var existingPost = await _dbContext.Post.FirstOrDefaultAsync(t => t.Id == folder_post.PostId);

            if (existingFolder == null)
                return Conflict("Folder dose not exist.");

            if (existingPost == null)
                return Conflict("Post dose not exist.");
            //---------------------------------------------------------


            var folder_posts = await _dbContext.Folder_Post.ToListAsync();
            int max = 0;
            foreach (var item in folder_posts)
            {
                if (item.Id > max) max = item.Id;
            }
            folder_post.Id = max + 1;
            _dbContext.Folder_Post.Add(folder_post);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder_Post.ToListAsync());
        }
        [HttpPost("Exists")]
        public async Task<ActionResult<List<Folder_Post>>> Exists(Folder_Post folder_post)
        {
            //------Foreig key check-------------------------------

            var existingConnection = await _dbContext.Folder_Post.FirstOrDefaultAsync(
                t => t.FolderId == folder_post.FolderId && t.PostId == folder_post.PostId
                );

            if (existingConnection == null)
                return Conflict("Connection dose not exist.");

            //---------------------------------------------------------

            return Ok(existingConnection);
        }

        [HttpPut]
        public async Task<ActionResult<List<Folder_Post>>> Put(Folder_Post req)
        {
            //------Foreig key check-------------------------------
            var existingFolder = await _dbContext.Folder.FirstOrDefaultAsync(t => t.Id == req.FolderId);
            var existingPost = await _dbContext.Post.FirstOrDefaultAsync(t => t.Id == req.PostId);

            if (existingFolder == null)
                return Conflict("Folder dose not exist.");
            
            if (existingPost == null)
                return Conflict("Post dose not exist.");
            //---------------------------------------------------------

            var dbFolder_Post = await _dbContext.Folder_Post.FindAsync(req.Id);
            if (dbFolder_Post == null)
                return BadRequest("Folder_Post not found");

            dbFolder_Post.Id = req.Id;
            dbFolder_Post.FolderId = req.FolderId;
            dbFolder_Post.PostId = req.PostId;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder_Post.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Folder_Post>>> Delete(int id)
        {
            var dbFolder_Post = await _dbContext.Folder_Post.FindAsync(id);
            if (dbFolder_Post == null)
                return BadRequest("Folder_Post not found");
            _dbContext.Folder_Post.Remove(dbFolder_Post);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Folder_Post.ToListAsync());
        }
    }
}
