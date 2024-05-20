namespace backend.Models
{
    public class ApiResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public IList<string> roles { get; set; }
    }
}
