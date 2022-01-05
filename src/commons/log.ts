import Log from './log/log.es5';
import { LogClass } from './log/types/types/index.d';

let token: string | null = localStorage.getItem('logToken');
if (!token) {
  token = new Date().getTime().toString();
}
localStorage.setItem('logToken', token);

const log: unknown = new Log(token, true);

export default log as LogClass;
