using RentABook.Interfaces;
using RentABookSharedLib.Models;
using RentABook.DBContext;
using MongoDB.Driver; 

namespace RentABook.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly MongoDbContext _dbContext;

        public UserRepository(MongoDbContext context)
        {
            _dbContext = context;
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _dbContext.Users.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _dbContext.Users.Find(x => true).ToListAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await _dbContext.Users.InsertOneAsync(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
            await _dbContext.Users.ReplaceOneAsync(filter, user);
        }

        public async Task DeleteUserAsync(string id)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, id);
            await _dbContext.Users.DeleteOneAsync(filter);
        }

    }
}
