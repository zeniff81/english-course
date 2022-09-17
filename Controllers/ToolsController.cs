using backend2.Data;
using backend2.Models;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : Controller
    {
        private readonly EnglishDbContext _context;

        public ToolsController(EnglishDbContext context)
        {
            _context = context;
        }

        string[] lessonPlaces = new string[] { "school", "library", "park", "church", "what's your name?", "where are you from?", "Visit the doctor", "Celebrities and TV" };
        string[] lessonBgColors = new string[] { "red", "blue", "green", "black", "purple", "gray", "peach" };
        string[] lessonTextColors = new string[] { "white", "yellow", "lightgray", "pink", "#dedede" };
        string[] flashcardTexts = new string[] { "table", "chair", "mosquito", "pizza", "rat", "friend", "stand up", "give up", "correction" };
        string[] flashcardImages = new string[] {
            "https://icons.iconarchive.com/icons/google/noto-emoji-people-clothing-objects/96/12192-school-backpack-icon.png",
            "https://icons.iconarchive.com/icons/icons8/ios7/256/Science-School-icon.png",
            "https://icons.iconarchive.com/icons/babasse/old-school/256/favoris-old-school-icon.png",
            "https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/256/42496-school-icon.png",
            "https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/256/42474-national-park-icon.png",
            "https://icons.iconarchive.com/icons/icons8/ios7/256/City-Water-Park-icon.png",
            "https://icons.iconarchive.com/icons/sonya/swarm/256/Mayor-Park-icon.png"
        };
        string[] listenSentences = new string[] { "Hello, John", "Hello, Sarah", "Where are you?", "I'm right here", "Are you sure?", "Yes, absolutely" };

        [HttpGet("test")]
        public ActionResult Test()
        {            
            return Ok("this is a test");
        }

        private string RandomItem(string[] collection)
        {
            Random r = new Random();
            return collection[r.Next(collection.Length)];
        }

        private int RandomItem(int[] collection)
        {
            Random r = new Random();
            return collection[r.Next(collection.Length)];
        }

        private List<Lesson> GenerateLesson(int size)
        {
            List<Lesson> lessons = new List<Lesson>();
            for (int i = 0; i < size; i++)
            {

                var currentLesson = new Lesson()
                {
                    Title = RandomItem(lessonPlaces),
                    Icon = "https://icons.iconarchive.com/icons/google/noto-emoji-people-clothing-objects/48/12192-school-backpack-icon.png",
                    BgColor = RandomItem(lessonBgColors),
                    TextColor = RandomItem(lessonTextColors),                    
                };

                
                //add flashcards
                currentLesson.Flashcards = new List<Flashcard>();
                var cards = GenerateFlashcards();
                foreach (var card in cards)
                {
                    currentLesson.Flashcards.Add(card);
                }
                //add listens
                currentLesson.Listens = new List<Listen>();
                var listens = GenerateListens();
                foreach (var listen in listens)
                {
                    currentLesson.Listens.Add(listen);
                }

                lessons.Add(currentLesson);
            };
            return lessons;
        }
        private List<Flashcard> GenerateFlashcards()
        {
            var rand= new Random().Next(10);
            List<Flashcard> flashcards = new List<Flashcard>();
            for (int i = 0; i < rand; i++)
            {
                var currentCard = new Flashcard()
                {
                    Text= RandomItem(flashcardTexts),
                    Image= RandomItem(flashcardImages)
                };
                flashcards.Add(currentCard);
            };
            return flashcards;
        }

        private List<Listen> GenerateListens()
        {
            var rand = new Random().Next(10);
            List<Listen> listens = new List<Listen>();
            for (int i = 0; i < rand; i++)
            {
                var currentListen= new Listen()
                {                    
                    Sentence = RandomItem(listenSentences)
                };
                listens.Add(currentListen);
            };
            return listens;
        }

        [HttpGet("deleteall")]
        public IActionResult DeleteAll()
        {
            // var result = await _context.Lessons.FromSqlRaw("delete from lessons").ToList();
            _context.Lessons.RemoveRange(_context.Lessons);
            _context.SaveChanges();
            return Ok("Deleted");
        }


        [HttpGet("init/{size}")]
        public async Task<ActionResult<IEnumerable<Lesson>>> Init(int size)
        {
            var lessons = from lesson in _context.Lessons select lesson;
            foreach (var record in lessons)
            {
                _context.Lessons.Remove(record);
            }

            _context.Lessons.AddRange(GenerateLesson(size));            

            await _context.SaveChangesAsync();

            return await _context.Lessons.ToListAsync();
        }

        [HttpGet("populate")]
        public async Task<ActionResult<IEnumerable<Lesson>>> Populate()
        {
            try
            {
                // clear lessons                 
                _context.Database.ExecuteSqlRaw("delete from lessons");
                _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('lessons', RESEED, 0)");

                // duplicate data.xls
                var files = Directory.GetFiles("./", "data.xlsx", SearchOption.TopDirectoryOnly);
                var data = files[0];
                System.IO.File.Copy(data, $"temp_{Path.GetFileName(data)}", true);
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


                System.IO.File.Delete(filepath);



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
