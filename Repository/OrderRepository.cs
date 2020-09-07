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
            var order1 = new Order { OrderNumber = 1, OrderContents = 2, TimeOrdered = 1599522677};
            
            Order[] retVal = { order1 };
            return retVal;
        }
    } 
}
