import React from 'react';
import { connect } from 'react-redux';
import { Button, Badge, Modal } from 'antd';
const ButtonGroup = Button.Group;
import { Link, NavLink } from 'react-router-dom';
import { userActions } from '../_actions';
import { AppLayout } from '../_components';

class CounterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentCount: 0,
            modalVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decreaseCounter = this.decreaseCounter.bind(this);
        this.resetCounter = this.resetCounter.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    showModal() {
        this.setState({
            modalVisible: true,
        });
    }
    handleOk(e) {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
    decreaseCounter() {
        this.setState({
            currentCount: this.state.currentCount - 1
        });
    }
    resetCounter() {
        this.setState({
            currentCount: 0
        });
    }

    render() {
        const { user, users } = this.props;
        return (
            <AppLayout current='counter'>
                 <Button type="primary" onClick={this.showModal}>Show counter</Button>
                    <Modal
                        title="My Modal"
                        visible={this.state.modalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                    <div>
                    <h1>Counter <span><Badge style={{ marginLeft: 10, backgroundColor: '#52c41a' }} count={ this.state.currentCount }>
                        <a href="#" className="head-example" />
                    </Badge>
                    </span></h1>
                    <div>
                        <Button type="primary" onClick={ () => { this.incrementCounter() } }>Increment</Button>
                        <Button style={{ marginLeft: 10 }} type="default" onClick={ () => { this.resetCounter() } }>Reset</Button>
                        <Button style={{ marginLeft: 10 }} type="danger" ghost onClick={ () => { this.decreaseCounter() } }>Decrease</Button>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <ButtonGroup>
                            <Button onClick={ () => { this.incrementCounter() } }>Increment</Button>
                            <Button onClick={ () => { this.resetCounter() } }>Reset</Button>
                            <Button onClick={ () => { this.decreaseCounter() } }>Decrease</Button>
                        </ButtonGroup>
                    </div>
                    </div>
                    </Modal>
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

const connectedCounterPage = connect(mapStateToProps)(CounterPage);
export { connectedCounterPage as CounterPage };