using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Services.Storage
{
    public interface IFileStorageService
    {
        Task<string> Download(string pathAndFileName);
        Task<bool> Delete(string pathAndFileName);
        string Upload(string filePath);
    }
}
