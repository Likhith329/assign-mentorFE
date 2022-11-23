import { useEffect, useState } from "react";
import axios from 'axios';
import './Mentorpage.css';

export function Mentorpage() {
  
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

  const remainingstudents=studentdata.filter(student=>{
    return student.mentor==undefined;
  })

  return (
    <div>
      <table className="table table-striped table-responsive">
        <thead>
          <th>S.no</th>
          <th>Name</th>
          <th>Email</th>
          <th>Students</th>
        </thead>
        <tbody>
          {mentordata.map((Mentor,index1)=>(
            <tr key={index1}>
              <td>{index1+1}</td>
              <td className="mentorname">{Mentor.name}</td>
              <td className="mentoremail">{Mentor.email}</td>
              {Mentor.students!=''?
              <td>
                {Mentor.students.map((student,index2)=>(
                  <div key={index2} className='mentstudent'>
                    
                    <div className="card shadow mentstudentcard">
                      <div className="stdname">Name: <span className="nameval">{student.name}</span></div>
                      <div className="stdemail">Email: <span className="emailval">{student.email}</span></div>
                    </div>
                    
                    <button className="btn btn-secondary delbtn" onClick={async()=>{

                      await axios.put('https://assign-mentorapp.herokuapp.com/students/assignamentor',{
                        name:Mentor.students[index2].name,
                        mentor:undefined
                      })

                      let students=Mentor.students
                      students.splice(index2,1)
                      await axios.put('https://assign-mentorapp.herokuapp.com/mentors/assignastudent',{
                        name:Mentor.name,
                        students:students
                        })
                        
                    }}>Delete</button>
                  </div>
                ))}
              </td>:''}

              {remainingstudents!=''?
              <td>
                <button className="nav-item dropdown btn btn-primary addbtn">
                  <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add students
                  </a>
                  <ul className="dropdown-menu">
                    {remainingstudents.map((student,index3)=>(
                      <li key={index3} className="dropdown-item" onClick={async()=>{

                        let students=mentordata[index1].students

                        if(mentordata[index1].students){
                          students.push(remainingstudents[index3])
                        }
                        else{
                          students=[remainingstudents[index3]]
                        }

                        await axios.put('https://assign-mentorapp.herokuapp.com/mentors/assignastudent',{
                          name:Mentor.name,
                          students:students
                        })
                        
                        await axios.put('https://assign-mentorapp.herokuapp.com/students/assignamentor',{
                          name:remainingstudents[index3].name,
                          mentor:Mentor.name
                        })
                          
                      }}>{student.name}</li>

                    ))}
                  </ul>
                </button>
              </td>:''}

              <td>
                <button className="btn btn-success " onClick={async()=>{
                   await axios.delete('https://assign-mentorapp.herokuapp.com/mentors/delete',{
                    data:{
                      name:Mentor.name
                    }
                  })
                  {
                    Mentor.students.map(async(student)=>(
                      await axios.put('https://assign-mentorapp.herokuapp.com/students/assignamentor',{
                        name:student.name,
                        mentor:undefined
                      })
                    ))
                  }
          
                }}>Delete mentor</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
