using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend2.Controllers
{
    [Route("/")]
    [ApiController]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File("~/index.html", "text/html");
        }
    }
}
