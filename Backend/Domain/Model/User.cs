using GestaoOfficina.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoOfficina.Domain.Model
{
    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        
        [Required]
        public ProfileEnum Profile { get; set; }
        
        [Required]
        [StringLength(14)]
        public string CPF { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Email { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Password { get; set; }
        
        public byte[]? ProfilePhoto { get; set; }
    }
}
