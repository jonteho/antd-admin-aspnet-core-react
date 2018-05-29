import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Alert } from 'antd';
import { history } from './_helpers/history';
import { AlertActions } from './_actions/AlertActions';
import { PrivateRoute } from './_components/PrivateRoute';
import PageShell from './_components/PageShell';

import { HomePage } from './_pages/HomePage';
import { LoginPage } from './_pages/LoginPage';
import { FetchDataPage } from './_pages/FetchDataPage';
import { CounterPage } from './_pages/CounterPage';
import { CardsPage } from './_pages/CardsPage';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(AlertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Layout>
                {alert.message &&
                    <div>
                        <Alert type={alert.type} message={alert.message} banner closable />
                    </div>
                }
                <Router history={history}>
                    <div style={{height: '100%'}}>
                        <PrivateRoute exact path="/" component={PageShell(HomePage, 'home')} />
                        <PrivateRoute path="/counter" component={PageShell(CounterPage, 'counter')} />
                        <PrivateRoute path="/fetchdata" component={PageShell(FetchDataPage, 'fetchdata')} />
                        <PrivateRoute path="/cards" component={PageShell(CardsPage, 'cards')} />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </Layout>
        );
    }
}

function mapStateToProps(state: any) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 