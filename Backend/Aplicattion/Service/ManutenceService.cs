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
            objeto.Valor = entrada.Valor;
            objeto.Nome = entrada.Nome;
            objeto.Valor = entrada.Valor;
            objeto.Kmservico = entrada.Kmservico;
            objeto.Kmatual = entrada.Kmatual;
            objeto.Id = entrada.Id;
            objeto.IdCarro = entrada.IdCarro;
            objeto.ClientId = entrada.ClientId;
            await _manutenceRepository.Create(objeto);
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

        public async Task<ReturnDefault> Update(ManutenceUpdateDTO entrada)
        {
            var result = await _manutenceRepository.GetById(entrada.Id);

            if (!String.IsNullOrEmpty(entrada.Nome))
            {
                result.Nome = entrada.Nome;
            }
            if (!String.IsNullOrEmpty(entrada.Valor))
            {
                result.Valor = entrada.Valor;
            }
            if (!String.IsNullOrEmpty(entrada.Kmservico))
            {
                result.Kmservico = entrada.Kmservico;
            }
            if (!String.IsNullOrEmpty(entrada.Kmatual))
            {
                result.Kmatual = entrada.Kmatual;
            }
            if ((entrada.Id > 0))
            {
                result.Id = entrada.Id;
            }
            _manutenceRepository.Update(result);
            return new ReturnDefault("Dados modificados com sucesso.", result);

        }
    }
}
