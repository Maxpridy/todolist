package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import kr.or.connect.todo.domain.Todo;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TodoDaoTest {

	
	@Autowired
	private TodoDao dao;
	
	@Test
	public void shouldCount(){
		int count = dao.countTodos();
		System.out.println(count);
	}
	
	@Test
	public void shouldInsertAndSelect(){
		
		Todo todo = new Todo("insertandselect test"); 
		
		Integer id = dao.insert(todo);
		
		Todo selected = dao.selectById(id);
		System.out.println(selected);
		assertThat(selected.getTodo(), is("insertandselect test"));
	}

	@Test
	public void shouldSelectAll(){
		List<Todo> allTodos = dao.selectAll();
		assertThat(allTodos, is(notNullValue()));
	}
	
	@Test
	public void shouldDelete(){
		Todo todo = new Todo("delete test");
		Integer id = dao.insert(todo);
		
		int affected = dao.deleteById(id);
	
		assertThat(affected, is(1));
	}
	
	@Test
	public void shouldUpdate(){
		Todo todo = new Todo("update test");
		Integer id = dao.insert(todo);
		
		todo.setId(id);
		todo.setTodo("This is an updated text.");
		int affected = dao.update(todo);
		
		assertThat(affected, is(1));
		Todo updated = dao.selectById(id);
		assertThat(updated.getTodo(), is("This is an updated text."));
	}
}
