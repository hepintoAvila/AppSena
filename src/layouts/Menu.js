/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import { findAllParent, findMenuItem,filtrarURLNumero,filtrarURLSeccion} from '../helpers/menu';
import { DashboardContext } from './context/DashboardContext';
 
const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu }) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item?.key));

  useEffect(() => {
    setOpen(activeMenuItems.includes(item?.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = (e) => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
      <Link
        to="/#"
        onClick={toggleMenuItem}
        data-menu-key={item?.key}
        aria-expanded={open}
        className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
          'menuitem-active': activeMenuItems.includes(item?.key) ? 'active' : '',
        })}>
        {item?.icon && <i className={item?.icon}></i>}
        {!item?.badge ? (
          <span className="menu-arrow"></span>
        ) : (
          <span className={`badge bg-${item?.badge.variant} float-end`}>{item?.badge.text}</span>
        )}
        <span> {item?.label} </span>
      </Link>
      <Collapse in={open}>
        <ul className={classNames(subMenuClassNames)}>
          {item?.children?.map((child, i) => {
            return (
              <React.Fragment key={i}>
                {child.children ? (
                  <>
                    {/* parent */}
                    <MenuItemWithChildren
                      item={child}
                      linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                      activeMenuItems={activeMenuItems}
                      subMenuClassNames="side-nav-third-level"
                      toggleMenu={toggleMenu}
                    />
                  </>
                ) : (
                  <>
                    {/* child */}
                    <MenuItem
                      item={child}
                      className={activeMenuItems.includes(child.key) ? 'menuitem-active' : ''}
                      linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                    />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </Collapse>
    </li>
  );
};

const MenuItem = ({ item, className, linkClassName }) => {

  return (
    <li className={classNames('side-nav-item', className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }) => {
  return ((Object.keys(item).length===0) ? '' : 
  <Link
      to={item?.url}
      target={item?.target}
      className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}
      data-menu-key={item?.key}>
      {item?.icon && <i className={item?.icon}></i>}
      {item?.badge && (
        <span className={`badge badge-${item?.badge.variant} rounded-pill font-10 float-end`}>
          {item?.badge.text}
        </span>
      )}
      <span> {item?.label} </span>
    </Link>
  );
};

/**
 * Renders the application menu
 */

type AppMenuProps = {
  menuItems: Array<any>,
  location: {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state: any,
  }
};

const AppMenu = ({ menuItems, location }: AppMenuProps) => {
  const { setLoading,setitemsMenuPrincipal,setitemsUrl} = useContext(DashboardContext)
 
  const menuRef = useRef(null);


  const [activeMenuItems, setActiveMenuItems] = useState([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem, show) => {

    if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
  };

  /**
   * activate the menuitems
   */

 
  const activeMenu = useCallback((setitemsMenuPrincipal,setitemsUrl) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    //
    const div = document.getElementById('main-side-menu');
    let matchingMenuItem = null;
    if (div) {
      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(menuItems, mid);

        if (activeMt) {
          setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)]);
        }
      }
      let items: any = div.getElementsByClassName('side-nav-link-ref');

      for (let i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      //CLEAR ITESMS
      let itemsurls = location.pathname?.lastIndexOf('dashboard');
     
      if (itemsurls === 1) {
        
        const principal = filtrarURLNumero(menuRef?.current?.baseURI)
        const objSeccion = filtrarURLSeccion(menuRef?.current?.baseURI)
         const obj = {principal, seccion: objSeccion.seccion}
         setitemsMenuPrincipal(obj?.principal);
         setitemsUrl(obj.seccion);
        sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion }));
        setLoading(true)

      }
      //END

    }

  }, [location.pathname, menuItems, setLoading]);

  useEffect(() => {
    activeMenu(setitemsMenuPrincipal,setitemsUrl);

  }, [activeMenu]);

  const [urlSearch, setpagesSearch] = useState('');

  useEffect(() => {
    const query = window.location;
    setpagesSearch(query.hash);
  }, [urlSearch]);
 
 
/*
  let userInfo = JSON.parse(sessionStorage.getItem('ITEM_SELECT'))
  if (userInfo) {
    if (userInfo?.tipo.length === 0) {
      itemsMenuCallBack(0);
    }else{
      itemsMenuCallBack(userInfo?.tipo.length);
    }
  }
 */
 
    return (
    <>
      <ul className="side-nav" ref={menuRef} id="main-side-menu">
        {
        
        (menuItems?.length>=1) && (menuItems || [])?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item?.isTitle ? (
                <li className="side-nav-title side-nav-item">{item?.label}</li>
              ) : (
                <>
                  {item?.children ? (
                    <MenuItemWithChildren
                      item={item}
                      toggleMenu={toggleMenu}
                      subMenuClassNames="side-nav-second-level"
                      activeMenuItems={activeMenuItems}
                      linkClassName="side-nav-link"
                    />
                  ) : (
                    <MenuItem
                      item={item}
                      linkClassName="side-nav-link"
                      className={activeMenuItems.includes(item?.key) ? 'menuitem-active' : ''}
                    />
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default (withRouter(AppMenu): any);
