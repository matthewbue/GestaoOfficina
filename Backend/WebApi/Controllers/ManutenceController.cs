
using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace GestaoOfficinaProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ManutenceController : ControllerBase
    {
        private readonly IManutenceService _manutenceService;
        public ManutenceController(IManutenceService manutenceService)
        {
            _manutenceService = manutenceService;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create(ManutenceCreateDTO entrada)
        {
            try
            {
                var result = await _manutenceService.Create(entrada);
                return  new JsonResult(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("AddServico")]
        public async Task<IActionResult> Create(ManutenceServico entrada)
        {
            try
            {
                var result = await _manutenceService.CreateManutenceServico(entrada);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("Update")] 
        public async Task<IActionResult> UpdateManutence(ManutenceUpdateDTO entrada)
        {
            try
            {
                var result = await _manutenceService.UpdateManutence(entrada);
                return  new JsonResult(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("UpdateServico")]
        public async Task<IActionResult> UpdateServico(ManutenceUpdateServicoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.UpdateManutenceServico(entrada);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpDelete("Delete")]
        public IActionResult Delete(int entrada)
        {
            try
            {
                var result = _manutenceService.Delete(entrada);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("DeleteManutence")]
        public IActionResult DeleteManutence(int entrada)
        {
            try
            {
                var result = _manutenceService.DeleteManutence(entrada);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int entrada)
        {
            try
            {
                var result = await _manutenceService.GetById(entrada);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    
        [HttpPost("GetFilterOS")]
        public async Task<IActionResult> GetFilterOS(OSFilterDTO FilterDTO)
        {
            try
            {
                var result = await _manutenceService.GetFilterOS(FilterDTO);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("CheckoutOS")]
        public async Task<IActionResult> CheckoutOS(int identificadorOS)
        {
            try
            {
                var result = _manutenceService.CheckoutOS(identificadorOS);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("GetRelatorio")]
        public async Task<IActionResult> GetRelatorio(EntryFilterRelatorioDTO entrada)
        {
            var result = await _manutenceService.GetRelatorio(entrada);
            return  new JsonResult(result);
        }
    }
}
