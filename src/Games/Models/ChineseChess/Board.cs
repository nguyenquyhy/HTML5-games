using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games.Models.ChineseChess
{
    public class Board
    {
        public Turn CurrentTurn { get; set; }
        public List<Piece> Pieces { get; set; }
    }
}
