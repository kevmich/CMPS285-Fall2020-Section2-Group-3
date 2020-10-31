using Dapper;
using Microsoft.Extensions.Options;
using Models;
using Models.Domain;
using System;
using System.Data.SqlClient;
using System.Linq;

namespace Repository
{
    //Server=SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;
    public interface IOrderRepository
    {
        void AddOrder(Order order);

        decimal GetPrice(int id);

        Order[] GetAllOrders();

        OrderView[] GetOrder(Guid guid);

        public Guid GetUnfinishedGuid();

        void FinishOrder(Guid guid);

        void FinishAllOrders();

        void CompleteOrder(Guid guid);

        OrderViewKitchen[] GetUnfinishedOrders();

        void DeleteOrder(int id);

        void UpdateOrder(Order order);
    }

    public class OrderRepository : IOrderRepository
    {
        private string _connectionString = "";

        public OrderRepository(IOptions<ConnectionStringsOptions> connectionStringsOptions)
        {
            //inject appsettings
            _connectionString = connectionStringsOptions.Value.KitchenVideoSystemDb;
        }

        public void AddOrder(Order order)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "INSERT INTO Orders(OrderNumber, OrderItemId, DateStarted, Size, IsComplete)"
                    + "VALUES (@OrderNumber, @OrderItemId, @DateStarted, @Size, @IsComplete)";
                connection.Execute(sql, order);
            }
        }

        public decimal GetPrice(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { Id = id };
                var sql = "SELECT Price FROM OrderItems WHERE Id = @Id";
                var price = connection.QuerySingle<decimal>(sql, parameter);
                return price;
            }
        }

        public Order[] GetAllOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Orders";
                var orders = connection.Query<Order>(sql).ToArray();
                return orders;
            }
        }

        public OrderView[] GetOrder(Guid guid)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { orderNumber = guid };
                var sql = $"SELECT Orders.Id, OrderItems.Name, Orders.Size, Orders.OrderItemId, Orders.IsDeleted, Orders.DateStarted FROM Orders INNER JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE OrderNumber = @ordernumber ORDER BY IsDeleted, Size, OrderItemId";
                var order = connection.Query<OrderView>(sql, parameter).ToArray();
                return order;
            }
        }

        public Guid GetUnfinishedGuid()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = $"SELECT TOP 1 OrderNumber FROM Orders WHERE IsComplete = 0";
                try
                {
                    var order = connection.QuerySingle<Guid>(sql);
                    return order;
                }
                catch
                {
                    return Guid.Empty;
                }
            }
        }

        public void FinishOrder(Guid guid)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                DateTimeOffset dateOffset1 = new DateTimeOffset();
                dateOffset1 = DateTimeOffset.UtcNow;

                var parameter = new { dateFinished = dateOffset1, orderNumber = guid };
                var sql = $"UPDATE Orders SET DateFinished = @dateFinished WHERE OrderNumber = @orderNumber";
                var order = connection.Execute(sql, parameter);
            }
        }

        public void FinishAllOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                DateTimeOffset dateOffset1 = new DateTimeOffset();
                dateOffset1 = DateTimeOffset.UtcNow;

                var parameter = new { dateFinished = dateOffset1 };
                var sql = $"UPDATE Orders SET DateFinished = @dateFinished WHERE IsComplete = 1";
                var order = connection.Execute(sql, parameter);
            }
        }

        public void CompleteOrder(Guid guid)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { orderNumber = guid };
                var sql = $"UPDATE Orders SET IsComplete = 1 WHERE OrderNumber = @orderNumber";
                connection.Execute(sql, parameter);
            }
        }

        public OrderViewKitchen[] GetUnfinishedOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = $"SELECT OrderItems.Name, Orders.Size, Orders.OrderNumber, Orders.IsComplete, Orders.OrderItemId, Orders.IsDeleted, Orders.DateStarted FROM Orders INNER JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE DateFinished IS NULL ORDER BY IsDeleted, Size, OrderItemId";
                var orders = connection.Query<OrderViewKitchen>(sql).ToArray();
                return orders;
            }
        }

        public void DeleteOrder(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameter = new { Id = id };
                var sql = $"UPDATE Orders SET IsDeleted = CASE IsDeleted WHEN 1 THEN 0 ELSE 1 END WHERE Id = @Id";
                connection.Execute(sql, parameter);
            }
        }

        public void UpdateOrder(Order order)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "UPDATE Orders SET Name = @Name WHERE Id = @Id ";
                connection.Query(sql, order);
            }
        }
    }
}