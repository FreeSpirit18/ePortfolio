using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;

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

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Comment>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<Comment>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<Comment>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Comment>>> Delete(int id)
        {

        }
    }
}
