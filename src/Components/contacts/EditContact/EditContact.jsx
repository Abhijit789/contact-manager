import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../ContactServices/ContactServices'
import Spinner from '../../Spinner/Spinner'



const EditContact = () => {
  let navigate=useNavigate()
  let {contactId}=useParams()
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
  useEffect(()=>{
    let promise=new Promise((res,rej)=>{
       setState({...state,loading:true})
       let response=ContactServices.getContact(contactId);
       res(response)
    })
    promise.then((res1)=>{
       setState({...state,loading:false,contact:res1.data})
    }).catch(()=>{
      setState({...state,loading:false,errorMessage:alert("data is not found")})
    })
  },[contactId])
  
  let updateInput=(event)=>{
    setState({...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value
    }})
 }
 let{loading,contact,errorMessage}=state;
 let submitForm=(event)=>{
    
  event.preventDefault()
  let promise=new Promise((res,rej)=>{
   setState({...state,loading:true})
   let response=ContactServices.updateContact(contact,contactId)
   res(response)
  })
  promise.then((res1)=>{
      if(res1){
        setState({...state,loading:false})
        navigate("/contacts/list",{replace:true})
      }
      else{
       navigate(`/contacts/edit/${contactId}`,{replace:false})
      }
  }).catch((rej1)=>{
   setState({...state,loading:false,errorMessage:alert("data is not found!!!")})
      
  })
}
   return (
    // <h1>Edit Contact</h1>
    <>    
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    {
      loading?<Spinner/>:<React.Fragment>
           <section className='edit-contact'>
        <div className="container p-3">
          <div className="row">
              <p className='fw-bold h4 text-primary'>Edit Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ullam tenetur voluptate dolore, molestias sequi exercitationem necessitatibus. Dolores perferendis sunt, ut nostrum quas dolorem incidunt molestiae deserunt ratione, id quibusdam.</p>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
                <form action="" onSubmit={submitForm}>
                  <div className="mb-2">
                    <input type="text" name="name" onChange={updateInput} value={contact.name} id="" placeholder='Name'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="photo" id="" onChange={updateInput} value={contact.photo} placeholder='Photo Url'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="number" name="mobile" id="" onChange={updateInput} value={contact.mobile} placeholder='Mobile' className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="email" name="email" id="" onChange={updateInput} value={contact.email} placeholder='Email' className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="company" id="" onChange={updateInput} value={contact.company} placeholder='Company Name'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="title" id="" onChange={updateInput} value={contact.title} placeholder='Title'  className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name="groupId" id="" onChange={updateInput} value={contact.groupId}  placeholder='Company Group' className='form-control'/>
                  </div>
                  <div className="mb-2">
                    <input type="submit" value={"Update"} name="" id=""  placeholder='Company Group' className='btn btn-primary'/>
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
      </React.Fragment>
    }
   
    </>


  )
}

export default EditContact
