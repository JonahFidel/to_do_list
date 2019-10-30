import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";

export default class App extends PureComponent {
  
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    // let firstTask = {
    //   name: "firstTask",
    //   date: "12/8/1992",
    //   type: "project",
    //   isFinished: "false",
    //   notes: "green eggs and ham."
    // }
    // let secondTask = {
    //   name: "secondTask",
    //   date: "11/1/2019",
    //   type: "task",
    //   isFinished: "false",
    //   notes: "This one will take a while."
    // }
    // let thirdTask = {
    //   name: "thirdTask",
    //   date: "3/1/2222",
    //   type: "song",
    //   isFinished: "true",
    //   notes: "hippopotomus."
    // }
    this.state = {
      taskList: [
          // firstTask,
          // secondTask,
          // thirdTask
        // "shopping", "cleaning", "house work",
      ],
      taskListLength: 3,
    };
  }

  callSeedAPI() {
    fetch("http://localhost:9000/seedAPI")
        .then(res => res.json())
        .then(res => this.parseResponse(res))
}

callCreateAPI(newTask) {
  fetch('http://localhost:9000/create',{
    method: 'POST',
    body: JSON.stringify({
      task: newTask
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(function(response){
    return response.json()
  }).then(function(body){
    console.log(body);
  });
}

parseResponse(res){
  let taskList = [];
  for(var i = 0; i < res.length; i++){
    taskList.push(res[i])
  }
  console.log("hello world");
  this.setState({
    taskList: taskList,
    taskListLength: taskList.length
  })
}

// componentWillMount() {
//   setTimeout(function() {window.location.reload()}, 1);
// }

componentDidMount() {
  // window.location.reload();
  // setTimeout(function() {window.location.reload()}, 0);

  this.callSeedAPI();
  this.callSeedAPI();
}

// componentDidUpdate(){
//   this.callSeedAPI();
// }
  // probably should rename this
  addTask(task) {
    const taskList = this.state.taskList;
    console.log(task);
    // might want to arrange this as a dictionary
    let newTask = {
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
    this.callCreateAPI(newTask);
  }


  // TODO: Fix bug here - if you add a task and then delete the task immediately above it, two tasks get removed



  removeItem(i){
    let taskList = this.state.taskList;

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
        <TaskList action={this.removeItem} value={this.state} />
        <TaskForm addTask={this.addTask.bind(this)}/>
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
      items.push(<Task key={i} id={i} action={this.props.action} name={taskList[i].name} date={taskList[i].date} type={taskList[i].type} isFinished={taskList[i].isFinished} notes={taskList[i].notes}/>)
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
          <button className="btn btn-primary" onClick={this.update.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }

  update (e) {
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


// if (window.performance) {
//   if (performance.navigation.type == 1) {
//     setTimeout(function() {window.location.reload()}, 100);
//   } else {
//     alert( "This page is not reloaded");
//   }
// }