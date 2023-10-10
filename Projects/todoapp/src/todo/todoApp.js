import React from "react";
import TodoList from "./todoList";

// create TodoApp class and import React from the react library

class ToDoApp extends React.Component {

    constructor() {
        super();
        this.state = {
            inputData: "", //This state property will hold the todo input value
            todoItems: [] //This state property will store todo items in an array formate
        }
    }
    //This method will execute when you start typing into the input 
    //field and will update the existing value.
    changeTodoInput = (event) => {

this.setState({inputData:event.target.value})

    }
//his method will execute while you click the add button and will update the todoItems
addTodo = (event) => {
    if(this.state.inputData !== ""){
        let newTodoItems = [...this.state.todoItems,this.state.inputData];
        this.setState({todoItems:newTodoItems,inputData:""})
    }
}
//This will execute while you click the cross (x) button and will remove items from the todoItems based on the passing index as an argument from this method.
deleteTodo = (index) => {
    let todoItems = [...this.state.todoItems];
    let newTodoItems = todoItems.filter((value,key) => {
        return index !== key
    })
    this.setState({todoItems:newTodoItems})
}

render() {

    return (
        <div className="container">
     <div className="row">
       <div className="col-sm-4">
         <h3 className="text-center">React Todo App</h3>
         <div className="input-group">
                <input type="text" placeholder="Enter Something" className="form-control" onChange={this.changeTodoInput} value={this.state.inputData}/>
                <div className="input-group-append">
                <span className="btn btn-success " onClick={this.addTodo}>Add</span> 
                </div>
            </div> 
                 <TodoList items={this.state.todoItems} deleteTodo={this.deleteTodo}/>
       </div>
     </div>
   </div>
    );
}

}

export default ToDoApp;