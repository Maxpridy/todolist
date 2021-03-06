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

	private TodoDao dao;
	
	public TodoService(TodoDao dao){
		this.dao = dao;
	}
	
	public Todo findById(Integer id){
		return dao.selectById(id);
	}
	
	public Collection<Todo> findAll(){
		return dao.selectAll();
	}
	
	public Collection<Todo> findByCompleted(Integer completed){
		return dao.selectByCompleted(completed);
	}
	
	public Todo create(Todo todo){
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}
	
	public boolean update(Todo todo){
		int affected = dao.update(todo);
		return affected == 1;
	}
	
	public boolean delete(Integer id){
		int affected = dao.deleteById(id);
		return affected == 1;
	}
	
	public boolean clearCompleted(){
		int affected = dao.clearCompleted();
		return affected == 1;
	}
}
