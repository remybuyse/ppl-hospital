# Hospital

## Installation

Make sur to have yarn installed.
(Has not been tested with NPM, but should work also.)

All instructions are in the hospital.pdf

## Technical Information
In the *​hospital-lib*​ folder, execute these command lines :
```
yarn install
yarn build:prod
yarn link
```

In the *​hospital-fe*​ folder, execute this command line :
```
yarn install
```
Then, in the ​package.json of the folder *hospital-fe*, add in the dependencies `"hospital-lib": "1.0.0"`​, and then execute the command:
```yarn link hospital-lib```

Now, in your source files, you can use the ​hospital-lib​ using:
```import {Quarantine} from 'hospital-lib';```

To run the server, execute the following commands in the ​*hospital-be​* folder:
```
yarn install
yarn start
```