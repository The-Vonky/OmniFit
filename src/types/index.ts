import { registerRootComponent } from 'expo';

import App from '../../App';

export interface User {
  id: string;
  email: string;
  // outros campos
}
registerRootComponent(App);