using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {

        private readonly IClientService _clientService;
        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> cadastrar([FromBody]ClientCreateDTO client)
        {
            var result = await _clientService.CreateClient(client);
            return Ok(result);
        }
    }
}
