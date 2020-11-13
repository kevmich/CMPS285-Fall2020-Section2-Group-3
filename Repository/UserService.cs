using Dapper;
using EasyEncryption;
using Microsoft.Extensions.Options;
using Models.Domain;
using Models.Entity;
using System;
using System.Data.SqlClient;
using System.Linq;

namespace TokenBasedAuth.Services
{
    public interface IUserService
    {
        public int AddUser(Adduser user);

        public bool IsValidUser(UserModel user);

        public void DeleteUser(string username);

        public string[] GetAllUsers();

        public int EditUser(EditUser user);

        public EditUser GetUserInfo(string username);
    }

    public class UserService : IUserService
    {
        private string _connectionString = "";

        public UserService(IOptions<ConnectionStringsOptions> connectionStringsOptions)
        {
            //inject appsettings
            _connectionString = connectionStringsOptions.Value.KitchenVideoSystemDb;
        }

        public bool IsValidUser(UserModel user)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    var parameter = new { Username = user.Username };
                    var sql = "SELECT Users.Password FROM Users WHERE Username = @Username";
                    var comparePass = connection.QuerySingle<String>(sql, parameter);
                    if (comparePass == SHA.ComputeSHA256Hash(user.Password))
                        return true;
                    else
                        return false;
                }
            }
            catch
            {
                return false;
            }
        }

        public int AddUser(Adduser user)
        {
            if (user.Username == "")
                return -2;
            if (user.Username == "admin")
                return -3;

            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    user.Password = SHA.ComputeSHA256Hash(user.Password);
                    var parameter = new { username = user.Username, password = user.Password };
                    var sql = "INSERT INTO Users (username, password) VALUES (@username, @password)";
                    connection.Execute(sql, parameter);

                    // If this fails then the user will still be added with no permissions
                    var GetUserId = "SELECT Id FROM Users WHERE Username = @username";
                    var UserId = connection.QuerySingle<int>(GetUserId, parameter);

                    for (int i = 0; i < user.PermissionsArray.Length; i++)
                    {
                        var parameterPermId = new { PermissionId = user.PermissionsArray[i] };
                        var GetPermissionId = "SELECT Id FROM Permissions WHERE PermissionId = @PermissionId";
                        var PermId = connection.QuerySingle<int>(GetPermissionId, parameterPermId);

                        var parameter2 = new { UserId, PermissionId = PermId };
                        var sql2 = "INSERT INTO UsersPermissions (UserId, PermissionId) VALUES (@UserId, @PermissionId)";
                        connection.Execute(sql2, parameter2);
                    }
                    return 1;
                }
                catch
                {
                    return -1;
                }
            }
        }

        public void DeleteUser(string username)
        {
            if (username == "")
                return;
            if (username == "admin")
                return;
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { username };
                var sql = "DELETE FROM Users WHERE Username = @username";
                connection.Execute(sql, parameter);
            }
        }

        public string[] GetAllUsers()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT Username FROM Users WHERE NOT Username = 'admin'";
                return connection.Query<string>(sql).ToArray();
            }
        }

        public class UserPermissionDto
        {
            public int PermissionId { get; set; }
            public bool IsChecked { get; set; }
        }

        public EditUser GetUserInfo(string username)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var returnUser = new EditUser();
                returnUser.Username = username;
                var parameter = new { username };
                var GetUserId = "SELECT Id FROM Users WHERE Username = @username";
                returnUser.Id = connection.QuerySingle<int>(GetUserId, parameter);
                var parameterId = new { UserId = returnUser.Id };

                var sql = "  SELECT p.PermissionId  FROM UsersPermissions up  JOIN[Permissions] p on up.PermissionId = p.Id  WHERE up.UserId = @UserId";
                returnUser.PermissionsArray = connection.Query<int>(sql, parameterId).ToArray();
                //......
                //var permissionIds = connection.Query<int>(sql, parameterId).ToArray();

                //var dtos = new List<UserPermissionDto>
                //{
                //    new UserPermissionDto { PermissionId = (int)PermissionEnum.Admin, IsChecked = permissionIds.Contains((int)PermissionEnum.Admin) },
                //    new UserPermissionDto { PermissionId = (int)PermissionEnum.CanViewCashier, IsChecked = permissionIds.Contains((int)PermissionEnum.CanViewCashier) },
                //    new UserPermissionDto { PermissionId = (int)PermissionEnum.CanViewKitchen, IsChecked = permissionIds.Contains((int)PermissionEnum.CanViewKitchen) }
                //};
                //.......

                return returnUser;
            }
        }

        public int EditUser(EditUser user)
        {
            if (user.Username == "")
                return -2;
            if (user.Username == "admin" || user.NewUsername == "admin")
                return -3;
            using (var connection = new SqlConnection(_connectionString))
            {
                // Delete all user perms first
                var parameter = new { UserId = user.Id };
                var sql = "DELETE FROM UsersPermissions WHERE UserId = @UserId";
                connection.Execute(sql, parameter);

                for (int i = 0; i < user.PermissionsArray.Length; i++)
                {
                    var parameterPermId = new { PermissionId = user.PermissionsArray[i] };
                    var GetPermissionId = "SELECT Id FROM Permissions WHERE PermissionId = @PermissionId";
                    var PermId = connection.QuerySingle<int>(GetPermissionId, parameterPermId);

                    var parameter2 = new { UserId = user.Id, PermissionId = PermId };
                    var sql2 = "INSERT INTO UsersPermissions (UserId, PermissionId) VALUES (@UserId, @PermissionId)";
                    connection.Execute(sql2, parameter2);
                }

                if (user.Password != null) //Change password
                {
                    user.Password = SHA.ComputeSHA256Hash(user.Password);
                    var parameter3 = new { username = user.Username, password = user.Password };
                    var sql3 = "UPDATE Users SET Password = @password WHERE Username = @username";
                    connection.Execute(sql3, parameter3);
                }

                if (user.NewUsername != null) //Change username
                {
                    var updateUsernameParam = new { username = user.Username, NewUsername = user.NewUsername };
                    var updateUsername = "UPDATE Users SET Username = @NewUsername WHERE Username = @Username";
                    connection.Execute(updateUsername, updateUsernameParam);
                }

                return 1;
            }
        }
    }
}