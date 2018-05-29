import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Icon } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { config } from '../_helpers/config';
import { authHeader } from '../_helpers/auth-header';

class CardsPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
            cards: [], 
            loading: true 
        };
        const requestOptions: any = {
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
        // this.props.dispatch(userActions.getAll());
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
    render() {
        const { user, users } = this.props;
        return (<div>
            <Row gutter={16}>
                {this.state.cards.map((card: any) =>
                    <Col style={{padding: 5}} span={8}>
                    <Card title={card.name} extra={<Icon type="setting" />} style={{ width: 270 }}></Card>
                    </Col>
                )}
            </Row></div>
        );
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

const connectedCardsPage = connect(mapStateToProps)(CardsPage);
export { connectedCardsPage as CardsPage };