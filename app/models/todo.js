angular.module('todos').service('Todo', ['$http', 'ListTodo', 'ListTask', 'Task', function( $http, ListTodo, ListTask, Task){
    var Todo = function(l){
        this.label = l.label
        this.id = l.id
        this.todos = l.todos
    }

    Todo.prototype.add = function(){
        $http({
            method : 'POST',
            url : 'http://todos.api.netlor.fr/lists',
            headers: {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            },
            data : JSON.stringify(this)
        }).then(function(response){
            ListTodo.addTodo(new Todo(response.data))
        },function(error){console.log(error)})
    }

    Todo.prototype.delete = function(){
       var _this = this
       $http({
           method : 'DELETE',
           url : 'http://todos.api.netlor.fr/lists/'+this.id,
           headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
           }
       }).then(function(response){
           ListTodo.list_todos.splice(ListTodo.list_todos.indexOf(_this),1)
       },function(error){
           console.log(error)
       })
    }

    Todo.prototype.showTasks = function(){
        var _this = this
        $http({
        method: 'GET',
        url: 'http://todos.api.netlor.fr/lists/'+this.id+'/todos',
        headers: {
            'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
            'Content-Type' : "application/json"
            }
        }).then(function(response){
            ListTask.empty()
            ListTask.todo = _this
            response.data.forEach(function(element) {
                ListTask.add(new Task(element))
            })
        },function(error){
            console.log(error)
        })
    }

    Todo.prototype.edit = function(){
        $http({
            method : 'PUT',
            url : 'http://todos.api.netlor.fr/lists/'+this.id,
            headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            },
            data : {'label' : this.label}
        }).then(function(response){
            
        },function(error){
            console.log(error)
        })
    }

    return Todo
}])
