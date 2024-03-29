import http from 'http';
import app from './app';
import { loadLaunchesData } from './models/launches.model';
import { loadPlanetsData } from './models/planets.model';
import { mongoConnect } from './utils/mongo';

const PORT = process.env?.PORT ?? 6500;

const server = http.createServer(app);

const runServer = async () => {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};

runServer().catch((err) => {
  console.log('Server ran into an error', err);
});
