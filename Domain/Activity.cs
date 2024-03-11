using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Activity
    {
        [Key]
        public Guid ActivityID { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Column(TypeName = "nvarchar(2000)")]
        public string Description { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Category { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string City { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Venue { get; set; }
    }
}