import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(App, {
  ...appConfig,
providers:[
  provideHttpClient(),
  ...(appConfig.providers ?? []),
  provideCharts(withDefaultRegisterables()),
  provideRouter(routes),

]
})
  .catch((err) => console.error(err));
