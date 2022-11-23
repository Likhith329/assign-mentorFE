import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Form,Formik, useFormik, } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import './Creatementor.css';

export function Createstudent(){

  const [studentdata,setStudentdata]=useState([])

  useEffect(()=>{
    async function getData(){
      await axios.get('https://assign-mentorapp.herokuapp.com/Students/get').then(
        response=>setStudentdata(response.data)
     )
    }
    getData()
  },[studentdata])

  const navigate=useNavigate()

  const initialValues={
    name:'',
    email:''
    
  }

  const onSubmit=async(values)=>{
    await axios.post('https://assign-mentorapp.herokuapp.com/students/create',{
    student:{...values}
     })
    navigate('/studentpage')
  }

  const validate=(values)=>{
    let errors={}

    if(!values.name)errors.name='required*'

    if(!values.email)errors.email='required*'

    let filtereddata=studentdata.filter(student=>{
      return student.email==values.email
    })
  
    if(filtereddata!='')errors.email='Email already exists!'

    return errors;
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validate
  })


  return (
    <div>
      <div className="container-fluid creatementorcont">
        <Formik>
          <Form onSubmit={formik.handleSubmit} className='form'  >
              <div className="title">Create a student</div>

              <div className="inpbox">
                <TextField className='textinp' variant="outlined" type={'name'} label={'Enter name'} value={formik.values.name} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                <div>{formik.errors.name && formik.touched.name?<div>{formik.errors.name}</div>:null}</div>
              </div>

              <div className="inpbox">
              <TextField className='textinp' type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
              </div>

              <Button variant='contained' type='submit' className="loginbtn">Login</Button>

             
           
          </Form>
        </Formik>
      </div>
    </div>
  );
}