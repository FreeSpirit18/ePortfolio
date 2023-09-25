using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public PostController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> Get()
        {

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<Post>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<Post>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Post>>> Delete(int id)
        {

        }
    }
}
