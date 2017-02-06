angular.module('todos').service('ListTodo', function(){
    this.list_todos = []
    this.addTodo = function(newtodo){
        this.list_todos.push(newtodo)
    }
})