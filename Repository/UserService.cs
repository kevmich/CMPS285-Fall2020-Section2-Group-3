using Dapper;
using EasyEncryption;
using Microsoft.Extensions.Options;
using Models.Domain;
using Models.Entity;
using System;
using System.Data.SqlClient;

namespace TokenBasedAuth.Services
{
    public interface IUserService
    {
        public int AddUser(UserModel user);

        public bool IsValidUser(UserModel user);

        public void DeleteUser(string username);
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

        public int AddUser(UserModel user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                user.Password = SHA.ComputeSHA256Hash(user.Password);
                var parameter = new { username = user.Username, password = user.Password };
                var sql = "INSERT INTO Users (username, password) VALUES (@username, @password)";
                var sql2 = connection.Execute(sql, parameter);
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
    }
}