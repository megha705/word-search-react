import React from 'react';
import ReactDOM from 'react-dom';

const UserGreeting = () => {
  return <p>We will check if strings exists in our 2D board</p>;
}

const BooleanList = (props) => {
  if (props.items.length === 0) {
    return <UserGreeting />
  }

  return (
    <div className="list-wrapper">
      <p>There are {props.items.length} words in the file you import</p>
      <ul>
        {
          props.items.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))
        }
      </ul>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.wordSearch = this.wordSearch.bind(this);
    this.existInGrid = this.existInGrid.bind(this);
  }

  wordSearch(string) {
    const grid = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E' ,'E']
    ];
    
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        if (this.existInGrid(grid, i, j, string, 0)) {
          return true;
        }
      }
    }

    return false;
  }

  existInGrid(grid, y, x, string, idx) {
    var result;

    if (idx === string.length) { return true }
    if (y < 0 || x < 0 || y === grid.length || x === grid[0].length) { return false }
    if (grid[y][x] !== string[idx]) { return false }

    grid[y][x] = '*'

    result = this.existInGrid(grid, y, x - 1, string, idx + 1) ||
             this.existInGrid(grid, y, x + 1, string, idx + 1) ||
             this.existInGrid(grid, y - 1, x, string, idx + 1) ||
             this.existInGrid(grid, y + 1, x, string, idx + 1)
    grid[y][x] = string[idx]

    return result
  }

  handleChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var result;
    
    reader.onload = function(event) {
      result = event.target.result.split("\n");
      result = result.map(this.wordSearch);
      result = result.map(function(element, idx) {
        return {value: String(element), id: 1};
      });
      this.setState({items: result});
    }.bind(this);
    reader.readAsText(file);
  }

  render() {
    return (
      <div style={divStyle}>
        <h1>Import file below</h1>
        <input type="file" onChange={this.handleChange.bind(this)} />
        <BooleanList items={this.state.items} />
      </div>
    );
  }
}

const divStyle = {
  margin: '20px',
};


ReactDOM.render(<App />, document.getElementById('app'));