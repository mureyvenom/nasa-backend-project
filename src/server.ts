import http from 'http';
import app from './app';
import { loadPlanetsData } from './models/planets.model';

const PORT = process.env?.PORT ?? 6500;

const server = http.createServer(app);

const runServer = async () => {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};

runServer().catch((err) => {
  console.log('Server ran into an error', err);
});
