import React, { useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useParams } from "react-router";
import { Dialog } from "@progress/kendo-react-dialogs";
export default function AddDepartment(props) {
    //const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    //const emailValidator = value => emailRegex.test(value) ? "" : "Please enter a valid email.";

    //const EmailInput = fieldRenderProps => {
    //    const {
    //        validationMessage,
    //        visited,
    //        ...others
    //    } = fieldRenderProps;
    //    return <div>
    //        <Input {...others} />
    //        {visited && validationMessage && <Error>{validationMessage}</Error>}
    //    </div>;
    //};
    //let {id}=useParams();
    console.log('my props>>>'+props.id)
    
    const [Depts, setDepts] = useState([])
    const [Depts1, setDepts1] = useState([])
    const [Title, setTitle] = useState('Add Department')
    const nameValidator = (value) =>
        !value
            ? "is required"
            : value.length < 3
                ? "should be at least 3 characters long."
                : "";
    const handleSubmit = dataItem => {
        // //event.preventDefault();
         const data = new FormData(event.target);
        // //const data = JSON.stringify(dataItem, null, 2);
        debugger

        let formData = new FormData();    //formdata object

        formData.append('deptCode', dataItem.deptCode);   //append the values with key, value pair
        formData.append('deptDetails', dataItem.deptDetails);
        formData.append('parentId', dataItem.parent.id);
        formData.append('id', dataItem.id);

        if (dataItem.id) {
            var res1 = fetch("api/HrDepartmentMasterapi/" + dataItem.id, { method: 'PUT', body: formData })
            //this.props.history.push('/fetch-department');
        }
        else {
            var res1 = fetch("api/HrDepartmentMasterapi", { method: 'POST', body: formData })// { Id: dataItem.id, DeptCode: dataItem.deptCode, DeptDetails: dataItem.deptDetails } })
            //this.props.history.push('/fetch-department');
        }
        console.log(data);
        alert(JSON.stringify(dataItem, null, 2))
    };
    useEffect(() => {
        //if (!props.fetched) {
        //    props.fetchRules();
        //}
        async function PopulateDeptData() {
            const reponse = await fetch('api/HrDepartmentMasterapi/GetDepartmentDropdown').then(response => response.json()).then(response => {
                setDepts(response);debugger;
                const teamsData1 = response.map(team => ({
                    id: team.id,
                    deptDetails: team.deptDetails
                }));
                setDepts1(teamsData1);
                console.log('it is at loading---' + response.length);
            })
        }
        PopulateDeptData();
        if (props.id != 0) {
            
            async function PopulateDeptDetailsUpdate() {
                const reponse = await fetch('api/HrDepartmentMasterapi/'+props.id).then(response => response.json()).then(response => {
                    //setDepts(response);
                    
                    debugger;
                    const paren = {
                        id: response.parentId,
                        deptDetails: response.parentName,
                    };
                    setUser({...user,id:response.id,deptCode:response.deptCode,deptDetails:response.deptDetails,parent:paren});debugger;
                    setTitle('Update Department')
                    console.log('it is at loading---' + response.length);
                })
            }
            PopulateDeptDetailsUpdate();
        }
        else{
            setTitle('Add Department')
        }
        //var deptId = this.props.match.params["id"];
        //if (deptId > 0) {
        //    const response = await fetch('api/DepartmentsApi/' + deptId, { method: 'GET' });
        //    const data = await response.json();
        //    this.setState({ title: 'Edit', dept: data, Loading: false });
        //    console.log('Deptid>>>>> ' + data);
        //}
        //else {
        //    this.setState({ title: 'Create', dept: new Department, Loading: false });
        //}
        //console.log('initial >>>>  ' + this.state.Loading)
    }, []);
    //   const [Parval, setParval] = React.useState({
    //     value: {
    //     //     deptDetails: "Football",
    //     //   id: 2,
    //     },
    //   });
      const [user, setUser] = React.useState({
        
        deptDetails: "",
           id: "",
           deptCode:"",
           parent:null,
      });
      const [Parval1, setParval1] = React.useState({
        value: {
             deptDetails: "Sales Exports",
           id: "849F0749-6361-4BC2-B965-5CEAE61F3176",
        },
      });
    //    const handleChange = (event) => {
    //     setParval({
    //       value: event.target.value,
    //     });
        
    // console.log(Depts);
    //    };
       const handleChange1 = (event) => {
        console.log(event.target.value);
        // setParval1({
        //   value: event.target.value,
        // });
        
       };
    return (
        <div id="adddepartment" className="profile-page main-content">
            <div className="card-container">
                <div className="card-component">
                <Dialog title={`Edit ${props.item.deptCode}`} onClose={props.cancelEdit}>
                    <Form onSubmit={handleSubmit}
                    initialValues={user}
                    key={JSON.stringify(user)}
                        render={formRenderProps => <FormElement style={{
                            maxWidth: 650
                        }}>
                            <fieldset className={'k-form-fieldset'}>
                                <legend className={'k-form-legend'}>{Title}</legend>
                                <div className="mb-3">
                                    <Field name={'id'} component={Input} label={'ID'} disabled='true' />
                                </div>
                                 <div className="mb-3">
                                    <Field name={'deptCode'} component={Input} label={'Dept Code'} validator={nameValidator}/>
                                </div>

                                <div className="mb-3">
                                    <Field name={'deptDetails'} component={Input} label={'Dept Details'} validator={nameValidator} />
                                </div>
                                <div className="mb-3">
                                {/* <DropDownList
                                        data={Depts}
                                        name={'parent'}
                                        textField="deptDetails"
                                        dataItemKey="id"
                                        value={Parval.value}
                                        label="Parent"
                                        onChange={handleChange}
                                    /> */}
    <Field
                                        id={'parent'}
                                        name={'parent'}
                                        textField="deptDetails"
                                        dataItemKey="id"
                                        data={Depts1}
                                        component={DropDownList}
                                        onChange={handleChange1}
                                        
                                    />
                                </div>
{/* <div><ul>{Depts. map(function(d, idx){
return (<li key={idx}>{d.deptDetails}parent : { d.parent}ID : { d.id}</li>)
})}</ul></div> */}
                            </fieldset>
                            <div className="k-form-buttons">
                                <button type={'submit'} themeColor={"primary"} className="k-button" disabled={!formRenderProps.allowSubmit}>
                                    Submit
                                </button>
                            </div>
                        </FormElement>} />
                        </Dialog>
                </div>
            </div>
        </div>
    );
}