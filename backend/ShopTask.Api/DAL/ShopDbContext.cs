using Microsoft.EntityFrameworkCore;
using ShopTask.Api.Modules.Carts.Domain.Entities;
using ShopTask.Api.Modules.Products.Domain.Entities;

namespace ShopTask.Api.DAL;

public sealed class ShopDbContext(DbContextOptions<ShopDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(product =>
        {
            product.ToTable(table => table.HasCheckConstraint("ck_products_price_non_negative", "price >= 0"));
            product.Property(p => p.Title).HasMaxLength(Product.TitleMaxLength);
            product.Property(p => p.Category).HasMaxLength(Product.CategoryMaxLength);
            product.Property(p => p.Description).HasMaxLength(Product.DescriptionMaxLength);
            product.Property(p => p.Image).HasMaxLength(Product.ImageMaxLength);
            product.Property(p => p.Price).HasPrecision(Product.PricePrecision, Product.PriceScale);
        });

        modelBuilder.Entity<Cart>().Property(cart => cart.Version).IsConcurrencyToken();

        modelBuilder.Entity<CartItem>(item =>
        {
            item.ToTable("cart_items", table => table.HasCheckConstraint(
                "ck_cart_items_quantity_range",
                $"quantity BETWEEN {CartItem.MinQuantity} AND {CartItem.MaxQuantity}"));
            item.HasKey(i => new { i.CartId, i.ProductId });
        });
    }
}
