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
      </div>
    );
  }
}
