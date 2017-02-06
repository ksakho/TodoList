angular.module('todos').controller('todoController', ['$scope','$http', 'Todo', 'ListTodo', function($scope, $http, Todo, ListTodo){
    
    $scope.isEditClicked = true
    
    $http({
        method: 'GET',
        url: 'http://todos.api.netlor.fr/lists',
        headers: {
            'Authorization': "Token token=6102e43759604047851c7b1d6f9e401b",
            'Content-Type' : "application/json"
        },
        }).then(function (response) {
            response.data.forEach(function(element) {
               ListTodo.addTodo(new Todo(element)) 
            });
            $scope.listTodo = ListTodo.list_todos
        }, function (error) {
            console.log(error)
    })

    $scope.editCollaps = function(){
        if(this.isEditClicked)
            this.isEditClicked = false
        else
            this.isEditClicked = true    
    }

    $scope.add = function(){
        var newTodo = new Todo($scope.newTodo)
        newTodo.add()
        $scope.newTodo = ""
    }

    
}])