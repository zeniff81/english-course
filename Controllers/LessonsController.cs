using backend2.Data;
using backend2.Models;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly EnglishDbContext _context;

        public LessonsController(EnglishDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetLessons()
        {
            return await _context.Lessons
                .Include(lesson => lesson.Flashcards)
                .Include(lesson => lesson.Listens.OrderBy(listen=>listen.SentenceIndex))
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);

            if (lesson == null)
            {
                return NotFound();
            }

            return lesson;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLesson(int id, Lesson lesson)
        {
            if (id != lesson.LessonId)
            {
                return BadRequest();
            }

            _context.Entry(lesson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonExists(id))
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

        [HttpPost]
        public async Task<ActionResult<Lesson>> PostLesson(Lesson lesson)
        {
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLesson", new { id = lesson.LessonId }, lesson);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Lesson>> DeleteLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return lesson;
        }

        private bool LessonExists(int id)
        {
            return _context.Lessons.Any(e => e.LessonId == id);
        }

        [HttpPost("populate")]
        public async Task<ActionResult<IEnumerable<Lesson>>> Populate(IFormFile file)
        {
            try
            {
                // clear lessons                 
                _context.Database.ExecuteSqlRaw("delete from lessons");
                _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('lessons', RESEED, 0)");

                // duplicate data.xls                
                var files = Directory.GetFiles("./", "data.xlsx", SearchOption.TopDirectoryOnly);
                var data = files[0];

                if (file != null) {
                    System.IO.File.Copy(data, $"temp_{Path.GetFileName(data)}", true);
                }
                else
                {
                    System.IO.File.Copy(data, $"temp_{Path.GetFileName(data)}", true);
                }
                var filepath = Path.Combine("./", "temp_data.xlsx");


                XLWorkbook workbook = XLWorkbook.OpenFromTemplate(filepath);

                var lessonsSheet = workbook.Worksheets.Where(w => w.Name == "Lessons").First();
                var flashcardsSheet = workbook.Worksheets.Where(w => w.Name == "Flashcards").First();
                var listensSheet = workbook.Worksheets.Where(w => w.Name == "Listens").First();

                var lessonsRows = lessonsSheet.Rows().ToList();
                var flashcardsRows = flashcardsSheet.Rows().ToList();
                var listensRows = listensSheet.Rows().ToList();

                int currentRow;

                // create lessons
                currentRow = 0;
                List<Lesson> lessons = new List<Lesson>();
                foreach (var row in lessonsRows)
                {
                    currentRow++;
                    if (currentRow == 1) continue;
                    Lesson newLesson = new Lesson()
                    {
                        Title = row.Cell(2).Value.ToString(),
                        Icon = row.Cell(3).Value.ToString(),
                        BgColor = row.Cell(4).Value.ToString(),
                        TextColor = row.Cell(5).Value.ToString()
                    };
                    lessons.Add(newLesson);
                }
                _context.Lessons.AddRange(lessons);

                // create flashcards
                currentRow = 0;
                List<Flashcard> flashcards = new List<Flashcard>();
                foreach (var row in flashcardsRows)
                {
                    currentRow++;
                    if (currentRow == 1) continue;
                    Flashcard newFlashcard = new Flashcard()
                    {
                        Text = row.Cell(2).Value.ToString(),
                        Image = row.Cell(3).Value.ToString(),
                        Translation = row.Cell(4).Value.ToString(),
                        LessonId = int.Parse(row.Cell(5).Value.ToString())
                    };
                    flashcards.Add(newFlashcard);
                }
                _context.SaveChanges();

                // add flashcards
                foreach (var lesson in _context.Lessons)
                {
                    lesson.Flashcards = new List<Flashcard>();
                    foreach (var card in flashcards)
                    {
                        if (card.LessonId == lesson.LessonId)
                        {
                            lesson.Flashcards.Add(card);
                        }
                    }
                }
                _context.SaveChanges();

                // create listens
                currentRow = 0;
                List<Listen> listens = new List<Listen>();
                foreach (var row in listensRows)
                {
                    currentRow++;
                    if (currentRow == 1) continue;
                    var currentSentenceIndex = row.Cell(2).Value.ToString();
                    if (currentSentenceIndex == "") continue;
                    Listen newListen = new Listen()
                    {
                        SentenceIndex = row.Cell(2).Value.ToString(),
                        Sentence = row.Cell(3).Value.ToString(),
                        Translation = row.Cell(4).Value.ToString(),
                        LessonId = int.Parse(row.Cell(5).Value.ToString())
                    };
                    listens.Add(newListen);
                }
                _context.SaveChanges();

                // add listens
                foreach (var lesson in _context.Lessons)
                {
                    lesson.Listens = new List<Listen>();
                    foreach (var card in listens)
                    {
                        if (card.LessonId == lesson.LessonId)
                        {
                            lesson.Listens.Add(card);
                        }
                    }
                }
                _context.SaveChanges();


                // System.IO.File.Delete(filepath);



                return await _context.Lessons                
              .Include(lesson => lesson.Flashcards)
              .Include(lesson => lesson.Listens)
              .ToListAsync();
                
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
