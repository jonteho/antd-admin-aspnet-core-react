import React from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Sider } = Layout;
import { Link, NavLink } from 'react-router-dom';
import { userActions } from '../_actions';


class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
        this.state = {
            current: this.props.current,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }
    render() {
        const { user, users } = this.props;
        return (
            <Layout>
                <Menu onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/"><Icon type="home" />Home</Link>
                </Menu.Item>
                <Menu.Item key="counter">
                    <Link to="/counter"><Icon type="appstore" />Counter</Link>
                </Menu.Item>
                <Menu.Item key="fetchdata">
                    <Link to="/fetchdata"><Icon type="alipay" />Fetch data</Link>
                </Menu.Item>
                <Menu.Item key="cards">
                   <Link to="/cards"><Icon type="book" />Cards</Link>
                </Menu.Item>
                <SubMenu style={{float: "right"}} title={<span><Icon type="setting" />{user.firstName}</span>}>
                    <Menu.Item key="setting:1"><Link to="/login">Logout</Link></Menu.Item>
                </SubMenu>
            </Menu>
            <Layout>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                { this.props.children }
            </Content>
            </Layout>
        </Layout>
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

const connectedAppLayout = connect(mapStateToProps)(AppLayout);
export { connectedAppLayout as AppLayout };