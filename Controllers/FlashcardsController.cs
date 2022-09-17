using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend2.Data;
using backend2.Models;

namespace backend2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashcardsController : ControllerBase
    {
        private readonly EnglishDbContext _context;

        public FlashcardsController(EnglishDbContext context)
        {
            _context = context;
        }

        // GET: api/Flashcards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flashcard>>> GetFlashcards()
        {
            return await _context.Flashcards.ToListAsync();
        }

        // GET: api/Flashcards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flashcard>> GetFlashcard(int id)
        {
            var flashcard = await _context.Flashcards.FindAsync(id);

            if (flashcard == null)
            {
                return NotFound();
            }

            return flashcard;
        }

        // PUT: api/Flashcards/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlashcard(int id, Flashcard flashcard)
        {
            if (id != flashcard.FlashcardId)
            {
                return BadRequest();
            }

            _context.Entry(flashcard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlashcardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flashcards
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Flashcard>> PostFlashcard(Flashcard flashcard)
        {
            _context.Flashcards.Add(flashcard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlashcard", new { id = flashcard.FlashcardId }, flashcard);
        }

        // DELETE: api/Flashcards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Flashcard>> DeleteFlashcard(int id)
        {
            var flashcard = await _context.Flashcards.FindAsync(id);
            if (flashcard == null)
            {
                return NotFound();
            }

            _context.Flashcards.Remove(flashcard);
            await _context.SaveChangesAsync();

            return flashcard;
        }

        private bool FlashcardExists(int id)
        {
            return _context.Flashcards.Any(e => e.FlashcardId == id);
        }
    }
}
