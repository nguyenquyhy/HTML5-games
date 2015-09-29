using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games.Models.ChineseChess;
using System.Threading;
using System.IO;
using Newtonsoft.Json;

namespace Games.Repositories
{
    public class JsonFileChineseChessRepository : IChineseChessRepository
    {
        private const string FileName = "games.json";
        private SemaphoreSlim sm = new SemaphoreSlim(1);
        private List<Game> cachedGames = null;

        public async Task<Game> GetGameAsync(string id)
        {
            await LoadGamesAsync();
            return cachedGames.SingleOrDefault(o => o.Id == id);
        }

        public async Task<Game> FindOngoingGameAsync(int code)
        {
            await LoadGamesAsync();
            return cachedGames.SingleOrDefault(o => !o.CompletionTime.HasValue && o.Code == code);
        }

        private async Task LoadGamesAsync()
        {
            try
            {
                await sm.WaitAsync();
                if (cachedGames == null)
                {
                    if (!File.Exists(FileName))
                    {
                        cachedGames = new List<Game>();
                        return;
                    }
                    try
                    {
                        var dataString = File.ReadAllText(FileName);
                        cachedGames = JsonConvert.DeserializeObject<List<Game>>(dataString);
                    }
                    catch
                    {
                        // TODO: report here
                        cachedGames = new List<Game>();
                    }
                }
            }
            finally
            {
                sm.Release();
            }
        }

        public async Task SaveGameAsync(string id, Game game)
        {
            try
            {
                await sm.WaitAsync();
                cachedGames = null;
            }
            catch
            {
                sm.Release();
            }
        }
    }
}
