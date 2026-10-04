import { loadConfig } from './config';
import { buildServer } from './server';

const config = loadConfig();
const app = buildServer(config);

try {
  await app.listen({ port: config.PORT, host: '0.0.0.0' });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
