import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../ContactServices/ContactServices'
import Spinner from '../../Spinner/Spinner'


const AddContact = () => {
  let navigate=useNavigate()
  let[state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      mobile:"",
      email:"",
      title:"",
      company:"",
      groupId:"",

    },
    groups:[],
    errorMessage:""

  })
  let updateInput=(event)=>{
     setState({...state,contact:{
         ...state.contact,
         [event.target.name]:event.target.value
     }})
  }
  
  let{loading,contact,groups,errorMessage}=state;

  let submitForm=(event)=>{
    
       event.preventDefault()
       let promise=new Promise((res,rej)=>{
        setState({...state,loading:true})
        let response=ContactServices.createContact(contact)
        res(response)
       })
       promise.then((res1)=>{
           if(res1){
             setState({...state,loading:false})
             navigate("/contacts/list",{replace:true})
           }
           else{
            navigate("/contacts/add",{replace:false})
           }
       }).catch((rej1)=>{
        setState({...state,loading:false,errorMessage:alert("data is not found!!!")})
           
       })
  }
  

  return (
    <div>
      {/* <h1>Add Contacts</h1> */}
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      <section className='add-contact'>
        <div className="container p-3">
          <div className="row">
              <p className='fw-bold h4 text-success'>Add Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ullam tenetur voluptate dolore, molestias sequi exercitationem necessitatibus. Dolores perferendis sunt, ut nostrum quas dolorem incidunt molestiae deserunt ratione, id quibusdam.</p>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
                <form action="" onSubmit={submitForm}>
                  <div className="mb-2">
                    <input type="text" name="name" required={true} value={contact.name} onChange={updateInput} id="" placeholder='Name'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="photo" required={true} value={contact.photo} onChange={updateInput} id="" placeholder='Photo Url'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="number" name="mobile" required={true} value={contact.mobile} onChange={updateInput} id="" placeholder='Mobile' className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="email" name="email" required={true} value={contact.email} onChange={updateInput} id="" placeholder='Email' className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="company" required={true} value={contact.company} onChange={updateInput} id="" placeholder='Company Name'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="title" required={true} value={contact.title} onChange={updateInput} id="" placeholder='Title'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="groupId" required={true} value={contact.groupId} onChange={updateInput} id=""  placeholder='Company Group' className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="submit" value={"Create"} name="" id=""  placeholder='Company Group' className='btn btn-success'/>
                    <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                  </div>
                </form>
            </div>
            <div className="col-md-8">
                <img src={contact.photo} alt="" className='img-fluid contact-img' />
            </div>
          </div>
        </div>

    </section>

    </div>
  )
}

export default AddContact
