using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using System;
using System.Collections.Generic;

namespace KitchenVideoSystem.Controllers
{
    [Authorize(Policy = "Cashier")]
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet, Route("getprice/{id}")]
        public decimal GetPrice([FromRoute] int id)
        {
            return _orderRepository.GetPrice(id);
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

        [HttpGet, Route("GetUnfinishedGuid")]
        public Guid GetUnfinishedGuid()
        {
            var exampleOrder = _orderRepository.GetUnfinishedGuid();
            return exampleOrder;
        }

        [HttpPost, Route("completeOrder")]
        public void CompleteOrder([FromBody] Guid guid)
        {
            _orderRepository.CompleteOrder(guid);
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

        [HttpGet, Route("deleteorder/{id}")]
        public void DeleteOrder([FromRoute] int id)
        {
            _orderRepository.DeleteOrder(id);
        }
    }
}