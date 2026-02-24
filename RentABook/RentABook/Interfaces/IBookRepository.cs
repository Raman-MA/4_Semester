using RentABookSharedLib.Models;
using RentABook.Persistence;
namespace RentABook.Interfaces
{
    public interface IBookRepository
    {
        Task<Book> GetBookByIdAsync(string id);
        Task<List<Book>> GetAllBooksAsync();
        Task AddBookAsync(Book book);
        Task UpdateBookAsync(Book book);
        Task DeleteBookAsync(string id);
    }
}
