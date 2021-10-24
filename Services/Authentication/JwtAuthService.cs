using System;
using System.Net;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using flexflix.Data;
using flexflix.DTOs;
using flexflix.Http;
using flexflix.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Microsoft.IdentityModel.Tokens;

namespace flexflix.Services.Authentication
{
    public class JwtAuthService : IAuthService
    {
        private readonly FlexflixContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public JwtAuthService(FlexflixContext context, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }


        public async Task<HttpResponse<UserToken>> Login(string username, string password)
        {
            HttpResponse<UserToken> response = new HttpResponse<UserToken>();
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Username.ToLower().Equals(username.ToLower()));

            if (user == null)
            {
                response.Data = null;
                response.CustomMessage = "Korisnik nije pronađen!";
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Data = null;
                response.CustomMessage = "Neispravno korisničko ime / lozinka!";
            }
            else
            {
                response.Data = CreateToken(user);
                response.CustomMessage = "Uspješna prijava!";
            }

            return response;
        }

        public async Task<HttpResponse<int>> Register(CreateUserDTO userInfo)
        {
            HttpResponse<int> response = new HttpResponse<int>();
            User newUser = _mapper.Map<User>(userInfo);

            if (await UserExists(userInfo.Username))
            {
                response.Success = false;
                response.Data = -1;

                return response;
            }

            CreatePasswordHash(userInfo.Password, out byte[] passwordHash, out byte[] passwordSalt);

            newUser.PasswordSalt = passwordSalt;
            newUser.PasswordHash = passwordHash;

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            response.Data = newUser.Id;

            return response;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        private UserToken CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("role", user.Discriminator)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var expiration = DateTime.UtcNow.AddDays(1);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
