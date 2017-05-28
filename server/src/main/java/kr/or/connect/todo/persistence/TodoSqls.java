package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String COUNT_TODO = 
			"SELECT COUNT(*) FROM todo";
	static final String SELECT_ALL = 
			"SELECT id, todo, completed, date FROM todo";
	static final String SELECT_BY_ID = 
			"SELECT id, todo, completed, date FROM todo WHERE id = :id";
	static final String SELECT_BY_COMPLETED = 
			"SELECT id, todo, completed, date FROM todo WHERE completed = :completed";
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	static final String DELETE_ALL_COMPLETED =
			"DELETE FROM todo WHERE completed = 1";
	static final String UPDATE = 
			"UPDATE todo SET\n"
			+ "todo = :todo,"
			+ "completed = :completed,"
			+ "date = :date\n"
			+ "WHERE id = :id";
	
	
}
