using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficina.Domain.Enums;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Infra.Interface;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
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
        private readonly IClientRepository _clientRepository;
        
        public ManutenceService(IManutenceRepository manutenceRepository, IClientRepository clientRepository)
        {
            _manutenceRepository = manutenceRepository;
            _clientRepository = clientRepository;
        }
        public async Task<ReturnDefault> Create(ManutenceCreateDTO entrada)
        {

            #region criação manutence
            ManutenceServico objeto = new ManutenceServico();
            Manutence objetoPai = new Manutence();

            objetoPai.AutomovelId = entrada.Veiculoid;
            objetoPai.Observacoes = entrada.Observacoes;
            objetoPai.TipoDoc = entrada.TipoDoc;
            objetoPai.DataOS = DateTime.Now;
            objetoPai.Status = "Em Andamento";
            objetoPai.StatusOrcamento = entrada.StatusOrcamento ?? StatusOrcamentoEnum.AprovadoEmExecucao;
            objetoPai.ManutecesServicos = entrada.manutences;
            objetoPai.ValorTotal = entrada.ValorTotal;
            
            var resultManutenceid =  _manutenceRepository.Create(objetoPai);

            #endregion

            #region corpo email
            //// Informações da oficina
            //string nomeOficina = "FERREIRA'S AUTOMOTIVO";
            //string enderecoOficina = "Rua Framboesa LOTE 1 QUADRA S";
            //string cidadeOficina = "Rio de Janeiro";
            //string telefoneOficina = "(21)964169157";

            //// Informações do cliente
            //string nomeCliente = result.Result.Nome;
            //string enderecoCliente = result.Result.Endereco;
            //string cidadeCliente = result.Result.Cidade;
            //string telefoneCliente = result.Result.NumeroContato;

            //// Itens de serviço
            //List<string> servicos = new List<string>();
            //foreach (var item in entrada.manutences)
            //{
            //    servicos.Add(item.Nome);

            //}


            //// Montar a nota de serviço em uma string
            //string notaDeServico = $"======== NOTA DE SERVIÇO ========{Environment.NewLine}" +
            //                       $"Oficina: {nomeOficina}{Environment.NewLine}" +
            //                       $"Endereço: {enderecoOficina}, {cidadeOficina}{Environment.NewLine}" +
            //                       $"Telefone: {telefoneOficina}{Environment.NewLine}" +
            //                       $"--------------------------------{Environment.NewLine}" +
            //                       $"Cliente: {nomeCliente}{Environment.NewLine}" +
            //                       $"Endereço: {enderecoCliente}, {cidadeCliente}{Environment.NewLine}" +
            //                       $"Telefone: {telefoneCliente}{Environment.NewLine}" +
            //                       $"--------------------------------{Environment.NewLine}" +
            //                       $"Serviços realizados:{Environment.NewLine}";

            //foreach (string servico in servicos)
            //{
            //    notaDeServico += $"- {servico}{Environment.NewLine}";
            //}

            //notaDeServico += $"--------------------------------{Environment.NewLine}" +
            //                 $"Total a pagar: R$  {objetoPai.ValorTotal}  {Environment.NewLine}" +
            //                 $"================================";
            #endregion

            #region envio email

            //string remetenteEmail = "oficinaferreiras@outlo new JsonResult.com";
            //string senhaRemetente = "oficina12345";
            //string destinatarioEmail = result.Result.Email;
            //string assunto =objetoPai.TipoDoc + " N: " + resultManutenceid;
            //string corpo = notaDeServico;

            //var message = new MimeMessage();
            //message.From.Add(new MailboxAddress("Oficina ferreira", remetenteEmail));
            //message.To.Add(new MailboxAddress("Destinatário", destinatarioEmail.ToString()));
            //message.Subject = assunto;
            //message.Body = new TextPart("plain")
            //{
            //    Text = corpo
            //};

            //using (var client = new SmtpClient())
            //{
            //    client.ServerCertificateValidationCallback = (s, c, h, e) => true; // Ignorar validação do certificado
            //    await client.ConnectAsync("smtp-mail.outlo new JsonResult.com", 587, SecureSocketOptions.StartTls);
            //    await client.AuthenticateAsync(remetenteEmail, senhaRemetente);
            //    await client.SendAsync(message);
            //    await client.DisconnectAsync(true);
            //}

            #endregion

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

        public async Task<ReturnDefault> GetRelatorio(EntryFilterRelatorioDTO entrada)
        {

            var result = await _manutenceRepository.GetRelatorio(entrada);

            var objetoSaida = new ResponseRelatorioDTO();
            objetoSaida.Manutences = result;
            objetoSaida.QuantidadesTotalDeItens = result.Count();
            foreach (var item in result)
            {
                objetoSaida.ValorTotalRelatorio = objetoSaida.ValorTotalRelatorio + item.ValorTotal;
               
            }
            
            return new ReturnDefault("Dados retornados com sucesso.", objetoSaida);
        }

        public ReturnDefault DeleteManutence(int entrada)
        {
            _manutenceRepository.DeleteManutence(entrada);
            return new ReturnDefault("Deletado com sucesso.", "sucesso");
        }

        // Novos métodos para fluxo de orçamento

        public async Task<ReturnDefault> RealizarCheckIn(CheckInDTO entrada)
        {
            try
            {
                var manutence = new Manutence
                {
                    AutomovelId = entrada.VeiculoId,
                    Observacoes = entrada.Observacoes,
                    TipoDoc = "Orçamento",
                    DataOS = DateTime.Now,
                    DataCheckIn = DateTime.Now,
                    Status = "Em Andamento",
                    StatusOrcamento = StatusOrcamentoEnum.OrcamentoIniciado,
                    OperadorCheckInId = entrada.OperadorId,
                    ValorTotal = 0,
                    ManutecesServicos = new List<ManutenceServico>()
                };

                var manutenceId = _manutenceRepository.Create(manutence);
                
                return new ReturnDefault("Check-in realizado com sucesso.", new { id = manutenceId, status = "CheckIn" });
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao realizar check-in: {ex.Message}", null);
            }
        }

        public async Task<ReturnDefault> AdicionarFotosCheckIn(CheckInVisualDTO entrada)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(entrada.ManutenceId);
                
                if (manutence == null)
                    return new ReturnDefault("Orçamento não encontrado.", null);

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.AguardandoFotos)
                    return new ReturnDefault("Orçamento não está na etapa de captura de fotos.", null);

                if (entrada.Fotos != null && entrada.Fotos.Count > 9)
                    return new ReturnDefault("Máximo de 6 fotos permitidas.", null);

                var fotos = entrada.Fotos?.Select(f => new OrcamentoFoto
                {
                    ImagemBytes = f.ImagemBytes,
                    NomeArquivo = f.NomeArquivo,
                    TipoImagem = f.TipoImagem,
                    Descricao = f.Descricao,
                    ManutenceId = entrada.ManutenceId,
                    DataUpload = DateTime.Now
                }).ToList();

                if (fotos != null && fotos.Any())
                {
                    _manutenceRepository.AdicionarFotos(fotos);
                }

                _manutenceRepository.AtualizarStatusOrcamento(entrada.ManutenceId, StatusOrcamentoEnum.AguardandoFotos);

                return new ReturnDefault("Fotos adicionadas com sucesso. Status atualizado para Check-in Visual.", 
                    new { quantidadeFotos = fotos?.Count ?? 0, status = "CheckInVisual" });
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao adicionar fotos: {ex.Message}", null);
            }
        }

        public async Task<ReturnDefault> InformarDiagnostico(DiagnosticoDTO entrada)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(entrada.ManutenceId);
                
                if (manutence == null)
                    return new ReturnDefault("Orçamento não encontrado.", null);

                manutence.DiagnosticoMecanico = entrada.DiagnosticoMecanico;
                manutence.DataDiagnostico = DateTime.Now;
                manutence.MecanicoId = entrada.MecanicoId;
                manutence.StatusOrcamento = StatusOrcamentoEnum.EmDiagnostico;

                _manutenceRepository.UpdateManutence(manutence);

                return new ReturnDefault("Diagnóstico informado com sucesso.", 
                    new { status = "Diagnostico", diagnostico = entrada.DiagnosticoMecanico });
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao informar diagnóstico: {ex.Message}", null);
            }
        }

        public async Task<ReturnDefault> ConcluirDiagnostico(DiagnosticoCompletoDTO entrada)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(entrada.ManutenceId);
                
                if (manutence == null)
                    return new ReturnDefault("Orçamento não encontrado.", null);

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.EmDiagnostico)
                    return new ReturnDefault("Orçamento não está na etapa de Diagnóstico.", null);

                if (string.IsNullOrEmpty(manutence.DiagnosticoMecanico))
                    return new ReturnDefault("Diagnóstico não foi informado.", null);

                _manutenceRepository.AtualizarStatusOrcamento(entrada.ManutenceId, StatusOrcamentoEnum.AguardandoPreenchimento);

                return new ReturnDefault("Diagnóstico concluído. Aguardando operador criar orçamento.", 
                    new { status = "DiagnosticoCompleto" });
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao concluir diagnóstico: {ex.Message}", null);
            }
        }

        public async Task<ReturnDefault> IniciarCriacaoOrcamento(IniciarCriacaoOrcamentoDTO entrada)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(entrada.ManutenceId);
                
                if (manutence == null)
                    return new ReturnDefault("Orçamento não encontrado.", null);

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.AguardandoPreenchimento)
                    return new ReturnDefault("Diagnóstico ainda não foi concluído.", null);

                manutence.OperadorOrcamentoId = entrada.OperadorId;
                manutence.StatusOrcamento = StatusOrcamentoEnum.PreenchendoOrcamento;

                _manutenceRepository.UpdateManutence(manutence);

                return new ReturnDefault("Criação de orçamento iniciada.", 
                    new { status = "CriandoOrcamento", operadorId = entrada.OperadorId });
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao iniciar criação de orçamento: {ex.Message}", null);
            }
        }

        public async Task<ReturnDefault> ConcluirOrcamento(ConcluirOrcamentoDTO entrada)
        {
            try
            {
                var manutence = await _manutenceRepository.GetById(entrada.ManutenceId);
                
                if (manutence == null)
                    return new ReturnDefault("Orçamento não encontrado.", null);

                if (manutence.StatusOrcamento != StatusOrcamentoEnum.PreenchendoOrcamento)
                    return new ReturnDefault("Orçamento não está sendo criado.", null);

                if (entrada.Servicos == null || !entrada.Servicos.Any())
                    return new ReturnDefault("É necessário adicionar pelo menos um serviço.", null);

                // Adicionar serviços
                foreach (var servico in entrada.Servicos)
                {
                    servico.ManutenceId = entrada.ManutenceId;
                    _manutenceRepository.CreateManutenceServico(servico);
                }

                // Atualizar valores e status
                manutence.ValorTotal = entrada.ValorTotal;
                manutence.DataOrcamentoCriado = DateTime.Now;
                manutence.StatusOrcamento = StatusOrcamentoEnum.AguardandoAprovacao;
                
                if (!string.IsNullOrEmpty(entrada.ObservacoesAdicionais))
                {
                    manutence.Observacoes = string.IsNullOrEmpty(manutence.Observacoes) 
                        ? entrada.ObservacoesAdicionais 
                        : manutence.Observacoes + "\n" + entrada.ObservacoesAdicionais;
                }

                _manutenceRepository.UpdateManutence(manutence);

                return new ReturnDefault("Orçamento concluído com sucesso.", 
                    new { 
                        id = manutence.Id, 
                        status = "OrcamentoConcluido", 
                        valorTotal = entrada.ValorTotal,
                        quantidadeServicos = entrada.Servicos.Count 
                    });
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao concluir orçamento: {ex.Message}", null);
            }
        }

        public async Task<ReturnDefault> GetFotosByOrcamento(int manutenceId)
        {
            try
            {
                var fotos = await _manutenceRepository.GetFotosByManutenceId(manutenceId);
                
                var fotosResponse = fotos.Select(f => new
                {
                    id = f.Id,
                    nomeArquivo = f.NomeArquivo,
                    tipoImagem = f.TipoImagem,
                    descricao = f.Descricao,
                    dataUpload = f.DataUpload,
                    tamanhoBytes = f.ImagemBytes?.Length ?? 0
                }).ToList();

                return new ReturnDefault("Fotos retornadas com sucesso.", fotosResponse);
            }
            catch (Exception ex)
            {
                return new ReturnDefault($"Erro ao buscar fotos: {ex.Message}", null);
            }
        }
    }
}
