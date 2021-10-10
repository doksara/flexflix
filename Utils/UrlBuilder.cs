using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Utils
{
    public class UrlBuilder
    {
        public static string GenerateBackdropImageUrl(string imagePath)
        {
            string SECURE_BASE_URL = "https://image.tmdb.org/t/p/";
            string SIZE = "w1280";

            return $"{SECURE_BASE_URL}{SIZE}{imagePath}";
        }

        public static string GeneratePosterImageUrl(string imagePath)
        {
            string SECURE_BASE_URL = "https://image.tmdb.org/t/p/";
            string SIZE = "w780";

            return $"{SECURE_BASE_URL}{SIZE}{imagePath}";
        }

        public static string GenerateProfileImageUrl(string imagePath)
        {
            string SECURE_BASE_URL = "https://image.tmdb.org/t/p/";
            string SIZE = "w185";

            return $"{SECURE_BASE_URL}{SIZE}{imagePath}";
        }
    }
}
