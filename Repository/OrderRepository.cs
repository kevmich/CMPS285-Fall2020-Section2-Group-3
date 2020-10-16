using Dapper;
using Microsoft.Extensions.Options;
using Models;
using Models.Domain;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;

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
                var sql = "SELECT Price FROM OrderItems WHERE Id = " + id;
                var price = connection.QuerySingle<decimal>(sql);
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
                var sql = $"SELECT Orders.Id, OrderItems.Name, Orders.Size, Orders.OrderItemId FROM Orders INNER JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE OrderNumber = '{guid}' ORDER BY DateStarted";
                var order = connection.Query<OrderView>(sql).ToArray();
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
                var sql = $"UPDATE Orders SET DateFinished = '{dateOffset1}' WHERE OrderNumber = '{guid}'";
                var order = connection.Execute(sql);
            }
        }
        public void FinishAllOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                DateTimeOffset dateOffset1 = new DateTimeOffset();
                dateOffset1 = DateTimeOffset.UtcNow;
                var sql = $"UPDATE Orders SET DateFinished = '{dateOffset1}' WHERE IsComplete = 1";
                var order = connection.Execute(sql);
            }
        }

        public void CompleteOrder(Guid guid)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = $"UPDATE Orders SET IsComplete = 1 WHERE OrderNumber = '{guid}'";
                connection.Execute(sql);
            }
        }

        public OrderViewKitchen[] GetUnfinishedOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = $"SELECT OrderItems.Name, Orders.Size, Orders.OrderNumber, Orders.IsComplete, Orders.OrderItemId FROM Orders INNER JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE DateFinished IS NULL ORDER BY DateStarted";
                var orders = connection.Query<OrderViewKitchen>(sql).ToArray();
                return orders;
            }
        }

        public void DeleteOrder(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = $"UPDATE Orders SET IsDeleted = 1 WHERE Id = {id}";
                connection.Execute(sql);
            }
        }

        public void UpdateOrder(Order order)
        {

            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "UPDATE Orders SET Name = @Name WHERE Id = @Id";
                connection.Query(sql, order);
            }
        }

    }

} 

