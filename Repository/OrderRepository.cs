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
        Order[] GetOrders();
        int PutOrders(String name);

    }
    public class OrderRepository : IOrderRepository
    {
        public Order[] GetOrders()
        {
            var connectionString = @"Server=DESKTOP-V733GDC\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";
            
            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "SELECT * FROM Orders";
                var orders = connection.Query<Order>(sql).ToArray();
                return orders;
            }

        }


        // Pushing data to database
        public int PutOrders(String name)
        {
            var connectionString = @"Server=DESKTOP-V733GDC\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                // Data is hard coded, not sure what to return, I was just trying to get this code running.
                var sql = "INSERT INTO Orders(Name, DateAdded) VALUES ('" + name + "', '2020 - 10 - 10 00:00:00.000')";
                var orders = connection.Execute(sql);
                return orders;
            }

        }

    }

} 

