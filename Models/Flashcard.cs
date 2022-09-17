using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend2.Models
{
    public class Flashcard
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FlashcardId { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public string Translation{ get; set; }
        
        public int LessonId { get; set; }               
    }
}
