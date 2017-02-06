angular.module('todos').directive('task', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/templates/task.html',
        link : function(scope, element, attrbs){
            
            scope.done = function(){
                scope.task.isDone()
            }

            scope.undone = function(){
                scope.task.undone()
            }

            scope.delete = function(){
                scope.task.delete()
            }

            scope.edit = function(){
                scope.task.text = scope.editedTask.check
                scope.task.edit()
                scope.isEditClicked = false
            }

        }
    }
})