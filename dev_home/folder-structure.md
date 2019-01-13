# Project Folder Structure

- **build/** - Generated frontend build
- **dev_home/** - Coding guidelines, generated documentation and code reports
- **node_modules/** - npm modules
- **resources/** - mock data and text strings
- **server/** - Frontend dev server code (for developing without a backend)
- **src/** - Frontend source (that gets built and put into build folder)


## Expanded view of folders

```
|- build/
|- dev_home/                     (markdown files for devs)
|- node_modules/
|- resources/
|  |- mock_server                (Stub json data mimicking API URLs)
|
|- server/                       (Stub backend - maps fake API and authentication)
|- src/
|  |- app/
|  |  |- common/                 (Common code shared by all modules)
|  |  |  |- core/
|  |  |  |  |- exception
|  |  |  |  |- logger
|  |  |  |  |- router
|  |  |  |
|  |  |  |- data-store/
|  |  |  |- integrations/
|  |  |  |- layout/
|  |  |  |- navigation-auth/
|  |  |  |- skin/                (Contains styles and look & feel specific assets)
|  |  |  |  |- images/
|  |  |  |  |- fonts/
|  |  |  |- utils/
|  |  |  |  |- helpers
|  |  |
|  |  |- features/               (Non-navigable modules - i.e. do not have a route)
|  |  |  |- charts/
|  |  |  |- messaging/
|  |  |
|  |  |- main/                   (Bare minimum for a functioning app shell)
|  |  |  |- access/
|  |  |  |  |- components/       (UI view with logic)
|  |  |  |  |- routes/           (These are components that act as traditional pages)
|  |  |  |  |- services/         (Module services)
|  |  |  |
|  |  |  |- home/
|  |  |  |- currentUser/
|  |  |
|  |  |- sections/               (Navigable modules - i.e. have a route)
|  |  |  |- brands/
|  |  |  |- posts/
|  |  |  |  |- components/
|  |  |  |  |- routes/
|  |  |  |  |- services/
|  |  |  |
|  |  |  |- reporting/
|  |  |  |- user/
|  |
|  |- assets/
|  |  |- images/
|
```


## Angular Code Structure

- The application source is at _src/app/_.
- The top-level application module is _soApp_.
- All other modules are children of soApp; e.g. _soApp.core_ or _soApp.calendar_
- Angular modules are organized in 4 main folders; _common/_, _main/_, _features/_, and _sections_


### Application Code Structure

**Note:** The application code is organized by 4 main groupings:

```
src/
|- app/
|  |- common/                 (Common code shared by all modules)
|  |    ...
|  |
|  |- features/               (Non-navigable modules - i.e. do not have a route)
|  |    ...
|  |
|  |- main/                   (Bare minimum for a functioning app shell)
|  |    ...
|  |
|  |- sections/               (Navigable modules - i.e. have a route)
|  |    ...
|
```

**Note:** Each Angular module is organized as follows:

```
src/
|  |- features/
|  |  |- messaging/
|  |  |  |- components/       (i.e. what used to be called directives)
|  |  |  |- services/         (Angular services)
|  |
|  |- main/
|  |  |- access/
|  |  |  |- components/
|  |  |  |  |- sd-login-form/          (directive/component)
|  |  |  |  |- sd-register-form/       (directive/component)
|  |  |  |
|  |  |  |- routes/           (components that can be tought of as traditional pages)
|  |  |  |  |- login/
|  |  |  |  |  |- login.html
|  |  |  |  |  |- LoginController.js   (ES2015 class)
|  |  |  |
|  |  |  |- services/
|  |  |  |  |- access.service.js
|  |  |  |  |- auth-interceptor.service.js
|  |
|  |- sections/
|  |  |- calendar/
|  |  |  |- components/
|  |  |  |- routes/
|  |  |  |- services/
|  |  |
```
