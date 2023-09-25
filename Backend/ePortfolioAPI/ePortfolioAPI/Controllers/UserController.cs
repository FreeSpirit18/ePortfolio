using ePortfolioAPI.Data;
using ePortfolioAPI.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public UserController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _dbContext.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> Get(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> Post(User user)
        {
            var users = await _dbContext.Users.ToListAsync();
            int max = 0;
            foreach (var item in users)
            {
                if (item.Id > max) max = item.Id;
            }
            user.Id = max + 1;
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Users.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> Put(User req)
        {
            var dbUser = await _dbContext.Users.FindAsync(req.Id);
            if (dbUser == null)
                return BadRequest("User not found");

            dbUser.Id = req.Id;
            dbUser.Email = req.Email;
            dbUser.Password = req.Password;

            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var dbUser = await _dbContext.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found");
            _dbContext.Users.Remove(dbUser);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Users.ToListAsync());
        }
    }
}
