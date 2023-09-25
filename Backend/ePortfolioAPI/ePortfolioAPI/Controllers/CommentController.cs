using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public CommentController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Comment>>> Get()
        {
            return Ok(await _dbContext.Comments.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Comment>>> Get(int id)
        {
            var comment = await _dbContext.Comments.FindAsync(id);
            if (comment == null)
            {
                return BadRequest("Comment not found.");
            }
            return Ok(comment);
        }

        [HttpPost]
        public async Task<ActionResult<List<Comment>>> Post(Comment comment)
        {
            var comments = await _dbContext.Comments.ToListAsync();
            int max = 0;
            foreach (var item in comments)
            {
                if(item.Id > max) max = item.Id;
            }
            comment.Id = max + 1;
            _dbContext.Comments.Add(comment);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Comments.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Comment>>> Put(Comment req)
        {
            var dbComment = await _dbContext.Comments.FindAsync(req.Id);
            if (dbComment == null)
                return BadRequest("Comment not found");

            dbComment.Id = req.Id;
            dbComment.AuthorId = req.AuthorId;
            dbComment.SubjectId = req.SubjectId;
            dbComment.CreationDate = req.CreationDate;
            dbComment.Content = req.Content;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Comments.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Comment>>> Delete(int id)
        {
            var dbComment = await _dbContext.Comments.FindAsync(id);
            if (dbComment == null)
                return BadRequest("Comment not found");
            _dbContext.Comments.Remove(dbComment);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Comments.ToListAsync());
        }
    }
}
