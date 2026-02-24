using RentABook.Interfaces;
using RentABookSharedLib.Models;
using RentABook.DBContext;
using MongoDB.Driver;

using ZstdSharp.Unsafe;

namespace RentABook.Persistence;

public class BookRepository : IBookRepository
{
    private readonly MongoDbContext _context;
    public BookRepository(MongoDbContext mongoDbContext)
    {
        _context = mongoDbContext;
    }

    public async Task<Book> GetBookByIdAsync(string id)
    {
        return await _context.Books.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<Book>> GetAllBooksAsync()
    {
        return await _context.Books.Find(x => true).ToListAsync();
    }
    public async Task AddBookAsync(Book book)
    {
        await _context.Books.InsertOneAsync(book);
    }

    public async Task UpdateBookAsync(Book book)
    {
        var filter = Builders<Book>.Filter.Eq(x => x.Id, book.Id);
        await _context.Books.ReplaceOneAsync(filter, book);
    }
    public async Task DeleteBookAsync(string id)
    {
        var filter = Builders<Book>.Filter.Eq(x => x.Id, id);
        await _context.Books.DeleteOneAsync(filter);
    }
}
