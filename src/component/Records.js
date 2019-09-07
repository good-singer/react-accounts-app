import React, { Component } from 'react';
import Record from './Record'
// import {getJSON} from 'jquery'
import * as RecordsAPI from '../utils/RecordsAPI'

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
    /* jquery的获取数据方法
    getJSON("https://5d51189981cbae00149a0f8d.mockapi.io/api/v1/records")
      .then(
        response => this.setState({
          records: response,
          isLoaded: true
        }),
        error => this.setState({
          error,
          isLoaded: false
        })
      ) */

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

  render() {
    const { error, isLoaded, records } = this.state;

    if (error) {
      // return <div>Error:{error.responseText}</div>
      return <div>Error:{error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h2>Records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => <Record {...record} key={record.id} />)}

            </tbody>
          </table>
        </div >
      );
    }
  }
}

export default Records;
