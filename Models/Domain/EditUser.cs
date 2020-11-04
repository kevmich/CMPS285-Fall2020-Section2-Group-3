using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class EditUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int[] PermissionsArray { get; set; }
    }
}
