using Microsoft.Extensions.Options;
using Models.Domain;
using Models.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper;
using System.Linq;
using System.Security;

namespace Repository
{

    public interface IPermissionRepository
    {
        PermissionView[] GetPermissions(UserModel user);
    }
    public class PermissionRepository : IPermissionRepository
    {
        private string _connectionString = "";

        public PermissionRepository(IOptions<ConnectionStringsOptions> connectionStringsOptions)
        {
            //inject appsettings
            _connectionString = connectionStringsOptions.Value.KitchenVideoSystemDb;
        }

        public PermissionView[] GetPermissions(UserModel user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { username = user.Username};
                //var sql = "SELECT Permissions.CanViewCashier FROM Permissions INNER JOIN Permissions.UserId ON Users.Id WHERE Users.Username = user1";
                var sql = "SELECT p.PermissionId, p.Name FROM Users u JOIN UsersPermissions up " +
                    "on u.Id = up.UserId JOIN[Permissions] p on p.Id = up.PermissionId where u.Username = @username";
                var req =  connection.Query<PermissionView>(sql, parameter).ToArray();
                return req;
            }

        }

    }
}
