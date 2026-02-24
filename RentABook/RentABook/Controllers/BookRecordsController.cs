using Microsoft.AspNetCore.Mvc;
using RentABook.Interfaces;
using RentABookSharedLib.Models;

namespace RentABook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookRecordsController : ControllerBase
    {
        private readonly IBorrowRecordRepository _borrowRecordRepository;

        public BookRecordsController(IBorrowRecordRepository borrowRecordRepository)
        {
            _borrowRecordRepository = borrowRecordRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<BorrowRecord>>> GetAllBorrowRecords()
        {
            var records = await _borrowRecordRepository.GetAllBorrowRecordsAsync();
            return Ok(records);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BorrowRecord>> GetBorrowRecordById(string id)
        {
            var record = await _borrowRecordRepository.GetBorrowRecordByIdAsync(id);
            
            if (record == null)
            {
                return NotFound();
            }
            
            return Ok(record);
        }

        [HttpPost]
        public async Task<ActionResult<BorrowRecord>> CreateBorrowRecord([FromBody] BorrowRecord record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _borrowRecordRepository.AddBorrowRecordAsync(record);
            return CreatedAtAction(nameof(GetBorrowRecordById), new { id = record.Id }, record);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBorrowRecord(string id, [FromBody] BorrowRecord record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingRecord = await _borrowRecordRepository.GetBorrowRecordByIdAsync(id);
            
            if (existingRecord == null)
            {
                return NotFound();
            }

            record.Id = id;
            await _borrowRecordRepository.UpdateBorrowRecordAsync(record);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBorrowRecord(string id)
        {
            var record = await _borrowRecordRepository.GetBorrowRecordByIdAsync(id);
            
            if (record == null)
            {
                return NotFound();
            }

            await _borrowRecordRepository.DeleteBorrowRecordAsync(id);
            return NoContent();
        }
    }
}
