import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Image,
    Button,
} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadActivity(id)
    }, [id, loadActivity])

    if (loadingInitial || !selectedActivity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assests/categoryImages/${selectedActivity.category}.jpg`} />
            <CardContent>
                <CardHeader>{selectedActivity.title}</CardHeader>
                <CardMeta>
                    <span>{selectedActivity.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths={2}>
                    <Button as={Link} to={`/activities/edit/${selectedActivity.activityID}`} basic color='blue' content='Edit'></Button>
                    <Button as={Link} to={'/activities'} basic color='grey' content='Cancel'></Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}

export default observer(ActivityDetails);
