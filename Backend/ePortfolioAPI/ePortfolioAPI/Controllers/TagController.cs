using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public TagController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tag>>> Get()
        {

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Tag>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<Tag>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<Tag>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Tag>>> Delete(int id)
        {

        }
    }
}
