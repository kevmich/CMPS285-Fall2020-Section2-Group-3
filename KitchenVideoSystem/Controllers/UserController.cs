using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Domain;
using Models.Entity;
using Repository;
using TokenBasedAuth.Services;

namespace KitchenVideoSystem.Controllers
{
    [Authorize(Policy = "Admin")]
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
        public int AddUser([FromBody] Adduser user)
        {
            return _userService.AddUser(user);
        }

        [HttpGet, Route("DeleteUser/{username}")]
        public void DeleteUser([FromRoute] string username)
        {
            _userService.DeleteUser(username);
        }

        [HttpGet, Route("GetAllUsers")]
        public UserInfo[] GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [HttpGet, Route("GetUserInfo/{username}"), AllowAnonymous]
        public EditUser GetUserInfo([FromRoute] string username)
        {
            return _userService.GetUserInfo(username);
        }

        [HttpPost, Route("EditUser")]
        public int EditUser([FromBody] EditUser user)
        {
            return _userService.EditUser(user);
        }

    }
}