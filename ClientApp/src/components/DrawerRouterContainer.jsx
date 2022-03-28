import React from 'react';

import { withRouter } from 'react-router-dom';
import { registerForLocalization, provideLocalizationService } from '@progress/kendo-react-intl';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';

import { Header } from './Header.jsx';
import { Footer } from './Footer.js';
import { useParams } from 'react-router';

const items = [
    { name: 'dashboard', icon: 'k-i-grid', selected: true, route: '/' },
    { name: 'planning', icon: 'k-i-calendar', route: '/planning' },
    { name: 'user', icon: 'k-i-user', route: '/user' },
    { separator: true },
    { name: 'info', icon: 'k-i-information', route: '/info' },
    { name: 'sarole', icon: 'k-i-information', route: '/sarole' },
    { name: 'department', icon: 'k-i-user', route: '/departmentlist' },
    { name: 'designation', icon: 'k-i-user', route: '/desinationlist' },
    { name: 'addrole', icon: 'k-i-bell', route: '/addrole' },
    { separator: true },
    { name: 'adddepartment', icon: 'k-i-user', route: '/adddepartment' },
    { name: 'editdepartment', icon: 'k-i-user', route: '/adddepartment/:id', },
];

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: false,
        selectedId: items.findIndex(x => x.selected === true),
        isSmallerScreen: window.innerWidth < 768
    }

    resizeWindow = () => {
        this.setState({ isSmallerScreen: window.innerWidth < 768 })
    }

    handleClick = () => {
        this.setState((e) => ({ expanded: !e.expanded }));
    }

    handleSelect = (e) => {
        this.setState({ selectedId: e.itemIndex, expanded: false });
        this.props.history.push(e.itemTarget.props.route);
    }

    getSelectedItem = (pathName) => {
        
        //const {id}=useParams();
        //const { id } = props.id
        //const {v}=this.props;
        let currentPath = items.find(item => item.route === pathName);
        //debugger;
        if (currentPath.name) {
            return currentPath.name;
        }
    }

    componentDidUpdate() {
        try {
            const parent = window.parent;
            if (parent) {
                parent.postMessage({ url: this.props.location.pathname, demo: true }, "*")
            }
        } catch (err) {
            console.warn('Cannot access iframe')
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow, false)
        this.resizeWindow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow)
    }

    render() {
        let selected = this.getSelectedItem(this.props.location.pathname);
        const localizationService = provideLocalizationService(this);

        return (
            <React.Fragment>
                <Header
                    onButtonClick={this.handleClick}
                    page={localizationService.toLanguageString(`custom.${selected}`)}
                />
                <Drawer
                    expanded={this.state.expanded}
                    animation={{ duration: 100 }}
                    items={items.map((item) => ({
                        ...item,
                        text: localizationService.toLanguageString(`custom.${item.name}`),
                        selected: item.name === selected
                    }))
                    }
                    position='start'
                    mode={this.state.isSmallerScreen ? 'overlay' : 'push'}
                    mini={this.state.isSmallerScreen ? false : true}

                    onOverlayClick={this.handleClick}
                    onSelect={this.handleSelect}
                >
                    <DrawerContent style={{ height: 1066 }}>
                        {this.props.children}
                    </DrawerContent>
                </Drawer>
                <Footer/>
            </React.Fragment>
        );
    }
};

registerForLocalization(DrawerRouterContainer);

export default withRouter(DrawerRouterContainer);

