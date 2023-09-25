using ePortfolioAPI.Data.Models;
using ePortfolioAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ePortfolioAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly PostDBContext _dbContext;
        public FolderController(PostDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Folder>>> Get()
        {

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Folder>>> Get(int id)
        {

        }

        [HttpPost]
        public async Task<ActionResult<List<Folder>>> Post()
        {

        }

        [HttpPut]
        public async Task<ActionResult<List<Folder>>> Put()
        {

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Folder>>> Delete(int id)
        {

        }
    }
}
