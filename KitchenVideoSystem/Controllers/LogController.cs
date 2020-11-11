using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Domain;
using Repository;
using System;
using System.Collections.Generic;

namespace KitchenVideoSystem.Controllers
{
    //[Authorize(Policy = "CanViewLog")]
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
        [HttpPost, Route("GetDayLog/{date}")]
        public LogOrder[] GetDayLog([FromRoute] string date, [FromBody] int offset)
        {
            return _logRepository.GetDayLog(date, offset);
        }



    }
}