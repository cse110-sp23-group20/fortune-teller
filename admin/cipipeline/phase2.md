![Pipeline Image](phase2.md)

# What is functional

Currently all components of the pipeline are working as intended.

The automated, non-manual components of our CI/CD pipeline is currently being run on 2 `.yaml` files:

`main.yml`:

- does a linting check by running ESLINT on the entire directory
- checks that all of the code has been formatted via. Prettier
- generates documentation using JSDOCs

`testing.yml`:

- runs Jest tests on the live website immediately after the "pages-build-deployment" (building and deploying Github pages) workflow finishes

The rest of the pipeline is manual (development, creating branches, reviewing code, etc.) and are also functional provided that everyone follows the steps in the pipeline.

# Planned or in progress

Though our pipeline does almost all of the things in the following list:

```
linting and code style enforcement (may happen in pipeline and/or in editor)
code quality via tool  (ex. Codeclimate, Codacy, etc.)
code quality via human review (ex. Pull Requests)
unit tests via automation (ex. Jest, Tape, Ava, Cypress, Mocha/Chai, etc.)*
documentation generation via automation (ex. JSDocs)
```

We would like to add a few more things moving forward.

1. Add a code quality tool. This is something that we are missing that would be nice to have in the pipeline before making pull request to merge a development branch to main to ensure that we are only pushing high quality (or good enough quality) code to the main branch.
2. Add a style checker. Currently we are using Prettier to help our code adhere to a particular style but we learned that it pretty much only helped to ensure consistent spacing. It would be nice to add something to our pipeline that auto changes variable, id, and class names in accordance to a predetermined style. That way we can avoid having to spend time on renaming and can just work on developing new features.
3. Automated code reviews: Implement an automated code review tool, like PullApprove or DeepCode, to perform analysis and provides feedback on code quality, best practices, and potential issues. This can help streamline the code review process and make it easier for developers to approve/reject certain pull requests.
4. Test coverage analysis: Include a test coverage analysis tool, such as Istanbul or JaCoCo, in our pipeline to measure the extent our tests cover the codebase and highlight areas that lack proper test coverage.
5. Integration testing: We currently only have E2E and unit tests in our repo, but it would be nice to also include integration testing, especially considering how our app has 4 major components that should be tested together.
