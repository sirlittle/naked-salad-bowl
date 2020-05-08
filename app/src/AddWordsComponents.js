import React from 'react';
import { Formik, Form, Field } from 'formik';
import "./css/main.css";
const firebase = require("firebase");
require("firebase/firestore");

class AddWordsComponent extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
	}

	submitValues(values, setSubmitting) {
		console.log(values);
		const db = firebase.firestore();
		const room = "someRoom"; // Replace this with getting dynamic room ID
		var onSubmit = this.props.onSubmit;
		db.collection("rooms").doc(room).set(values)
			.then(function (docRef) {
				console.log(docRef);
				setSubmitting(false);
				onSubmit();
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
	}

	render() {
		return (
			<div className="wordInputCard">
				<Formik
					initialValues={{ 'word1': '', 'word2': '', 'word3': '' }}
					onSubmit={(values, { setSubmitting }) => (this.submitValues(values, setSubmitting))}
				>
					{({ isSubmitting }) => (
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

							<button type="submit" className="blue" disabled={isSubmitting}>
								Submit
	         				</button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}

export default AddWordsComponent;
