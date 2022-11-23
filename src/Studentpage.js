import { useEffect, useState } from "react";
import axios from 'axios';

export function Studentpage() {
  const [mentordata,setMentordata]=useState([])
  const [studentdata,setStudentdata]=useState([])
  
  useEffect(()=>{
    async function getData(){
      await axios.get('https://assign-mentorapp.herokuapp.com/Mentors/get').then(
        response=>setMentordata(response.data)
      )
    }
    getData()
  },[mentordata])
  
  useEffect(()=>{
    async function getData(){
      await axios.get('https://assign-mentorapp.herokuapp.com/Students/get').then(
        response=>setStudentdata(response.data)
     )
    }
    getData()
  },[studentdata])

  return (
    <div>
      <table className="table table-striped table-responsive">
        <thead>
          <th>S.no</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mentor</th>
        </thead>
        <tbody>
          {studentdata.map((student,index1)=>(
            <tr key={index1}>
              <td>{index1+1}</td>
              <td className="studentname">{student.name}</td>
              <td className="studentemail">{student.email}</td>
              {student.mentor!=undefined?<td className="mentorinstudent">
                <span>{student.mentor}</span>
                <button className="btn btn-secondary delbtn" onClick={async()=>{

                  await axios.put('https://assign-mentorapp.herokuapp.com/students/assignamentor',{
                    name:student.name,
                    mentor:undefined
                  })

                  let mentorobj=mentordata.filter(mentor=>{
                    return mentor.name==student.mentor
                  })
                  let students=mentorobj[0].students
                  let studentindex=students.findIndex((x)=>{return x.name==student.name})
               
                  students.splice(studentindex,1)
                  await axios.put('https://assign-mentorapp.herokuapp.com/mentors/assignastudent',{
                    name:student.mentor,
                    students:students
                    })

                }}>Delete</button>
                </td>:<td>
              <button className="nav-item dropdown btn btn-primary">
                <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Add a mentor
                </a>
                <ul className="dropdown-menu">
                  {mentordata.map((mentor,index2)=>(
                    <li key={index2} className="dropdown-item" onClick={async()=>{
                      await axios.put('https://assign-mentorapp.herokuapp.com/students/assignamentor',{
                            name:student.name,
                            mentor:mentor.name
                          })

                      let students=mentordata[index2].students
                      if(mentordata[index2].students){
                        students.push(studentdata[index1])
                      }
                      else{
                        students=[studentdata[index1]]
                      }
                        await axios.put('https://assign-mentorapp.herokuapp.com/mentors/assignastudent',{
                          name:mentor.name,
                          students:students
                        })    
                    }}>
                      {mentor.name}
                    </li>
                  ))}
                </ul>
              </button>
                </td>}

                <td>
                <button className="btn btn-success" onClick={async()=>{
                  await axios.delete('https://assign-mentorapp.herokuapp.com/students/delete',{
                    data:{
                      name:student.name
                    }
                  })
                  
                  if(student.mentor){
                    let mentorobj=mentordata.filter(mentor=>{
                      return mentor.name==student.mentor
                    })
                    let students=mentorobj[0].students
                    let studentindex=students.findIndex((x)=>{return x.name==student.name})
                 
                    students.splice(studentindex,1)
                    await axios.put('https://assign-mentorapp.herokuapp.com/mentors/assignastudent',{
                      name:student.mentor,
                      students:students
                      })
                  }
         
                }}>Delete student</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
