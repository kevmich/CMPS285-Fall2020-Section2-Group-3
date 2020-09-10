using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public interface IOrderRepository
    {
        Order[] GetOrders();
    }
    public class OrderRepository : IOrderRepository
    {
        public Order[] GetOrders()
        {
            // This is where you use Dapper
            int[] TimeOrderedArr = new int[] { 32, 34, 224 };

            var order1 = new Order { OrderNumber = 1, OrderContents = 2, TimeOrdered = TimeOrderedArr};


            Order[] retVal = { order1 };
            return retVal;
        }

        public T GetStuff<T>(T item)
        {
            return item;
        }
    } 
}
