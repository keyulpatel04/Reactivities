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

function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity, openForm, cancelSelectedActivity } = activityStore;

    if (!selectedActivity) return <LoadingComponent />;

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
                    <Button basic color='blue' content='Edit' onClick={() => openForm(selectedActivity.activityID)}></Button>
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity}></Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}

export default ActivityDetails;
