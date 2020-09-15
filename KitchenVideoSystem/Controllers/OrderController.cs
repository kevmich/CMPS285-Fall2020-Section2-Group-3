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
    //[Route("[controller]")]

    [ApiController]
    public class OrderController : ControllerBase
    {


        private IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet, Route("GetOrders")]

        public IEnumerable<Order> Get()
        {
            var exampleOrder = _orderRepository.GetOrders();

            // This is an example of pushing *something* to the database
            //int exampleOrder2 = _orderRepository.PutOrders();
            
            return exampleOrder;
        }

        // Trying to make a method to push data to the database
        [HttpPost, Route("SendOrder/{name}")]
        public int Put([FromBody] String name)
        {
            int exampleOrder = _orderRepository.PutOrders(name);
            return exampleOrder;
            
        }
    }
}
