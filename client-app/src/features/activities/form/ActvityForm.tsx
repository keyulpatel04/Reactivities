import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({ activity: selectedActivity,
        closeForm, createOrEdit, submitting }: Props) {

    const intialState = selectedActivity ?? {
        activityID: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(intialState);

    function handleSubmit() {
        createOrEdit(activity);
    }
    function handleOnChangeEvent(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleOnChangeEvent} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleOnChangeEvent} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleOnChangeEvent} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleOnChangeEvent} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleOnChangeEvent} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleOnChangeEvent} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'></Button>
                <Button floated='right' type='button' content='Cancel' onClick={closeForm}></Button>
            </Form>
        </Segment>
    )
}