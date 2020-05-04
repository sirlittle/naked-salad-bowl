import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./css/main.css";
const firebase = require("firebase");
require("firebase/firestore");

class AddWordsComponent extends React.Component {

  submitValues(values, setSubmitting) {
    console.log("pre call");
    const db = firebase.firestore();
    const room = "someRoom"; // Replace this with getting dynamic room ID

    db.collection("rooms").doc(room).set(values)
      .then(function(docRef) {
        console.log(docRef);
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
		      initialValues={{ 'word1': '', 'word2': '', 'word3': ''}}
		      // validate to ensure no spaces
		      onSubmit={(values, { setSubmitting }) => (this.submitValues(values,  setSubmitting))}
		    >
		      { ({ isSubmitting }) => (
		        <Form>
		          <div>
			       	  <div> Word 1 </div>
			          <Field type="text" name="word1" />
		          </div>
				  <div>
			       	  <div> Word 2 </div>
			          <Field type="text" name="word2" />
		          </div>
		          <div>
			       	  <div> Word 3 </div>
			          <Field type="text" name="word3" />
		          </div>

		          <button type="submit" disabled={isSubmitting}>
		            Submit
		          </button>
		        </Form>
		      )}
		    </Formik>
		  </div> 
      </div >
    );
  }
}

export default AddWordsComponent;
