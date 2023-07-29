using GestaoOfficina.Domain.DTO;
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
    public class AutomovelService : IAutomovelService
    {
        private readonly IAutomovelRepository _automovelRepository;
        public AutomovelService(IAutomovelRepository automovelRepository)
        {
            _automovelRepository = automovelRepository;
        }

        public async Task<ReturnDefault> CreateAutomovel(AutomovelAddDTO entrada)
        {

            Automovel objeto = new Automovel();
            objeto.Placa = entrada.Placa;
            objeto.Modelo = entrada.Modelo;
            objeto.Marca = entrada.Marca;
            objeto.Km = entrada.Km;
            objeto.Cor = entrada.Cor;
            objeto.Ano = entrada.Ano;
            objeto.ClientId = entrada.ClienteId;
            _automovelRepository.CreateAutomovel(objeto);
            return new ReturnDefault("Criação feita com sucesso.", objeto);
        }


        public ReturnDefault DeleteAutomovel(int Identificador)
        {
            _automovelRepository.DeleteAutomovel(Identificador);

            return new ReturnDefault("Criação feita com sucesso.", "Sucess");
        }

        public async Task<ReturnDefault> UpdateAutomovel(EntryAutomovelDTO entrada)
        {
            var result = await _automovelRepository.GetByIdAutomovel(entrada.Id);
            if (!String.IsNullOrEmpty(entrada.Ano))
            {
                result.Ano = entrada.Ano;
            }
            if (!String.IsNullOrEmpty(entrada.Cor))
            {
                result.Cor = entrada.Cor;
            }
            if (!String.IsNullOrEmpty(entrada.Marca))
            {
                result.Marca = entrada.Marca;
            }
            if (!String.IsNullOrEmpty(entrada.Modelo))
            {
                result.Modelo = entrada.Modelo;
            }
            if (!String.IsNullOrEmpty(entrada.Placa))
            {
                result.Placa = entrada.Placa;
            }
            
             _automovelRepository.UpdateAutomovel(result);
            return new ReturnDefault("Dados modificados com sucesso.", result);
        }
    }
    
}
