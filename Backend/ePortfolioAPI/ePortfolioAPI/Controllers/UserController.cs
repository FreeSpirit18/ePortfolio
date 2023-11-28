using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509;
using ePortfolioAPI.Auth.Services;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using ePortfolioAPI.Auth;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly PostDBContext _dbContext;

        private readonly IJwtTokenService _jwtTokenService;
        public UserController(PostDBContext dbContext, IJwtTokenService jwtTokenService)
        {
            _dbContext = dbContext;
            _jwtTokenService = jwtTokenService;
        }
        /*
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
        */
        [HttpPost("register")]
        public async Task<ActionResult<List<User>>> Register(RegisterUserDto request)
        {
            //------Unique check-------------------------------
            var existingEmail = await _dbContext.User.FirstOrDefaultAsync(t => t.Email == request.Email);
            var existingPassword = await _dbContext.User.FirstOrDefaultAsync(t => t.Password == request.Password);

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
            var newUser = new User();
            newUser.Email = request.Email;
            newUser.Password = request.Password;
            newUser.Id = max + 1;
            newUser.Role = request.Role;
            newUser.UserName = request.UserName;
            newUser.JoinDate = DateTime.Now;

            _dbContext.User.Add(newUser);
            await _dbContext.SaveChangesAsync();
            //-------------Creating mandatory favorite folder----------------
            Folder fav = new Folder();
            fav.OwnerId = newUser.Id;
            fav.Name = "favorite";
            fav.Description = "Folder for favorited posts";
            fav.IsPublic = true;
            fav.CreationDate = DateTime.Now;

            var folders = await _dbContext.Folder.ToListAsync();
            int maxf = 0;
            foreach (var item in folders)
            {
                if (item.Id > maxf) maxf = item.Id;
            }
            fav.Id = maxf + 1;
            _dbContext.Folder.Add(fav);
            await _dbContext.SaveChangesAsync();
            //--------------------------------------------------------

            return Ok(await _dbContext.User.ToListAsync());
        }

        [HttpPost("login")]
        public async Task<ActionResult<List<User>>> Login(LoginDto request)
        {
            //------Unique check-------------------------------
            User logUser = await _dbContext.User.FirstOrDefaultAsync(t => t.Email == request.Email);

            if (logUser == null)
                return Conflict("Incorrect email");

            if (logUser.Password != request.Password)
                return Conflict("Incorect password");
            //---------------------------------------------------------


            var accessToken = _jwtTokenService.CreateAccessToken(logUser.UserName, logUser.Id, logUser.Role);
            return Ok(new SuccessfulLoginDto(accessToken));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> Get(int id)
        {
            var user = await _dbContext.User.FindAsync(id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            return Ok(user.UserName);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<List<User>>> Put(UserDto req)
        {
            var dbUser = await _dbContext.User.FindAsync(req.Id);
            if (dbUser == null)
                return BadRequest("User not found");

            dbUser.Id = req.Id;
            dbUser.Email = req.Email;
            dbUser.Password = req.Password;
            dbUser.UserName = req.UserName;
            dbUser.Role = req.Role;
            dbUser.JoinDate = DateTime.Now;


            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.User.ToListAsync());
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = WebsiteRoles.Admin)]
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
