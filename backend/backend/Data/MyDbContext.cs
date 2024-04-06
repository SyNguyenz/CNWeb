﻿using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions options) : base(options) { }


        #region DbSet
        public DbSet<HangHoa> HangHoas { get; set;}
        public DbSet<DonHang> DonHangs { get; set;}
        public DbSet<ChiTietDonHang> ChiTietDonHangs { get; set;}
        public DbSet<Admin> Admins { get; set;}
        public DbSet<User> Users { get; set; }
        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DonHang>(e =>
            {
                e.ToTable("DonHang");
                e.HasKey(dh => dh.MaDonHang);
                e.Property(dh => dh.NgayDat).HasDefaultValueSql("getutcdate()");
            });
            modelBuilder.Entity<ChiTietDonHang>(entity =>
            {
                entity.ToTable("ChiTietDonHang");
                entity.HasKey(e => new { e.MaDonHang, e.MaHangHoa });

                entity.HasOne(e => e.DonHang)
                .WithMany(e => e.ChiTietDonHangs)
                .HasForeignKey(e => e.MaDonHang)
                .HasConstraintName("FK_ChiTietDonHang_DonHang");

                entity.HasOne(e => e.HangHoa)
                .WithMany(e => e.ChiTietDonHangs)
                .HasForeignKey(e => e.MaHangHoa)
                .HasConstraintName("FK_ChiTietDonHang_HangHoa");
            });
            modelBuilder.Entity<Admin>(e =>
            {
                e.ToTable("Admin");
                e.HasKey(e => e.Id);
                e.Property(e => e.Id)
                .ValueGeneratedOnAdd();
            });
        }
    }
}
