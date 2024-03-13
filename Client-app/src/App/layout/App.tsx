import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './Navbar';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import agent from '../API/Agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editmode, setEditmode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditmode(true);
  }
  function handleFormClose() {
    setEditmode(false);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity.id, activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditmode(false);

        setSubmitting(false);

      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditmode(false);
        setSubmitting(false);

      })
    }
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }])
    setEditmode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

  }
  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: Activity[] = [];
        response.forEach(
          activity => {
            activity.date = activity.date.split('T')[0];
            activities.push(activity);
          }
        )
        setActivities(activities);
        setLoading(false);
      })
  }, [])
  if (loading) return <LoadingComponent content='Loading App' />
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelSelectActivity}
          editMode={editmode}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivitiy={handleDeleteActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          submitting={submitting} />
      </Container>

    </Fragment>
  );
}

export default App;