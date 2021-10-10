using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Get(object id);
        ValueTask<TEntity> GetAsync(object id);
        IEnumerable<TEntity> GetAll();
        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);
        void Remove(TEntity entity);
        TEntity Single(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> SingleAsync(Expression<Func<TEntity, bool>> predicate);
        void RemoveRange(IEnumerable<TEntity> entities);
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
