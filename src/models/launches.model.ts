import axios from 'axios';
import launchesSchema from '../schemas/launches.schema';
import planetsSchema from '../schemas/planets.schema';
import { runPagination } from '../utils/helpers';

const exampleLaunch = {
  _id: '6410f199a0004b1399ace2c8',
  flightNumber: 100,
  __v: 0,
  customer: ['NASA', 'Venom'],
  destination: 'Kepler-442 b',
  launchDate: '2030-12-26T23:00:00.000Z',
  mission: 'Kepler mission',
  rocket: 'Explorer KS1',
  success: true,
  upcoming: true,
};

const launches = new Map();

export let latestFlightNumber = 100;

const LATEST_FLIGHT_NUMBER = 150;

const SPACE_X_BASE_URL = 'https://api.spacexdata.com/v4/launches/query';

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

export const getLaunches = async (page?: number, limit?: number) => {
  const { skip } = runPagination({ page, limit });
  return await launchesSchema
    .find()
    .limit(limit ?? 0)
    .skip(skip)
    .sort({
      flightNumber: 1,
    });
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

const saveLaunch = async (_launch: any) => {
  return await launchesSchema.updateOne(
    {
      flightNumber: _launch.flightNumber,
    },
    { ..._launch },
    { upsert: true }
  );
};

export const findLaunch = async (filter: any) => {
  return await launchesSchema.findOne(filter);
};

export const populateLaunches = async () => {
  const response = await axios.post(SPACE_X_BASE_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    throw new Error('Couldnt get launches...');
  }

  const launchData = response.data.docs;
  for (const launchDoc of launchData as any[]) {
    const { payloads } = launchDoc;
    const customers = (payloads as any[]).flatMap((payload: any) => payload.customers);
    const launch: Partial<typeof exampleLaunch> = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_utc,
      upcoming: launchDoc.upcoming || false,
      success: launchDoc.success || false,
      customer: customers,
    };
    // console.log('launch', launch);
    await saveLaunch(launch);
  }
  console.log('launches loaded...');
};

export const loadLaunchesData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('mission already loaded...');
  } else {
    await populateLaunches();
  }
};

export const scheduleNewLaunch = async (_launch: Partial<typeof launch>) => {
  const planet = await planetsSchema.findOne({
    keplerName: _launch.destination,
  });

  if (!planet) {
    throw new Error('Invalid planet entered');
  }

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
