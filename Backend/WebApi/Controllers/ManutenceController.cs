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
        [HttpPost("Create")]
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
        [HttpPost("Update")] 
        public async Task<IActionResult> UpdateManutence(ManutenceUpdateDTO entrada)
        {
            try
            {
                var result = _manutenceService.UpdateManutence(entrada);
                return Ok(result);
            }
            catch(Exception ex)
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
                return Ok(result);
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
                return Ok(result);
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
            return Ok(result);
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
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
