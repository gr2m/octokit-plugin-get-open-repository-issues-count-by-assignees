import { Octokit } from "@octokit/core";

import { getOpenRepositoryIssuesCountByAssignees } from "../src";

const TestOctokit = Octokit.plugin(getOpenRepositoryIssuesCountByAssignees);

test("README example", async () => {
  const octokit = new TestOctokit();

  octokit.hook.wrap("request", (_request, options) => {
    expect(options.query).toEqual(
      `
    query(\$owner:string!,\$repo:string!) {
      repository(owner:\$owner, name:\$repo) {
        issues0:issues(first:1,states:OPEN,filterBy:{assignee:"user1"}) { totalCount }
        issues1:issues(first:1,states:OPEN,filterBy:{assignee:"user2"}) { totalCount }
        issues2:issues(first:1,states:OPEN,filterBy:{assignee:"user3"}) { totalCount }
      }
    }
  `
    );

    return {
      url: "",
      status: 200,
      headers: {},
      data: {
        data: {
          repository: {
            issues0: { totalCount: 0 },
            issues1: { totalCount: 3 },
            issues2: { totalCount: 1 },
          },
        },
      },
    };
  });

  const result = await octokit.getOpenRepositoryIssuesCountByAssignees({
    owner: "gr2m",
    repo: "octokit-plugin-get-open-repository-issues-count-by-assignees",
    assignees: ["user1", "user2", "user3"],
  });
  expect(result).toStrictEqual({ user1: 0, user2: 3, user3: 1 });
});

test("Throw error when an assignee login is invalid", async () => {
  const octokit = new TestOctokit();

  await expect(() =>
    octokit.getOpenRepositoryIssuesCountByAssignees({
      owner: "gr2m",
      repo: "octokit-plugin-get-open-repository-issues-count-by-assignees",
      assignees: ["~invalid"],
    })
  ).rejects.toThrowError(
    "[octokit-plugin-get-open-repository-issues-count-by-assignees] Invalid usernames: ~invalid"
  );
});
