using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficinaProj.Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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
            try
            {
                var result = await _clientService.Create(client);
                return new JsonResult(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _clientService.GetAll();
                return new JsonResult(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("UpdateClient")]
        public async Task<IActionResult> Update(ClientUpdateDTO entrada)
        {
            try
            {
                 await _clientService.Update(entrada);
                return new JsonResult(entrada);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("GetClientById")]
        public async Task<IActionResult> GetClientById(int identificador)
        {
            try
            {
               var resultado =  await _clientService.GetClientById(identificador);
                return new JsonResult(resultado);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("GetClientFilter")]
        public async Task<IActionResult> GetClientFilter(ClientFilterDTO entrada)
        {
            try
            {
                var resultado = await _clientService.GetClientFilter(entrada);
                return new JsonResult(resultado);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpDelete("DeleteClient")]
        public ActionResult Delete(int entrada)
        {
            try
            {
                var result = _clientService.Delete(entrada);
                return  new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}