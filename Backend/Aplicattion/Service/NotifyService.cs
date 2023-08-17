using GestaoOfficina.Domain.Model;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Net;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;


namespace GestaoOfficinaProj.Aplicattion.Service
{
    public static class NotifyService
    {
        public async static Task<ReturnDefault> GetNotify (int number)
        {
            string remetenteEmail = "bueno.mb55@hotmail.com";
            string senhaRemetente = "Aabbcc12!";
            string destinatarioEmail = "abreunegocio2@gmail.com";
            string assunto = "Assunto do Email";
            string corpo = "Este é um email teste da Officina.";

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Remetente", remetenteEmail));
            message.To.Add(new MailboxAddress("Destinatário", destinatarioEmail));
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

            Console.WriteLine("Email enviado com sucesso.");
            return new ReturnDefault("S", message);
            }
       
        }
    }

