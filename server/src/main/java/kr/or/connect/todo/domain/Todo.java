package kr.or.connect.todo.domain;

import java.sql.Date;

public class Todo {

	private Integer id;
	private String todo;
	private int completed = 0;
	private Date date = new Date(System.currentTimeMillis());
	
	
	public Todo(){
		
	}
	
	public Todo(String todo){
		this.todo = todo;
	}
	
	public Todo(int completed){
		this.completed = completed;
	}
	
	public Todo(Integer id, String todo){
		this.todo = todo;
	}
	
	public Todo(String todo, int completed, Date date) {

		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}
	
	public Todo(Integer id, String todo, int completed, Date date) {
		super();
		this.id = id;
		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}
	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	}
	public int getCompleted() {
		return completed;
	}
	public void setCompleted(int completed) {
		this.completed = completed;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", todo=" + todo + ", completed=" + completed + ", date=" + date + "]";
	}
	
	
}
