using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games.Models.ChineseChess
{
    public class Piece
    {
        public Point Position { get; set; }
        public PieceType Type { get; set; }
    }

    public enum PieceType
    {
        General,
        Advisor,
        Elephant,
        Horse,
        Chariot,
        Cannon,
        Soldier
    }
}
