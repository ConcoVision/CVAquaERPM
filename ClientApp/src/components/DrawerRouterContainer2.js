import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerItem } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Header } from './Header.jsx';
const CustomItem = props => {
  const {
    visible,
    ...others
  } = props;
  const arrowDir = props['data-expanded'] ? 'k-i-arrow-chevron-down' : 'k-i-arrow-chevron-right';
  return <React.Fragment>
        {props.visible === false ? null : <DrawerItem {...others}>
          <span className={'k-icon ' + props.icon} />
          <span className={'k-item-text'}>{props.text}</span>
          {props['data-expanded'] !== undefined && <span className={"k-icon " + arrowDir} style={{
        position: "absolute",
        right: 10
      }} />}
        </DrawerItem>}
      </React.Fragment>;
};

const DrawerContainer = props => {
  const [drawerExpanded, setDrawerExpanded] = React.useState(true);
  const [items, setItems] = React.useState(
      [
    {
    text: 'Dashbord',
    icon: 'k-i-grid',
    id: 1,
    selected: true,
    route: '/'
  }, {
    text: 'HR',
    icon: 'k-i-heart',
    id: 2,
    ['data-expanded']: true,
    route: '/food'
  }, {
    text: 'Department Master',
    icon: 'k-i-minus',
    id: 4,
    parentId: 2,
    route: '/food/japanese'
  },
  {
    text: 'Controctor Master',
    icon: 'k-i-minus',
    id: 5,
    parentId: 2,
    route: '/food/japanese'
  },
  {
    text: 'Employee Master',
    icon: 'k-i-minus',
    id: 6,
    parentId: 2,
    route: '/food/japanese'
  },
  {
    text: 'Holydays Master',
    icon: 'k-i-minus',
    id: 7,
    parentId: 2,
    route: '/food/japanese'
  },
  {
    text: 'Manual Attendance',
    icon: 'k-i-pencil',
    id: 8,
    parentId: 2,
    route: '/food/japanese'
  },
  {
    text: 'Biometric IN/OUT Changes',
    icon: 'k-i-pencil',
    id: 8,
    parentId: 2,
    route: '/food/japanese'
  },{
    text: 'Manual Attendance',
    icon: 'k-i-pencil',
    id: 9,
    parentId: 2,
    route: '/food/japanese'
  },
  {
    text: 'Leave Request',
    icon: 'k-i-pencil',
    id: 10,
    parentId: 2,
    route: '/'
  },
  {
    text: 'Employee Report',
    icon: 'k-i-calendar',
    id: 11,
    parentId: 2,
    route: '/'
  },
  {
    text: 'Local Workers Report',
    icon: 'k-i-calendar',
    id: 12,
    parentId: 2,
    route: '/'
  },
  {
    text: 'Daily Attendance Report',
    icon: 'k-i-calendar',
    id: 13,
    parentId: 2,
    route: '/'
  },
  {
    text: 'Monthly IN/OUT Report',
    icon: 'k-i-pencil',
    id: 10,
    parentId: 2,
    route: '/'
  },
   {
    separator: true
  },
   {
    text: 'Food',
    icon: 'k-i-heart',
    id: 2,
    ['data-expanded']: true,
    route: '/food'
  }, {
    text: 'Japanese Food',
    icon: 'k-i-minus',
    id: 4,
    parentId: 2,
    route: '/food/japanese'
  }, {
    text: 'Italian Food',
    icon: 'k-i-minus',
    id: 5,
    parentId: 2,
    route: '/food/italian'
  }, {
    separator: true
  }, {
    text: 'Travel',
    icon: 'k-i-globe-outline',
    ['data-expanded']: true,
    id: 3,
    route: '/travel'
  }, {
    text: 'Europe',
    icon: 'k-i-minus',
    id: 6,
    parentId: 3,
    route: '/travel/europe'
  }, {
    text: 'North America',
    icon: 'k-i-minus',
    id: 7,
    parentId: 3,
    route: '/travel/america'
  }]);

  const handleClick = () => {
    setDrawerExpanded(!drawerExpanded);
  };

  const onSelect = ev => {
    const currentItem = ev.itemTarget.props;
    const isParent = currentItem['data-expanded'] !== undefined;
    const nextExpanded = !currentItem['data-expanded'];
    const newData = items.map(item => {
      const {
        selected,
        ['data-expanded']: currentExpanded,
        id,
        ...others
      } = item;
      const isCurrentItem = currentItem.id === id;
      return {
        selected: isCurrentItem,
        ['data-expanded']: isCurrentItem && isParent ? nextExpanded : currentExpanded,
        id,
        ...others
      };
    });
    props.history.push(ev.itemTarget.props.route);
    setItems(newData);
  };

  const data = items.map(item => {
    const {
      parentId,
      ...others
    } = item;

    if (parentId !== undefined) {
      const parent = items.find(parent => parent.id === parentId);
      return { ...others,
        visible: parent['data-expanded']
      };
    }

    return item;
  });
  return <div>
      {/* <div className="custom-toolbar">
        <Button icon="menu" look="flat" onClick={handleClick} />
        <span className="title">Categories</span>
      </div> */}
      <Header
                    onButtonClick={handleClick}
                />
      <Drawer expanded={drawerExpanded} mode='push' width={280} items={data} item={CustomItem} onSelect={onSelect}>
        <DrawerContent>
          {props.children}
        </DrawerContent>
      </Drawer>
    </div>;
};

export default withRouter(DrawerContainer);