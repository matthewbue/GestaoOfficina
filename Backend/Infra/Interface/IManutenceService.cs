using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Domain.DTOs.OS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IManutenceService
    {
        Task<ReturnDefault> Create(ManutenceCreateDTO entrada);
        Task<ReturnDefault> CreateManutenceServico(ManutenceServico entrada);
        Task<ReturnDefault> GetById(int entrada);
        ReturnDefault Delete(int entrada);
        Task<ReturnDefault> UpdateManutence(ManutenceUpdateDTO entrada);
        Task<ReturnDefault> UpdateManutenceServico(ManutenceUpdateServicoDTO entrada);
        Task<ReturnDefault> GetFilterOS(OSFilterDTO FilterDTO);
        ReturnDefault CheckoutOS(int IdentificadorOS);
        Task<ReturnDefault> GetRelatorio(EntryFilterRelatorioDTO entrada);
        ReturnDefault DeleteManutence(int entrada);

        // Novos métodos para fluxo de orçamento
        Task<ReturnDefault> RealizarCheckIn(CheckInDTO entrada);
        Task<ReturnDefault> AdicionarFotosCheckIn(CheckInVisualDTO entrada);
        Task<ReturnDefault> InformarDiagnostico(DiagnosticoDTO entrada);
        Task<ReturnDefault> ConcluirDiagnostico(DiagnosticoCompletoDTO entrada);
        Task<ReturnDefault> IniciarCriacaoOrcamento(IniciarCriacaoOrcamentoDTO entrada);
        Task<ReturnDefault> ConcluirOrcamento(ConcluirOrcamentoDTO entrada);
        Task<ReturnDefault> GetFotosByOrcamento(int manutenceId);
    }
}
