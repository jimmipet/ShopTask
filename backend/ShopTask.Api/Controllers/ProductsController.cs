using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopTask.Api.DAL;
using ShopTask.Api.Modules.Products.Domain.Entities;
using ShopTask.Api.Modules.Products.Domain.Exceptions;
using ShopTask.Api.Modules.Products.DTO;

namespace ShopTask.Api.Controllers;

[ApiController]
[Route("api/products")]
public sealed class ProductsController(ShopDbContext db) : ControllerBase
{
    private static readonly Uri FakeStoreProductsUrl = new("https://fakestoreapi.com/products");

    [HttpGet]
    public async Task<ProductResponse[]> GetProducts(CancellationToken cancellationToken)
    {
        var products = await db.Products.OrderBy(product => product.Id).ToArrayAsync(cancellationToken);
        return [.. products.Select(ToResponse)];
    }

    [HttpGet("{id:int}")]
    public async Task<ProductResponse> GetProduct(int id, CancellationToken cancellationToken) =>
        ToResponse(await FindProductAsync(id, cancellationToken));

    [HttpPost]
    public async Task<ActionResult<ProductResponse>> CreateProduct(
        ProductRequest request,
        CancellationToken cancellationToken)
    {
        var product = Product.Create(request.Title, request.Price, request.Category, request.Description, request.Image);
        db.Products.Add(product);
        await db.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, ToResponse(product));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductRequest request, CancellationToken cancellationToken)
    {
        var product = await FindProductAsync(id, cancellationToken);
        product.Update(request.Title, request.Price, request.Category, request.Description, request.Image);
        await db.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    [HttpPost("import")]
    public async Task<ProductResponse[]> ImportFakeStoreProducts(
        [FromServices] IHttpClientFactory httpClientFactory,
        CancellationToken cancellationToken)
    {
        var fakeProducts = await httpClientFactory.CreateClient()
            .GetFromJsonAsync<FakeStoreProduct[]>(FakeStoreProductsUrl, cancellationToken) ?? [];

        var existingTitles = await db.Products.Select(product => product.Title).ToHashSetAsync(cancellationToken);
        var newProducts = fakeProducts
            .Where(fake => !existingTitles.Contains(fake.Title.Trim()))
            .Select(fake => Product.Create(fake.Title, fake.Price, fake.Category, fake.Description, fake.Image))
            .ToArray();

        db.Products.AddRange(newProducts);
        await db.SaveChangesAsync(cancellationToken);

        return [.. newProducts.Select(ToResponse)];
    }

    private async Task<Product> FindProductAsync(int id, CancellationToken cancellationToken) =>
        await db.Products.FindAsync([id], cancellationToken) ?? throw new ProductNotFoundException(id);

    private static ProductResponse ToResponse(Product product) => new()
    {
        Id = product.Id,
        Title = product.Title,
        Price = product.Price,
        Category = product.Category,
        Description = product.Description,
        Image = product.Image,
    };
}
