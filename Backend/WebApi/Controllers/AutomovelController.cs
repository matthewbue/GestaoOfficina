using GestaoOfficina.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using GestaoOfficinaProj.Domain.DTO;

namespace GestaoOfficinaProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AutomovelController : ControllerBase
    {
        private readonly IAutomovelService _automovelService;
        public AutomovelController(IAutomovelService automovelService)
        {
            _automovelService = automovelService;
        }
        [HttpPost("UpdateAutomovel")]
        public async Task<IActionResult> UpdateAutomovel(EntryAutomovelDTO entrada)
        {
            try
            {
                _automovelService.UpdateAutomovel(entrada);
                return Ok(entrada);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("CreateAutomovel")]
        public async Task<IActionResult> CreateAutomovel(AutomovelAddDTO entrada)
        {
            try
            {
                _automovelService.CreateAutomovel(entrada);
                return Ok(entrada);
            }
             catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpDelete("DeleteAutomovel")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                var result = _automovelService.DeleteAutomovel(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
