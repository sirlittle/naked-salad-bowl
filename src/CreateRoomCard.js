import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./css/main.css";
const firebase = require("firebase");
const assert = require("assert")
require("firebase/firestore");

class CreateRoomCard extends React.Component {
  async submitValues(values, setSubmitting) {
    console.log("Creating Room:", values);
    const db = firebase.firestore();
    var roomCheck = db.collection("rooms").where("roomName", "==", values["roomName"])
      .get()
      .then(function(querySnapshot) {
        assert.equal(querySnapshot.size, 0, "Room matching " + values["roomName"] + " already exists")
      });
    await roomCheck;
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
                  <h1 class="orange"> Create a Room </h1>
                  <div className="form-holder">
                      <Field type="text" name="userName" placeholder="Your Name"/>
                      <ErrorMessage name="email" component="div" />
                  </div>
                  <div className="form-holder">
                      <Field type="text" name="roomName" placeholder="Room Name"/>
                      <ErrorMessage name="password" component="div" />
                  </div>
                  <div className="form-holder">
                      <Field type="text" name="password" placeholder="Password"/>
                      <ErrorMessage name="password" component="div" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="orange">
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
