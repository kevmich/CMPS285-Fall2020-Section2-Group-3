using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class OrderView
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public int Size { get; set; }
        public int OrderItemId { get; set; }
        public Boolean IsDeleted { get; set; }
        public DateTimeOffset DateStarted { get; set; }

    }
}
