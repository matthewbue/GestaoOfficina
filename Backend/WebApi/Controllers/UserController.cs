using GestaoOfficinaProj.Domain.DTO;
using GestaoOfficinaProj.Domain.Model;
using GestaoOfficinaProj.Infra.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestaoOfficinaProj.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("logar")]
        public async Task<IActionResult> logar([FromBody]LoginDTO login)
        {
            var result = await _userService.login(login);
            return Ok(result);
        }
        [HttpPost("UserCreate")]
        public async Task<IActionResult> CriarUsuario([FromBody]User user)
        {
            var result = await _userService.CreateUser(user);
            return Ok(result);
        }
    }
}
