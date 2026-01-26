using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Enums
{
    public enum ProfileEnum
    {
        [Description("Administrador")]
        Admin = 1,

        [Description("Operador")]
        Operador = 2,

        [Description("Técnico")]
        Tecnico = 3
    }
}
