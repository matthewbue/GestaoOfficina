using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ManutenceController : ControllerBase
    {
        private readonly IManutenceService _manutenceService;
        public ManutenceController(IManutenceService manutenceService)
        {
            _manutenceService = manutenceService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateManutence(ManutenceCreateDTO entrada)
        {
            try
            {
                var result = await _manutenceService.CreateManutence(entrada);
                return Ok(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
