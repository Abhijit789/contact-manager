import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactList from './Components/contacts/ContactList/ContactList'
import AddContact from './Components/contacts/AddContact/AddContact'
import EditContact from './Components/contacts/EditContact/EditContact'
import ViewContact from './Components/contacts/ViewContact/ViewContact'
import NavBar from './Components/NavBar/NavBar'
import './index.css'
import Spinner from './Components/Spinner/Spinner'



const App = () => {
  return (
    <div>
      {/* <Spinner/> */}
      <NavBar/>
        <Routes>
            <Route path='/' element={<Navigate to={'/contacts/list'}/>}/>
            <Route path='/contacts/list' element={<ContactList/>}/>
            <Route path='/contacts/add' element={<AddContact/>}/>
            <Route path='/contacts/edit/:contactId' element={<EditContact/>}/>
            <Route path='/contacts/view/:contactId' element={<ViewContact/>}/>
        </Routes>
    </div>
  )
}

export default App
