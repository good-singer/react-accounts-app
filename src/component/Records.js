import React, { Component } from 'react';
import Record from './Record'
// import {getJSON} from 'jquery'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  componentDidMount() {

    // axios获取数据
    RecordsAPI.getAll().then(
      response => this.setState({
        records: response.data,
        isLoaded: true
      })

    ).catch(
      error => this.setState({
        error,
        isLoaded: false
      })
    )
  }

  addRecord(record) {
    // console.log(record);
    this.setState({
      error: null,
      isLoaded: true,
      records: [...this.state.records, record]
    })

  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      }
    });
    this.setState({
      records: newRecords
    })
  }

  render() {
    const { error, isLoaded, records } = this.state;
    let recordsComponent;

    if (error) {
      // return <div>Error:{error.responseText}</div>
      recordsComponent = <div>Error:{error.message}</div>
    } else if (!isLoaded) {
      recordsComponent = <div>Loading...</div>
    } else {
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => <Record {...record} key={record.id} record={record} handleEditRecord={this.updateRecord.bind(this)} />)}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <h2>Records</h2>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div >
    )
  }
}

export default Records;
