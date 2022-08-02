import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

// The value of ‘this’ in JavaScript functions is determined by how a function is called.
// Methods like call, apply, and bind explicitly set the value of ‘this’ in a function,
//  however if ‘this’ isn’t explicitly set, then ‘this’ will default to the global context.

class App extends Component {
  constructor() {
    super(); // automatic, syntax
    this.state = {
      robots: [],
      searchfield: "",
    };
  }
  //méthode de cycle de vie : pour appeler la méthode setState afin de changer l'état de l'application
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
    // setState = ppour changer un state The state of a component can change either due to a response to an action performed by the user or an event triggered by the system. Whenever the state changes, React re-renders the component to the browser. Before updating the value of the state, we need to build an initial state setup. Once we are done with it, we use the setState() method to change the state object. It ensures that the component has been updated and calls for re-rendering of the component.
  }

  onSearchChange = (event) => {
    // always use arrow function with this
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
