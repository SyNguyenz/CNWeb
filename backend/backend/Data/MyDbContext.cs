﻿using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class MyDbContext : IdentityDbContext<User>
    {
        public MyDbContext(DbContextOptions options) : base(options) { }


        #region DbSet
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<HangHoa> HangHoas { get; set; }
        public DbSet<DonHang> DonHangs { get; set; }
        public DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }
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
            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("Users");
                e.HasKey(e => e.Id);
                e.Property(e => e.PhoneNumber).IsRequired();
                e.HasIndex(e => e.PhoneNumber).IsUnique();
                e.Property(e => e.UserName).IsRequired();
                e.Property(e => e.DiaChi).IsRequired();
            });
            modelBuilder.Entity<HangHoa>()
                .HasMany(h => h.Variants)
                .WithOne();
            modelBuilder.Entity<VariantModel>().HasKey(e => e.id);
        }
    }
}
