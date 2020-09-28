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
    [Route("api/orders")]
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

        [HttpGet, Route("getorder/{guid}")]
        public OrderView[] GetOrder([FromRoute] Guid guid)
        {
            var exampleOrder = _orderRepository.GetOrder(guid);
            return exampleOrder;
        }

        [HttpPost, Route("finishOrder")]
        public void FinishOrder([FromBody] Guid guid)
        {
                _orderRepository.FinishOrder(guid);
        }

        [HttpGet, Route("finishallorders")]
        public void FinishAllOrders()
        {
            _orderRepository.FinishAllOrders();
        }

        [HttpPost, Route("completeOrder")]
        public void CompleteOrder([FromBody] Guid guid)
        {
            _orderRepository.CompleteOrder(guid);
        }

        [HttpGet, Route("getunfinishedorders")]
        public IEnumerable<Order> GetUnfinishedOrders()
        {
            var exampleOrder = _orderRepository.GetUnfinishedOrders();
            return exampleOrder;
        }

        [HttpPost, Route("sendorder")]
        public void AddOrder([FromBody] Order order)
        {
            if (ModelState.IsValid)
                _orderRepository.AddOrder(order);
        }

        [HttpPut, Route("changeorder/{id}")]
        public void ChangeOrder([FromRoute] int id, [FromBody] Order order)
        {
            order.Id = id;
            if (ModelState.IsValid)
                _orderRepository.UpdateOrder(order);
        }

        [HttpDelete, Route("removeorder/{id}")]
        public void RemoveOrder([FromRoute] int id)
        {
            _orderRepository.DeleteOrder(id);
        }
    }
}
