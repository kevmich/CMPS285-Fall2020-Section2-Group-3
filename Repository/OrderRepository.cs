using Dapper;
using Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Repository
{
    //Server=SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;
    public interface IOrderRepository
    {
        void AddOrder(Order order);

        Order[] GetAllOrders();

        OrderView[] GetOrder(Guid guid);

        void FinishOrder(Guid guid);

        void FinishAllOrders();

        void CompleteOrder(Guid guid);

        OrderViewKitchen[] GetUnfinishedOrders();

        void DeleteOrder(int id);

        void UpdateOrder(Order order);

    }
    public class OrderRepository : IOrderRepository
    {
        public void AddOrder(Order order)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";
            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "INSERT INTO Orders(OrderNumber, OrderItemId, DateStarted, Size, IsComplete)" 
                    + "VALUES (@OrderNumber, @OrderItemId, @DateStarted, @Size, @IsComplete)";
                connection.Execute(sql, order);
            }

        }

        public Order[] GetAllOrders()
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";
            
            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "SELECT * FROM Orders";
                var orders = connection.Query<Order>(sql).ToArray();
                return orders;
            }

        }
        public OrderView[] GetOrder(Guid guid)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = $"SELECT OrderItems.Name, Orders.Size, Orders.OrderItemId FROM Orders INNER JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE OrderNumber = '{guid}' ORDER BY DateStarted";
                var order = connection.Query<OrderView>(sql).ToArray();
                return order;
            }

        }

        public void FinishOrder(Guid guid)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";
            using (var connection = new SqlConnection(connectionString))
            {
                DateTimeOffset dateOffset1 = new DateTimeOffset();
                dateOffset1 = DateTimeOffset.UtcNow;
                var sql = $"UPDATE Orders SET DateFinished = '{dateOffset1}' WHERE OrderNumber = '{guid}'";
                var order = connection.Execute(sql);
            }
        }
        public void FinishAllOrders()
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";
            using (var connection = new SqlConnection(connectionString))
            {
                DateTimeOffset dateOffset1 = new DateTimeOffset();
                dateOffset1 = DateTimeOffset.UtcNow;
                var sql = $"UPDATE Orders SET DateFinished = '{dateOffset1}' WHERE IsComplete = 1";
                var order = connection.Execute(sql);
            }
        }

        public void CompleteOrder(Guid guid)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";
            using (var connection = new SqlConnection(connectionString))
            {
                var sql = $"UPDATE Orders SET IsComplete = 1 WHERE OrderNumber = '{guid}'";
                connection.Execute(sql);
            }
        }

        public OrderViewKitchen[] GetUnfinishedOrders()
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = $"SELECT OrderItems.Name, Orders.Size, Orders.OrderNumber, Orders.IsComplete FROM Orders INNER JOIN OrderItems ON Orders.OrderItemId = OrderItems.Id WHERE DateFinished IS NULL ORDER BY DateStarted";
                var orders = connection.Query<OrderViewKitchen>(sql).ToArray();
                return orders;
            }
        }

        public void DeleteOrder(int id)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "DELETE FROM Orders WHERE Id = " + id;
                connection.Execute(sql);
            }
        }

        public void UpdateOrder(Order order)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "UPDATE Orders SET Name = @Name WHERE Id = @Id";
                connection.Query(sql, order);
            }
        }

    }

} 

