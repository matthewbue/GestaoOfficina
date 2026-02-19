using GestaoOfficina.Domain.Enums;
using System.Collections.Generic;

namespace GestaoOfficina.Domain.Validators
{
    /// <summary>
    /// Valida transições de status no fluxo de orçamento e ordem de serviço
    /// </summary>
    public static class StatusOrcamentoValidator
    {
        /// <summary>
        /// Verifica se a transição de status é válida
        /// </summary>
        public static bool PodeAvancarParaStatus(StatusOrcamentoEnum statusAtual, StatusOrcamentoEnum statusNovo)
        {
            // Estados finais não podem mudar
            if (statusAtual == StatusOrcamentoEnum.Finalizada || 
                statusAtual == StatusOrcamentoEnum.Rejeitada)
                return false;
            
            // Pode rejeitar de qualquer status antes de aprovado (exceto finalizados)
            if (statusNovo == StatusOrcamentoEnum.Rejeitada && statusAtual < StatusOrcamentoEnum.AprovadoEmExecucao)
                return true;
            
            // Transições válidas por status
            var transicoesValidas = new Dictionary<StatusOrcamentoEnum, List<StatusOrcamentoEnum>>
            {
                { StatusOrcamentoEnum.OrcamentoIniciado, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AguardandoFotos } 
                },
                { StatusOrcamentoEnum.AguardandoFotos, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.EmDiagnostico } 
                },
                { StatusOrcamentoEnum.EmDiagnostico, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AguardandoPreenchimento } 
                },
                { StatusOrcamentoEnum.AguardandoPreenchimento, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.PreenchendoOrcamento } 
                },
                { StatusOrcamentoEnum.PreenchendoOrcamento, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AguardandoAprovacao } 
                },
                { StatusOrcamentoEnum.AguardandoAprovacao, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AprovadoEmExecucao } 
                },
                { StatusOrcamentoEnum.AprovadoEmExecucao, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.Finalizada } 
                }
            };
            
            if (transicoesValidas.ContainsKey(statusAtual))
            {
                return transicoesValidas[statusAtual].Contains(statusNovo);
            }
            
            return false;
        }
        
        /// <summary>
        /// Retorna lista de status válidos para avançar
        /// </summary>
        public static List<StatusOrcamentoEnum> ObterProximosStatusValidos(StatusOrcamentoEnum statusAtual)
        {
            if (statusAtual == StatusOrcamentoEnum.Finalizada || 
                statusAtual == StatusOrcamentoEnum.Rejeitada)
                return new List<StatusOrcamentoEnum>();
            
            var proximosStatus = new Dictionary<StatusOrcamentoEnum, List<StatusOrcamentoEnum>>
            {
                { StatusOrcamentoEnum.OrcamentoIniciado, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AguardandoFotos, StatusOrcamentoEnum.Rejeitada } 
                },
                { StatusOrcamentoEnum.AguardandoFotos, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.EmDiagnostico, StatusOrcamentoEnum.Rejeitada } 
                },
                { StatusOrcamentoEnum.EmDiagnostico, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AguardandoPreenchimento, StatusOrcamentoEnum.Rejeitada } 
                },
                { StatusOrcamentoEnum.AguardandoPreenchimento, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.PreenchendoOrcamento, StatusOrcamentoEnum.Rejeitada } 
                },
                { StatusOrcamentoEnum.PreenchendoOrcamento, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AguardandoAprovacao, StatusOrcamentoEnum.Rejeitada } 
                },
                { StatusOrcamentoEnum.AguardandoAprovacao, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.AprovadoEmExecucao, StatusOrcamentoEnum.Rejeitada } 
                },
                { StatusOrcamentoEnum.AprovadoEmExecucao, new List<StatusOrcamentoEnum> 
                    { StatusOrcamentoEnum.Finalizada } 
                }
            };
            
            return proximosStatus.ContainsKey(statusAtual) 
                ? proximosStatus[statusAtual] 
                : new List<StatusOrcamentoEnum>();
        }
        
        /// <summary>
        /// Verifica se o status pertence à fase de orçamento (1-6)
        /// </summary>
        public static bool EhFaseOrcamento(StatusOrcamentoEnum status)
        {
            return status >= StatusOrcamentoEnum.OrcamentoIniciado && 
                   status <= StatusOrcamentoEnum.AguardandoAprovacao;
        }
        
        /// <summary>
        /// Verifica se o status pertence à fase de ordem de serviço (7-8)
        /// </summary>
        public static bool EhFaseOrdemServico(StatusOrcamentoEnum status)
        {
            return status >= StatusOrcamentoEnum.AprovadoEmExecucao && 
                   status <= StatusOrcamentoEnum.Finalizada;
        }
        
        /// <summary>
        /// Obtém mensagem de erro para transição inválida
        /// </summary>
        public static string ObterMensagemErro(StatusOrcamentoEnum statusAtual, StatusOrcamentoEnum statusNovo)
        {
            if (statusAtual == StatusOrcamentoEnum.Finalizada)
                return "Ordem de serviço já está finalizada e não pode ser alterada";
            
            if (statusAtual == StatusOrcamentoEnum.Rejeitada)
                return "Orçamento rejeitado não pode ser alterado";
            
            if (!PodeAvancarParaStatus(statusAtual, statusNovo))
                return $"Transição inválida de '{statusAtual}' para '{statusNovo}'. Status atual deve estar em uma etapa anterior.";
            
            return null;
        }
    }
}
