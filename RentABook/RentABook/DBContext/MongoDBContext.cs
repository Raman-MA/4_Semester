using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RentABookSharedLib.Models;

namespace RentABook.DBContext
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Book> Books =>
            _database.GetCollection<Book>("Books");

        public IMongoCollection<BorrowRecord> BorrowedRecords =>
            _database.GetCollection<BorrowRecord>("BorrowedRecords");

        public IMongoCollection<User> Users =>
            _database.GetCollection<User>("Users");
    }

}