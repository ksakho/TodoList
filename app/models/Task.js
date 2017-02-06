angular.module('todos').service('Task', ['$http', 'ListTask', 'ListTodo', function($http, ListTask, ListTodo){
    var Task = function(task){
        this.id = task.id
        this.done = task.done
        this.priority = task.priority
        this.text = task.text
        this.updated_at = task.updated_at
        this.list_id = task.list_id
    }

    Task.prototype.add = function(){
        $http({
            method : 'POST',
            url : 'http://todos.api.netlor.fr/lists/'+this.list_id+'/todos',
            headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            },
            data : JSON.stringify(this)
        }).then(function(response){
            ListTask.add(new Task(response.data))
        },function(error){
            console.log(error)
        })
    }

    Task.prototype.delete = function(){
        var _this = this
       $http({
            method : 'DELETE',
            url : 'http://todos.api.netlor.fr/lists/'+this.list_id.$oid+'/todos/'+this.id,
            headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            }
        }).then(function(response){
            ListTask.list_tasks.splice(ListTask.list_tasks.indexOf(_this),1)
            //update count of tasks in list of todos
            ListTodo.list_todos[ListTodo.list_todos.indexOf(ListTask.todo)].todos.splice(this,1)
        },function(error){console.log(error)})
    }

    Task.prototype.isDone = function(){
        var _this = this
        $http({
            method : 'PUT',
            url : 'http://todos.api.netlor.fr/lists/'+this.list_id.$oid+'/todos/'+this.id+'/done',
            headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            }
        }).then(function(response){
            ListTask.list_tasks.splice(ListTask.list_tasks.indexOf(_this),1)
            ListTask.add(new Task(response.data))
        },function(error){
            console.log(error)
        })
    }

    Task.prototype.undone = function(){
        var _this = this
        $http({
            method : 'PUT',
            url : 'http://todos.api.netlor.fr/lists/'+this.list_id.$oid+'/todos/'+this.id+'/undone',
            headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            }
        }).then(function(response){
            ListTask.list_tasks.splice(ListTask.list_tasks.indexOf(_this),1)
            ListTask.add(new Task(response.data))
        },function(error){
            console.log(error)
        })
    }

    Task.prototype.edit = function(){
        $http({
            method : 'PUT',
            url : 'http://todos.api.netlor.fr/lists/'+this.list_id.$oid+'/todos/'+this.id,
            headers : {
                'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
                'Content-Type' : "application/json"
            },
            data : {'text':this.text}
        }).then(function(response){
            //console.log(response.data)
        },function(error){
            console.log(error)
        })   
    }

    return Task
}])
