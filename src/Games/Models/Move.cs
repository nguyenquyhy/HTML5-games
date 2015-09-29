using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games.Models
{
    public class Move
    {
        public Point Start { get; set; }
        public Point End { get; set; }
    }

    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
