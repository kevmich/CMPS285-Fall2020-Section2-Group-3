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

        [HttpGet, Route("api/GetOrders")]

        public IEnumerable<Order> GetAllOrders()
        {
            var exampleOrder = _orderRepository.GetAllOrders();          
            return exampleOrder;
        }

        [HttpGet, Route("api/getorder/{id}")]

        public Order GetOrder(int id)
        {
            var exampleOrder = _orderRepository.GetOrder(id);

            return exampleOrder;
        }

        // Trying to make a method to push data to the database
        [HttpGet, Route("api/SendOrder/{name}")]
        public int PutOrder([FromRoute] String name)
        {
            int exampleOrder = _orderRepository.PutOrders(name);
            return exampleOrder;
            
        }
    }
}
