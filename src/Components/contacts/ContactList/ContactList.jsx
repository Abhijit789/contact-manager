import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Spinner from '../../Spinner/Spinner'
import { ContactServices } from '../../ContactServices/ContactServices'





const ContactList = () => {
   let{contactId}=useParams()
   let [query,setQuery]=useState({
      text:''
   })
  let [state,setState]=useState({
   loading:false,
   contacts:[],
   filteredContact:[],
   errorMessage:''
  })
  useEffect(()=>{
   let prom1=new Promise((res1,rej1)=>{
          setState({...state,loading:true,contacts:[]})
          

         let response=ContactServices.getAllContacts();
         res1(response)
         // rej1("error")

   })

   prom1.then((resp1)=>{
         setState({...state,loading:false,contacts:resp1.data,filteredContact:resp1.data})
      
        console.log(resp1);
   }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error.message})
      alert("data is not found!!!!")
   })

  },[contactId])

//   deleteContact handle

let clickDelete=(contactId)=>{
   let promise=new Promise((res,rej)=>{
          let deleteContact=ContactServices.deleteContact(contactId);
          res(deleteContact)
   })
   promise.then((res1)=>{
          if (res1) {
            let prom1=new Promise((res1,rej1)=>{
               setState({...state,loading:true,contacts:[]})
               
     
              let response=ContactServices.getAllContacts();
              res1(response)
              // rej1("error")
     
        })
     
        prom1.then((resp1)=>{
              setState({...state,loading:false,contacts:resp1.data,filteredContact:resp1.data})
           
             console.log(resp1);
        }).catch((error)=>{
           setState({...state,loading:false,errorMessage:error.message})
           alert("data is not found!!!!")
        })
            
          }
   })
}
// Search Contact
   
let searchContact=(event)=>{
     setQuery({...query,text:event.target.value})
     let theContact=state.contacts.filter((contact)=>{
           return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
     })
     console.log(theContact);
     setState({...state,filteredContact:theContact})


}

  

   

         
         
  
   let {loading,contacts,errorMessage,filteredContact}=state
  return (
    <div>
    <React.Fragment>
         {/* <pre>{JSON.stringify(contacts)}</pre> */}
         {/* <pre>{JSON.stringify(query.text)}</pre> */}
        <section className="contact-search p-3">
             <div className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                           <p className="h3">Contact Manager <Link className='btn btn-primary ms-2' to={'/contacts/add'}><i className='fa fa-plus-circle me-2' />Add</Link> </p>
                           <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error neque illo pariatur tenetur cupiditate quos commodi vitae optio at. Tenetur, suscipit officia? Reprehenderit recusandae adipisci repellendus facere, nulla dignissimos tempore.</p>
                        </div>
                    </div>
                    {/* row-2  */}
                    <div className="row">
                      <div className="col-md-6">
                        <form action="" className='row'>
                          <div className="col-md-8">
                          <div className="mb-2">
                              <input type="text" name="text" value={query.text} onChange={searchContact} className='form-control' placeholder='Search Name' />
                           </div>
                          </div>
                          <div className="col">
                          <div className="mb-2">
                            {/* <input type="submit" className='btn btn-outline-dark' value={"Search"} onClick={searchContact} /> */}
                           </div>
                          </div>
                           
                           
                        </form>
                        </div>
                    </div>
                </div>
             </div>
        </section>
       
        {/* SECTION-2 */}
              {
                 loading ? <Spinner/> : 
                 <React.Fragment>
                   <section className="contact-list">
                 <div className="container">
                     <div className="row">
                     {
                  filteredContact.length>0 &&
                        filteredContact.map((contact)=>{
                             return(
                              <div className="col-md-6" key={contact.id}>
                             <div className="card my-2">
                                 <div className="card-body">
                                      <div className="row d-flex align-items-center">
                                           <div className="col-md-4 d-flex justify-content-md-center flex-wrap ">
                                            <img src={contact.photo} alt="" className='contact-img' />
                                           </div>
                                           <div className="col-md-7">
                                              <ul className='list-group'>
                                                 <li className='list-group-item list-group-item-action'>
                                                    Name : <span className='fw-bold'>{contact.name}</span>
                                                 </li>
                                                 <li className='list-group-item list-group-item-action'>
                                                    Contact : <span className='fw-bold'>{contact.mobile}</span>
                                                 </li>
                                                 <li className='list-group-item list-group-item-action'>
                                                    Email : <span className='fw-bold'>{contact.email}</span>
                                                 </li>
                                              </ul>
                                           </div>
                                           <div className="col-md-1 d-flex flex-column align-items-center">
                                              <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye'/></Link>
                                              <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-pen'/></Link>
                                              <button className='btn btn-danger' onClick={()=>{clickDelete(contact.id)}}><i className='fa fa-trash my-1'/></button>
                                              
                                           </div>

                                      </div>
                                 </div>
                             </div>
                         </div>
                             )
                        })
                     }
                         
                     </div>
                 </div>
           </section>
                 </React.Fragment>
                 
              }
             
      
           
           </React.Fragment>
            </div>
  )
}

export default ContactList
