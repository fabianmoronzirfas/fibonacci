import axios from 'axios';
import React, { Component, FormEvent } from 'react';

interface IState {
index: string;
seenIndexes: any[];
values: any;
}
class Fib extends Component {
  public state: IState = {
    index: '',
    seenIndexes: [],
    values: {},
  };

  public handleSubmit = async (event: FormEvent) => {
    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({index: ''});
  }

  public componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }
  public async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
    // throw new Error('Method not implemented.');
  }
  public async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data });
    // throw new Error('Method not implemented.');
  }

  public renderSeenIndexes(): React.ReactNode {
    return this.state.seenIndexes.map((ele) => {
      // tslint:disable-next-line:no-console
      // console.log(ele.number);
      return ele.number;
    },
      ).join(', ');
    // throw new Error('Method not implemented.');
  }
  public renderValues(): React.ReactNode {
    const entries = [];
    for (const key in this.state.values as object) {
      if (this.state.values.hasOwnProperty(key)) {

        entries.push(
          <div key={key}> For index {key} I calculated {this.state.values[key]}</div>,
          );
        }
      }
    return entries;
    // throw new Error('Method not implemented.');
  }
  public render() {
    return (
      <div>
        <form
        onSubmit={this.handleSubmit}
        >
        <label htmlFor=''>Enter your index:</label>
        <input
         type='text' name='' id=''
         value={this.state.index}
         onChange={(event) => this.setState({index: event.target.value})}
        />
        <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        <h3> Calculated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
