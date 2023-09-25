using ePortfolioAPI.Data;
using ePortfolioAPI.Data.Models;
using Microsoft.AspNetCore.Mvc;

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

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {

        }
    }
}
