using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class Post_TagController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public Post_TagController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post_Tag>>> Get()
        {

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post_Tag>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<Post_Tag>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<Post_Tag>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Post_Tag>>> Delete(int id)
        {

        }
    }
}
