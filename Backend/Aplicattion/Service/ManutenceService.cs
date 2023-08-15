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

        public async Task<ReturnDefault> CreateManutenceServico(ManutenceServico entrada)
        {

           
            _manutenceRepository.CreateManutenceServico(entrada);
            return new ReturnDefault("Dados retornado com sucesso.", entrada);
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
            if (!String.IsNullOrEmpty(entrada.Observacoes))
            {
                result.Observacoes = entrada.Observacoes;
            }
            if (!String.IsNullOrEmpty(entrada.TipoDoc))
            {
                result.TipoDoc = entrada.TipoDoc;
            }
            if (entrada.ValorTotal > 0)
            {
                result.ValorTotal = entrada.ValorTotal;
            }
                

            _manutenceRepository.UpdateManutence(result);
            return new ReturnDefault("Dados modificados com sucesso.", result);
        }

        public async Task<ReturnDefault> UpdateManutenceServico(ManutenceUpdateServicoDTO entrada)
        {
            var result = await _manutenceRepository.GetManutenceServicoById(entrada.ID);
            if (!String.IsNullOrEmpty(entrada.Nome))
            {
                result.Nome = entrada.Nome;
            }
            if (entrada.Kmatual > 0)
            {
                result.Kmatual = entrada.Kmatual;
            }
            if (entrada.Mediakm > 0)
            {
                result.Mediakm = entrada.Mediakm;
            }
            if (entrada.Valor > 0)
            {
                result.Valor = entrada.Valor;
            }
            if (entrada.Kmservico > 0)
            {
                result.Kmservico = entrada.Kmservico;
            }

            _manutenceRepository.UpdateServicoManutence(result);
            return new ReturnDefault("Dados modificados com sucesso.", result);
        }
        public ReturnDefault CheckoutOS(int IdentificadorOS)
        {
            _manutenceRepository.CheckoutOS(IdentificadorOS);
            return new ReturnDefault("Dados modificados com sucesso.", "sucess");
        }

        public ReturnDefault GetRelatorio(EntryFilterRelatorioDTO entrada)
        {

            var result = _manutenceRepository.GetRelatorio(entrada);

            var objetoSaida = new ResponseRelatorioDTO();
            objetoSaida.Manutences = result.Result;
            objetoSaida.QuantidadesTotalDeItens = result.Result.Count();
            foreach (var item in result.Result)
            {
                objetoSaida.ValorTotalRelatorio = objetoSaida.ValorTotalRelatorio + item.ValorTotal;
               
            }
            
            return new ReturnDefault("Dados retornados com sucesso.", objetoSaida);
        }
    }
}
