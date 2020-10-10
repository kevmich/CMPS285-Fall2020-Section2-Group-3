using System;
using System.Collections.Generic;

namespace Models
{
    public class Order
    {
        public int Id { get; set; }
        public Guid OrderNumber { get; set; }
        public int OrderItemId { get; set; }
        public DateTimeOffset DateStarted { get; set; }
        public DateTimeOffset DateFinished { get; set; }
        public int Size { get; set; }
        public Boolean IsComplete { get; set; }
        public Boolean IsDeleted { get; set; }

    }
}
