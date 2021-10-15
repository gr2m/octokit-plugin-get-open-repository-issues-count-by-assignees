import { Octokit } from "@octokit/core";

import {
  getOpenRepositoryIssuesCountByAssignees,
  composeGetOpenRepositoryIssuesCountByAssignees,
} from "../src";

describe("Smoke test", () => {
  it("{ getOpenRepositoryIssuesCountByAssignees } export is a function", () => {
    expect(getOpenRepositoryIssuesCountByAssignees).toBeInstanceOf(Function);
  });

  it("{ composeGetOpenRepositoryIssuesCountByAssignees } export is a function", () => {
    expect(composeGetOpenRepositoryIssuesCountByAssignees).toBeInstanceOf(
      Function
    );
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
