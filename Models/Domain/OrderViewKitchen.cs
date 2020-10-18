using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace Models
{
    public class OrderViewKitchen
    {
        public String Name { get; set; }
        public int Size { get; set; }
        public Guid OrderNumber { get; set; }
        public Boolean IsComplete { get; set; }
        public Boolean IsDeleted { get; set; }
        public int OrderItemId { get; set; }

    }
}
