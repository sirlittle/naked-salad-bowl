import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./css/main.css";
const firebase = require("firebase");
require("firebase/firestore");

class CreateRoomCard extends React.Component {
  submitValues(values, setSubmitting) {
    console.log("pre call");
    const db = firebase.firestore();
    db.collection("rooms").add(values)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location = window.location + "room/" + docRef.id;
        setSubmitting(false);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div className="wrapper">
		  <div className="textInputCard">
		    <Formik
		      initialValues={{ 'userName': '', 'roomName': '', 'password': ''}}
		      validate={values => {
		        const errors = {};
		        return errors;
		      }}
		      onSubmit={(values, { setSubmitting }) => (this.submitValues(values,  setSubmitting))}
		    >
		      { ({ isSubmitting }) => (
		        <Form>
		          <div>
			       	  <div> Your Name </div>
			          <Field type="text" name="userName" />
			          <ErrorMessage name="email" component="div" />
		          </div>
		          <div>
			          <div> Room Name </div>
			          <Field type="text" name="roomName" />
			          <ErrorMessage name="password" component="div" />
		          </div>
				  <div>
			          <div> Room Password </div>
			          <Field type="text" name="password" />
			          <ErrorMessage name="password" component="div" />
		          </div>

		          <button type="submit" disabled={isSubmitting}>
		            Submit
		          </button>
		        </Form>
		      )}
		    </Formik>
		  </div>
      </div>
    );
  }
}

export default CreateRoomCard;
