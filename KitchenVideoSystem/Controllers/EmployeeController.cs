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
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet, Route("getallemployees")]
        public Employee[] GetAllEmployees()
        {
            var employees = _employeeRepository.GetAllEmployees();
            return employees;
        }

        [HttpGet, Route("getemployee/id")]
        public Employee GetEmployee([FromRoute] String id)
        {
            var employee = _employeeRepository.GetEmployee(id);
            return employee;
        }

        [HttpPost, Route("addemployee")]
        public void AddEmployee(Employee employee)
        {
            _employeeRepository.AddEmployee(employee);
        }

        [HttpDelete, Route("removeemployee/id")]
        public void RemoveEmployee([FromRoute] String id)
        {
            _employeeRepository.RemoveEmployee(id);
        }
    }
}
