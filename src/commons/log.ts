import Log from './log.es5';

let token: string | null = localStorage.getItem('logToken');
if (!token) {
  token = new Date().getTime().toString();
}
localStorage.setItem('logToken', token);

interface logConfig {
  path?: string
}

interface logInterface {
  track: (s: string, o: logConfig) => void
}

const log: unknown = new Log(token);

export default log as logInterface;
