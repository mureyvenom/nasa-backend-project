import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import planetsSchema from '../schemas/planets.schema';

const habitablePlanets: any[] = [];

function isHabitablePlanet(planet: any) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', 'assets', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data: any) => {
        try {
          if (isHabitablePlanet(data)) {
            await planetsSchema.updateOne(
              {
                keplerName: data.kepler_name,
              },
              {
                keplerName: data.kepler_name,
              },
              {
                upsert: true,
              }
            );
          }
        } catch (error) {
          console.log(`Unable to save planets`, error);
        }
      })
      .on('error', (err: any) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const planetsFound = await fetchPlanets();
        console.log(`${planetsFound.length} habitable planets found!`);
        resolve(planetsFound);
      });
  });
};

export const fetchPlanets = async () => {
  return await planetsSchema.find({});
};

export default habitablePlanets;
