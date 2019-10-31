import React, { PureComponent } from "react";
import Header from "./Header";
import {default as crypto} from "crypto";

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this);
    this.state = {
      // initial state
      taskList: [],
      taskListLength: 0,
    };
  }

  // INDEX - task list
  getTaskList() {
    fetch("http://localhost:9000/task")
      .then(res => res.json())
      .then(res => this.parseResponse(res))
  }

  // CREATE - new task
  createNewTask(newTask) {
    fetch('http://localhost:9000/task', {
      method: 'POST',
      body: JSON.stringify({
        task: newTask
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function (response) {
        return response.json()
      });
  }

  destroyTask(id) {
    fetch('http://localhost:9000/task/:id', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function (response) {
        return response.json()
      });
  }

  parseResponse(res) {
    let taskList = [];
    for (var i = 0; i < res.length; i++) {
      taskList.push(res[i])
    }
    this.setState({
      taskList: taskList,
      taskListLength: taskList.length
    })
  }

  componentDidMount() {
    // the double function call is hackish but the only way I can figure out to get the db insertion to persist immediately
    this.getTaskList();
    this.getTaskList();
  }

  // this gets triggered on clicking the submit button on the form, also called to construct the task list
  addTask(task) {
    const taskList = this.state.taskList;

    // might want to arrange this as a dictionary
    let newTask = {
      // generate unique id
      id: crypto.randomBytes(16).toString("hex"),
      name: task[0],
      date: task[1],
      type: task[2],
      isFinished: task[3],
      notes: task[4]
    }
    this.setState({
      taskList: taskList.concat(newTask),
      taskListLength: taskList.length,
    })
    this.createNewTask(newTask);
  }

  removeTask(i) {
    let taskList = this.state.taskList;

    // remove task from database
    this.destroyTask(taskList[i].id);

    // necessary because splice alters the array in place and we need to keep it immutable bc react
    const newTaskListStart = taskList.slice(0, i);
    const newTaskListEnd = taskList.slice(i + 1, this.state.taskListLength + 1);

    taskList = newTaskListStart.concat(newTaskListEnd);
    this.setState({
      taskList: taskList,
      taskListLength: taskList.length,
    })
  }

  render() {
    return (
      <div>
        <Header />
        <TaskList action={this.removeTask} value={this.state} />
        <TaskForm addTask={this.addTask.bind(this)} />
        {/* <p className="App-intro">{this.state.apiResponse}</p> */}
      </div>
    );
  }
}

class Task extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.date}</td>
        <td>{this.props.type}</td>
        <td>{this.props.isFinished}</td>
        <td>{this.props.notes}</td>
        <td><button onClick={() => this.props.action(this.props.id)}>Remove</button></td>
        <td><button>Edit</button></td>
      </tr>
    );
  }
}

class TaskList extends React.Component {
  render() {
    const items = [];

    let taskList = this.props.value.taskList;

    for (let i = 0; i < taskList.length; i++) {
      items.push(<Task key={i} id={i} action={this.props.action} name={taskList[i].name} date={taskList[i].date} type={taskList[i].type} isFinished={taskList[i].isFinished} notes={taskList[i].notes} />)
    }
    return (
      // should change this to a React table 
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Due Date</th>
            <th>Type</th>
            <th>isFinished</th>
            <th>Notes</th>
          </tr>
          {items}
        </tbody>
      </table>
    );
  }
}

class TaskForm extends React.Component {
  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="nameOfTask">Task Name</label>
            <input type="text" className="form-control" ref="nameOfTask" placeholder="Enter a task"></input>
          </div>
          <div className="form-group">
            <label htmlFor="taskDueDate">Due Date</label>
            <input type="date" className="form-control" ref="taskDueDate"></input>
          </div>
          <div className="form-group">
            <label htmlFor="taskType">Type of Task</label>
            <input type="text" className="form-control" ref="taskType" placeholder="project"></input>
          </div>
          {/* Need to make this a boolean */}
          <div className="form-group">
            <label htmlFor="isFinished">isFinished</label>
            <input type="boolean" className="form-control" ref="isFinished"></input>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea type="textarea" className="form-control" ref="notes"></textarea>
          </div>
          {/* <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
          <button className="btn btn-primary" onClick={this.addTaskHelper.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }

  addTaskHelper(e) {
    e.preventDefault(); // don't refresh the page upon form submit
    let newTask =
      [
        this.refs.nameOfTask.value,
        this.refs.taskDueDate.value,
        this.refs.taskType.value,
        this.refs.isFinished.value,
        this.refs.notes.value
      ];
    this.props.addTask(newTask);
  }
}
