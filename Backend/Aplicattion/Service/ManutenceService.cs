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

        public async Task<ReturnDefault> CreateManutence(ManutenceCreateDTO entrada)
        {
            Manutence objeto = new Manutence();
            objeto.Descricao = entrada.Descricao;
            objeto.Produto = entrada.Produto;
            objeto.Valor = entrada.Valor;
            objeto.KMAtual = entrada.KMAtual;
            objeto.Defeito = entrada.Defeito;
            objeto.IdCarro = entrada.IdCarro;
            objeto.ClientId = entrada.ClientId;
            await _manutenceRepository.CreateManutence(objeto);
            return new ReturnDefault("Dados retornado com sucesso.", objeto);
        }
    }
}
