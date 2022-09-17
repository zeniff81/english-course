using backend2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend2.Data
{
    public class EnglishDbContext:DbContext
    {
        public EnglishDbContext()
        {
        }

        public EnglishDbContext(DbContextOptions<EnglishDbContext> options) : base(options){}

        public DbSet<Flashcard> Flashcards{ get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Listen> Listens { get; set; }
    }
}
