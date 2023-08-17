using GestaoOfficinaProj.Aplicattion.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Controllers
{
    public class NotifyController : ControllerBase
    {
        public NotifyController() { }

        [HttpGet("Notify")]
        public async Task<IActionResult> Notify (int number)
        {
            var result = await NotifyService.GetNotify(number);
            return Ok(result);
        }

    }
}
