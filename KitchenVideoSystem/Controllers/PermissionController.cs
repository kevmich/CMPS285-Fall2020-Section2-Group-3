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
using Microsoft.AspNetCore.Authorization;

namespace KitchenVideoSystem.Controllers
{
    [Route("api/permissions")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private IPermissionRepository _permissionRepository;
        public PermissionController(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        [HttpGet, Route("GetUserPermissions/{username}")]
        public string[] GetUserPermissions([FromRoute] string Username)
        {
            return _permissionRepository.GetPermissions(Username);
        }
    }
}
