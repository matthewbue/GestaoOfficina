using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace GestaoOfficinaProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ServicoController : ControllerBase
    {
        private readonly IServicoService _servicoService;
        public ServicoController(IServicoService Servico)
        {
            _servicoService = Servico;
        }
        [HttpPost("CreateService")]
        public async Task<IActionResult> CreateServicoManutence(ServicoCreateDTO entrada)
        {
            var result = await _servicoService.CreateServicoManutence(entrada);
            return  new JsonResult(result);        
        }


        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _servicoService.GetAll();
            return  new JsonResult(result);
        }
    }
}
