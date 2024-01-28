import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    openForm: (id: string | undefined) => void;
    closeForm: () => void;
    editMode: boolean;
    createOrEdit: (activity: Activity) => void;
    deleteActivitiy: (id: string) => void;
}
export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelActivity, openForm, closeForm, editMode, createOrEdit, deleteActivitiy }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivitiy} />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedActivity && !editMode &&
                    < ActivityDetails selectedActivity={selectedActivity} cancelActivity={cancelActivity} openForm={openForm} />
                }
                {
                    editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />
                }
            </Grid.Column>
        </Grid>
    )
}   