import { Fragment } from 'react';
// import { useRouter } from 'next/router';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getAllEvents, getEventById } from '../../helpers/api-util';

function EventDetailPage(props) {
  //   const router = useRouter();

  //   const eventId = router.query.eventId;
  //   const event = getEventById(eventId);

  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  console.log('context', context);
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  console.log('events', events);

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    // paths: [{ params: { eventId: 'e1' } }],
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
