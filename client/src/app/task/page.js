"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task= () => {
  const loginuserid=localStorage.getItem("LoginUserId")
  const token=localStorage.getItem("Token")
  const [data,setData]=useState([])
  const [form,setForm]=useState({
    ProjectName: "",
    TaskName: "",
    TaskDescription: "",
    Spendtime: 0,
    Priority: "",
    Assigned: "",
    Status: "",
    Createdby: loginuserid,
    Updateby: loginuserid,
    Createdate: new Date(),
    Updatedate: new Date()
  })
 

  

  const handleChange=(e)=>{
    const {name,value}=e.target
   setForm({...form,[name]: value})
  }

  // console.log(form,"form123==>")

  useEffect(()=>{
   axios.get(`http://localhost:3003/api/listtask?loginuserid=${loginuserid}`)
   .then((res)=>{
    setData(res.data.ResponseData)
   })
   .catch((err)=>{
    console.log(err)
   })
  },[])
  
  const handleSubmit= ()=>{
  console.log(form,"form456==>")

    axios.post("http://localhost:3003/api/task", form, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      toast.success("Data Saved Sucessfully", {
        position: "top-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      window.location.reload()
  }
  return (
    <>
    <h1 className='text-center text-red-400 text-xl'>Task Management</h1>
    <ToastContainer/>
    <div className='m-auto w-60 mt-3'>
    <label>Project Name</label><br/>
    <input type="text" name="ProjectName" onChange={(e)=>handleChange(e)}  placeholder='ProjectName'/><br/>
    <label>Task Name</label><br/>
    <input type="text" name="TaskName" onChange={(e)=>handleChange(e)}  placeholder='TaskName'/><br/>
    <label>Task Description</label><br/>
    <input type="text" name="TaskDescription" onChange={(e)=>handleChange(e)}  placeholder='TaskDescription'/><br/>
    <label>Spend Time(in hrs)</label><br/>
    <input type="number" name="Spendtime" onChange={(e)=>handleChange(e)}  placeholder='Spendtime'/><br/>
    <label>Priority</label><br/>
    <select  name="Priority" onChange={(e)=>handleChange(e)}  placeholder='Priority'>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
    </select><br/>
    <label>Assigned</label><br/>
    <input type="text" name="Assigned" onChange={(e)=>handleChange(e)}  placeholder='Assigned'/><br/>
    <label>Status</label><br/>
    <select  name="Status" onChange={(e)=>handleChange(e)}  placeholder='Status'>
        <option value="assigned">Assigned</option>
        <option value="pending">Pending</option>
    </select><br/>
    <button type="submit" onClick={handleSubmit} className='mt-2 bg-slate-400 w-20 m-auto px-1 py-2 rounded-xl text-white'>Submit</button>
    </div>

    <div className='mt-3'>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned</th>
            <th>Spend Time(in hrs)</th>
            <th>Created Date</th>
            <th>Updated Date</th>

          </tr>
        </thead>
        <tbody>
          {data?.map((item,index)=>{
            return (
              <tr>
                <td>{item.projectname}</td>
                <td>{item.taskname}</td>
                <td>{item.taskdescription}</td>
                <td>{item.status}</td>
                <td>{item.priority}</td>
                <td>{item.assigned}</td>
                <td>{item.spendtime}</td>
                <td>{item.createddate}</td>
                <td>{item.updatedate}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </>
  )
}

export default Task