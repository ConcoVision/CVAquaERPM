import React, { useEffect, useState } from "react";
import { DropdownFilterCell } from "../components/dropdownFilterCell";
import { RangeFilterCell } from "../components/rangeFilterCell";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process, filterBy } from '@progress/kendo-data-query'
import { Link } from 'react-router-dom';
import "@progress/kendo-theme-default/dist/all.css"
import AddDepartment from "./adddepartment";
import { Popup } from "@progress/kendo-react-popup";
import { Button,DropDownButton,DropDownButtonItem,ButtonGroup } from "@progress/kendo-react-buttons";
import { CalendarPropsContext } from "@progress/kendo-react-dateinputs";
export default function HrDepartment(props) {
    const [Depts, updateDepts] = useState([])
    const [Loading, updateLoading] = useState(true)
    const [dataState, updatedataState] = useState({ skip: 0, take: 50 })
    const [result, updateresult] = useState(process(Depts, dataState))
    const anchor = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [DeptId, setDeptId] = React.useState();
    //const [sort, setSort] = React.useState(initialSort);
    const onDataStateChange = (event) => {
        updatedataState(event.dataState)
        updateresult(process(Depts, event.dataState));
    }
   
    //const categories = Array.from(
    //    new Set(
    //        Depts.map((p) => (p.departmets ? p.departmets.deptName : ""))
    //    )
    //);

    //const CategoryFilterCell = (props) => (
    //    <DropdownFilterCell
    //        {...props}
    //        data={categories}
    //        defaultItem={"Select departmets"}
    //    />
    //);

    const Boolcell = (props) => {
        return (
            <td>{props.dataItem[props.field] ? 'Yes' : 'No'}</td>
        )
    }
    const cmdcell = (props) => {
        //console.log(props)
        return (
            <td className="k-command-cell">
                <button className="k-primary k-button k-grid-edit-command" onClick={(id) => handleEdit(props.dataItem.id)}>
                    Edit
                </button>
                <button className="k-button k-grid-remove-command" onClick={(id) => handleDelete(props.dataItem.id)}>
                    Remove
                </button>
            </td>
        )
    }
    const datecell = (props) => {
        //console.log(props)
        const value = props.dataItem[props.field];
        return (
            <td className="k-command-cell">
                <button className="k-primary k-button k-grid-edit-command" onClick={(id) => handleEdit(props.dataItem.id)}>
                    Edit
                </button>
                <button className="k-button k-grid-remove-command" onClick={(id) => handleDelete(props.dataItem.id)}>
                    Remove
                </button>
            </td>
        )
    }
    function handleEdit(id) {
        //console.log(id)
        //props.history.push('/adddepartment/'+id );
        setDeptId(id);
        setShow(true);
    }
    function handleDelete(id) {
        if (!window.confirm('Do you want to Delete Employee with id' + id))
            return;
        else {
            fetch('api/HrDepartmentMasterapi/' + id, { method: 'delete' })
                .then(data => {
                    updateDepts(
                        Depts.filter((rec) => {
                            return rec.id !== id
                        })

                    );
                });
        }
    }
    const myCustomDateCell = props => {
        debugger
        if (props.dataItem.createdDate !== '') {
          return <td>{(props.dataItem.createdDate).format("MM/DD/YYYY")}</td>
        }
        return <td>{props.dataItem.createdDate}</td>
    }
    const RenderDeptTable = (depts) => {
        console.log('it is at render>>>>' + depts);
        return (
            <div>
                <Grid
                    style={{
                        height: "800px",
                    }}
                    data={result} filterable={true} pageable={true} total={result.length}
                    onDataStateChange={onDataStateChange} {...dataState}
                    sortable={true} groupable={true}
                >
                    <div style={{ display: 'none' }} >

                    <GridColumn field="id" title="ID" filterable={false} />
                    </div>
                    <GridColumn field="deptCode" title="Dept Code" width="250px" />
                    <GridColumn field="deptDetails" title="Dept Details" width="250px"/>
                    <GridColumn field="parentId" title="Parent ID" width="250px"/>
                    <GridColumn field="parentName" title="Parent Name" width="250px"/>
                    <GridColumn field="createdDate" title="Created Date" width="250px" filter="date" 
                        format="{0:d}" />
                    {/*<GridColumn field="departmets.deptName" title="Department" filterCell={CategoryFilterCell} />
                    <GridColumn field="isDefault" title="Is Default" cell={Boolcell} filter="boolean" />*/}
                    {/* <GridColumn cell={myCustomDateCell} filterable={false}/> */}
                    <GridColumn cell={cmdcell} filterable={false}/>
                </Grid>
                {depts.map(item =>
                    console.log(item)
                )
                }
            </div>
        )
    }

    useEffect(() => {
        console.log('it is at loading---');updateLoading(false)
        async function PopulateDeptData() {
            const reponse = await fetch('http://localhost:35700/api/HrDepartmentMaster/GetHrDepartmentMaster')
            
            .then(response => response.json())
            .then(result => { 
                debugger
                updateDepts(result); 
                updateresult(process(result, dataState)) })
            //const data = await reponse.json();
            //updateDepts(data)
            updateLoading(false)
            //console.log('it is at loading---' + data);
        }
        PopulateDeptData();
    }, [])
    const rendata = () => {
        let contents = Loading
            ? <p><em>Loading...</em></p>
            : RenderDeptTable(Depts);
        return contents
    }
    const onClose = () => {
        setShow(false);
      };
    const onClick = () => {
        setDeptId(0);
        setShow(true);
      };
    return (
        <div id="role" className="profile-page main-content">
                <div className="card-container">
                    <div className="card-component">
            <h1>Department List</h1>
                    <p>
                        {/* <Link to='/adddepartment'>Create</Link> */}
                        <button themeColor={"primary"}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={onClick}
        ref={anchor}
      >
        Create
      </button>
      </p>
            {rendata()}
            <Popup show={show} anchor={anchor.current}>
        <AddDepartment id={DeptId}/>
        <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={onClose}
        ref={anchor}
      >
        Close
      </button>
        </Popup>
        </div>
        </div>
        </div>
    );
}
