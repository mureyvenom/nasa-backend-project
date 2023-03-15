import launchesSchema from '../schemas/launches.schema';
import planetsSchema from '../schemas/planets.schema';

const launches = new Map();

export let latestFlightNumber = 100;

const LATEST_FLIGHT_NUMBER = 150;

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

export const getLaunches = async () => {
  return await launchesSchema.find();
};

export const launchExists = async (id: number) => {
  return await launchesSchema.findOne({
    flightNumber: id,
  });
};

export const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesSchema.findOne({}).sort('-flightNumber');

  if (!latestLaunch) {
    return LATEST_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const saveLaunch = async (_launch: typeof launch) => {
  const planet = await planetsSchema.findOne({
    keplerName: _launch.destination,
  });

  if (!planet) {
    throw new Error('Invalid planet entered');
  }

  return await launchesSchema.updateOne(
    {
      flightNumber: _launch.flightNumber,
    },
    { ..._launch },
    { upsert: true }
  );
};

export const scheduleNewLaunch = async (_launch: Partial<typeof launch>) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = {
    ..._launch,
    flightNumber: newFlightNumber,
    customer: ['NASA', 'Venom'],
    upcoming: true,
    success: true,
  };

  await saveLaunch(newLaunch as any);
};

// export const addLaunch = (_launch: Partial<typeof launch>) => {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(_launch, {
//       flightNumber: latestFlightNumber,
//       customer: ['NASA', 'Venom'],
//       upcoming: true,
//       success: true,
//     })
//   );
// };

export const deleteLaunchById = async (id: number) => {
  await launchesSchema.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  // const aborted = launches.get(id);
  // aborted.upcoming = false;
  // aborted.success = false;
};

// saveLaunch(launch)
//   .then((e) => {
//     console.log('result', e);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default launches;
