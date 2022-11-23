import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Mentorpage } from './Mentorpage';
import { Studentpage } from './Studentpage';
import { Creatementor } from './Creatementor';
import { Createstudent } from './Createstudent';

function App() {
  const navigate=useNavigate()
  return (
    <div>
      <nav  className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={()=>{navigate('/assign-mentorFE')}}>StudentMentorAssignings</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/mentorpage'} className='nav-link'>Mentor</Link>
              </li>
              <li className="nav-item">
                <Link to={'/studentpage'} className='nav-link'>Student</Link>
              </li>
              <li className="nav-item">
                <Link to={'/createamentor'} className='nav-link'>Create a mentor</Link>
              </li>
              <li className="nav-item">
                <Link to={'/createastudent'} className='nav-link'>Create a student</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/assign-mentorFE' element={<Homepage/>}/>
        <Route path='/mentorpage' element={<Mentorpage/>}/>
        <Route path='/studentpage' element={<Studentpage/>} />
        <Route path='/createamentor' element={<Creatementor/>} />
        <Route path='/createastudent' element={<Createstudent/>} />
      </Routes> 
    </div>
  );
}

export default App;

function Homepage(){
  return(
    <div className='text-center' style={{fontSize:'40px',fontFamily:'cursive'}}>
      Welcome...!
    </div>
  )
}


