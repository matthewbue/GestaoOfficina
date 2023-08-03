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
    public class ServicoManutenceService : IServicoManutenceService
    {
        private readonly IServicoManutenceRepository _servicoManutenceRepository;
        public ServicoManutenceService( IServicoManutenceRepository servicoManutenceRepository)
        {
            _servicoManutenceRepository = servicoManutenceRepository;
        }

        public async Task<ReturnDefault> CreateServicoManutence(ServicoManutenceCreateDTO entrada)
        {
            ServicoManutence objeto = new ServicoManutence();
            objeto.Descricao = entrada.Descricao;
            var result = await _servicoManutenceRepository.CreateServicoManutence(objeto);
            return new ReturnDefault("Criação feita com sucesso.", objeto);
        }
        public async Task<ReturnDefault> GetAll()
        {

            var result = await _servicoManutenceRepository.GetAll();
            return new ReturnDefault("Dados retornado com sucesso.", result);
        }
    }
}
