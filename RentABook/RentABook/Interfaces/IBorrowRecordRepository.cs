using RentABookSharedLib.Models;
namespace RentABook.Interfaces
{
    public interface IBorrowRecordRepository
    {
        Task<BorrowRecord> GetBorrowRecordByIdAsync(string id);
        Task<List<BorrowRecord>> GetAllBorrowRecordsAsync();
        Task AddBorrowRecordAsync(BorrowRecord record);
        Task UpdateBorrowRecordAsync(BorrowRecord record);
        Task DeleteBorrowRecordAsync(string id);
    }
}
