using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Aplicattion.Service
{
    public class ManutenceService : IManutenceService
    {
        private readonly IManutenceRepository _manutenceRepository;
        public ManutenceService(IManutenceRepository manutenceRepository)
        {
            _manutenceRepository = manutenceRepository;
        }
        public async Task<ReturnDefault> Create(ManutenceCreateDTO entrada)
        {
            ManutenceServico objeto = new ManutenceServico();
            Manutence objetoPai = new Manutence();

            objetoPai.AutomovelId = entrada.Veiculoid;
            objetoPai.ClientId = entrada.Clientid;
            objetoPai.Observacoes = entrada.Observacoes;
            objetoPai.TipoDoc = entrada.TipoDoc;
            objetoPai.DataOS = DateTime.Now;
            objetoPai.Status = "Em Andamento";
            objetoPai.ManutecesServicos = entrada.manutences;
            objetoPai.ValorTotal = entrada.ValorTotal;
            _manutenceRepository.Create(objetoPai);
            return new ReturnDefault("Dados retornado com sucesso.", objeto);
        }

        public ReturnDefault Delete(int entrada)
        {
            _manutenceRepository.Delete(entrada);
            return new ReturnDefault("Deletado com sucesso.", "sucesso");
        }
        public async Task<ReturnDefault> GetById(int entrada)
        {
            var result = await _manutenceRepository.GetById(entrada);
            return new ReturnDefault("Dados retornado com sucesso.", result);
        }

        public async Task<ReturnDefault> GetFilterOS(OSFilterDTO FilterDTO)
        {
            var result = await _manutenceRepository.GetFilterOS(FilterDTO);
            int count = await _manutenceRepository.CountOS(FilterDTO);
            var TotalperPag = (count % FilterDTO.PageSize).Equals(0) ? (count / FilterDTO.PageSize) : (count / FilterDTO.PageSize) + 1;

            var response = new ReturnDefault("Dados retornado com sucesso.", result);
            response.totalDados = count;
            response.totalPagina = TotalperPag.Value;
            return response;
         
            
            return new ReturnDefault("Dados retornado com sucesso.", result);
        }

        public async Task<ReturnDefault> UpdateManutence(ManutenceUpdateDTO entrada)
        {
            var result = await _manutenceRepository.GetById(entrada.Id);
            //if (!String.IsNullOrEmpty(entrada.Nome))
            //{
            //    result. = entrada.Nome;
            //}
            //if (entrada.Valor > 0)
            //{
            //    result.Valor = entrada.Valor;
            //}
            //if (!String.IsNullOrEmpty(entrada.Observacoes))
            //{
            //    result.Observacoes = entrada.Observacoes;
            //}
            //if (entrada.Mediakm > 0)
            //{
            //    result.Mediakm = entrada.Mediakm;
            //}
            //if (entrada.Kmservico > 0)
            //{
            //    result.Kmservico = entrada.Kmservico;
            //}
            //if (entrada.Kmatual > 0 )
            //{
            //    result.Kmatual = entrada.Kmatual;
            //}

            _manutenceRepository.UpdateManutence(result);
            return new ReturnDefault("Dados modificados com sucesso.", result);
        }

        public ReturnDefault CheckoutOS(int IdentificadorOS)
        {
            _manutenceRepository.CheckoutOS(IdentificadorOS);
            return new ReturnDefault("Dados modificados com sucesso.", "sucess");
        }
    }
}
