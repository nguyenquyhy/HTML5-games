using Games.Models.ChineseChess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games.Repositories
{
    public interface IChineseChessRepository
    {
        Task<Game> GetGameAsync(string id);
        Task<Game> FindOngoingGameAsync(int code);
        Task SaveGameAsync(string id, Game game);
    }
}
