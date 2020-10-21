using System;
using System.Collections.Generic;
using System.Text;
using Models;
using Models.Domain;
using Models.Entity;
using Dapper;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using EasyEncryption;


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
        using (var connection = new SqlConnection(_connectionString))
        {
            //var parameter = new { Username = user.Username};
            var sql = "SELECT Users.Password FROM Users WHERE Username = '" + user.Username + "'";
            var comparePass = connection.QuerySingle<String>(sql);
            if (comparePass == SHA.ComputeSHA256Hash(user.Password))
                return true;
            else
                return false;

        }
    }
    }
}