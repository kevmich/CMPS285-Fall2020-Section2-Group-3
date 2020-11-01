using Microsoft.AspNetCore.Mvc;
using Models.Entity;
using Repository;
using TokenBasedAuth.Services;

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

        [HttpGet, Route("GetAllUsers")]
        public string[] GetAllUsers()
        {
            return _userService.GetAllUsers();
        }
    }
}