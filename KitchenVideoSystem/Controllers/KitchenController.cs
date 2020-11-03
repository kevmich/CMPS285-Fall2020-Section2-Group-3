using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using System;
using System.Collections.Generic;

namespace KitchenVideoSystem.Controllers
{
    [Authorize(Policy = "Cook")]
    [Route("api/kitchen")]
    [ApiController]
    public class KitchenController : ControllerBase
    {
        private IOrderRepository _orderRepository;

        public KitchenController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet, Route("getunfinishedorders")]
        public IEnumerable<OrderViewKitchen> GetUnfinishedOrders()
        {
            var exampleOrder = _orderRepository.GetUnfinishedOrders();
            return exampleOrder;
        }

        [HttpPost, Route("finishOrder")]
        public void FinishOrder([FromBody] Guid guid)
        {
            _orderRepository.FinishOrder(guid);
        }

        [HttpGet, Route("getorder/{guid}")]
        public OrderView[] GetOrder([FromRoute] Guid guid)
        {
            var exampleOrder = _orderRepository.GetOrder(guid);
            return exampleOrder;
        }
    }
}