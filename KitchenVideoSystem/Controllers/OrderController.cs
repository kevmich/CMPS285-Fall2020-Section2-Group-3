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
    [Route("api")]
    [ApiController]
    public class OrderController : ControllerBase
    {


        private IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet, Route("GetAllOrders")]

        public IEnumerable<Order> GetAllOrders()
        {
            var exampleOrder = _orderRepository.GetAllOrders();
            return exampleOrder;
        }

        [HttpGet, Route("getorder/{id}")]

        public Order GetOrder([FromRoute] int id)
        {
            var exampleOrder = _orderRepository.GetOrder(id);

            return exampleOrder;
        }

        [HttpPost, Route("sendorder")]
        public void AddOrder([FromBody] Order order)
        {
            if (ModelState.IsValid)
                _orderRepository.AddOrder(order);
        }

        [HttpPut, Route("changeorder/{id}")]
        public void ChangeOrder(int id, [FromBody] Order order)
        {
            order.Id = id;
            if (ModelState.IsValid)
                _orderRepository.UpdateOrder(order);
        }

        [HttpDelete, Route("removeorder/{id}")]
        public void RemoveOrder(int id)
        {
            _orderRepository.DeleteOrder(id);
        }

    }
}
