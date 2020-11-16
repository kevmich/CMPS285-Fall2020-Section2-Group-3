using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class UserInfo
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set;}
        public string LastName { get; set; }
        //public int[] PermissionsArray { get; set; }
    }
}
