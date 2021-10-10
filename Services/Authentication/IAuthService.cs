using flexflix.DTOs;
using flexflix.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Services.Authentication
{
    public interface IAuthService
    {
        Task<HttpResponse<int>> Register(CreateUserDTO userInfo);
        Task<HttpResponse<UserToken>> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
