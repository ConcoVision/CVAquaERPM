import React, { useEffect, useState } from "react";
import { DropdownFilterCell } from "../components/dropdownFilterCell";
import { RangeFilterCell } from "../components/rangeFilterCell";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process, filterBy } from '@progress/kendo-data-query'
import { Link } from 'react-router-dom';
import "@progress/kendo-theme-default/dist/all.css"
export default function SARoles(props) {
    const [Depts, updateDepts] = useState([])
    const [Loading, updateLoading] = useState(true)
    const [dataState, updatedataState] = useState({ skip: 0, take: 50 })
    const [result, updateresult] = useState(process(Depts, dataState))
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
                    <GridColumn field="id" title="ID" />
                    <GridColumn field="name" title="Name" width="250px" />
                    <GridColumn field="displayName" title="Display Name" width="250px"
                        />
                    <GridColumn field="createdDate" title="Created Date" width="250px" filter="date"
                        format="{0:d}" />
                    {/*<GridColumn field="departmets.deptName" title="Department" filterCell={CategoryFilterCell} />*/}
                    <GridColumn field="isDefault" title="Is Default" cell={Boolcell} filter="boolean" />
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
            const reponse = await fetch('api/SaRoleapi').then(response => response.json()).then(response => { updateDepts(response); updateresult(process(response, dataState)) })
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

    return (
        <div id="role" className="profile-page main-content">
                <div className="card-container">
                    <div className="card-component">
            <h1>Roles List</h1>
                    <p><Link to='/addrole'>Create</Link></p>
            {rendata()}
        </div>
        </div>
        </div>
    );
}
