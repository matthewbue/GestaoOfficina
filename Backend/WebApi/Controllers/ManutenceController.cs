
using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficina.Domain.Enums;
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
        private readonly IManutenceRepository _manutenceRepository;
        
        public ManutenceController(IManutenceService manutenceService, IManutenceRepository manutenceRepository)
        {
            _manutenceService = manutenceService;
            _manutenceRepository = manutenceRepository;
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

        // Novos endpoints para fluxo de orçamento

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
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("AtualizarStatus")]
        public async Task<IActionResult> AtualizarStatus([FromBody] AtualizarStatusRequest request)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(request.ManutenceId);
                
                if (manutence == null)
                    return new JsonResult(new ReturnDefault("Orçamento não encontrado.", null));

                _manutenceRepository.AtualizarStatusOrcamento(request.ManutenceId, request.NovoStatus);

                return new JsonResult(new ReturnDefault("Status atualizado com sucesso.", 
                    new { id = request.ManutenceId, status = request.NovoStatus }));
            }
            catch (Exception ex)
            {
                return new JsonResult(new ReturnDefault($"Erro: {ex.Message}", null));
            }
        }

        [HttpPost("AprovarOrcamento")]
        public async Task<IActionResult> AprovarOrcamento([FromBody] AprovarOrcamentoRequest request)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(request.ManutenceId);
                
                if (manutence == null)
                    return new JsonResult(new ReturnDefault("Orçamento não encontrado.", null));

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.AguardandoAprovacao)
                    return new JsonResult(new ReturnDefault("Orçamento não está aguardando aprovação.", null));

                // Muda status para AprovadoEmExecucao e converte em Ordem de Serviço
                manutence.StatusOrcamento = StatusOrcamentoEnum.AprovadoEmExecucao;
                manutence.TipoDoc = "OrdemServico";
                manutence.Status = "Em Andamento";
                
                _manutenceRepository.UpdateManutence(manutence);

                return new JsonResult(new ReturnDefault("Orçamento aprovado e convertido em Ordem de Serviço!", 
                    new { id = request.ManutenceId, status = "AprovadoEmExecucao", tipo = "OrdemServico" }));
            }
            catch (Exception ex)
            {
                return new JsonResult(new ReturnDefault($"Erro: {ex.Message}", null));
            }
        }

        [HttpPost("RejeitarOrcamento")]
        public async Task<IActionResult> RejeitarOrcamento([FromBody] RejeitarOrcamentoRequest request)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(request.ManutenceId);
                
                if (manutence == null)
                    return new JsonResult(new ReturnDefault("Orçamento não encontrado.", null));

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.AguardandoAprovacao)
                    return new JsonResult(new ReturnDefault("Orçamento não está aguardando aprovação.", null));

                // Muda status para Rejeitada (não pode mais editar)
                manutence.StatusOrcamento = StatusOrcamentoEnum.Rejeitada;
                manutence.Status = "Cancelada";
                
                _manutenceRepository.UpdateManutence(manutence);

                return new JsonResult(new ReturnDefault("Orçamento rejeitado pelo cliente.", 
                    new { id = request.ManutenceId, status = "Rejeitada" }));
            }
            catch (Exception ex)
            {
                return new JsonResult(new ReturnDefault($"Erro: {ex.Message}", null));
            }
        }

        [HttpPost("HabilitarCapturaDeFotos")]
        public async Task<IActionResult> HabilitarCapturaDeFotos([FromBody] HabilitarFotosRequest request)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(request.ManutenceId);
                
                if (manutence == null)
                    return new JsonResult(new ReturnDefault("Orçamento não encontrado.", null));

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.OrcamentoIniciado)
                    return new JsonResult(new ReturnDefault("Orçamento não está na etapa inicial para habilitar fotos.", null));

                _manutenceRepository.AtualizarStatusOrcamento(request.ManutenceId, StatusOrcamentoEnum.AguardandoFotos);

                return new JsonResult(new ReturnDefault("Captura de fotos habilitada com sucesso.", 
                    new { id = request.ManutenceId, status = "AguardandoFotos" }));
            }
            catch (Exception ex)
            {
                return new JsonResult(new ReturnDefault($"Erro: {ex.Message}", null));
            }
        }

        [HttpPost("CheckInVisual")]
        public async Task<IActionResult> AdicionarFotosCheckIn(CheckInVisualDTO entrada)
        {
            try
            {
                var result = await _manutenceService.AdicionarFotosCheckIn(entrada);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("Diagnostico")]
        public async Task<IActionResult> InformarDiagnostico(DiagnosticoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.InformarDiagnostico(entrada);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("DiagnosticoCompleto")]
        public async Task<IActionResult> ConcluirDiagnostico(DiagnosticoCompletoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.ConcluirDiagnostico(entrada);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("IniciarCriacaoOrcamento")]
        public async Task<IActionResult> IniciarCriacaoOrcamento(IniciarCriacaoOrcamentoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.IniciarCriacaoOrcamento(entrada);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("ConcluirOrcamento")]
        public async Task<IActionResult> ConcluirOrcamento(ConcluirOrcamentoDTO entrada)
        {
            try
            {
                var result = await _manutenceService.ConcluirOrcamento(entrada);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("GetFotosOrcamento")]
        public async Task<IActionResult> GetFotosByOrcamento(int manutenceId)
        {
            try
            {
                var result = await _manutenceService.GetFotosByOrcamento(manutenceId);
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

    // DTO para request de habilitar fotos
    public class HabilitarFotosRequest
    {
        public int ManutenceId { get; set; }
        public int OperadorId { get; set; }
    }

    // DTO para atualizar status genérico
    public class AtualizarStatusRequest
    {
        public int ManutenceId { get; set; }
        public StatusOrcamentoEnum NovoStatus { get; set; }
    }

    // DTO para aprovar orçamento
    public class AprovarOrcamentoRequest
    {
        public int ManutenceId { get; set; }
    }

    // DTO para rejeitar orçamento
    public class RejeitarOrcamentoRequest
    {
        public int ManutenceId { get; set; }
    }
}
