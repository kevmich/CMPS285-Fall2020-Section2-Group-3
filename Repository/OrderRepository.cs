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

            // This is where you use Dapper
            //int[] TimeOrderedArr = new int[] { 32, 34, 224 };

            //var order1 = new Order { OrderNumber = 1, OrderContents = 2, TimeOrdered = TimeOrderedArr};


            //Order[] retVal = { order1 };
            //return retVal;
        }

        public T GetStuff<T>(T item)
        {
            return item;
        }
    } 
}
