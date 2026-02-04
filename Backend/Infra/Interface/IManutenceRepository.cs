using GestaoOfficina.Domain.Model;
using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.DTOs.OS;
using GestaoOfficina.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Infra.Interface
{
    public interface IManutenceRepository
    {
        int Create(Manutence entrada);
        void UpdateManutence(Manutence entrada);
        Task<Manutence> GetById(int entrada);
        void Delete(int entrada);
        Task<List<OSGetFilterResponse>> GetFilterOS(OSFilterDTO entrada);
        void CheckoutOS(int identificadorOS);
        Task<int> CountOS(OSFilterDTO filterDTO);
        Task<ManutenceServico> GetManutenceServicoById(int id);
        void UpdateServicoManutence(ManutenceServico result);
        void CreateManutenceServico(ManutenceServico entrada);
        Task<List<Manutence>> GetRelatorio(EntryFilterRelatorioDTO entrada);
        int GetManutenceIdByDate(DateTime entrada);
        void DeleteManutence(int entrada);

        // Novos métodos para fluxo de orçamento
        void AtualizarStatusOrcamento(int manutenceId, StatusOrcamentoEnum novoStatus);
        void AdicionarFotos(List<OrcamentoFoto> fotos);
        Task<List<OrcamentoFoto>> GetFotosByManutenceId(int manutenceId);
        void DeletarFoto(int fotoId);
    }
}
