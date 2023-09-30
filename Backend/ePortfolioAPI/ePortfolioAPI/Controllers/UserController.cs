using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
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
            return Ok(await _dbContext.User.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> Get(int id)
        {
            var user = await _dbContext.User.FindAsync(id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> Post(User user)
        {

            //------Unique check-------------------------------
            var existingEmail = await _dbContext.User.FirstOrDefaultAsync(t => t.Email == user.Email);
            var existingPassword = await _dbContext.User.FirstOrDefaultAsync(t => t.Password == user.Password);

            if (existingEmail != null)
                return Conflict("Email is taken");

            if (existingPassword != null)
                return Conflict("Password is taken");
            //---------------------------------------------------------

            var users = await _dbContext.User.ToListAsync();
            int max = 0;
            foreach (var item in users)
            {
                if (item.Id > max) max = item.Id;
            }
            user.Id = max + 1;
            _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.User.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> Put(User req)
        {
            var dbUser = await _dbContext.User.FindAsync(req.Id);
            if (dbUser == null)
                return BadRequest("User not found");

            dbUser.Id = req.Id;
            dbUser.Email = req.Email;
            dbUser.Password = req.Password;
            dbUser.Name = req.Name;
            dbUser.Role = req.Role;
            dbUser.JoinDate = DateTime.Now;


            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.User.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var dbUser = await _dbContext.User.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found");
            _dbContext.User.Remove(dbUser);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.User.ToListAsync());
        }
    }
}
