import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Table } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { config } from '../helpers/config';
import { authHeader } from '../helpers/auth-header';

class FetchDataPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { forecasts: [], loading: true, selectedRowKeys: [] };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.renderForecastsTable = this.renderForecastsTable.bind(this);
        const requestOptions: any = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(config.apiUrl + '/sampledata/weather', requestOptions)
        .then(this.handleResponse, this.handleError)
        .then(data => {
            this.setState({ forecasts: data, loading: false });
        });
    }
    onSelectChange(selectedRowKeys: any) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    onSelection(){
        console.log('onSelection: ');
    }
    renderForecastsTable(state: any, forecasts: any) {
        const columns = [{
            title: 'Date',
            dataIndex: 'dateFormatted',
          }, {
            title: 'Temp. (C)',
            dataIndex: 'temperatureC',
          }, {
            title: 'Temp. (F)',
            dataIndex: 'temperatureF',
          }, {
            title: 'Summary',
            dataIndex: 'summary',
        }];
        const { selectedRowKeys } = state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection
        };
    return (<Table rowSelection={rowSelection} loading={state.loading} columns={columns} dataSource={forecasts} />); 
    }
    render() {
        const { user, users } = this.props;
        let contents = (this.state.loading ? <p><em>Loading...</em></p> : this.renderForecastsTable(this.state, this.state.forecasts));
        let content = (<div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>);
        return (<div>
            { content }
            </div>);
    }
    handleResponse(response: any) {
        return new Promise((resolve, reject) => {
            if (response.ok) {
                // return json if it was returned in the response
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    response.json().then((json: any) => resolve(json));
                } else {
                    resolve();
                }
            } else {
                // return error message from response body
                response.text().then((text: any) => reject(text));
            }
        });
    }
    handleError(error: any) {
        return Promise.reject(error && error.message);
    }
}

function mapStateToProps(state: any) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedFetchDataPage = connect(mapStateToProps)(FetchDataPage);
export { connectedFetchDataPage as FetchDataPage };