using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
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
        //nome service errado 
        public async Task<ReturnDefault> GetByIdAutomovel(EntryDtoAutomovel entrada)
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
