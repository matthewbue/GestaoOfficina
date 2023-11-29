using GestaoOfficina.Domain.DTO;
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
    }
}
