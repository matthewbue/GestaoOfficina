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
        
        // ✅ CORRIGIDO: Removido IManutenceRepository
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
                return new JsonResult(result);
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
            return new JsonResult(result);
        }

        // === ENDPOINTS FLUXO DE ORÇAMENTO ===

        [HttpPost("CheckIn")]
        public async Task<IActionResult> RealizarCheckIn(CheckInDTO entrada)
        {
            try
            {
                var result = await _manutenceService.RealizarCheckIn(entrada);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro interno: {ex.Message}", null, 500));
            }
        }

        /// <summary>
        /// ✅ CORRIGIDO: Lógica movida para Service
        /// Permite atualizar status genérico COM validação de transição
        /// </summary>
        [HttpPost("AtualizarStatus")]
        public async Task<IActionResult> AtualizarStatus([FromBody] AtualizarStatusDTO request)
        {
            try
            {
                var result = await _manutenceService.AtualizarStatus(request);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        /// <summary>
        /// ✅ CORRIGIDO: Lógica movida para Service
        /// </summary>
        [HttpPost("AprovarOrcamento")]
        public async Task<IActionResult> AprovarOrcamento([FromBody] AprovarOrcamentoDTO request)
        {
            try
            {
                var result = await _manutenceService.AprovarOrcamento(request);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        /// <summary>
        /// ✅ CORRIGIDO: Lógica movida para Service
        /// </summary>
        [HttpPost("RejeitarOrcamento")]
        public async Task<IActionResult> RejeitarOrcamento([FromBody] RejeitarOrcamentoDTO request)
        {
            try
            {
                var result = await _manutenceService.RejeitarOrcamento(request);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        /// <summary>
        /// ✅ CORRIGIDO: Lógica movida para Service
        /// </summary>
        [HttpPost("HabilitarCapturaDeFotos")]
        public async Task<IActionResult> HabilitarCapturaDeFotos([FromBody] HabilitarFotosDTO request)
        {
            try
            {
                var result = await _manutenceService.HabilitarCapturaDeFotos(request);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        [HttpPost("CheckInVisual")]
        public async Task<IActionResult> AdicionarFotosCheckIn(CheckInVisualDTO entrada)
        {
            try
            {
                var result = await _manutenceService.AdicionarFotosCheckIn(entrada);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        [HttpPost("Diagnostico")]
        public async Task<IActionResult> InformarDiagnostico(DiagnosticoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.InformarDiagnostico(entrada);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        [HttpPost("DiagnosticoCompleto")]
        public async Task<IActionResult> ConcluirDiagnostico(DiagnosticoCompletoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.ConcluirDiagnostico(entrada);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        [HttpPost("IniciarCriacaoOrcamento")]
        public async Task<IActionResult> IniciarCriacaoOrcamento(IniciarCriacaoOrcamentoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.IniciarCriacaoOrcamento(entrada);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        [HttpPost("ConcluirOrcamento")]
        public async Task<IActionResult> ConcluirOrcamento(ConcluirOrcamentoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.ConcluirOrcamento(entrada);
                
                if (result.httpStatusCode >= 400)
                    return StatusCode(result.httpStatusCode, result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }

        [HttpGet("GetFotosOrcamento")]
        public async Task<IActionResult> GetFotosByOrcamento(int manutenceId)
        {
            try
            {
                var result = await _manutenceService.GetFotosByOrcamento(manutenceId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ReturnDefault($"Erro: {ex.Message}", null, 500));
            }
        }
    }
}
