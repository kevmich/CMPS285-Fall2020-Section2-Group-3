using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Domain;
using Repository;
using System;
using System.Collections.Generic;

namespace KitchenVideoSystem.Controllers
{
    //[Authorize(Policy = "Cashier")]
    [Route("api/log")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private ILogRepository _logRepository;

        public LogController(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        [HttpGet, Route("getalllog")]
        public LogOrder[] GetAllLogOrders()
        {
            return _logRepository.GetAllLogOrders();
        }


    }
}