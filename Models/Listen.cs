using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend2.Models
{
    public class Listen
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int ListenId { get; set; }        
        public string SentenceIndex { get; set; }
        public string Sentence { get; set; }
        public string Translation { get; set; }
        
        public int LessonId { get; set; }
    }
}