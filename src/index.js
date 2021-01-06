import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
const rootElement = document.getElementById("root");

class Todo extends React.Component {
  mystyle = {
    textDecoration: "line-through"
  };
  render() {
    return (
      <li>
        <input
          type="checkbox"
          checked={this.props.todo.checked}
          onChange={() => {
            this.props.changeCheck(this.props.todo);
          }}
        />
        <button
          onClick={() => {
            this.props.delete(this.props.todo.id);
          }}
        >
          delete
        </button>
        <span style={this.props.todo.checked ? this.mystyle : {}}>
          {" "}
          {this.props.todo.text}
        </span>
      </li>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
    this.lastId = 0;
    this.deleteItem = this.deleteItem.bind(this);
  }
  addItem = () => {
    let text = prompt("Add Text for Todo");
    let id_new = this.lastId + 1;
    this.lastId++;
    this.setState({
      todos: [...this.state.todos, { text: text, id: id_new, checked: false }]
    });
  };

 
  changeCheck = (element) => {
    let index = this.state.todos.indexOf(element);
    let temp = this.state.todos;
    temp[index].checked = !temp[index].checked;
    this.setState({
      todos: temp
    });
  };

  deleteItem = (id) => {
    let newTodo = this.state.todos.filter((el) => {
      if (el.id !== id) {
        return el;
      }
    });

    this.setState({
      todos: newTodo
    });
  };
  render() {
    return (
      <div>
        <h1>This is Todo App</h1>
        <button
          onClick={() => {
            this.addItem();
          }}
        >
          push me to add{" "}
        </button>
        <ol>
          {this.state.todos.map((todo) => {
            return (
              <Todo
                key
                changeCheck={this.changeCheck}
                delete={this.deleteItem}
                todo={todo}
              />
            );
          })}
        </ol>
      </div>
    );
  }
}

ReactDOM.render(<App />, rootElement);
