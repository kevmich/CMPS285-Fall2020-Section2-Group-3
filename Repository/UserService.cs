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
            using (var connection = new SqlConnection(_connectionString))
            {
                user.Password = SHA.ComputeSHA256Hash(user.Password);
                var parameter = new { username = user.Username, password = user.Password };
                var sql = "INSERT INTO Users (username, password) VALUES (@username, @password)";
                connection.Execute(sql, parameter);

                var GetUserId = "SELECT Id FROM Users WHERE Username = @username";
                var UserId = connection.QuerySingle<int>(GetUserId, parameter);
                for (int i = 0; i < user.PermissionsArray.Length; i++)
                {
                    var parameter2 = new { UserId , PermissionId = user.PermissionsArray[i] };
                    var sql2 = "INSERT INTO UsersPermissions (UserId, PermissionId) VALUES (@UserId, @PermissionId)";
                    connection.Execute(sql2, parameter2);
                }
                return 1;
            }
        }

        public void DeleteUser(string username)
        {
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
                var sql = "SELECT Username FROM Users";
                return connection.Query<string>(sql).ToArray();
            }
        }
    }
}