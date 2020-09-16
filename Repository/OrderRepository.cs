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
        Order[] GetAllOrders();

        Order GetOrder(int id);

        int PutOrders(String name);

    }
    public class OrderRepository : IOrderRepository
    {
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


        // Pushing data to database
        public int PutOrders(String name)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                //Date needs to be live
                var sql = "INSERT INTO Orders(Name, DateAdded) VALUES ('" + name + "', '2020 - 10 - 10 00:00:00.000')";
                var orders = connection.Execute(sql);
                return orders;
            }

        }

    }

} 

