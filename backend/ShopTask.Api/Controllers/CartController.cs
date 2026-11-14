using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopTask.Api.DAL;
using ShopTask.Api.Modules.Carts.Domain.Entities;
using ShopTask.Api.Modules.Carts.Domain.Exceptions;
using ShopTask.Api.Modules.Carts.DTO;
using ShopTask.Api.Modules.Products.Domain.Exceptions;

namespace ShopTask.Api.Controllers;

[ApiController]
[Route("api/cart")]
public sealed class CartController(ShopDbContext db) : ControllerBase
{
    private const string CartCookieName = "shoptask_cart";

    [HttpGet]
    public async Task<CartResponse> GetCart(CancellationToken cancellationToken) =>
        ToResponse(await FindCartAsync(cancellationToken));

    [HttpPut("items/{productId:int}")]
    public async Task<CartResponse> SetItemQuantity(
        int productId,
        SetCartItemQuantityRequest request,
        CancellationToken cancellationToken)
    {
        var product = await db.Products.FindAsync([productId], cancellationToken)
            ?? throw new ProductNotFoundException(productId);

        var cart = await FindCartAsync(cancellationToken) ?? db.Carts.Add(Cart.Create()).Entity;
        cart.SetQuantity(product, request.Quantity);

        return await SaveAsync(cart, cancellationToken);
    }

    [HttpDelete("items/{productId:int}")]
    public async Task<CartResponse> RemoveItem(int productId, CancellationToken cancellationToken)
    {
        var cart = await FindCartAsync(cancellationToken) ?? throw new CartItemNotFoundException(productId);
        cart.RemoveProduct(productId);

        return await SaveAsync(cart, cancellationToken);
    }

    private async Task<Cart?> FindCartAsync(CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(Request.Cookies[CartCookieName], out var cartId))
        {
            return null;
        }

        return await db.Carts
            .Include(cart => cart.Items)
            .ThenInclude(item => item.Product)
            .SingleOrDefaultAsync(cart => cart.Id == cartId, cancellationToken);
    }

    private async Task<CartResponse> SaveAsync(Cart cart, CancellationToken cancellationToken)
    {
        await db.SaveChangesAsync(cancellationToken);

        Response.Cookies.Append(CartCookieName, cart.Id.ToString(), new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Secure = Request.IsHttps,
            MaxAge = TimeSpan.FromDays(30),
        });

        return ToResponse(cart);
    }

    private static CartResponse ToResponse(Cart? cart) => cart is null
        ? new CartResponse()
        : new CartResponse
        {
            Items = [.. cart.Items.OrderBy(item => item.ProductId).Select(ToResponse)],
            TotalQuantity = cart.TotalQuantity,
            TotalPrice = cart.TotalPrice,
        };

    private static CartItemResponse ToResponse(CartItem item) => new()
    {
        ProductId = item.ProductId,
        Title = item.Product.Title,
        Description = item.Product.Description,
        Image = item.Product.Image,
        UnitPrice = item.Product.Price,
        Quantity = item.Quantity,
        LineTotal = item.LineTotal,
    };
}
