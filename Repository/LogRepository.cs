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

        public LogOrder[] GetDayLog(string date, int offset);
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

        public LogOrder[] GetDayLog(string date, int offset)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var param = new { date, offset};
                var sql = "SELECT * FROM Orders JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE DateStarted > DateAdd(HOUR, @offset, @date) AND DateStarted <= DateAdd(DAY, 1, DateAdd(HOUR, @offset, @date)) AND (Orders.IsDeleted IS NULL OR Orders.IsDeleted = 0) ORDER BY DateStarted";
                var orders = connection.Query<LogOrder>(sql, param).ToArray();
                return orders;
            }
        }


    }
}
