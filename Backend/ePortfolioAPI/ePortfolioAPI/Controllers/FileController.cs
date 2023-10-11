using ePortfolioAPI.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpPost]
        [Route("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationToken) {

            // Check if the uploaded file is a PNG or JPEG
            if (!IsFileValid(file))
            {
                return BadRequest("Invalid file format. Only PNG and JPEG files are allowed.");
            }


            var results = await WriteFile(file);
            if (results == null)
                return Conflict("File upload error");
            return Ok(results);
        }

        [HttpGet]
        [Route("DownloadFile")]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            if (!System.IO.File.Exists(filepath))
            {
                return Conflict("File not found");
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
            return File(bytes, contenttype, Path.GetFileName(filepath));
        }

        [HttpDelete]
        [Route("DeleteFile")]
        public async Task<IActionResult> Delete(string filename)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);

            try
            {
                // Check if the file exists before attempting to delete it
                if (System.IO.File.Exists(filepath))
                {
                    // Delete the file
                    System.IO.File.Delete(filepath);
                    return Ok("File deleted successfully.");
                }
                else
                {
                    return NotFound("File not found.");
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that may occur during file deletion
                return StatusCode(500, $"An error occurred while deleting the file: {ex.Message}");
            }

        }

        private async Task<string> WriteFile(IFormFile file) {

                string fileName = "";
                try
                {
                    var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                    fileName = DateTime.Now.Ticks.ToString() + "_" + Guid.NewGuid().ToString() + extension;

                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    var exactPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", fileName);
                    using (var stream = new FileStream(exactPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }catch (Exception ex)
                {
                    return null;
                }
                return fileName;
            }
        private bool IsFileValid(IFormFile file)
        {
            // Define the allowed MIME types for PNG and JPEG
            var allowedMimeTypes = new[] { "image/png", "image/jpeg" };

            // Check if the file's content type is in the list of allowed types
            return allowedMimeTypes.Contains(file.ContentType);
        }
    }
}
