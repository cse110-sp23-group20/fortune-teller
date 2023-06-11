# Envision Your Destiny

Improving the student experience by alleviating decision-making anxiety. Brought to you by [20/20 Visionaries](./admin/team.md) (CSE 110 SP23 Team 20).

[![Try it out button](./docs/images/try-button.svg)](https://cse110-sp23-group20.github.io/fortune-teller/source/home-page/)
[![Team page button](./docs/images/team-page-button.svg)](./admin/team.md)

## Development

By default, our test suite runs E2E tests on the live version of the site. To specify where your local version is, set the `BASE` environment variable. For example:

```sh
$ BASE=http://127.0.0.1:5502 npm test
```
