// @flow
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

// apps icon

import dribbbleIcon from './icons/dribbble.png';
import githubIcon from './icons/github.png';
import help from './icons/help.png';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';

const PdfDropdown  = (props) => {
  const {
    setDropdownOpen,
    dropdownOpen,
    dropdownImprimir,
    //setDropdownImprimir
  } = useContext(DashboardContext);
// get the apps
const Apps = [
  {
      name: 'Lista de asistencia',
      icon: help,
      redirectTo: `/dashboard/ModuloActas/Actas/imprimir/asistencia?p=${props?.itemsUpdate}`,
  },
  {
      name: 'Lista de Aprendices',
      icon: githubIcon,
      redirectTo: `/dashboard/ModuloActas/Actas/imprimir/aprendices?p=${props?.itemsUpdate}`,
  },
  {
      name: 'Actas',
      icon: dribbbleIcon,
      redirectTo: `/dashboard/ModuloActas/Actas/imprimir/actas?p=${props?.itemsUpdate}`,
  },
]
    const apps = Apps || [];
    const chunk_size = 3;
    const appsChunks = Array(Math.ceil(apps.length / chunk_size))
        .fill()
        .map((_, index) => index * chunk_size)
        .map((begin) => apps.slice(begin, begin + chunk_size));


    /*
     * toggle apps-dropdown
     */
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        setDropdownOpen(!dropdownOpen);
    };

    return (<>
       <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-apps"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <i className="mdi mdi-printer noti-icon"></i>
            </Dropdown.Toggle>

            {!dropdownImprimir && <Dropdown.Menu className="dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
                <div className="p-2">
                    {appsChunks.map((chunk, idx) => (
                        <div className="row g-0" key={idx}>
                            {chunk.map((item, i) => (
                                <div className="col" key={i}>

                                    <Link className="dropdown-icon-item" to={item.redirectTo}>
                                        <img src={item.icon} alt="" />
                                        <span>{item.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Dropdown.Menu>}
        </Dropdown>
        </>);
};

export default PdfDropdown;