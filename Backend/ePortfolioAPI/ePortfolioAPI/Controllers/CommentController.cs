using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure;
using Microsoft.AspNetCore.Authorization;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
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
            return Ok(await _dbContext.Comment.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Comment>>> Get(int id)
        {
            var comment = await _dbContext.Comment.FindAsync(id);
            if (comment == null)
            {
                return BadRequest("Comment not found.");
            }
            return Ok(comment);
        }

        [HttpGet("ByPostId/{Id}")]
        public async Task<ActionResult<List<Comment>>> GetByPostId(int Id)
        {
            var comments = await _dbContext.Comment.Where(c => c.SubjectId == Id).ToListAsync();
            if (comments == null)
            {
                return BadRequest("Comment's not found.");
            }
            return Ok(comments);
        }
        [HttpGet("AllOfUser/{id}")]
        public async Task<ActionResult<List<Comment>>> GetAllOfUser(int id)
        {
            var comments = await _dbContext.Comment.Where(p => p.AuthorId == id).ToListAsync();
            if (comments == null)
            {
                return BadRequest("Comment's not found.");
            }
            return Ok(comments);
        }

        [HttpPost]
        public async Task<ActionResult<List<Comment>>> Post(Comment comment)
        {

            var existingUser = await _dbContext.User.FirstOrDefaultAsync(t => t.Id == comment.AuthorId);
            var existingPost = await _dbContext.Post.FirstOrDefaultAsync(t => t.Id == comment.SubjectId);

            if (existingUser == null)
            {
                // A tag with the same name already exists, return a conflict response
                return Conflict("Author(User) dose not exist.");
            }

            if (existingPost == null)
            {
                // A tag with the same name already exists, return a conflict response
                return Conflict("Post dose not exist.");
            }

            var comments = await _dbContext.Comment.ToListAsync();
            int max = 0;
            foreach (var item in comments)
            {
                if(item.Id > max) max = item.Id;
            }
            comment.Id = max + 1;
            _dbContext.Comment.Add(comment);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Comment.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Comment>>> Put(Comment req)
        {
            var existingUser = await _dbContext.User.FirstOrDefaultAsync(t => t.Id == req.AuthorId);
            var existingPost = await _dbContext.Post.FirstOrDefaultAsync(t => t.Id == req.SubjectId);

            if (existingUser == null)
            {
                // A tag with the same name already exists, return a conflict response
                return Conflict("Author(User) dose not exist.");
            }

            if (existingPost == null)
            {
                // A tag with the same name already exists, return a conflict response
                return Conflict("Post dose not exist.");
            }

            var dbComment = await _dbContext.Comment.FindAsync(req.Id);
            if (dbComment == null)
                return BadRequest("Comment not found");

            dbComment.Id = req.Id;
            dbComment.AuthorId = req.AuthorId;
            dbComment.SubjectId = req.SubjectId;
            dbComment.CreationDate = req.CreationDate;
            dbComment.Content = req.Content;
            dbComment.CreationDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Comment.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Comment>>> Delete(int id)
        {
            var dbComment = await _dbContext.Comment.FindAsync(id);
            if (dbComment == null)
                return BadRequest("Comment not found");
            _dbContext.Comment.Remove(dbComment);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Comment.ToListAsync());
        }
    }
}
