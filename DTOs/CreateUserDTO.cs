using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.DTOs
{
    public class CreateUserDTO
    {
        public CreateUserDTO()
        {

        }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
