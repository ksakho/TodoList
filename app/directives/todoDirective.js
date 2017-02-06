angular.module('todos').directive('todo', ['ListTodo', function(ListTodo){
    return {
        restrict : 'E',
        templateUrl : 'app/templates/todo.html',
        link : function(scope, element, attrbs){
            
            scope.showTasks = function(){
                scope.todo.showTasks()
            }

            scope.delete = function(){
                scope.todo.delete()
            }

            scope.edit = function(){
                scope.todo.label = scope.editedTdodo
                scope.todo.edit()
            }
        }
    }
}])