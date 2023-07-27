using GestaoOfficina.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

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
        public async Task<IActionResult> UpdateAutomovel(EntryDtoAutomovel entrada)
        {
            try
            {
                _automovelService.GetByIdAutomovel(entrada);
                return Ok(entrada);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
