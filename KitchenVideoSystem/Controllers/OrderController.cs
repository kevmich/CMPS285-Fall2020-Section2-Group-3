using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using KitchenVideoSystem.ClientApp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;


namespace KitchenVideoSystem.Controllers
{
    [Route("[controller]")]

    [ApiController]
    public class OrderController : ControllerBase
    {


        private IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]

        public IEnumerable<Order> Get()
        {
            var exampleOrder = _orderRepository.GetOrders();         
            return exampleOrder;
        }

        //[HttpGet]

        //public int Put(String name)
        //{
        //    name = "help";
        //    var exampleOrder = _orderRepository.PutOrders(name);
        //    return exampleOrder;
            
        //}
    }
}
