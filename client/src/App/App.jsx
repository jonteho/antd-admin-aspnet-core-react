import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
// import { RegisterPage } from '../RegisterPage';
import { FetchDataPage } from '../FetchDataPage';
import { CounterPage } from '../CounterPage';
import { CardsPage } from '../CardsPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Layout>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div style={{height: '100%'}}>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute path="/counter" component={CounterPage} />
                        <PrivateRoute path="/fetchdata" component={FetchDataPage} />
                        <PrivateRoute path="/cards" component={CardsPage} />
                        <Route path="/login" component={LoginPage} />
                        {/* <Route path="/register" component={RegisterPage} /> */}
                    </div>
                </Router>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 