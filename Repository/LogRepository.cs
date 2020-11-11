using Dapper;
using Microsoft.Extensions.Options;
using Models;
using Models.Domain;
using System;
using System.Data.SqlClient;
using System.Linq;

namespace Repository
{
    public interface ILogRepository
    {
        public LogOrder[] GetAllLogOrders();
    }
    public class LogRepository : ILogRepository
    {
        private string _connectionString = "";
        public LogRepository(IOptions<ConnectionStringsOptions> connectionStringsOptions)
        {
            //inject appsettings
            _connectionString = connectionStringsOptions.Value.KitchenVideoSystemDb;
        }

        public LogOrder[] GetAllLogOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Orders JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id ORDER BY DateStarted";
                var orders = connection.Query<LogOrder>(sql).ToArray();
                return orders;
            }
        }

    }
}
