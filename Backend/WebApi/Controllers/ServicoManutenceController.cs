using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ServicoManutenceController : ControllerBase
    {
        private readonly IServicoManutenceService _servicoManutenceService;
        public ServicoManutenceController(IServicoManutenceService servicoManutenceService)
        {
            _servicoManutenceService = servicoManutenceService;
        }
        [HttpPost("")]
        public async Task<IActionResult> CreateServicoManutence(ServicoManutenceCreateDTO entrada)
        {
            var result = await _servicoManutenceService.CreateServicoManutence(entrada);
            return Ok(result);        
        }
        [HttpGet("")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _servicoManutenceService.GetAll();
            return Ok(result);
        }
    }
}
