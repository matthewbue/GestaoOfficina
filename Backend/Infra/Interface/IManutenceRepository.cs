using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Infra.Interface
{
    public interface IManutenceRepository
    {
        void Create(Manutence entrada);
        void UpdateManutence(Manutence entrada);
        Task<Manutence> GetById(int entrada);
        void Delete(int entrada);
        Task<List<Manutence>> GetFilterOS(OSFilterDTO entrada);
        void CheckoutOS(int identificadorOS);
        Task<int> CountOS(OSFilterDTO filterDTO);
        Task<ManutenceServico> GetManutenceServicoById(int id);
        void UpdateServicoManutence(ManutenceServico result);
        void CreateManutenceServico(ManutenceServico entrada);
        Task<List<Manutence>> GetRelatorio(EntryFilterRelatorioDTO entrada);
    }
}
