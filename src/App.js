import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [
        // {
        //   firstTask: {
        //     "name": "firstTask",
        //     "date": "11/1/2019",
        //     "type": "project",
        //     "isFinished": "false",
        //     "notes": "This one will take a while."
        //   },
        //   secondTask: {
        //     "name": "firstTask",
        //     "date": "11/1/2019",
        //     "type": "project",
        //     "isFinished": "false",
        //     "notes": "This one will take a while."
        //   },
        //   thirdTask: {
        //     "name": "firstTask",
        //     "date": "11/1/2019",
        //     "type": "project",
        //     "isFinished": "false",
        //     "notes": "This one will take a while."
        //   }
        // }
        "shopping", "cleaning", "house work",
      ],
    };
  }

  handleClick() {
    const taskList = this.state.taskList;
    this.setState({
      taskList: taskList.concat(["green"]),   
    });
  }

  render() {
    return (
      <div>
        <Header />
        <TaskList value={this.state} />
        <TaskForm/>
      </div>
    );
  }
}

class Task extends React.Component {
  render() {
    return (
      <tbody>
      <tr>
            <td>firstTask</td>
            <td>11/1/2019</td>
            <td>project</td>
            <td>false</td>
            <td>This one will take a while.</td>
          </tr>
      </tbody>
     
    );
  }
}

class TaskList extends React.Component {
  render() {
    const items = [];

    for (let i = 0; i < this.props.value.taskList.length; i++) {
      items.push(<Task key={i}/>)
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
            <input type="text" className="form-control" id="nameOfTask" placeholder="Enter a task"></input>
          </div>
          <div className="form-group">
            <label htmlFor="taskDueDate">Due Date</label>
            <input type="date" className="form-control" id="taskDueDate"></input>
          </div>
          <div className="form-group">
            <label htmlFor="taskType">Type of Task</label>
            <input type="text" className="form-control" id="taskType" placeholder="project"></input>
          </div>
          <div className="form-group">
            <label htmlFor="isFinished">isFinished</label>
            <input type="boolean" className="form-control" id="isFinished"></input>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea type="textarea" className="form-control" id="notes"></textarea>
          </div>
          {/* <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
