import React, { Component } from 'react';

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    }
  }

  handleChange(e) {
    let name, obj;
    name = e.target.name;
    this.setState((
      obj = {},
      obj["" + name] = e.target.value,
      obj
    ))
  }

  valid() {
    return this.state.date && this.state.title && this.state.amount;
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input onChange={this.handleChange.bind(this)} style={{ width: 270 + 'px' }} type="text" className="form-control" placeholder="请输入类似 '2019-05-23' 时间" name="date" value={this.state.date} />
        </div>
        <div className="form-group">
          <input onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} />
        </div>
        <div className="form-group">
          <input onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}
