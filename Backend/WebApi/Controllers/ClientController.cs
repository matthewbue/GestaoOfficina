using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestaoOfficina.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {

        private readonly IClientService _clientService;
        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] ClientCreateDTO client)
        {
            //Try/Catch
            var result = await _clientService.Create(client);
            return Ok(result);
        }
        
    }
}