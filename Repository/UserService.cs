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
        bool IsValidUser(UserModel user);
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
                    var parameter = new { Username = user.Username};
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
    }
}