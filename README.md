# octokit-plugin-get-open-repository-issues-count-by-assignees

> Get the number of open repository issues assigned to a list of users

[![@latest](https://img.shields.io/npm/v/octokit-plugin-get-open-repository-issues-count-by-assignees.svg)](https://www.npmjs.com/package/octokit-plugin-get-open-repository-issues-count-by-assignees)
[![Build Status](https://github.com/gr2m/octokit-plugin-get-open-repository-issues-count-by-assignees/workflows/Test/badge.svg)](https://github.com/gr2m/octokit-plugin-get-open-repository-issues-count-by-assignees/actions?query=workflow%3ATest+branch%3Amain)

## usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `octokit-plugin-get-open-repository-issues-count-by-assignees` and [`@octokit/core`](https://github.com/octokit/core.js) (or core-compatible module) directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
  import { getOpenRepositoryIssuesCountByAssignees } from "https://cdn.skypack.dev/octokit-plugin-get-open-repository-issues-count-by-assignees";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core octokit-plugin-get-open-repository-issues-count-by-assignees`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const {
  getOpenRepositoryIssuesCountByAssignees,
} = require("octokit-plugin-get-open-repository-issues-count-by-assignees");
```

</td></tr>
</tbody>
</table>

```js
const MyOctokit = Octokit.plugin(getOpenRepositoryIssuesCountByAssignees);
const octokit = new MyOctokit({ auth: "secret123" });

const result = await octokit.getOpenRepositoryIssuesCountByAssignees({
  owner: "gr2m",
  repo: "octokit-plugin-get-open-repository-issues-count-by-assignees",
  assignees: ["user1", "user2", "user3"],
});
// `result` is an object with keys being the user logins and the values being the
// number of open issues assigned to that user. For example:
// { user1: 0, user2: 3, user3: 1 }
```

## Options

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>owner</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Repository owner login
      </td>
    </tr>
    <tr>
      <th>
        <code>repo</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Repository name
      </td>
    </tr>
    <tr>
      <th>
        <code>assignees</code>
      </th>
      <th>
        <code>string[]</code>
      </th>
      <td>
        <strong>Required.</strong> Array of GitHub user account logins
      </td>
    </tr>
  </tbody>
</table>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
