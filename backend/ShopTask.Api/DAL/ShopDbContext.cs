using Microsoft.EntityFrameworkCore;
using ShopTask.Api.Common.Domain.Entities;
using ShopTask.Api.Modules.Carts.Domain.Entities;
using ShopTask.Api.Modules.Products.Domain.Entities;

namespace ShopTask.Api.DAL;

public class ShopDbContext(DbContextOptions<ShopDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes().Where(type => type.ClrType.IsAssignableTo(typeof(Entity))))
        {
            modelBuilder.Entity(entityType.ClrType, entity =>
            {
                entity.Property(nameof(Entity.CreationDate)).HasDefaultValueSql("now()");
                entity.Property(nameof(Entity.ModificationDate)).HasDefaultValueSql("now()");
            });
        }

        modelBuilder.Entity<CartItem>().HasKey(item => new { item.CartId, item.ProductId });
    }
}
