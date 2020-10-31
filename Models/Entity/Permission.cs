using Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entity
{
    public class Permission
    {
        public int Id { get; set; }
        public PermissionEnum PermissionId { get; set; }
        public string Name { get; set; }
    }
}
