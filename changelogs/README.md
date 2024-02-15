## Changelog entries

#### Overview

The `unreleased` folder contains all changelog entries that haven't been release yet.

At the release time, all unreleased entries are combined into final CHANGELOG.md file.

#### Change log entry

Under `changelogs/unreleased`, create a new file and name it with ticket number to avoid duplicate entries.

The file is expected to be a JSON file in the following format:

```json
{
  // Ticket content, a brief description of what has been done.
  "title": "<object or component name>: <description>",
  // Type of change, the one used in the commit to simplify the generation process.
  "type": "feat | fix | refactor",
  // The packages concerned, a list of packages or just one package.
  "packages": [],
  // Optional, allows you to give more details about the changes when it's a complex one.
  "description": ""
}
```

The `title` describe the entry.

The `type` can be :

- **feat** for new features.
- **fix** for any bug fixes.
- **refactor** for changes in existing functionality.

The `packages` should provide the list of packages (or simply the package) affected by these changes.

The `description` is optional and should provide detail description about the changes including migration steps if any.

#### Changelog is about application usage

**Do not use technical field name.** You must write what is the consequence of the change for the user of the application.
Any technical information about the change can go if needed to the commit message, but should be avoided in the changelog.

For example, instead of

> Set manageAssignment to true in EventPlanningScreen

write

> Events: use assignation filter of PlanningView component instead of custom one
