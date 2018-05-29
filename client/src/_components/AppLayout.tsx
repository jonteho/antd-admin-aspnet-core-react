import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Sider } = Layout;
import { Link, NavLink } from 'react-router-dom';
import { UserActions } from '../_actions/UserActions';

interface LayoutProps {
    current: string,
    user: any,
    users: any
}
class AppLayout extends React.Component<LayoutProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            current: this.props.current,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e: any) {
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
                    theme='dark'
                    // style={{backgroundColor: '#2C3C45'}}
                    mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/"><Icon type="home" />Home</Link>
                </Menu.Item>
                <Menu.Item key="counter">
                    <Link to="/counter"><Icon type="plus" />Counter</Link>
                </Menu.Item>
                <Menu.Item key="fetchdata">
                    <Link to="/fetchdata"><Icon type="download" />Fetch data</Link>
                </Menu.Item>
                <Menu.Item key="cards">
                   <Link to="/cards"><Icon type="book" />Cards</Link>
                </Menu.Item>
                <SubMenu style={{float: "right"}} title={<span><Icon type="setting" />{user.firstName}</span>}>
                    <Menu.Item key="setting:1"><Link to="/login"><Icon type="logout" />Logout</Link></Menu.Item>
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

function mapStateToProps(state: any) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedAppLayout = connect(mapStateToProps)(AppLayout);
export { connectedAppLayout as AppLayout };