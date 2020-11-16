using Dapper;
using EasyEncryption;
using Microsoft.Extensions.Options;
using Models.Domain;
using Models.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace TokenBasedAuth.Services
{
    public interface IUserService
    {
        public int AddUser(Adduser user);

        public bool IsValidUser(UserModel user);

        public void DeleteUser(string username);

        public UserInfo[] GetAllUsers();

        public int EditUser(EditUser user);

        public EditUser GetUserInfo(string username);
    }

    public class UserRepository : IUserService
    {
        private string _connectionString = "";
        private const string _adminUsername = "admin";

        public UserRepository(IOptions<ConnectionStringsOptions> connectionStringsOptions)
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
            if (user.Username == _adminUsername)
                return -3;

            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    user.Password = SHA.ComputeSHA256Hash(user.Password);
                    var parameter = new { username = user.Username, password = user.Password, firstname = user.FirstName, lastname = user.LastName };
                    var sql = "INSERT INTO Users (username, password, firstname, lastname) VALUES (@username, @password, @firstname, @lastname)";
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
            if (username == _adminUsername)
                return;
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { username };
                var sql = "DELETE FROM Users WHERE Username = @username";
                connection.Execute(sql, parameter);
            }
        }

        public UserInfo[] GetAllUsers()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Users WHERE NOT Username = 'admin' ORDER BY Username";
                return connection.Query<UserInfo>(sql).ToArray();
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
                try
                {
                    var parameter = new { username };

                    var returnUser = new EditUser();
                    // Combine this
                    var GetUsername = "SELECT Username FROM Users WHERE Username = @username";
                    returnUser.Username = connection.QuerySingle<string>(GetUsername, parameter);
                    var GetUserId = "SELECT Id FROM Users WHERE Username = @username";
                    returnUser.Id = connection.QuerySingle<int>(GetUserId, parameter);
                    var sql = "SELECT FirstName FROM Users WHERE Username = @username";
                    returnUser.FirstName = connection.QuerySingle<string>(sql, parameter);
                    sql = "SELECT LastName FROM Users WHERE Username = @username";
                    returnUser.LastName = connection.QuerySingle<string>(sql, parameter);
                    var parameterId = new { UserId = returnUser.Id };

                    sql = "  SELECT p.PermissionId  FROM UsersPermissions up  JOIN[Permissions] p on up.PermissionId = p.Id  WHERE up.UserId = @UserId";
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
                catch
                {
                    return new EditUser(); ;
                }
            }
        }

        public int EditUser(EditUser user)
        {
            if (user.Username == "")
                return -2;
            if (user.Username == _adminUsername || user.NewUsername == _adminUsername)
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
                try
                {
                    var updateNamesParam = new { username = user.Username, firstname = user.FirstName, lastname = user.LastName };
                    if (user.FirstName != null)
                    {
                        var updateFirstname = "UPDATE Users SET FirstName = @firstname WHERE Username = @Username";
                        connection.Execute(updateFirstname, updateNamesParam);
                    }
                    if (user.LastName != null)
                    {
                        var updateLastname = "UPDATE Users SET LastName = @lastname WHERE Username = @Username";
                        connection.Execute(updateLastname, updateNamesParam);
                    }
                    if (user.NewUsername != null) //Change username
                    {
                        var updateUsernameParam = new { username = user.Username, NewUsername = user.NewUsername };
                        var updateUsername = "UPDATE Users SET Username = @NewUsername WHERE Username = @Username";
                        connection.Execute(updateUsername, updateUsernameParam);
                    }
                    
                    
                    return 1;
                }
                catch
                {
                    return -1;
                }
                
            }
        }
    }
}