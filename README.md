# OWA Dev Yeoman Generator
> Yeoman generator for quickly scaffolding common parts of the OWA React project, including packages, components, actions, and stores.

## Installation

Install `yo` and `generator-owa-dev`:
```
npm install -g yo generator-owa-dev
```

## Usage / Generators

Currently supported generators:
- App
    - `yo owa-dev`
    - This generator simply prints the list of currently supported generators.
- Action
    - `yo owa-dev:action`
    - This generator lets you choose the name for your action, as well as the action type (i.e. `action`, `mutator`, `mutatorAction`, `orchestrator`).
- Component
    - `yo owa-dev:component`
    - This generator lets you choose the name for your component, and scaffolds out the `.tsx` and `.scss` file, as well as ties them together.
- Package
    - `yo owa-dev:package`
    - This generator lets you choose the name for your package, and lets you choose which folders you'd like to create underneath it (i.e. `actions`, `components`, `mutators`, `orchestrators`, `services`, `store`, `test`, `utils`).
- Store
    - `yo owa-dev:store`
    - This generator lets you choose the name for you store, and scaffolds it out for you (including the `store` folder, the `schema` folder with an empty interface, and the `store.ts` file itself).

## License
[MIT License](https://github.com/martellaj/generator-owa-dev/blob/master/LICENSE)
