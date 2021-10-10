using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace flexflix.Services.Storage
{
    public class CloudinaryStorageService : IFileStorageService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryStorageService(IConfiguration configuration)
        {
            Account account = new Account
            {
                Cloud = configuration.GetValue<string>("Cloudinary:Cloud"),
                ApiKey = configuration.GetValue<string>("Cloudinary:Key"),
                ApiSecret = configuration.GetValue<string>("Cloudinary:Secret")
            };

            _cloudinary = new Cloudinary(account);
        }


        public string Upload(string localFilePath)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(localFilePath)
            };
            var uploadResult = _cloudinary.Upload(uploadParams);

            return uploadResult.SecureUrl.ToString();
        }

        public async Task<string> Download(string pathAndFileName)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(string pathAndFileName)
        {
            throw new NotImplementedException();
        }
    }
}
