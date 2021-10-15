import { Octokit } from "@octokit/core";

import { VERSION } from "./version";

import { composeGetOpenRepositoryIssuesCountByAssignees } from "./compose-get-open-repository-issues-count-by-assignees";
export {
  composeGetOpenRepositoryIssuesCountByAssignees,
  GetOpenRepositoryIssuesCountByAssigneesOptions,
} from "./compose-get-open-repository-issues-count-by-assignees";

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */
export function getOpenRepositoryIssuesCountByAssignees(octokit: Octokit) {
  return {
    getOpenRepositoryIssuesCountByAssignees:
      composeGetOpenRepositoryIssuesCountByAssignees.bind(null, octokit),
  };
}
getOpenRepositoryIssuesCountByAssignees.VERSION = VERSION;
