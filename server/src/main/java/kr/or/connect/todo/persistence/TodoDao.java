package kr.or.connect.todo.persistence;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.todo.domain.Todo;

@Repository
public class TodoDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	
	public TodoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("todo")
				.usingGeneratedKeyColumns("id");
	}
	
	
	
	public int countTodos(){
		Map<String, Object> params = Collections.emptyMap();
		return jdbc.queryForObject(TodoSqls.COUNT_TODO, params, Integer.class);
	}
	

	
	public Todo selectById(Integer id){
		RowMapper<Todo> rowMapper = BeanPropertyRowMapper.newInstance(Todo.class);
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		return jdbc.queryForObject(TodoSqls.SELECT_BY_ID, params, rowMapper);
	}
	
	
	public Integer insert(Todo todo){
		SqlParameterSource params = new BeanPropertySqlParameterSource(todo);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	
	private RowMapper<Todo> rowMapper = BeanPropertyRowMapper.newInstance(Todo.class);
	public List<Todo> selectAll(){
		Map<String, Object> params = Collections.emptyMap();
		return jdbc.query(TodoSqls.SELECT_ALL,  params, rowMapper);
	}
	
	public List<Todo> selectByCompleted(Integer completed){
		RowMapper<Todo> rowMapper = BeanPropertyRowMapper.newInstance(Todo.class);
		Map<String, Object> params = new HashMap<>();
		params.put("completed", completed);
		return jdbc.query(TodoSqls.SELECT_BY_COMPLETED, params, rowMapper);
	}	
	
	public int deleteById(Integer id){
		Map<String, ?> params = Collections.singletonMap("id",  id);
		return jdbc.update(TodoSqls.DELETE_BY_ID,  params);
	}
	
	public int update(Todo todo){
		SqlParameterSource params = new BeanPropertySqlParameterSource(todo);
		return jdbc.update(TodoSqls.UPDATE, params);
	}
	
	public int clearCompleted(){
		Map<String, ?> params = Collections.emptyMap();
		return jdbc.update(TodoSqls.DELETE_ALL_COMPLETED, params);
	}
}
