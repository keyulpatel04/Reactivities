import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';

function ActivityForm() {
    const { activityStore } = useStore();

    const { createActivity, updateActivity,
        loading, loadingInitial, loadActivity } = activityStore;

    const { id } = useParams();

    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        activityID: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleSubmit() {
        if (!activity.activityID) { //Add new record 
            activity.activityID == uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.activityID}`));
        }
        else { // Update existing record
            updateActivity(activity).then(() => navigate(`/activities/${activity.activityID}`));
        }
    }
    function handleOnChangeEvent(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitial) return <LoadingComponent content="Loading Activity..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleOnChangeEvent} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleOnChangeEvent} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleOnChangeEvent} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleOnChangeEvent} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleOnChangeEvent} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleOnChangeEvent} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit'></Button>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);