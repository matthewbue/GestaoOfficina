using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
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

        // Métodos do fluxo de orçamento
        Task<ReturnDefault> RealizarCheckIn(CheckInDTO entrada);
        Task<ReturnDefault> AdicionarFotosCheckIn(CheckInVisualDTO entrada);
        Task<ReturnDefault> InformarDiagnostico(DiagnosticoDTO entrada);
        Task<ReturnDefault> ConcluirDiagnostico(DiagnosticoCompletoDTO entrada);
        Task<ReturnDefault> IniciarCriacaoOrcamento(IniciarCriacaoOrcamentoDTO entrada);
        Task<ReturnDefault> ConcluirOrcamento(ConcluirOrcamentoDTO entrada);
        Task<ReturnDefault> GetFotosByOrcamento(int manutenceId);

        // ✅ NOVOS: Métodos movidos do controller para service
        Task<ReturnDefault> AprovarOrcamento(AprovarOrcamentoDTO entrada);
        Task<ReturnDefault> RejeitarOrcamento(RejeitarOrcamentoDTO entrada);
        Task<ReturnDefault> HabilitarCapturaDeFotos(HabilitarFotosDTO entrada);
        Task<ReturnDefault> AtualizarStatus(AtualizarStatusDTO entrada);
    }
}
