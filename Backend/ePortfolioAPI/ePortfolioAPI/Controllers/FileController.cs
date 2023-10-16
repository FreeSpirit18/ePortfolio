using Azure.Storage.Blobs;
using ePortfolioAPI.Data.Models;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.IO.Compression;
using System.Security.AccessControl;

namespace ePortfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    { 
        private readonly string ConnectionString = "DefaultEndpointsProtocol=https;AccountName=eportfoliostore;AccountKey=MegscmjSiAaS41oZe7y71y9FBG8lZYMF4aSULB7R/WQEeyhZkjCoj54/Vyi39FuggfeMxPiiPgr/+AStutPTmA==;EndpointSuffix=core.windows.net";
        private readonly string Name = "pictures";
        [HttpPost]
        [Route("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationToken)
        {
           
            // Check if the uploaded file is a PNG or JPEG
            if (!IsFileValid(file))
            {
                return BadRequest("Invalid file format. Only PNG and JPEG files are allowed.");
            }
            //Unique file name
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            string fileName = DateTime.Now.Ticks.ToString() + "_" + Guid.NewGuid().ToString() + extension;

            var array = await ConvertIFormFileToByteArray(file);
            try
            {

                var container = new BlobContainerClient(ConnectionString, Name);
                await container.UploadBlobAsync(fileName, new  MemoryStream(array));

                return Ok(fileName);

            }
            catch (Exception ex)
            {
                return Conflict("File upload error ");
            }
        }


        [HttpGet]
        [Route("DownloadFile")]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            //var client = StorageClient.Create();

            try
            {
                var container = new BlobClient(ConnectionString, Name, filename);
                var stream = container.OpenReadAsync().Result;
                //stream.Position = 0;

                return File(stream, "application/octet-stream", filename);

            }catch (Exception ex)
            {
                return Conflict("File not found");
            }

        }

        [HttpDelete]
        [Route("DeleteFile")]
        public async Task<IActionResult> Delete(string filename)
        {
           
            try
            {
                var container = new BlobClient(ConnectionString, Name, filename);
                try {
                    await container.DeleteAsync();
                    return Ok("File deleted successfully.");
                }
                catch (Exception ex) {
                    return StatusCode(500, $"An error occurred while deleting the file: {ex.Message}");
                }
                // If the object exists, you can access its metadata
                
            }
            catch (Google.GoogleApiException ex) when (ex.HttpStatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound("File not found.");
            }
            

        }
        private async Task<byte[]> ConvertIFormFileToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
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
