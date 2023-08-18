using GestaoOfficina.Domain.Model;
using GestaoOfficina.Infra.Interface;
using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
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
            objetoPai.ClientId = entrada.Clientid;
            objetoPai.Observacoes = entrada.Observacoes;
            objetoPai.TipoDoc = entrada.TipoDoc;
            objetoPai.DataOS = DateTime.Now;
            objetoPai.Status = "Em Andamento";
            objetoPai.ManutecesServicos = entrada.manutences;
            objetoPai.ValorTotal = entrada.ValorTotal;
            
            _manutenceRepository.Create(objetoPai);

            var result = _clientRepository.GetClientById(objetoPai.ClientId);
            var resultManutenceid = _manutenceRepository.GetManutenceIdByDate(objetoPai.DataOS);
            #endregion
            
            #region corpo email
            // Informações da oficina
            string nomeOficina = "Oficina ABC";
            string enderecoOficina = "Rua Principal, 123";
            string cidadeOficina = "Cidade da Oficina";
            string telefoneOficina = "(123) 456-7890";

            // Informações do cliente
            string nomeCliente = result.Result.Nome;
            string enderecoCliente = result.Result.Endereco;
            string cidadeCliente = result.Result.Cidade;
            string telefoneCliente = result.Result.NumeroContato;

            // Itens de serviço
            List<string> servicos = new List<string>();
            foreach (var item in entrada.manutences)
            {
                servicos.Add(item.Nome);
                
            }
            

            // Montar a nota de serviço em uma string
            string notaDeServico = $"======== NOTA DE SERVIÇO ========{Environment.NewLine}" +
                                   $"Oficina: {nomeOficina}{Environment.NewLine}" +
                                   $"Endereço: {enderecoOficina}, {cidadeOficina}{Environment.NewLine}" +
                                   $"Telefone: {telefoneOficina}{Environment.NewLine}" +
                                   $"--------------------------------{Environment.NewLine}" +
                                   $"Cliente: {nomeCliente}{Environment.NewLine}" +
                                   $"Endereço: {enderecoCliente}, {cidadeCliente}{Environment.NewLine}" +
                                   $"Telefone: {telefoneCliente}{Environment.NewLine}" +
                                   $"--------------------------------{Environment.NewLine}" +
                                   $"Serviços realizados:{Environment.NewLine}";

            foreach (string servico in servicos)
            {
                notaDeServico += $"- {servico}{Environment.NewLine}";
            }

            notaDeServico += $"--------------------------------{Environment.NewLine}" +
                             $"Total a pagar: R$ " + objetoPai.ValorTotal + "{Environment.NewLine}" +
                             $"================================";
            #endregion

            #region envio email

            string remetenteEmail = "bueno.mb55@hotmail.com";
            string senhaRemetente = "Aabbcc12!";
            string destinatarioEmail = result.Result.Email;
            string assunto ="Ordem de Serviço : "+ objetoPai.DataOS+ "- nome :"  + result.Result.Nome  ;
            string corpo = notaDeServico;

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Oficina ferreira", remetenteEmail));
            message.To.Add(new MailboxAddress("Destinatário", destinatarioEmail.ToString()));
            message.Subject = assunto;
            message.Body = new TextPart("plain")
            {
                Text = corpo
            };

            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true; // Ignorar validação do certificado
                await client.ConnectAsync("smtp-mail.outlook.com", 587, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(remetenteEmail, senhaRemetente);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }

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
    }
}
