const launches = new Map();

export let latestFlightNumber = 100;

export const increment = () => {
  latestFlightNumber++;
};

export const launch = {
  flightNumber: 100,
  mission: 'Kepler mission',
  rocket: 'Explorer KS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['NASA', 'Venom'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

export const getLaunches = () => {
  return Array.from(launches.values());
};

export const launchExists = (id: number) => {
  return launches.has(id);
};

export const addLaunch = (_launch: Partial<typeof launch>) => {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(_launch, {
      flightNumber: latestFlightNumber,
      customer: ['NASA', 'Venom'],
      upcoming: true,
      success: true,
    })
  );
};

export const deleteLaunchById = (id: number) => {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
};

export default launches;
