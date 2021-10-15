import { Octokit } from "@octokit/core";

import { getOpenRepositoryIssuesCountByAssignees } from "../src";

describe("Smoke test", () => {
  it("{ getOpenRepositoryIssuesCountByAssignees } export is a function", () => {
    expect(getOpenRepositoryIssuesCountByAssignees).toBeInstanceOf(Function);
  });

  it("getOpenRepositoryIssuesCountByAssignees.VERSION is set", () => {
    expect(getOpenRepositoryIssuesCountByAssignees.VERSION).toEqual(
      "0.0.0-development"
    );
  });

  it("Loads plugin", () => {
    expect(() => {
      const TestOctokit = Octokit.plugin(
        getOpenRepositoryIssuesCountByAssignees
      );
      new TestOctokit();
    }).not.toThrow();
  });
});
