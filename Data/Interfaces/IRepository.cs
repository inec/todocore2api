using System.Collections.Generic;
using System.Threading.Tasks;

namespace todo_core_webapi.Data.Interfaces
{
	public interface IRepository<T> where T: class 
    {
IEnumerable<T> GetAll();
          //  Task<IEnumerable<T>> GetAll();

		//Task<T> Get(int id);

		Task<Todo> Add(Todo todo);

		Task<Todo> Update(int id, Todo todo);

		Task Delete(int id);

		Task Clear();
    }
}