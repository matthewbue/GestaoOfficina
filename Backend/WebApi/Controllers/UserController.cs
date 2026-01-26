using GestaoOfficina.Domain.DTO;
using GestaoOfficina.Infra.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GestaoOfficina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public UserController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        /// <summary>
        /// Realizar login de usuário e obter token JWT
        /// </summary>
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            var result = await _authService.Login(login);
            return StatusCode(result.HttpStatusCode, result);
        }

        /// <summary>
        /// Criar novo usuário com senha padrão 'ferreira123' - Sem necessidade de autenticação
        /// </summary>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] UserCreateDTO user)
        {
            var result = await _userService.Create(user);
            return StatusCode(result.HttpStatusCode, result);
        }

        /// <summary>
        /// Listar todos os usuários
        /// </summary>
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userService.GetAll();
            return StatusCode(result.HttpStatusCode, result);
        }

        /// <summary>
        /// Buscar usuário por ID
        /// </summary>
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var result = await _userService.GetById(id);
            return StatusCode(result.HttpStatusCode, result);
        }

        /// <summary>
        /// Atualizar dados do usuário
        /// </summary>
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] UserUpdateDTO user)
        {
            var result = await _userService.Update(user);
            return StatusCode(result.HttpStatusCode, result);
        }

        /// <summary>
        /// Deletar usuário
        /// </summary>
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var result = await _userService.Delete(id);
            return StatusCode(result.HttpStatusCode, result);
        }
    }
}
