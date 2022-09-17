using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend2.Models
{
    public class Lesson
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LessonId { get; set; }
        public string Title { get; set; }
        public string Icon{ get; set; }
        public string BgColor { get; set; }
        public string TextColor { get; set; }

        public ICollection<Flashcard> Flashcards { get; set; }
        public ICollection<Listen> Listens { get; set; }
    }
}
