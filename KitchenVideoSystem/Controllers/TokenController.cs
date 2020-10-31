using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models.Domain;
using Models.Entity;
using Repository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TokenBasedAuth.Models;
using TokenBasedAuth.Services;

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
                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, User.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                string[] PermsArray = _permissionRepository.GetPermissions(User.Username);
                for (int i = 0; i < PermsArray.Length; i++)
                {
                    authClaims.Add(new Claim(PermsArray[i], ""));
                }

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