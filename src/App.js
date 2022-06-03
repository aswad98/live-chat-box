import{useEffect, useState} from 'react';
import Pusher from "pusher-js";

function App() {
  const[username ,setUsername] = useState('username');
  const[messeges,setMesseges]= useState([]);
  const[messege,setMessege]=useState('');
  let allMesseges =[];

  useEffect(()=>{

    Pusher.logToConsole = true;

    const pusher = new Pusher('22c4f6f5b4e8a3f7a5fa',{
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('messege', function(data) {
     allMesseges.push(data);
      setMesseges(allMesseges);
    });

  },[]);

  const submit=async (e) =>{
  e.PreventDefault();
  await fetch('http://localhost:8000/api/messege',{
   method : 'post',
   header : {'content-type':'application/json'},
   body: JSON.stringify({
     username,
     messege
   })
 });
 setMessege('');
  }
 
  return (
    <div className="container">
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
    <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
    <input className="fs-5 fw-semibold" value={username} 
    onChange={e => setUsername(e.target.value)}/>
    </div>
    <div className="list-group list-group-flush border-bottom scrollarea">
      {messeges.map(messege=>{
        return(
        <div className="list-group-item list-group-item-action py-3 lh-tight">
         <div className="d-flex w-100 align-items-center justify-content-between">
           <strong className="mb-1">{messege.username}</strong>
         </div>
         <div className="col-10 mb-1 small">{messege.messege}</div>
       </div>
        )
      })}
     </div>
  </div>
  <form onSubmit={e=>submit(e)}>
    <input className='form-control' placeholder='write a messege' value={messege}
     onChange={e=>setMessege (e.target.value)}
    />
  </form>
  </div>
  );
}

export default App;
