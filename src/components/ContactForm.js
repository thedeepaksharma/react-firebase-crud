import React, {useState, useEffect} from 'react'
import "../App.css"

const ContactForm = (props) => {
    const initialFieldValues = {
        name: '',
        email: '',
        mobile: '',
        message:''
    }

    var [values, setValues] = useState(initialFieldValues);

    useEffect(()=>{
        if(props.currentId === '')
        {
            setValues({
                ...initialFieldValues
            })
        }
        else
        {
            setValues({
                ...props.contactOb[props.currentId]
            })
        }       
    },[props.currentId, props.contactOb]);

    const handleInputChange = e =>{
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e =>{
        e.preventDefault();
        props.addOrEdit(values)
    }


    return (
        <section className="contacts-form">

            <form onSubmit={handleFormSubmit} method="POST">

                <div className="form-group">
                    <label htmlFor="name">Name :-</label>
                    <input type="text" className="form-control"
                        name="name" value={values.name} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email :-</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp"
                        name="email" value={values.email} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile :-</label>
                    <input type="phone" className="form-control"
                        name="mobile" value={values.mobile} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message :-</label>
                    <textarea className="form-control" rows="4"
                        name="message" value={values.message} onChange={handleInputChange} required></textarea>
                </div>

                <input type="submit" value={props.currentId==''?"Submit":"Update"} className="submit-btn" />

            </form>

        </section>       
    );
}

export default ContactForm