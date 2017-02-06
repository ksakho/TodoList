angular.module('todos').service('ListTask', function(){
    this.list_tasks = []
    this.add = function(newTask){
        this.list_tasks.push(newTask)
    }
    this.empty = function(){
        this.list_tasks.length = 0;
    }
})