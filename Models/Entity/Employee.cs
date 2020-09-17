using System;
using System.Collections.Generic;

namespace Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Passwprd { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateHired { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        //public string SSN { get; set; } Should this be public?
        public int Role { get; set; }
    }
}
