(function (window) {
	'use strict';

	var ENTER_KEY = 13;
	var STATE; // 0: all, 1: active, 2: completed

	var App = {

		init: function(){
			STATE = 0;
			this.render();
			this.bindEvents();
		},

		render: function () {
			this.todos = this.fetchAllTodos();
			console.log(App.todos);
			this.FilteredTodos();
			this.getActiveTodoNumsAndS();
			$('#new-todo').focus();
		},

		bindEvents: function () {
			$('.new-todo').on('keyup', this.create.bind(this));

			$('#allTodos').on('click', this.allRender.bind(this));
			$('#activeTodos').on('click', this.activeRender.bind(this));
			$('#completedTodos').on('click', this.completedRender.bind(this));

			$('.todo-list').on('click', '.destroy', this.destroy.bind(this));
			$('.todo-list').on('change', '.toggle', this.checkCheckbox.bind(this));

			$('.clear-completed').on('click', this.clearCompleted.bind(this));
		},

		allRender:function(){
			STATE = 0;
			$('.filters li a.selected').removeClass();
			$('#allTodos').attr('class', 'selected');
			this.render();
		},

		activeRender: function(){
			STATE = 1;
			$('.filters li a.selected').removeClass();
			$('#activeTodos').attr('class', 'selected');
			this.render();
		},

		completedRender: function(){
			STATE = 2;
			$('.filters li a.selected').removeClass();
			$('#completedTodos').attr('class', 'selected');
			this.render();
		},

		getIndexTodos: function (e_target) {
			var id = $(e_target).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},

		FilteredTodos: function(){
			if(STATE === 1){
				return this.getTodos("/active");
			}
			if(STATE === 2){
				return this.getTodos("/completed");
			}
			else{
				return this.getTodos("");
			}
		},

		draw: function(todos) {
			var lis = [];

			for(var i = todos.length-1; i > -1; i--) {
				var injectClassCompleted = '';
				var injectChecked = '';
				if(todos[i].completed == 1) {
					injectClassCompleted = ' class="completed"';
					injectChecked = ' checked';
				}
				lis.push("<li" + injectClassCompleted + " data-id=" + todos[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'" + injectChecked + "><label>" + todos[i].todo + "</label><button class='destroy'></button></div></li>");
			}

			$('.todo-list').html(lis);
		},

		getActiveTodoNumsAndS: function(){
			var leftActiveTodos = 0;
			var resultText;
			console.log(this.todos);
			console.log(App.todos);
			for (var i=0; i<this.todos.length; i++){
				if(this.todos[i].completed == 0){
					leftActiveTodos++;
				}
			}


			if(leftActiveTodos == 1){
				resultText = leftActiveTodos + " item left";
			}
			else{
				resultText = leftActiveTodos + " items left";
			}
			$('.todo-count strong').text(resultText);

		},

		checkCheckbox: function (e) {
			var i = this.getIndexTodos(e.target);
			if(this.todos[i].completed === 0){
				this.todos[i].completed = 1;
			}
			else{
				this.todos[i].completed = 0;
			}

			this.update(this.todos, i);
		},

		create: function (event) {
			var $input = $(event.target);
			var val = $input.val().trim();

			if (event.which !== ENTER_KEY || !val) {
				return;
			}

			$.ajax({
		        "url": "./api/todos",
		        "method": "POST",
		        "headers": {
		          "content-type": "application/json",
		        },
		        "data": JSON.stringify({
		            "todo":val
		        }),
		    }).done(function(data){
				$input.val("");
				App.render();
			}).fail(function(error){
				alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
				location.href = "./";
			})
		},

		destroy: function(event) {
			var delid = $(event.target).closest('li').data('id');

			$.ajax({
				"url": "./api/todos/" + delid,
				"method": "DELETE",
				"headers": {
				  "content-type": "application/json",
			  	}
			}).done(function(data){
				App.render();
			}).fail(function(){
				alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
				location.href = "./";
			})
		},

		fetchAllTodos: function(){
			var ret;
			$.ajax({
				"url": "./api/todos",
				"method": "GET",
				"dataType": "json",
				"async": false,
				success: function(data){
					ret = data;
				},
				error: function() {
					alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
					location.href = "./";
				}
			})
			return ret;
		},

		getTodos: function(urlpath){
			$.ajax({
				"async": false,
				"url": "./api/todos/" + urlpath,
				"method": "GET",
				"dataType": "json",
				"success": this.draw,
				error: function() {
					alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
					location.href = "./";
				}
			})
		},

		update: function(data, i){
			var idval = data[i].id;
			$.ajax({
				"async": false,
				"url":"./api/todos/" + idval,
				"method": "PUT",
				"data": data[i],
				"data": JSON.stringify(data[i]),
				"dataType": "json",
				"headers": {
					"content-type": "application/json",
					"cache-control": "no-cache"
				},
				error: function() {
					alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
					location.href = "./";
				}
			});

			this.render();
		},

		clearCompleted: function(){
			STATE = 0;
			$.ajax({
				"async": false,
				"crossDomain": true,
				"url": "./api/todos/",
				"method": "DELETE",
				"headers": {
					"content-type": "application/json",
					"cache-control": "no-cache",
				},
				error: function() {
					alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
					location.href = "./";
				}
			});

			this.allRender();
		}
	};

	App.init();
})(window);
