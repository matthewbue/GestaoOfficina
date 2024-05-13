using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Domain.Enums
{
    public enum ProfileEnum
    {
        [Description("Administrador")]
        Administrador,

        [Description("Cliente")]
        Cliente,

        [Description("Funcionario Empresa")]
        Funcionario_Empresa,

        [Description("Administrador Empresa")]
        Administrador_Empresa

    }
}
