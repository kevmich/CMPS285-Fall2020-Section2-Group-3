using Dapper;
using Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Repository
{
    public interface IEmployeeRepository
    {
        void AddEmployee(Employee employee);
        Employee[] GetAllEmployees();
        Employee GetEmployee(string id);
        void RemoveEmployee(string id);
        void UpdateInfo(string id);
    }

    class EmployeeRepository
    {
        public void AddEmployee(Employee employee)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "INSERT INTO Employees(EmployeeId, FirstName, LastName, Password, Role)"
                    + "VALUES (@EmployeeId, @FirstName, @LastName, @Password, @Role)";
                connection.Execute(sql, employee);
            }
        }

        public Employee[] GetAllEmployees()
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "SELECT * FROM Employees";
                var employees = connection.Query<Employee>(sql).ToArray();
                return employees;
            }
        }

        public Employee GetEmployee(string id)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "SELECT EmployeeId FROM Employees WHERE EmployeeId = " + id;
                var employee = connection.QuerySingle<Employee>(sql);
                return employee;
            }
        }

        public void RemoveEmployee(string id)
        {
            var connectionString = @"Server=.\SQLEXPRESS;Database=KitchenVideoSystemDb;Integrated Security=true;";

            using (var connection = new SqlConnection(connectionString))
            {
                var sql = "DELETE FROM Employees WHERE Id = " + id;
                connection.Execute(sql);
            }
        }
    }
}
