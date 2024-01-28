import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";

interface Props {
    selectedActivity: Activity | undefined;
    cancelActivity: () => void;
    openForm: (id: string | undefined) => void;
}
export default function ActivityDetails({ selectedActivity, cancelActivity, openForm }: Props) {
    return (
        selectedActivity &&
        <Card fluid>
            <Image src={`/Assets/Images/categoryImages/${selectedActivity.category}.jpg`} />
            <CardContent>
                <CardHeader>{selectedActivity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{selectedActivity.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(selectedActivity.id)} basic color="blue" content='Edit' />
                    <Button onClick={cancelActivity} basic color="grey" content='Cancel' />
                </Button.Group>
            </CardContent>
        </Card>
    )
}