// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Select, { components } from 'react-select';
 
import Avatar2 from '../../../../../assets/images/users/avatar-9.jpg';
import Avatar5 from '../../../../../assets/images/users/avatar-9.jpg'; 
import { groupByFields } from '../../../../../utils';
/*
 * get options
 */
const optionGetter = (option) => {
    switch (option.type) {
        case 'users':
            return (
                <>
                    <Link to="/" className="dropdown-item notify-item p-0">
                        <div className="d-flex">
                            <img
                                src={option.userDetails.avatar}
                                alt=""
                                className="d-flex me-2 rounded-circle"
                                height="32"
                            />
                            <div className="w-100">
                                <h5 className="m-0 font-14">
                                    {option.userDetails.firstname} {option.userDetails.lastname}
                                </h5>
                                <span className="font-12 mb-0">{option.userDetails.position}</span>
                            </div>
                        </div>
                    </Link>
                </>
            );

        default:
            return;
    }
};

/*
 * filter options
 */
const formateOptions = (options) => {
    const grouppedData = groupByFields(options, (item) => {
        return [item.type];
    });

    let formattedOptions = [];
    let count = 0;

    for (let i = 0; i < grouppedData.length; i++) {
        for (let j = 0; j < grouppedData[i].length; j++) {
            if (grouppedData[i][j].type === 'users' && count === 0) {
                grouppedData[i].splice(j, 0, { label: 'Users', value: 'title', type: 'title' });
                count = 1;
            }
            formattedOptions.push(grouppedData[i][j]);
        }
    }
    return formattedOptions;
};

/* custon control */
const Control = ({ children, ...props }) => {
    const { handleClick } = props.selectProps;
    return (
        <components.Control {...props}>
            <span onMouseDown={handleClick} className="mdi mdi-magnify search-icon"></span>
            {children}
        </components.Control>
    );
};

/* custon indicator */
const IndicatorsContainer = (props) => {
    const { handleClick } = props.selectProps;
    return (
        <div style={{}}>
            <components.IndicatorsContainer {...props}>
                <button className="btn btn-primary" onMouseDown={handleClick}>
                    Buscar
                </button>
            </components.IndicatorsContainer>
        </div>
    );
};

/* custom menu list */
const MenuList = (props) => {
    const { options } = props.selectProps;

    return (
        <components.MenuList {...props}>
            {/* menu header */}
            <div className="dropdown-header noti-title">
                <h5 className="text-overflow mb-2">
                    Encontrados <span className="text-danger">{options.length}</span> resultados
                </h5>
            </div>
            {props.children}
        </components.MenuList>
    );
};

/* fomates the option label */
const handleFormatOptionLabel = (option) => {
    const formattedOption = optionGetter(option);
    return <div>{formattedOption}</div>;
};

type SearchResultItem = {
    id: number,
    title: string,
    redirectTo: string,
    icon: string,
};

type TopbarSearchProps = {
    items: Array<SearchResultItem>,
};

const TopbarSearchComite = (props: TopbarSearchProps): React$Element<any> => {
    const options = [
        {
            label: 'Maria del carmen Buitrago',
            value: 'users',
            type: 'users',
            userDetails: {
                firstname: 'Maria del carmen',
                lastname: 'Buitrago',
                position: 'Aprendiz',
                avatar: Avatar2,
            },
        },
        {
            label: 'Leydis Alexandra Pinto Rojas',
            value: 'users',
            type: 'users',
            userDetails: {
                firstname: 'Alexandra',
                lastname: 'Pinto',
                position: 'Aprendiz',
                avatar: Avatar2,
            },
        },
        {
            label: 'Maria Deo',
            value: 'users',
            type: 'users',
            userDetails: {
                firstname: 'Maria',
                lastname: 'Deo',
                position: 'Aprendiz',
                avatar: Avatar5,
            },
        },
    ];

    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <>
            <Select
                {...props}
                components={{ Control, IndicatorsContainer, MenuList }}
                placeholder={'Buscar Miembro del Comité...'}
                options={formateOptions(options)}
                formatOptionLabel={handleFormatOptionLabel}
                isOptionDisabled={(option) => option.type === 'title'}
                maxMenuHeight="350px"
                handleClick={onClick}
                isSearchable
                name="search-app"
                className="app-search dropdown"
                classNamePrefix="react-select"
            />

        </>
    );
};

export default TopbarSearchComite;
