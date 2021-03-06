import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import "./css/main.css";

const firebase = require("firebase");
const assert = require("assert")
require("firebase/firestore");

class CreateRoomCard extends React.Component {
  async submitValues(values, setSubmitting) {
    console.log("Creating Room:", values);
    const db = firebase.firestore();
    db.collection("rooms").where("roomName", "==", values["roomName"])
      .get()
      .then((querySnapshot) => {
        assert.equal(querySnapshot.size, 0, "Room matching " + values["roomName"] + " already exists");
        return querySnapshot;
      }).then((querySnapshot) => {
        console.log("Document written with ID: ");
        window.location = window.location + "room/" + values["roomName"];
        setSubmitting(false);
      }).catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="textInputCard">
          <Formik
            initialValues={{ 'userName': '', 'roomName': '', 'password': '' }}
            validate={values => {}}
            onSubmit={(values, { setSubmitting }) => (this.submitValues(values, setSubmitting))}
          >
            {({ isSubmitting }) => (
              <Form>
                <h1 className="orange"> Create a Game </h1>
                <div className="form-holder">
                  <Field type="text" name="userName" placeholder="Your Name" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="form-holder">
                  <Field type="text" name="roomName" placeholder="Room Name" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div className="form-holder">
                  <Field type="password" name="password" placeholder="Password" />
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
