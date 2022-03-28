import React, { useEffect, useState } from "react";
//import React, { useEffect, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error } from "@progress/kendo-react-labels";
//import categories from "./categories.json";

const minValueValidator = value => value >= 0 ? "" : "The value must be 0 or higher";

const NonNegativeNumericInput = fieldRenderProps => {
  const {
    validationMessage,
    visited,
    ...others
  } = fieldRenderProps;
  return <div>
        <NumericTextBox {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>;
};

const AddDesignation = props => {
    const [Depts, setDepts] = useState([])
    const [Title, setTitle] = useState('Add Department')
    const [btnSave, setbtnSave] = useState('Save')
useEffect(() => {
    //if (!props.fetched) {
    //    props.fetchRules();
    //}
    async function PopulateDeptData() {
        const reponse = await fetch('api/HrDepartmentMasterapi/GetDepartmentDropdown').then(response => response.json()).then(response => {
            //setDepts(response);debugger;
            const teamsData1 = response.map(team => ({
                parentId: team.id,
                parentName: team.deptDetails
            }));
            setDepts(teamsData1);
            console.log('it is at loading---' + response.length);
        })
    }
    PopulateDeptData();
    if(props.item.length==0)
{
setTitle("Add Department")
setbtnSave("Save")
}
else
{
    setbtnSave("Update")
setTitle(`Edit ${props.item.deptDetails}`)
}
}, []);
debugger;

  return <Dialog title={Title} onClose={props.cancelEdit}>
        <Form onSubmit={props.onSubmit} initialValues={{...props.item,parent:{parentId:props.item.parentId,parentName:props.item.parentName}}} render={formRenderProps => <FormElement style={{
      maxWidth: 650
    }}>
              <fieldset className={"k-form-fieldset"}>
                <div className="mb-3">
                  <Field name={"deptCode"} component={Input} label={"Department Code"} />
                </div>
                <div className="mb-3">
                  <Field name={"deptDetails"} component={Input} label={"Department Name"} />
                </div>
                <div className="mb-3">
                  <Field name={"parent"} component={DropDownList} data={Depts} textField={"parentName"} dataItemKey="parentId" label={"Parent"} />
                </div>
                {/* <div className="mb-3">
                  <Field name={"UnitPrice"} component={NonNegativeNumericInput} label={"Price"} validator={minValueValidator} />
                </div>
                <div className="mb-3">
                  <Field name={"UnitsInStock"} component={NonNegativeNumericInput} label={"In stock"} validator={minValueValidator} />
                </div> */}
              </fieldset>
              <div className="k-form-buttons">
                <button type={"submit"} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" disabled={!formRenderProps.allowSubmit}>
                  {btnSave}
                </button>
                <button type={"submit"} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={props.cancelEdit}>
                  Cancel
                </button>
              </div>
            </FormElement>} />
      </Dialog>;
};

export default AddDesignation;