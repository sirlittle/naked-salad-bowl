import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import "./css/main.css";

const firebase = require("firebase");
const assert = require("assert")
require("firebase/firestore");

class JoinRoomCard extends React.Component {
  submitValues(values, setSubmitting) {
    console.log(`Joining Room: ${values}`);
    const db = firebase.firestore();
    db.collection("rooms").where("roomName", "==", values["roomName"])
      .get()
      .then((querySnapshot) => {
        assert.equal(querySnapshot.size, 1, "No room matching " + values["roomName"]);
        querySnapshot.forEach(function (doc) {
          if (values["password"].equals(doc.data()["password"])) {
            window.location = window.location + "room/" + doc.id;
          } // figure out what to do if password is incorrect.
        });
      })
      .catch(function (error) {
        console.error("Error getting documents: ", error);
      });
    setSubmitting(false);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="textInputCard">
          <Formik
            initialValues={{ 'userName': '', 'roomName': '', 'password': '' }}
            validate={values => {
              return {};
            }}
            onSubmit={(values, { setSubmitting }) => (this.submitValues(values, setSubmitting))}
          >
            {({ isSubmitting }) => (
              <Form>
                <h1 className="blue"> Join a Game </h1>
                <div className="form-holder">
                  <Field type="text" name="userName" placeholder="Your Name" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="form-holder">
                  <Field type="text" name="roomName" placeholder="Room Name" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div className="form-holder">
                  <Field type="text" name="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" />
                </div>

                <button type="submit" disabled={isSubmitting} className="blue">
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

export default JoinRoomCard;
