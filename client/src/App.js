import React, { PureComponent } from "react";
import Header from "./Header";
import { default as crypto } from "crypto";

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

  // DELETE - get rid of task
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

  // construct the task list from the api response
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
    // TODO: find a better workaround or solution
    // the double function call is hackish but the only way I can figure out to get the db insertion to persist immediately
    this.getTaskList();
    this.getTaskList();
  }

  // this gets triggered on clicking the submit button on the form; also called to construct the task list
  addTask(task) {
    const taskList = this.state.taskList;

    // might want to arrange this as a dictionary later on
    let newTask = {
      // generate unique id
      id: crypto.randomBytes(16).toString("hex"),
      name: task[0],
      date: task[1],
      type: task[2],
      isFinished: task[3],
      notes: task[4]
    }

    // add the new task into the state
    this.setState({
      taskList: taskList.concat(newTask),
      taskListLength: taskList.length,
    })

    // API call to insert into DB 
    this.createNewTask(newTask);
  }

  removeTask(i) {
    let taskList = this.state.taskList;

    // remove task from database
    this.destroyTask(taskList[i].id);

    // necessary because splice alters the array in place and we need to keep it immutable because React
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
        {/* this should be on a separate page with its own route */}
        <TaskForm addTask={this.addTask.bind(this)} />
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
        <td className="no-border"><button type="button" className="btn btn-danger" onClick={() => this.props.action(this.props.id)}>Remove</button></td>
        {/* TODO: add the edit route based on item id */}
        <td className="no-border"><button type="button" className="btn btn-warning">Edit</button></td>
      </tr>
    );
  }
}

class TaskList extends React.Component {
  render() {
    const items = [];

    let taskList = this.props.value.taskList;

    for (let i = 0; i < taskList.length; i++) {
      // pass info as props to the task render function
      items.push(<Task key={i} id={i} action={this.props.action} name={taskList[i].name} date={taskList[i].date} type={taskList[i].type} isFinished={taskList[i].isFinished} notes={taskList[i].notes} />)
    }
    return (
      // should change this to a React table 
      <table className="table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Due Date</th>
            <th>Type</th>
            <th>isFinished</th>
            <th>Notes</th>
          </tr>
        </thead>
          <tbody>
          {items}
        </tbody>
      </table>
    );
  }
}

class TaskForm extends React.Component {
  // necessary to deal with the radio buttons
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isFinished: ''
    };
  }

  // more radio button code
  handleChange(event) {
    this.setState({
      isFinished: event.target.value
    });
  }

  // TODO: should be using react-bootstrap and not regular react
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
          {/* radio buttons seem tricky in React */}
          <p>Finished?</p>
          <ul>
          <li>
            <label>
              <input
                type="radio"
                value="yes"

                checked={this.state.isFinished === "yes"}
                onChange={this.handleChange}
              />
              Yes
            </label>
          </li>
          
          <li>
            <label>
              <input
                type="radio"
                value="no"
                checked={this.state.isFinished === "no"}
                onChange={this.handleChange}
              />
              No
            </label>
          </li>
          </ul>
          
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea type="textarea" className="form-control" ref="notes"></textarea>
          </div> 
          {/* submit the new task and trigger entry into DB */}
          <button type="button" className="btn btn-primary" onClick={this.addTaskHelper.bind(this)}>Submit</button>
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
        
        // stored in the local state bc radio buttons
        this.state.isFinished,
        this.refs.notes.value
      ];

    this.props.addTask(newTask);
  }
}
