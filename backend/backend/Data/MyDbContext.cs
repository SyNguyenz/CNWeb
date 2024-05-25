using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class MyDbContext : IdentityDbContext<User>
    {
        public MyDbContext(DbContextOptions options) : base(options) { }


        #region DbSet
        public DbSet<HangHoa> HangHoas { get; set; }
        public DbSet<VariantModel> Variants { get; set; }
        public DbSet<DonHang> DonHangs { get; set; }
        public DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public override DbSet<User> Users { get; set; }
        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DonHang>(e =>
            {
                e.ToTable("DonHang");
                e.HasKey(dh => dh.MaDonHang);
                e.Property(dh => dh.NgayDat).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
            modelBuilder.Entity<ChiTietDonHang>(entity =>
            {
                entity.ToTable("ChiTietDonHang");
                entity.HasKey(e => new { e.MaDonHang, e.VariantId });

                entity.HasOne(e => e.DonHang)
                .WithMany(e => e.ChiTietDonHangs)
                .HasForeignKey(e => e.MaDonHang)
                .HasConstraintName("FK_ChiTietDonHang_DonHang");

                entity.HasOne(e => e.Variant)
                .WithMany(e => e.ChiTietDonHangs)
                .HasForeignKey(e => e.VariantId)
                .HasConstraintName("FK_ChiTietDonHang_Variant");

            });
            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("Users");
                e.HasKey(e => e.Id);
                e.Property(e => e.PhoneNumber).IsRequired();
                e.HasIndex(e => e.PhoneNumber).IsUnique();
                e.Property(e => e.UserName).IsRequired();
                e.Property(e => e.DiaChi).IsRequired();
            });
            modelBuilder.Entity<HangHoa>(e =>
            {
                e.ToTable("HangHoa");
                e.HasKey(e => e.MaHangHoa);
            });
            modelBuilder.Entity<VariantModel>(e =>
            {
                e.HasKey(e => e.id);
                e.Property(e => e.image).HasColumnType("text");
                e.HasOne(e => e.HangHoa)
                .WithMany(e => e.Variants)
                .HasForeignKey(v => v.ProductId)
                .HasConstraintName("FK_Variant_HangHoa");
            });
            modelBuilder.Entity<Comments>(e =>
            {
                e.HasKey(e => e.Id);
                e.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .HasConstraintName("FK_Comments_User");
                e.HasOne(e => e.Product)
                .WithMany()
                .HasForeignKey(e => e.ProductId)
                .HasConstraintName("FK_Comments_HangHoa");
                e.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
