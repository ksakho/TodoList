angular.module('todos').controller('taskController', ['$scope', '$http', 'ListTask', 'Task', 'ListTodo',  
    function($scope, $http, ListTask, Task, ListTodo){

    $scope.list_tasks = ListTask.list_tasks
    $scope.isClicked = ListTask
    $scope.isEditClicked = true
    //model is inside a ng-if (ng-if create a scope child so that we lost the model) 
    //create our model as an object is a solution
    $scope.editedTask = {check:null}


    $scope.editCollaps = function(){
        if(this.isEditClicked)
            this.isEditClicked = false
        else
            this.isEditClicked = true    
    }

    $scope.addTask = function(){
        var tsk = {
            text : $scope.newTask,
            list_id : ListTask.todo.id
        }
        var newTask = new Task(tsk)
        newTask.add()
        //update count of tasks in list of todos
        ListTodo.list_todos[ListTodo.list_todos.indexOf(ListTask.todo)].todos.push(newTask)
        $scope.newTask = ""
    }
}])