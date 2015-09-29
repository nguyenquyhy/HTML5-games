using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games.Models.ChineseChess
{
    public class Game
    {
        public string Id { get; set; }
        public Board Board { get; set; }
        public int Code { get; set; }
        public string Password { get; set; }
        public DateTimeOffset CreationTime { get; set; }
        public DateTimeOffset? CompletionTime { get; set; }
    }

    public enum Turn
    {
        Completed,
        Player1,
        Player2
    }
}
