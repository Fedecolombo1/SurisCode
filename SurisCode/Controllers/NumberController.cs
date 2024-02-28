using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SurisCode.Controllers
{
    [ApiController]
    [Route("numero")]
    public class NumberController : Controller
    {
        private static Random random = new Random();
        private static int numero = random.Next(1, 101);

        [HttpGet]
        [Route("getNumber")]
        public IActionResult GetNumber()
        {
            return Json(numero);
        }

        [HttpPost]
        [Route("postNumber")]
        public IActionResult PostCheckNumber([FromBody] int numeroIngresado)
        {
            if (numeroIngresado == numero)
            {
                return Ok(0);
            }
            else if (numeroIngresado < numero)
            {
                return Ok(-1);
            }
            else
            {
                return Ok(1);
            }
        }

    }
}

