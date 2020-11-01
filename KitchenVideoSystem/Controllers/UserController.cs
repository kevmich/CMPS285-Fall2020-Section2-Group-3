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
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IPermissionRepository _permissionRepository;
        private IUserService _userService;
        public UserController(IPermissionRepository permissionRepository, IUserService userService)
        {
            _permissionRepository = permissionRepository;
            _userService = userService;
        }

        [HttpGet, Route("GetPermissions/{username}")]
        public string[] GetUserPermissions([FromRoute] string Username)
        {
            return _permissionRepository.GetPermissions(Username);
        }

        [HttpPost, Route("AddUser")]
        public int AddUser([FromBody] UserModel user)
        {
            return _userService.AddUser(user);
        }

        [HttpGet, Route("DeleteUser/{username}")]
        public void DeleteUser([FromRoute] string username)
        {
            _userService.DeleteUser(username);
        }
    }
}
