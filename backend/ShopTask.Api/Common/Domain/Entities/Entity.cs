namespace ShopTask.Api.Common.Domain.Entities;

public abstract class Entity
{
    public DateTimeOffset CreationDate { get; set; }

    public DateTimeOffset ModificationDate { get; set; }
}

public abstract class Entity<TId> : Entity
{
    public TId Id { get; set; } = default!;
}
