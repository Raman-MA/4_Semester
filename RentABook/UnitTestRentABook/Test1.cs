using Microsoft.AspNetCore.Mvc;
using Moq;
using RentABook.Controllers;
using RentABook.Interfaces;
using RentABookSharedLib.Models;

namespace UnitTestRentABook
{
    [TestClass]
    public sealed class BooksControllerTests
    {
        private Mock<IBookRepository> _mockBookRepository;
        private BooksController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockBookRepository = new Mock<IBookRepository>();
            _controller = new BooksController(_mockBookRepository.Object);  
        }

        [TestMethod]
        public async Task GetAllBooks_ReturnsOkResultWithListOfBooks()
        {
            var books = new List<Book>
            {
                new Book { Id = "1", Title = "Test Book 1", Author = "Author 1", IsBorrowed = false },
                new Book { Id = "2", Title = "Test Book 2", Author = "Author 2", IsBorrowed = true }
            };
            _mockBookRepository.Setup(repo => repo.GetAllBooksAsync()).ReturnsAsync(books);

            var result = await _controller.GetAllBooks();

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var returnedBooks = okResult.Value as List<Book>;
            Assert.IsNotNull(returnedBooks);
            Assert.AreEqual(2, returnedBooks.Count);
        }

        [TestMethod]
        public async Task GetBookById_WithValidId_ReturnsOkResultWithBook()
        {
            var book = new Book { Id = "1", Title = "Test Book", Author = "Test Author", IsBorrowed = false };
            _mockBookRepository.Setup(repo => repo.GetBookByIdAsync("1")).ReturnsAsync(book);

            var result = await _controller.GetBookById("1");

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var returnedBook = okResult.Value as Book;
            Assert.IsNotNull(returnedBook);
            Assert.AreEqual("1", returnedBook.Id);
        }

