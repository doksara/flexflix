using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace flexflix.Http
{
    public class HttpResponse<T>
    {
        public HttpResponse()
        {

        }

        public HttpResponse(T data, bool success, HttpResponseMessage message, string customMessage = "")
        {
            Data = data;
            Success = success;
            Message = message;
            CustomMessage = customMessage;
        }
        public T Data { get; set; }

        public bool Success { get; set; } = true;

        public string CustomMessage { get; set; }

        public HttpResponseMessage Message { get; set; } = null;

        public async Task<string> GetBody()
        {
            return await Message.Content.ReadAsStringAsync();
        }
    }
}
