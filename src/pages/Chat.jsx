import React, { useEffect, useState,useRef } from 'react'
import {db,auth} from '../firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import '../css/Chat.css'

function Chat() {

  const [user] = useAuthState(auth)

  const[users, setUsers] = useState([])
  const[messages, setMessages] = useState([])
  const[newMessage, setNewMessage] = useState('')
  const bottomRef = useRef(null);

  const handleSendMessage = async (e)=>{
      e.preventDefault();

      if(newMessage.trim()==='') return;
      const messageRef = collection(db, 'chats','room1','messages')

      await addDoc(messageRef,{
        sender:user.uid,
        message:newMessage.trim(),
        timestamp:serverTimestamp()
      });
      setNewMessage('')
  }

    //fetching the users
    useEffect(()=>{
      const fetchUsers =  ()=>{
          const userCollection = collection(db, "users")
        
          onSnapshot(userCollection, (snapshot)=>{
            const userList = snapshot.docs.map(doc=>doc.data())
            setUsers(userList)
            console.log(userList)
          })
      };
      fetchUsers();
    },[])



  //fetching the messages
  useEffect(()=>{
    const msgRef = collection(db,'chats','room1','messages');
    const q = query(msgRef, orderBy('timestamp'))

    const unsubscribe = onSnapshot(q,(snapshot)=>{
      const msgs = snapshot.docs.map((doc)=>doc.data());
      setMessages(msgs)
    });
    return()=> unsubscribe();    
  },[])

  useEffect(() =>{
    bottomRef.current?.scrollIntoView({behavior:'smooth'});
  },[messages]);

  return (
    <>

      <div className="chat-container">
          <h1 style={{color:'#471878', letterSpacing:'1.5px',textAlign:'center'}}>Your personal chat Room</h1>



          <div className='chats'>
              {messages.length===0 ? (<p>No message available</p>):(
                messages.map((msg,index)=>{
                  const sender = users.find((u)=>u.uid.trim()===msg.sender.trim());
                  const senderName = sender ? sender.name : 'Unknown'
                  const isCurrentUser =user.uid ===msg.sender.trim();
                  return(
                    <div style={{display:'flex',justifyContent:isCurrentUser ?'flex-end':'flex-start',marginBottom:'5px'}}>
                      <div
                    className={isCurrentUser ? 'receiver-msg':'sender-msg'}>
          
                     
                        <strong>{senderName} : </strong>
                        {msg.message}
                    </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef}/>
          </div>

          <form onSubmit={handleSendMessage} style={{display:"flex", columnGap:"5px", flexWrap:"wrap"}}>
              <input
              style={{height:'40px', width:"250px", border:"none",outline:"none", fontSize:"20px", paddingLeft:"10px", borderRadius:"15px"}}
              placeholder='Enter your message'
              value={newMessage}
              onChange={(event)=>{setNewMessage(event.target.value)}}
              />

              <button type='submit' style={{height:"40px",cursor:'pointer',fontSize:"15px", backgroundColor:"#471878", color:"white", width:"60px",padding:"2px", borderRadius:"10px",letterSpacing:"1.5px",fontWeight:"700", border:"none"}}>Send</button>
          </form>

      </div>

      



    </>
  )
}

export default Chat