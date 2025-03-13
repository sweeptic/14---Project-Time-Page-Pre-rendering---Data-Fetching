export async function getAllEvents() {
  const res = await fetch('https://next-14-9c5d4-default-rtdb.europe-west1.firebasedatabase.app/sales/events.json');
  const data = await res.json();

  console.log('data', data);

  const events = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}