        [TestMethod]
        public async Task GetBookById_WithInvalidId_ReturnsNotFound()
        {
            _mockBookRepository.Setup(repo => repo.GetBookByIdAsync("999")).ReturnsAsync((Book)null);

            var result = await _controller.GetBookById("999");

            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task CreateBook_WithValidBook_ReturnsCreatedAtAction()
        {
            var book = new Book { Id = "1", Title = "New Book", Author = "New Author", IsBorrowed = false };
            _mockBookRepository.Setup(repo => repo.AddBookAsync(It.IsAny<Book>())).Returns(Task.CompletedTask);

            var result = await _controller.CreateBook(book);

            var createdResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(201, createdResult.StatusCode);
            Assert.AreEqual(nameof(_controller.GetBookById), createdResult.ActionName);
        }

        [TestMethod]
        public async Task UpdateBook_WithValidId_ReturnsNoContent()
        {
            var existingBook = new Book { Id = "1", Title = "Old Title", Author = "Old Author", IsBorrowed = false };
            var updatedBook = new Book { Id = "1", Title = "New Title", Author = "New Author", IsBorrowed = true };
            _mockBookRepository.Setup(repo => repo.GetBookByIdAsync("1")).ReturnsAsync(existingBook);
            _mockBookRepository.Setup(repo => repo.UpdateBookAsync(It.IsAny<Book>())).Returns(Task.CompletedTask);

            var result = await _controller.UpdateBook("1", updatedBook);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task UpdateBook_WithInvalidId_ReturnsNotFound()
        {
            var updatedBook = new Book { Id = "999", Title = "New Title", Author = "New Author", IsBorrowed = false };
            _mockBookRepository.Setup(repo => repo.GetBookByIdAsync("999")).ReturnsAsync((Book)null);

            var result = await _controller.UpdateBook("999", updatedBook);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task DeleteBook_WithValidId_ReturnsNoContent()
        {
            var book = new Book { Id = "1", Title = "Test Book", Author = "Test Author", IsBorrowed = false };
            _mockBookRepository.Setup(repo => repo.GetBookByIdAsync("1")).ReturnsAsync(book);
            _mockBookRepository.Setup(repo => repo.DeleteBookAsync("1")).Returns(Task.CompletedTask);

            var result = await _controller.DeleteBook("1");

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task DeleteBook_WithInvalidId_ReturnsNotFound()
        {
            _mockBookRepository.Setup(repo => repo.GetBookByIdAsync("999")).ReturnsAsync((Book)null);

            var result = await _controller.DeleteBook("999");

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }

    [TestClass]
    public sealed class UsersControllerTests
    {
        private Mock<IUserRepository> _mockUserRepository;
        private UsersController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _controller = new UsersController(_mockUserRepository.Object);
        }

        [TestMethod]
        public async Task GetAllUsers_ReturnsOkResultWithListOfUsers()
        {
            var users = new List<User>
            {
                new User { Id = "1", Name = "John Doe", Email = "john@example.com" },
                new User { Id = "2", Name = "Jane Smith", Email = "jane@example.com" }
            };
            _mockUserRepository.Setup(repo => repo.GetAllUsersAsync()).ReturnsAsync(users);

            var result = await _controller.GetAllUsers();

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var returnedUsers = okResult.Value as List<User>;
            Assert.IsNotNull(returnedUsers);
            Assert.AreEqual(2, returnedUsers.Count);
        }

        [TestMethod]
        public async Task GetUserById_WithValidId_ReturnsOkResultWithUser()
        {
            var user = new User { Id = "1", Name = "John Doe", Email = "john@example.com" };
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync("1")).ReturnsAsync(user);

            var result = await _controller.GetUserById("1");

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var returnedUser = okResult.Value as User;
            Assert.IsNotNull(returnedUser);
            Assert.AreEqual("1", returnedUser.Id);
        }

        [TestMethod]
        public async Task GetUserById_WithInvalidId_ReturnsNotFound()
        {
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync("999")).ReturnsAsync((User)null);

            var result = await _controller.GetUserById("999");

            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task CreateUser_WithValidUser_ReturnsCreatedAtAction()
        {
            var user = new User { Id = "1", Name = "John Doe", Email = "john@example.com" };
            _mockUserRepository.Setup(repo => repo.AddUserAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

            var result = await _controller.CreateUser(user);

            var createdResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(201, createdResult.StatusCode);
            Assert.AreEqual(nameof(_controller.GetUserById), createdResult.ActionName);
        }

        [TestMethod]
        public async Task UpdateUser_WithValidId_ReturnsNoContent()
        {
            var existingUser = new User { Id = "1", Name = "Old Name", Email = "old@example.com" };
            var updatedUser = new User { Id = "1", Name = "New Name", Email = "new@example.com" };
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync("1")).ReturnsAsync(existingUser);
            _mockUserRepository.Setup(repo => repo.UpdateUserAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

            var result = await _controller.UpdateUser("1", updatedUser);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task UpdateUser_WithInvalidId_ReturnsNotFound()
        {
            var updatedUser = new User { Id = "999", Name = "New Name", Email = "new@example.com" };
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync("999")).ReturnsAsync((User)null);

            var result = await _controller.UpdateUser("999", updatedUser);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task DeleteUser_WithValidId_ReturnsNoContent()
        {
            var user = new User { Id = "1", Name = "John Doe", Email = "john@example.com" };
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync("1")).ReturnsAsync(user);
            _mockUserRepository.Setup(repo => repo.DeleteUserAsync("1")).Returns(Task.CompletedTask);

            var result = await _controller.DeleteUser("1");

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task DeleteUser_WithInvalidId_ReturnsNotFound()
        {
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync("999")).ReturnsAsync((User)null);

            var result = await _controller.DeleteUser("999");

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }

    [TestClass]
    public sealed class BookRecordsControllerTests
    {
        private Mock<IBorrowRecordRepository> _mockBorrowRecordRepository;
        private BookRecordsController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockBorrowRecordRepository = new Mock<IBorrowRecordRepository>();
            _controller = new BookRecordsController(_mockBorrowRecordRepository.Object);
        }

        [TestMethod]
        public async Task GetAllBorrowRecords_ReturnsOkResultWithListOfRecords()
        {
            var records = new List<BorrowRecord>
            {
                new BorrowRecord { Id = "1", UserId = "user1", BookId = "book1", BorrowedAt = DateTime.Now },
                new BorrowRecord { Id = "2", UserId = "user2", BookId = "book2", BorrowedAt = DateTime.Now }
            };
            _mockBorrowRecordRepository.Setup(repo => repo.GetAllBorrowRecordsAsync()).ReturnsAsync(records);

            var result = await _controller.GetAllBorrowRecords();

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var returnedRecords = okResult.Value as List<BorrowRecord>;
            Assert.IsNotNull(returnedRecords);
            Assert.AreEqual(2, returnedRecords.Count);
        }

        [TestMethod]
        public async Task GetBorrowRecordById_WithValidId_ReturnsOkResultWithRecord()
        {
            var record = new BorrowRecord { Id = "1", UserId = "user1", BookId = "book1", BorrowedAt = DateTime.Now };
            _mockBorrowRecordRepository.Setup(repo => repo.GetBorrowRecordByIdAsync("1")).ReturnsAsync(record);

            var result = await _controller.GetBorrowRecordById("1");

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var returnedRecord = okResult.Value as BorrowRecord;
            Assert.IsNotNull(returnedRecord);
            Assert.AreEqual("1", returnedRecord.Id);
        }

        [TestMethod]
        public async Task GetBorrowRecordById_WithInvalidId_ReturnsNotFound()
        {
            _mockBorrowRecordRepository.Setup(repo => repo.GetBorrowRecordByIdAsync("999")).ReturnsAsync((BorrowRecord)null);

            var result = await _controller.GetBorrowRecordById("999");

            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task CreateBorrowRecord_WithValidRecord_ReturnsCreatedAtAction()
        {
            var record = new BorrowRecord { Id = "1", UserId = "user1", BookId = "book1", BorrowedAt = DateTime.Now };
            _mockBorrowRecordRepository.Setup(repo => repo.AddBorrowRecordAsync(It.IsAny<BorrowRecord>())).Returns(Task.CompletedTask);

            var result = await _controller.CreateBorrowRecord(record);

            var createdResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(201, createdResult.StatusCode);
            Assert.AreEqual(nameof(_controller.GetBorrowRecordById), createdResult.ActionName);
        }

        [TestMethod]
        public async Task UpdateBorrowRecord_WithValidId_ReturnsNoContent()
        {
            var existingRecord = new BorrowRecord { Id = "1", UserId = "user1", BookId = "book1", BorrowedAt = DateTime.Now };
            var updatedRecord = new BorrowRecord { Id = "1", UserId = "user1", BookId = "book2", BorrowedAt = DateTime.Now };
            _mockBorrowRecordRepository.Setup(repo => repo.GetBorrowRecordByIdAsync("1")).ReturnsAsync(existingRecord);
            _mockBorrowRecordRepository.Setup(repo => repo.UpdateBorrowRecordAsync(It.IsAny<BorrowRecord>())).Returns(Task.CompletedTask);

            var result = await _controller.UpdateBorrowRecord("1", updatedRecord);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task UpdateBorrowRecord_WithInvalidId_ReturnsNotFound()
        {
            var updatedRecord = new BorrowRecord { Id = "999", UserId = "user1", BookId = "book1", BorrowedAt = DateTime.Now };
            _mockBorrowRecordRepository.Setup(repo => repo.GetBorrowRecordByIdAsync("999")).ReturnsAsync((BorrowRecord)null);

            var result = await _controller.UpdateBorrowRecord("999", updatedRecord);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task DeleteBorrowRecord_WithValidId_ReturnsNoContent()
        {
            var record = new BorrowRecord { Id = "1", UserId = "user1", BookId = "book1", BorrowedAt = DateTime.Now };
            _mockBorrowRecordRepository.Setup(repo => repo.GetBorrowRecordByIdAsync("1")).ReturnsAsync(record);
            _mockBorrowRecordRepository.Setup(repo => repo.DeleteBorrowRecordAsync("1")).Returns(Task.CompletedTask);

            var result = await _controller.DeleteBorrowRecord("1");

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task DeleteBorrowRecord_WithInvalidId_ReturnsNotFound()
        {
            _mockBorrowRecordRepository.Setup(repo => repo.GetBorrowRecordByIdAsync("999")).ReturnsAsync((BorrowRecord)null);

            var result = await _controller.DeleteBorrowRecord("999");

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}
