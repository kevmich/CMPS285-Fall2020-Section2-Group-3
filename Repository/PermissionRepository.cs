using Dapper;
using Microsoft.Extensions.Options;
using Models.Domain;
using System.Data.SqlClient;
using System.Linq;

namespace Repository
{
    public interface IPermissionRepository
    {
        public string[] GetPermissions(string username);
    }

    public class PermissionRepository : IPermissionRepository
    {
        private string _connectionString = "";

        public PermissionRepository(IOptions<ConnectionStringsOptions> connectionStringsOptions)
        {
            //inject appsettings
            _connectionString = connectionStringsOptions.Value.KitchenVideoSystemDb;
        }

        public string[] GetPermissions(string username)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { username };
                var sql = "SELECT p.Name FROM Users u JOIN UsersPermissions up " +
                    "on u.Id = up.UserId JOIN[Permissions] p on p.Id = up.PermissionId where u.Username = @username";
                var req = connection.Query<string>(sql, parameter).ToArray();
                return req;
            }
        }
    }
}