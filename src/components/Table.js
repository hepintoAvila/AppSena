// @flow
import React, { useRef, useEffect, forwardRef } from 'react';
import {Button } from 'react-bootstrap';
import PdfComponent from '../pages/dashboard/components/ButtonExportar/PdfComponent';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';

// components
import Pagination from './Pagination';
import ButtonExportar from '../pages/dashboard/components/ButtonExportar/ButtonExportar';

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Buscar :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} Registro...`}
                    className="form-control w-auto ms-1"
                />
            </span>
        </div>
    );
};



const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

type TableProps = {
    isSearchable?: boolean,
    isSortable?: boolean,
    pagination?: boolean,
    isSelectable?: boolean,
    isExpandable?: boolean,
    isVisible?: boolean,
    numtable?: number,
    pageSize: number,
    columns: Array<any>,
    data: Array<any>,
    searchBoxClass?: string,
    tableClass?: string,
    theadClass?: string,
    sizePerPageList: {
        text: string,
        value: number,
    }[],
};

const Table = (props: TableProps): React$Element<React$FragmentType> => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const isVisible = props['isVisible'] || false;
    const numtable = props['numtable'] || '0';
    const titulo = props['titulo'] ||  '';
    const titleTable = props['titleTable'] ||  '';
    //const permisos = props['permisos'] ||  {};
    const toggleSignUp = props['toggleSignUp'] || '';

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;
    const table=`Table_Export_${numtable}`
    return (
        <>
            <div className="row justify-content-start">
            <div class="col-8">
             {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}</div>
                {isVisible && (<>
                <div className="col-2">
                <ButtonExportar numtable={table}/>
                </div>
                <div className="col-2 p-2">
                <PdfComponent nombre={table}/>
                </div>
                <div className="col-2 p-2">
                <Button className="btn btn-dataTable mb-0 me-5 p-2" onClick={toggleSignUp}>
                          <i className="mdi mdi-tray-plus">{titulo}</i>
                        </Button>
                        </div>
                </>)}
            </div>

            <div className="table-responsive">

                <div className="bg-dataTable p-1 text-sm-start text-white mt-1"><br/><h4 className="header-title mb-3">{titleTable}</h4></div>
                <table id={table}
                    {...dataTable.getTableProps()}
                    className={classNames('table table-striped', props['tableClass'])}>
                    <thead className={props['theadClass']} >
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row, i) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} id={i+1}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

            {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

export default Table;
