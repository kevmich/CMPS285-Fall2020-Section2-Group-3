using System;

namespace Models.Domain
{
    public class LogOrder
    {
        public int Id { get; set; }
        public String Name { get; set; }

        public int Size { get; set; }

        public int OrderItemId { get; set; }

        public Guid OrderNumer { get; set; }

        public DateTimeOffset DateStarted { get; set; }

        public DateTimeOffset DateFinished { get; set; }
    }
}