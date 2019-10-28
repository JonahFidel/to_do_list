import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";

export default class App extends PureComponent {
  handler(task) {
    task.preventDefault(); // don't refresh the page upon form submit
    const taskList = this.state.taskList;
    let firstTask = {
      name: "firstTask",
      date: "12/8/1992",
      type: "project",
      isFinished: "false",
      notes: "Tgreen eggs and ham."
    }
    this.setState({
      taskList: taskList.concat(firstTask),
    })
  }

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    let firstTask = {
      name: "firstTask",
      date: "12/8/1992",
      type: "project",
      isFinished: "false",
      notes: "Tgreen eggs and ham."
    }
    let secondTask = {
      name: "secondTask",
      date: "11/1/2019",
      type: "task",
      isFinished: "false",
      notes: "This one will take a while."
    }
    let thirdTask = {
      name: "thirdTask",
      date: "3/1/2222",
      type: "song",
      isFinished: "true",
      notes: "hippopotomus."
    }
    this.state = {
      taskList: [
          firstTask,
          secondTask,
          thirdTask
        // "shopping", "cleaning", "house work",
      ],
    };
  }

  render() {
    return (
      <div>
        <Header />
        <TaskList value={this.state} />
        <TaskForm handler={this.handler}/>
      </div>
    );
  }
}

class Task extends React.Component {
  render() {
    return (
      <tbody>
      <tr>
            <td>{this.props.name}</td>
            <td>{this.props.date}</td>
            <td>{this.props.type}</td>
            <td>{this.props.isFinished}</td>
            <td>{this.props.notes}</td>
          </tr>
      </tbody>
     
    );
  }
}

class TaskList extends React.Component {
  render() {
    const items = [];

    let taskList = this.props.value.taskList;

    for (let i = 0; i < taskList.length; i++) {
      items.push(<Task key={i} name={taskList[i].name} date={taskList[i].date} type={taskList[i].type} isFinished={taskList[i].isFinished} notes={taskList[i].notes}/>)
    }
    return (
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Due Date</th>
          <th>Type</th>
          <th>isFinished</th>
          <th>Notes</th>
        </tr>
        {items}
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
          <button className="btn btn-primary" onClick={this.props.handler}>Submit</button>
        </form>
      </div>
    );
  }
}
