using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class Folder_PostController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public Folder_PostController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Folder_Post>>> Get()
        {

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Folder_Post>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<Folder_Post>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<Folder_Post>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Folder_Post>>> Delete(int id)
        {

        }
    }
}
