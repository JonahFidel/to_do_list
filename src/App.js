import React, { PureComponent } from "react";
import Header from "./Header";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
        <table class="table">
          <tr>
            <th>Name</th>
            <th>Due Date</th>
            <th>Type</th>
            <th>isFinished</th>
            <th>Notes</th>
          </tr>
          <tr>
            <td>firstTask</td>
            <td>11/1/2019</td>
            <td>project</td>
            <td>false</td>
            <td>This one will take a while.</td>
          </tr>
        </table>
        <br></br>
        <TaskForm />
      </div>
    );
  }
}

class Task extends React.Component {
  render() {
     return "" 
  }
}

class TaskList extends React.Component {
  render() {
    return ""
  }
}

class TaskForm extends React.Component {
  render() {
    return (
      <div class="container">
        <form>
          <div class="form-group">
            <label for="nameOfTask">Task Name</label>
            <input type="text" class="form-control" id="nameOfTask" placeholder="Enter a task"></input>
          </div>
          <div class="form-group">
            <label for="taskDueDate">Due Date</label>
            <input type="date" class="form-control" id="taskDueDate"></input>
          </div>
          <div class="form-group">
            <label for="taskType">Type of Task</label>
            <input type="text" class="form-control" id="taskType" placeholder="project"></input>
          </div>
          <div class="form-group">
            <label for="isFinished">isFinished</label>
            <input type="boolean" class="form-control" id="isFinished"></input>
          </div>
          <div class="form-group">
            <label for="notes">Notes</label>
            <textarea type="textarea" class="form-control" id="notes"></textarea>
          </div>
          {/* <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    );
  }
}
