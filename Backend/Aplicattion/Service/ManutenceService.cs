using GestaoOfficina.Domain.Model;
using GestaoOfficinaProj.Domain.DTO;
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
            Manutence objeto = new Manutence();
            foreach (var lista in entrada.manutences)
            {
                List<Manutence> listaresult = new List<Manutence>();
                objeto.Valor = lista.Valor;
                objeto.Nome = lista.NomeServico;
                objeto.Valor = lista.Valor;
                objeto.Kmservico = lista.Kmservico;
                objeto.Kmatual = lista.Kmatual;
                objeto.Mediakm = lista.Mediakm;
                objeto.ClientId = entrada.Clientid;
                objeto.IdCarro = entrada.Veiculoid;
                objeto.Observacoes = entrada.Observacoes;
                objeto.ValorTotal = entrada.ValorTotal;
                objeto.DataOS = DateTime.Now;
                objeto.Status = "Em Andamento";
                listaresult.Add(objeto);
            }
             _manutenceRepository.Create(objeto);
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
            if (!String.IsNullOrEmpty(entrada.Nome))
            {
                result.Nome = entrada.Nome;
            }
            if (entrada.Valor > 0)
            {
                result.Valor = entrada.Valor;
            }
            if (!String.IsNullOrEmpty(entrada.Observacoes))
            {
                result.Observacoes = entrada.Observacoes;
            }
            if (entrada.Mediakm > 0)
            {
                result.Mediakm = entrada.Mediakm;
            }
            if (entrada.Kmservico > 0)
            {
                result.Kmservico = entrada.Kmservico;
            }
            if (entrada.Kmatual > 0 )
            {
                result.Kmatual = entrada.Kmatual;
            }

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
