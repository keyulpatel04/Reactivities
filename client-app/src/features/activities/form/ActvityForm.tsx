import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

function ActivityForm() {
    const { activityStore } = useStore();
    
    const navigate = useNavigate();

    const {
        loading, loadingInitial, loadActivity, createActivity, updateActivity } = activityStore;

    const { id } = useParams();

    const [activity, setActivity] = useState<Activity>({
        activityID: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Activity title is required'),
        description: Yup.string().required('Activity description is required'),
        date: Yup.string().required('Date is required'),
        category: Yup.string().required('Category is required'),
        city: Yup.string().required('City is required'),
        venue: Yup.string().required('Vanue is required')
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if (!activity.activityID) { //Add new record 
            activity.activityID == uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.activityID}`));
        }
        else { // Update existing record
            updateActivity(activity).then(() => navigate(`/activities/${activity.activityID}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content="Loading Activity..." />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea placeholder='Description' name='description' rows={3} />
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit'></Button>
                        <Button as={Link} to={id ? `/activities/${id}` : '/activities'} floated='right' type='button' content='Cancel'></Button>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm);