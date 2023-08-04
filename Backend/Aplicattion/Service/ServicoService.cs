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
    public class ServicoService : IServicoService
    {
        private readonly IServicoRepository _servicoRepository;
        public ServicoService(IServicoRepository servicoRepository)
        {
            _servicoRepository = servicoRepository;
        }

        public async Task<ReturnDefault> CreateServicoManutence(ServicoCreateDTO entrada)
        {
            Servico objeto = new Servico();
            objeto.Descricao = entrada.Descricao;
            var result = await _servicoRepository.CreateServicoManutence(objeto);
            return new ReturnDefault("Criação feita com sucesso.", objeto);
        }
        public async Task<ReturnDefault> GetAll()
        {

            var result = await _servicoRepository.GetAll();
            return new ReturnDefault("Dados retornado com sucesso.", result);
        }
    }
}
