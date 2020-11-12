using System;

namespace Models.Domain
{
    public class LogOrder
    {
        public String Name { get; set; }
        public int Size { get; set; }
        public Guid OrderNumber { get; set; }
        public DateTimeOffset DateStarted { get; set; }
        public DateTimeOffset DateFinished { get; set; }
        public int Quantity { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}