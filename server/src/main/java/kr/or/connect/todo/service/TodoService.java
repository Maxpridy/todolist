package kr.or.connect.todo.service;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	
//	public Todo findById(Integer id){
//		return new Todo("findById의 요소");
//	}
//	
//	
//	public Collection<Todo> findAll(){
//		return Arrays.asList(
//				new Todo("findall 첫번째요소"),
//				new Todo("findall 두번째요소"));
//	}
	
//	private ConcurrentMap<Integer, Todo> repo = new ConcurrentHashMap<>();
//	private AtomicInteger maxId = new AtomicInteger(0);
	
	private TodoDao dao;
	
	public TodoService(TodoDao dao){
		this.dao = dao;
	}
	


	
//	public Todo findById(Integer id){
//		return repo.get(id);
//	}
	
	public Todo findById(Integer id){
		return dao.selectById(id);
	}
	
//	public Collection<Todo> findAll(){
//		return repo.values();
//	}
	
	public Collection<Todo> findAll(){
		return dao.selectAll();
	}
	
//	public Todo create(Todo todo){
//		Integer id = maxId.addAndGet(1);
//		todo.setId(id);
//		repo.put(id, todo);
//		return todo;
//		
//	}
	
	public Todo create(Todo todo){
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}
	
	
//	public boolean update(Todo todo){
//		Todo old = repo.put(todo.getId(), todo);
//		return old != null;
//	}
	
	public boolean update(Todo todo){
		int affected = dao.update(todo);
		return affected == 1;
	}
	
//	public boolean delete(Integer id){
//		Todo old = repo.remove(id);
//		return old != null;
//	}
	
	public boolean delete(Integer id){
		int affected = dao.deleteById(id);
		return affected == 1;
	}
	
	
}
