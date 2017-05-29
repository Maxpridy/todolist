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
			this.getFilteredTodos();
			this.getActiveTodoNumsAndS();
			$('#new-todo').focus();
		},

		bindEvents: function () {
			$('.new-todo').on('keyup', this.create.bind(this));

			$('#allTodos').on('click', this.allRender.bind(this));
			$('#activeTodos').on('click', this.activeRender.bind(this));
			$('#completedTodos').on('click', this.completedRender.bind(this));

			$('.todo-list').on('click', '.destroy', this.destroy.bind(this));
			$('.todo-list').on('change', '.toggle', this.update.bind(this));

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

		getFilteredTodos: function(){
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
				lis.push("<li" + injectClassCompleted + " data-id=" + todos[i].id + ">" + "\
							<div class='view'>\
								<input class='toggle' type='checkbox'" + injectChecked + ">\
								<label>" + todos[i].todo + "</label>\
								<button class='destroy'></button>\
							</div>\
						</li>");
			}

			$('.todo-list').html(lis);
		},

		getActiveTodoNumsAndS: function(){
			$.ajax({
				"url": "./api/todos/active",
				"method": "GET",
				"dataType": "json"
			}).done(function(data){
				var leftActiveTodos = 0;
				var resultText;
				for (var i=0; i<data.length; i++){
					if(data[i].completed == 0){
						leftActiveTodos++;
					}
				}

				if(leftActiveTodos == 0){
					resultText = "no item left";
				} else if(leftActiveTodos == 1){
					resultText = leftActiveTodos + " item left";
				} else{
					resultText = leftActiveTodos + " items left";
				}
				$('.todo-count strong').text(resultText);
			}).fail(function(error){
				alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
				location.href = "./";
			})
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

		getTodos: function(urlpath){
			$.ajax({
				"url": "./api/todos/" + urlpath,
				"method": "GET",
				"dataType": "json",
			}).done(function(data){
				App.draw(data);
			}).fail(function(error){
				alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
				location.href = "./";
			})
		},

		update: function(event){
			var e_target = event.target;
			$.ajax({
				"url": "./api/todos/",
				"method": "GET",
				"dataType": "json",
			}).done(function(data){
				var id = $(e_target).closest('li').data('id');
				var i = data.length;

				while (i--) {
					if (data[i].id === id) {
						break;
					}
				}
				data[i].completed = (data[i].completed === 0 ? 1 : 0);

				var target = data[i];
				var strtarget = JSON.stringify(target);
				$.ajax({
					"url":"./api/todos/" + target.id,
					"method": "PUT",
					"data": strtarget,
					"dataType": "json",
					"headers": {
						"content-type": "application/json",
					}
				}).done(function(data){
					App.render();
				}).fail(function(error){
					alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
					location.href = "./";
				})
			}).fail(function(error){
				alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
				location.href = "./";
			})
		},

		clearCompleted: function(){
			$.ajax({
				"url": "./api/todos/",
				"method": "DELETE",
				"headers": {
					"content-type": "application/json",
				}
			}).done(function(){
				App.render();
			}).fail(function(){
				alert("에러가 발생했습니다. 첫 페이지로 돌아갑니다.");
				location.href = "./";
			})
		}
	};

	App.init();
})(window);
