using RentABook.Interfaces;
using RentABookSharedLib.Models;
using RentABook.DBContext;
using MongoDB.Driver;

namespace RentABook.Persistence
{
    public class BorrowRecordRepository : IBorrowRecordRepository
    {
        private readonly MongoDbContext _context;
        public BorrowRecordRepository(MongoDbContext mongoDbContext)
        {
            _context = mongoDbContext;
        }

        public async Task<BorrowRecord> GetBorrowRecordByIdAsync(string id)
        {
            return await _context.BorrowedRecords.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<BorrowRecord>> GetAllBorrowRecordsAsync()
        {
            return await _context.BorrowedRecords.Find(x => true).ToListAsync();
        }

        public async Task AddBorrowRecordAsync(BorrowRecord record)
        {
            await _context.BorrowedRecords.InsertOneAsync(record);
        }

        public async Task UpdateBorrowRecordAsync(BorrowRecord record)
        {
            var filter = Builders<BorrowRecord>.Filter.Eq(x => x.Id, record.Id);
            await _context.BorrowedRecords.ReplaceOneAsync(filter, record);
        }

        public async Task DeleteBorrowRecordAsync(string id)
        {
            var filter = Builders<BorrowRecord>.Filter.Eq(x => x.Id, id);
            await _context.BorrowedRecords.DeleteOneAsync(filter);

        }
    }
}
