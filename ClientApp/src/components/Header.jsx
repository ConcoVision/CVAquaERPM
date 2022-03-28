
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Avatar } from '@progress/kendo-react-layout';
import { useLocalization } from '@progress/kendo-react-intl';

import { locales } from './../resources/locales';

import { AppContext } from './../AppContext'

import headerBg from '../assets/header-bg.png';
import userAvatar from '../assets/user-avatar.jpg';
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { Button,DropDownButton,DropDownButtonItem,ButtonGroup } from "@progress/kendo-react-buttons";
import { Popup,PopupPropsContext } from "@progress/kendo-react-popup";
import Customization from '../Customization';
import { useHistory } from "react-router-dom";
export const Header = (props) => {
    const { onButtonClick } = props;
    const { avatar, localeId, onLanguageChange } = React.useContext(AppContext);
    const localizationService = useLocalization();

    const currentLanguage = locales.find(item => item.localeId === localeId);

    const imgRef = React.useRef(null);
    const hasImage = avatar && avatar.length > 0;
    const wrapper = React.useRef(null);
    const anchor = React.useRef(null);
    const [show, setShow] = React.useState(false);
    let history = useHistory();
    React.useEffect(
        () => {
            if (hasImage) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    imgRef.current.setAttribute('src', e.target.result)
                }

                reader.readAsDataURL(avatar[0].getRawFile());
            }
            setShow(false);
        },
        [avatar, hasImage]
    );
    const onClick = () => {
        console.log(show);
        setShow(!show);
      };
      const onddlchange=()=>
      {
        console.log('jaha')
      }
      const gotoprofile=() =>{
        history.push('/profile');
      }
    return (
        <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
            <div className="nav-container">
            <style>
        {`.example {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        .example .status {
            display: flex;
            justify-content: space-between;
            padding: 12px 14px;
        }
        .k-icon.k-i-bell .notifications" {
            font-size: 32px;
        }
        .example-wrap {
            border: 1px solid #ccc;
            width: 230px;
        }
        .popup-content {
            padding: 30px;
            color: #787878;
            background-color: #fcf7f8;
            border: 1px solid rgba(0,0,0,.05);
        }
        .notifications {
            position: relative;
            align-self: center;
            font-size: 21px;
            
        }`}
      </style>
                <div className="menu-button">
                    <span className={'k-icon k-i-menu'} onClick={onButtonClick}/>
                </div>

                <div className="title">
                    <h1>{localizationService.toLanguageString('custom.warehouse')}</h1>
                </div>
                <div className="settings">
                    <span>{localizationService.toLanguageString('custom.language')}</span>
                    <DropDownList
                        textField={'locale'}
                        dataItemKey={'localeId'}
                        data={locales}
                        value={currentLanguage}
                        onChange={onLanguageChange}
                    />
                </div>
                <div className="example">
                {/* <BadgeContainer>
          <span className="k-icon k-i-files" />
          <Badge
            align={{
              vertical: "bottom",
              horizontal: "end",
            }}
            themeColor="dark"
          >
            11
          </Badge>
        </BadgeContainer> 
                <BadgeContainer>
          <Button>Action</Button>
          <Badge themeColor="tertiary" align={{
              vertical: "bottom",
              horizontal: "end",
            }}>3</Badge>
        </BadgeContainer>*/}
        
                <div className="status">
                <DropDownButton text="User Settings" icon="cog"  onChange={onddlchange}>
          <DropDownButtonItem text="My Profile" />
          <DropDownButtonItem text="Friend Requests" />
          <DropDownButtonItem text="Account Settings" />
          <DropDownButtonItem text="Support" />
          <DropDownButtonItem text="Log Out" />
        </DropDownButton>
          {/* <Button>
            New Updates
            <Badge shape="dot" themeColor="info" align={{
              vertical: "bottom",
              horizontal: "end",
            }}/>
          </Button> */}
          <span className="k-icon k-i-bell notifications">
            {/* <Badge shape="dot" themeColor="warning" >5</Badge> */}
            <Badge themeColor="info" shape='circle'>99+</Badge>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span className="k-icon k-i-email notifications">
            <Badge shape="dot" themeColor="success" align={{
              vertical: "top",
              horizontal: "end",
            }}>8</Badge>
          </span>
        </div>
          </div>
          <div ref={wrapper}>
      <PopupPropsContext.Provider
        value={(props) => ({ ...props, appendTo: wrapper.current })}
      >
        {/* <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          ref={anchor}
          onClick={() => setShow(!show)} 
        >
          {show ? "Hide" : "Hi"}
        </button> */}
        <Popup show={show} anchor={anchor.current}>
        <div id="Profile" className="profile-page main-content">
                <div className="card-container">
                    <div className="card-component">
          
          <ButtonGroup className="separator mt-8">
          <Button togglable={true} icon="cog">
          User Settings
          </Button>
          <Button togglable={true}>
          Log Out
          </Button>
          <Button togglable={true} icon="user" onClick={gotoprofile}>
          My Profile
          </Button>
        </ButtonGroup>
          </div>
          </div>
          </div>
        </Popup>
      </PopupPropsContext.Provider>
    </div>
                
                    <a
          ref={anchor}
          onClick={() => setShow(!show)} 
        >
          <Avatar type={'image'} shape={'circle'} >
                    {
                        hasImage ?
                            <img ref={imgRef} src={'#'} alt={'User Avatar'}onClick={onClick} /> :
                            <img src={userAvatar} alt="user-avatar"/>
                    }
                    </Avatar>
        </a>
                
            </div>
            {/* <Popup anchor={anchor.current} show={show} popupClass={"popup-content"}>
        Popup content.
      </Popup> */}
        </header>
        
    );
}

Header.displayName = 'Header';
Header.propTypes = {
    page: PropTypes.string,
    onButtonClick: PropTypes.func
};
