import { Octokit } from "@octokit/core";

// Credit: https://github.com/shinnn/github-username-regex/
const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export type GetOpenRepositoryIssuesCountByAssigneesOptions = {
  owner: string;
  repo: string;
  assignees: string[];
};

export async function composeGetOpenRepositoryIssuesCountByAssignees(
  octokit: Octokit,
  { owner, repo, assignees }: GetOpenRepositoryIssuesCountByAssigneesOptions
) {
  const invalidUsernames = assignees.filter(
    (login) => !GITHUB_USERNAME_REGEX.test(login)
  );
  if (invalidUsernames.length) {
    throw new Error(
      `[octokit-plugin-get-open-repository-issues-count-by-assignees] Invalid usernames: ${invalidUsernames.join(
        ", "
      )}`
    );
  }
  const userIssuesNode = assignees.map(
    (login, index) =>
      `issues${index}:issues(first:1,states:OPEN,filterBy:{assignee:"${login}"}) { totalCount }`
  );
  const query = `
    query($owner:String!,$repo:String!) {
      repository(owner:$owner, name:$repo) {
        ${userIssuesNode.join("\n        ")}
      }
    }
  `;

  const { repository: result } = await octokit.graphql<{
    repository: Record<string, { totalCount: number }>;
  }>(query, { owner, repo });

  return Object.entries(result).reduce(
    (countByAssignees, [key, { totalCount }]) => {
      const index = Number(key.substr("issues".length));

      return {
        ...countByAssignees,
        [assignees[index]]: totalCount,
      };
    },
    {}
  );
}
