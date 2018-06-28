import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message, Card,Avatar } from 'antd';
const FormItem = Form.Item;
import { UserActions } from '../actions/UserActions';

class LoginPage extends React.Component<any, any> {
    userActions: UserActions;
    constructor(props: any) {
        super(props);
        this.userActions = new UserActions();
        // reset login status
        this.props.dispatch(this.userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(this.userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <Row justify="center" align="middle" type="flex" className="login-form-container">
            <Card className="login-form-logo" style={{ width: 450 }} bordered={false} cover={<div className="logo" />}>
            </Card>
              <Card bordered={false} style={{ width: 450 }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.handleChange} placeholder="Username" value={username} name="username" /> 
                  </FormItem>
                  <FormItem>
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.handleChange} type="password" placeholder="Password" value={password} name="password" />
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                  </FormItem>
                </Form>
              </Card>
          </Row>
          );
        // return (
        //     <div className="col-md-6 col-md-offset-3">
        //         <h2>Login</h2>
        //         <form name="form" onSubmit={this.handleSubmit}>
        //             <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
        //                 <label htmlFor="username">Username</label>
        //                 <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
        //                 {submitted && !username &&
        //                     <div className="help-block">Username is required</div>
        //                 }
        //             </div>
        //             <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
        //                 <label htmlFor="password">Password</label>
        //                 <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
        //                 {submitted && !password &&
        //                     <div className="help-block">Password is required</div>
        //                 }
        //             </div>
        //             <div className="form-group">
        //                 <button className="btn btn-primary">Login</button>
        //                 {loggingIn &&
        //                     <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        //                 }
        //                 <Link to="/register" className="btn btn-link">Register</Link>
        //             </div>
        //         </form>
        //     </div>
        // );
    }
}

function mapStateToProps(state: any) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 