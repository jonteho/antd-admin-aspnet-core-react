import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Icon } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { userActions } from '../_actions';
import { AppLayout } from '../_components';
import { authHeader, config } from '../_helpers';

class CardsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            cards: [], 
            loading: true 
        };
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(config.apiUrl + '/sampledata/cards', requestOptions)
            .then(this.handleResponse, this.handleError)
            .then(data => {
                this.setState({ cards: data, loading: false });
            });
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }
    handleResponse(response) {
        return new Promise((resolve, reject) => {
            if (response.ok) {
                // return json if it was returned in the response
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    response.json().then(json => resolve(json));
                } else {
                    resolve();
                }
            } else {
                // return error message from response body
                response.text().then(text => reject(text));
            }
        });
    }
    handleError(error) {
        return Promise.reject(error && error.message);
    }
    render() {
        const { user, users } = this.props;
        return (
            <AppLayout current='cards'>
                <Row gutter={16}>
                    {this.state.cards.map(card =>
                        <Col style={{padding: 5}} span={8}>
                        <Card title={card.name} extra={<Icon type="setting" />} style={{ width: 270 }}></Card>
                        </Col>
                    )}
                </Row>
            </AppLayout>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedCardsPage = connect(mapStateToProps)(CardsPage);
export { connectedCardsPage as CardsPage };