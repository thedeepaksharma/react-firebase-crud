import React, {useState, useEffect} from 'react'
import fireDB from "../firebase"
import ContactForm from './ContactForm';
import { MdDelete, MdEdit } from 'react-icons/md';
import "../App.css"

const Contacts = () => {

    var [contactOb, setContactOb] = useState({});
    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        fireDB.child('contacts').on('value',snapshot=>{
            if(snapshot.val()!=null)
            {
                setContactOb({
                    ...snapshot.val()
                })
            }
            else
            {
                setContactOb({})
            }
        })
    },[]) //Similar to componentDidMount

    const addOrEdit = obj => {
        if(currentId===''){
            fireDB.child('contacts').push(
                obj,
                err => {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        setCurrentId('');
                    }
                }
            )
        }
        else
        {
            fireDB.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        setCurrentId('');
                    }
                }
            )
        }       
    }

    const onDelete = key => {
        if(window.confirm('Are you sure to delete this record?'))
        {            
            fireDB.child(`contacts/${key}`).remove(
                err => {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        setCurrentId('');
                    }
                }
            )
        }
    }


    return (
        <section className="contacts">
            <div className="container">
                <h1>Contact Form</h1>
                <div className="row">
                    <div className="column">
                        <ContactForm {...({addOrEdit, currentId, contactOb})} />
                    </div>
                    <div className="column">
                        <table className="table-section">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th> 
                                    <th>Mobile</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(contactOb).map(id=>{
                                        return(
                                        <tr key={id}>
                                            <td>{contactOb[id].name}</td>
                                            <td>{contactOb[id].email}</td>
                                            <td>{contactOb[id].mobile}</td>
                                            <td><button onClick={() =>
                                                {setCurrentId(id) }}><MdEdit/></button> </td>
                                            <td><button onClick={() =>
                                                {onDelete(id) }}><MdDelete/> </button> </td>        
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>                        
                            
                        </table>
                    </div>
                    
                </div>
            </div>            
        </section>
        
    )
}

export default Contacts
