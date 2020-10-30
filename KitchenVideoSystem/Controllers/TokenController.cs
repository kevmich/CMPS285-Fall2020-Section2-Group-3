using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Models;
using Repository;
using TokenBasedAuth.Models;
using Models.Entity;
using TokenBasedAuth.Services;
using System.Linq;

namespace TokenBasedAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly AuthOptions _authOptions;
        private IPermissionRepository _permissionRepository;
        public TokenController(IUserService service, IOptions<AuthOptions> authOptionsAccessor, IPermissionRepository permissionRepository)
        {
            _service = service;
            _authOptions = authOptionsAccessor.Value;
            _permissionRepository = permissionRepository;
        }

        [HttpPost]
        public IActionResult Get([FromBody] UserModel User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (_service.IsValidUser(User))
            {

                // Really trash solution, need to add db stuff
                string perms = "";
                if (_permissionRepository.CanViewCashier(User))
                {
                    perms = "CanViewCashier";
                }

                var authClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, User.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                       
                    new Claim(perms, "")

                };
                
                var token = new JwtSecurityToken(
                    issuer: _authOptions.Issuer,
                    audience: _authOptions.Audience,
                    expires: DateTime.Now.AddHours(_authOptions.ExpiresInMinutes),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authOptions.SecureKey)),
                        SecurityAlgorithms.HmacSha256Signature)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }
    }
}