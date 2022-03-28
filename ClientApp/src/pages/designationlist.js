import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

import AddDesignation from "./adddesignation";
const CommandCell = props => {
  return <td>
        <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => props.enterEdit(props.dataItem)}>
          Edit
        </button>
        <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => props.enterDelete(props.dataItem)}>
          Delete
        </button>
      </td>;
};

const Designation = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [editItem, setEditItem] = React.useState({
    id: ""
  });
  const [data, setData] = React.useState([]);
  useEffect(() => {
    console.log('it is at loading---');//updateLoading(false)
    async function PopulateDeptData() {
        const reponse = await fetch('http://localhost:35700/api/HrDepartmentMaster/GetHrDepartmentMaster')
        
        .then(response => response.json())
        .then(result => { 
            debugger
            setData(result); 
            //updateresult(process(result, dataState)) 
        })
        //const data = await reponse.json();
        //updateDepts(data)
        //updateLoading(false)
        //console.log('it is at loading---' + data);
    }
    PopulateDeptData();
}, [])
const handleCreate= item => {
    setOpenForm(true);
    setEditItem([]);
  };
  const enterEdit = item => {
    setOpenForm(true);
    setEditItem(item);
  };
  const enterDelete = item => {
    if (!window.confirm('Do you want to Delete Department with id' + item.deptDetails))
            return;
        else {
            fetch('api/HrDepartmentMasterapi/' + item.id, { method: 'delete' })
                .then(result => {
                    debugger
                    if (result.ok == true) {
                        setData(
                            data.filter((rec) => {
                                return rec.id !== item.id
                            })

                        );
                    }
                });
        }
  };
  
  const handleSubmit = event => {
      debugger
      //const fdata = new FormData(event.target);
      // //const data = JSON.stringify(dataItem, null, 2);
      

      let formData = new FormData();    //formdata object

      formData.append('deptCode', event.deptCode);   //append the values with key, value pair
      formData.append('deptDetails', event.deptDetails);
      if(event.parent.parentId!=undefined)
        formData.append('parentId', event.parent.parentId);
      if (Object.keys(event).indexOf('id')>=0) {
          formData.append('id', event.id);
          var res1 = fetch("api/HrDepartmentMasterapi/" + event.id, { method: 'PUT', body: formData })
          .then(response => response.json())
          .then(result => { 
              debugger
              let newData = data.map(item => {
                  if (result.id === item.id) {
                      item = {
                          ...event, parentName: result.parentName, parentId: result.parentId
                      };
                  }

                  return item;
              });
           setData(newData);
              //setData(result); 
              //updateresult(process(result, dataState)) 
          })
          //this.props.history.push('/fetch-department');
          
      }
      else {
          var res1 = fetch("api/HrDepartmentMasterapi", { method: 'POST', body: formData })// { Id: dataItem.id, DeptCode: dataItem.deptCode, DeptDetails: dataItem.deptDetails } })
          .then(response => response.json())
          .then(result => { 
              debugger
              data.push(result);
              setData(data);
              //setData({...data,id:result.id,parentName: result.parentName, parentId: result.parentId,deptCode:result.deptCode,deptDetails:result.deptDetails,createdDate:result.createdDate}); 
              //updateresult(process(result, dataState)) 
          })
      }
    
    setOpenForm(false);
  };

  const handleCancelEdit = () => {
    setOpenForm(false);
  };

  const MyEditCommandCell = props => <CommandCell {...props} enterEdit={enterEdit} enterDelete={enterDelete} />;
  const datecell = (props) => {
    //console.log(props)
    debugger
    const [year, month, day] =  props.dataItem.createdDate.split('T')[0].split('-')

// dd/mm/yyyy
console.log(`${day}/${month}/${year}`)
    return (
        <td className="k-command-cell">
            {`${day}/${month}/${year}`}
        </td>
    )
}
  return <React.Fragment>
      <div id="adddepartment" className="profile-page main-content">
          <div className="card-container">
              <div className="card-component">
              <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-info" onClick={handleCreate}>
          Create Department
        </button>
                  <Grid style={{
                      height: "400px"
                  }} data={data}>
                      <div style={{ display: 'none' }} >

                          <Column field="id" title="ID" filterable={false} />
                      </div>
                      <Column field="deptCode" title="Dept Code" width="250px" />
                      <Column field="deptDetails" title="Dept Details" width="350px" />
                      {/* <Column field="parentId" title="Parent ID" width="250px" /> */}
                      <Column field="parentName" title="Parent Name" width="250px" />
                      <Column field="createdDate" 
                      title="Created Date" 
                      width="250px" filter="date"
                        format="{0:MM-dd-yyyy}" />
                      <Column cell={MyEditCommandCell} />
                  </Grid>
                  {openForm && <AddDesignation cancelEdit={handleCancelEdit} onSubmit={handleSubmit} item={editItem} />}
              </div>
          </div>
      </div>
          </React.Fragment>;
};

export default Designation