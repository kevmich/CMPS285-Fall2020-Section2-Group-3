using Dapper;
using Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace Repository
{
    //Server=SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;
    public interface IOrderRepository
    {
        void AddOrder(Order order);

        Order[] GetAllOrders();

        Order GetOrder(int id);

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
                //Date needs to be live
                var sql = "INSERT INTO Orders(Name, DateAdded) VALUES (@Name, '2020 - 10 - 10 00:00:00.000')";
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
        public Order GetOrder(int id)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "SELECT * FROM Orders WHERE Id = " + id;
                var order = connection.QuerySingle<Order>(sql);
                return order;
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

