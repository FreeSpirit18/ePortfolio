using ePortfolioAPI.Auth.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto;

namespace ePortfolioAPI.Controllers
{
    /*[ApiController]
    [AllowAnonymous]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<PortfolioRestUser> userManager;
        private readonly IJwtTokenService jwtTokenService;
        private readonly IMapper mapper;

        public AuthController(UserManager<PortfolioRestUser> userManager, IJwtTokenService jwtTokenService, IMapper mapper)
        {
            this.userManager = userManager;
            this.jwtTokenService = jwtTokenService;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var user = await userManager.FindByEmailAsync(registerUserDto.Email);

            if (user != null)
            {
                return BadRequest("Request invalid.");
            }

            var newUser = new PortfolioRestUser
            {
                JoinDate = DateTime.Now,
                Email = registerUserDto.Email,
                UserName = registerUserDto.Email
            };

            var createUserResult = await userManager.CreateAsync(newUser, registerUserDto.Password);

            if (!createUserResult.Succeeded)
            {
                string errors = string.Join('\n', createUserResult.Errors.Select(e => $"[{e.Code}] {e.Description}"));
                return BadRequest("Could not create a user.\n" + errors);
            }

            await userManager.AddToRoleAsync(newUser, AdsWebsiteRoles.PortfolioRestUser);

            return CreatedAtAction(nameof(Register), mapper.Map<UserDto>(newUser));
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return BadRequest("User name or password is invalid.");
            }

            var isPasswordValid = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordValid)
            {
                return BadRequest("User name or password is invalid.");
            }

            var roles = await userManager.GetRolesAsync(user);
            var accessToken = jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);

            return Ok(new SuccessfulLoginDto(accessToken));
        }
    }*/
}
