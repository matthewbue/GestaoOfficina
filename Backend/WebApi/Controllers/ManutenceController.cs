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
        public async Task<IActionResult> Create(ManutenceCreateDTO entrada)
        {
            try
            {
                var result = await _manutenceService.Create(entrada);
                return Ok(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("GetClientById")]
        public async Task<IActionResult> Update(ManutenceUpdateDTO entrada)
        {
            var result = _manutenceService.Update(entrada);
            return Ok(result);
        }
        [HttpDelete("DeleteClient")]
        public IActionResult Delete(int entrada)
        {
            var result = _manutenceService.Delete(entrada);
            return Ok(result);
        }
        [HttpGet("UpdateClient")]
        public async Task<IActionResult> GetById(int entrada)
        {
            var result = await _manutenceService.GetById(entrada);
            return Ok(result);
        }
    }
}
