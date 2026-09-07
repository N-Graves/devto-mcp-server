/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/forem-openapi.json
 * (Forem API V1, OpenAPI 3.0.3).
 *
 * 139 operations: 49 reachable through this server,
 * 90 excluded with a stated reason.
 *
 * The coverage test compares this against the vendored spec, so an endpoint
 * Forem adds shows up as a test failure rather than as a README that has
 * quietly stopped being true.
 */
import type { Operation } from "@nasdigital/mcp-server-core";

export interface ForemOperation extends Operation {
  tags: string[];
  summary: string;
  pathParams: string[];
  queryParams: string[];
  hasBody: boolean;
}

export const OPERATIONS: ForemOperation[] = [
  {
    "id": "getAdminConcepts",
    "method": "GET",
    "path": "/api/admin/concepts",
    "tags": [
      "concepts",
      "admin"
    ],
    "summary": "Retrieve all concepts (Admin)",
    "pathParams": [],
    "queryParams": [
      "page",
      "per_page"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminConcepts",
    "method": "POST",
    "path": "/api/admin/concepts",
    "tags": [
      "concepts",
      "admin"
    ],
    "summary": "Create a concept (Admin)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "deleteAdminConceptsId",
    "method": "DELETE",
    "path": "/api/admin/concepts/{id}",
    "tags": [
      "concepts",
      "admin"
    ],
    "summary": "Delete a concept (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminConceptsId",
    "method": "GET",
    "path": "/api/admin/concepts/{id}",
    "tags": [
      "concepts",
      "admin"
    ],
    "summary": "Retrieve concept detail (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "patchAdminConceptsId",
    "method": "PATCH",
    "path": "/api/admin/concepts/{id}",
    "tags": [
      "concepts",
      "admin"
    ],
    "summary": "Update a concept (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminConceptsIdTriggerLookback",
    "method": "POST",
    "path": "/api/admin/concepts/{id}/trigger_lookback",
    "tags": [
      "concepts",
      "admin"
    ],
    "summary": "Trigger concept lookback backfill (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminRequestRedirects",
    "method": "GET",
    "path": "/api/admin/request_redirects",
    "tags": [
      "request_redirects",
      "admin"
    ],
    "summary": "Retrieve all request redirects (Admin)",
    "pathParams": [],
    "queryParams": [
      "page",
      "per_page"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminRequestRedirects",
    "method": "POST",
    "path": "/api/admin/request_redirects",
    "tags": [
      "request_redirects",
      "admin"
    ],
    "summary": "Create a request redirect (Admin)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "deleteAdminRequestRedirectsId",
    "method": "DELETE",
    "path": "/api/admin/request_redirects/{id}",
    "tags": [
      "request_redirects",
      "admin"
    ],
    "summary": "Delete a request redirect (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminRequestRedirectsId",
    "method": "GET",
    "path": "/api/admin/request_redirects/{id}",
    "tags": [
      "request_redirects",
      "admin"
    ],
    "summary": "Retrieve a request redirect's details (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "patchAdminRequestRedirectsId",
    "method": "PATCH",
    "path": "/api/admin/request_redirects/{id}",
    "tags": [
      "request_redirects",
      "admin"
    ],
    "summary": "Update a request redirect (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminUsers",
    "method": "GET",
    "path": "/api/admin/users",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "List all users (Admin)",
    "pathParams": [],
    "queryParams": [
      "page",
      "per_page",
      "email",
      "username"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminUsersCreate",
    "method": "POST",
    "path": "/api/admin/users",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Invite a User",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminUsersId",
    "method": "GET",
    "path": "/api/admin/users/{id}",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Get user detail (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "patchAdminUsersId",
    "method": "PATCH",
    "path": "/api/admin/users/{id}",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Update user profile (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "putAdminUsersIdEmail",
    "method": "PUT",
    "path": "/api/admin/users/{id}/email",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Update user email (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminUsersIdMerge",
    "method": "POST",
    "path": "/api/admin/users/{id}/merge",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Merge user into another (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "putAdminUsersIdNotificationSettings",
    "method": "PUT",
    "path": "/api/admin/users/{id}/notification_settings",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Update user notification settings (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "putAdminUsersIdStatus",
    "method": "PUT",
    "path": "/api/admin/users/{id}/status",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Update user moderation status (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminUsersUserIdIdentities",
    "method": "GET",
    "path": "/api/admin/users/{user_id}/identities",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "List identities for a user (Admin)",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminUsersUserIdIdentities",
    "method": "POST",
    "path": "/api/admin/users/{user_id}/identities",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Link an identity to a user (Admin)",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "deleteAdminUsersUserIdIdentitiesId",
    "method": "DELETE",
    "path": "/api/admin/users/{user_id}/identities/{id}",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Unlink an identity from a user (Admin)",
    "pathParams": [
      "user_id",
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAdminUsersUserIdNotes",
    "method": "GET",
    "path": "/api/admin/users/{user_id}/notes",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "List notes for a user (Admin)",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminUsersUserIdNotes",
    "method": "POST",
    "path": "/api/admin/users/{user_id}/notes",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Add a note to a user (Admin)",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "postAdminUsersIdentitiesBulk",
    "method": "POST",
    "path": "/api/admin/users/identities/bulk",
    "tags": [
      "users",
      "admin"
    ],
    "summary": "Bulk link identities (Admin)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getAgentSessions",
    "method": "GET",
    "path": "/api/agent_sessions",
    "tags": [
      "agent_sessions"
    ],
    "summary": "list the authenticated user's agent sessions",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Forem's own agent-session feature. Unrelated to the Model Context Protocol and not part of the authoring surface this server exposes."
  },
  {
    "id": "createAgentSession",
    "method": "POST",
    "path": "/api/agent_sessions",
    "tags": [
      "agent_sessions"
    ],
    "summary": "upload a new agent session",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Forem's own agent-session feature. Unrelated to the Model Context Protocol and not part of the authoring surface this server exposes."
  },
  {
    "id": "getAgentSessionById",
    "method": "GET",
    "path": "/api/agent_sessions/{id}",
    "tags": [
      "agent_sessions"
    ],
    "summary": "show details for an agent session",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Forem's own agent-session feature. Unrelated to the Model Context Protocol and not part of the authoring surface this server exposes."
  },
  {
    "id": "getAgentSessionRawUrl",
    "method": "GET",
    "path": "/api/agent_sessions/{id}/raw_url",
    "tags": [
      "agent_sessions"
    ],
    "summary": "request a presigned S3 GET URL to download the raw session transcript",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Forem's own agent-session feature. Unrelated to the Model Context Protocol and not part of the authoring surface this server exposes."
  },
  {
    "id": "presignAgentSession",
    "method": "POST",
    "path": "/api/agent_sessions/presign",
    "tags": [
      "agent_sessions"
    ],
    "summary": "request a presigned URL to upload raw session transcript to S3",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Forem's own agent-session feature. Unrelated to the Model Context Protocol and not part of the authoring surface this server exposes."
  },
  {
    "id": "getAnalyticsDashboard",
    "method": "GET",
    "path": "/api/analytics/dashboard",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve dashboard analytics bundle",
    "pathParams": [],
    "queryParams": [
      "start",
      "end",
      "article_id",
      "organization_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsFollowerEngagement",
    "method": "GET",
    "path": "/api/analytics/follower_engagement",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve follower engagement analytics",
    "pathParams": [],
    "queryParams": [
      "start",
      "end"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsHeatmap",
    "method": "GET",
    "path": "/api/analytics/heatmap",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve heatmap activity",
    "pathParams": [],
    "queryParams": [
      "end"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsHistorical",
    "method": "GET",
    "path": "/api/analytics/historical",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve historical analytics",
    "pathParams": [],
    "queryParams": [
      "start",
      "end",
      "article_id",
      "organization_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsPastDay",
    "method": "GET",
    "path": "/api/analytics/past_day",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve analytics for the past day",
    "pathParams": [],
    "queryParams": [
      "article_id",
      "organization_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsReferrers",
    "method": "GET",
    "path": "/api/analytics/referrers",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve referrer analytics",
    "pathParams": [],
    "queryParams": [
      "start",
      "end",
      "article_id",
      "organization_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsTopContributors",
    "method": "GET",
    "path": "/api/analytics/top_contributors",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve top contributors analytics",
    "pathParams": [],
    "queryParams": [
      "start",
      "end",
      "article_id",
      "organization_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getAnalyticsTotals",
    "method": "GET",
    "path": "/api/analytics/totals",
    "tags": [
      "analytics"
    ],
    "summary": "Retrieve analytics totals",
    "pathParams": [],
    "queryParams": [
      "article_id",
      "organization_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getArticles",
    "method": "GET",
    "path": "/api/articles",
    "tags": [
      "articles"
    ],
    "summary": "Published articles",
    "pathParams": [],
    "queryParams": [
      "tag",
      "tags",
      "tags_exclude",
      "username",
      "state",
      "top",
      "collection_id"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "createArticle",
    "method": "POST",
    "path": "/api/articles",
    "tags": [
      "articles"
    ],
    "summary": "Publish article",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getArticleById",
    "method": "GET",
    "path": "/api/articles/{id}",
    "tags": [
      "articles"
    ],
    "summary": "Published article by id",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "updateArticle",
    "method": "PUT",
    "path": "/api/articles/{id}",
    "tags": [
      "articles"
    ],
    "summary": "Update an article by id",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "unpublishArticle",
    "method": "PUT",
    "path": "/api/articles/{id}/unpublish",
    "tags": [
      "articles"
    ],
    "summary": "Unpublish an article",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "note"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getArticleByPath",
    "method": "GET",
    "path": "/api/articles/{username}/{slug}",
    "tags": [
      "articles"
    ],
    "summary": "Published article by path",
    "pathParams": [
      "username",
      "slug"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getLatestArticles",
    "method": "GET",
    "path": "/api/articles/latest",
    "tags": [
      "articles"
    ],
    "summary": "Published articles sorted by published date",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getUserArticles",
    "method": "GET",
    "path": "/api/articles/me",
    "tags": [
      "articles",
      "users"
    ],
    "summary": "User's articles",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getUserAllArticles",
    "method": "GET",
    "path": "/api/articles/me/all",
    "tags": [
      "articles",
      "users"
    ],
    "summary": "User's all articles",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getUserPublishedArticles",
    "method": "GET",
    "path": "/api/articles/me/published",
    "tags": [
      "articles",
      "users"
    ],
    "summary": "User's published articles",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getUserUnpublishedArticles",
    "method": "GET",
    "path": "/api/articles/me/unpublished",
    "tags": [
      "articles",
      "users"
    ],
    "summary": "User's unpublished articles",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "searchArticles",
    "method": "GET",
    "path": "/api/articles/search",
    "tags": [
      "articles"
    ],
    "summary": "Search for articles",
    "pathParams": [],
    "queryParams": [
      "q",
      "top",
      "page",
      "per_page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getArticlesSemanticSearch",
    "method": "GET",
    "path": "/api/articles/semantic_search",
    "tags": [
      "articles"
    ],
    "summary": "Perform a semantic fuzzy search on articles",
    "pathParams": [],
    "queryParams": [
      "q",
      "per_page",
      "page",
      "threshold"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getBadgeAchievements",
    "method": "GET",
    "path": "/api/badge_achievements",
    "tags": [
      "badge_achievements"
    ],
    "summary": "Retrieve all badge achievements",
    "pathParams": [],
    "queryParams": [
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "postBadgeAchievements",
    "method": "POST",
    "path": "/api/badge_achievements",
    "tags": [
      "badge_achievements"
    ],
    "summary": "Create a badge achievement",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Creating, editing or awarding badges is an instance-administration action on Forem. The read endpoints are covered."
  },
  {
    "id": "deleteBadgeAchievementsId",
    "method": "DELETE",
    "path": "/api/badge_achievements/{id}",
    "tags": [
      "badge_achievements"
    ],
    "summary": "Delete a badge achievement",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Creating, editing or awarding badges is an instance-administration action on Forem. The read endpoints are covered."
  },
  {
    "id": "getBadgeAchievementsId",
    "method": "GET",
    "path": "/api/badge_achievements/{id}",
    "tags": [
      "badge_achievements"
    ],
    "summary": "Retrieve a badge achievement's details",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getBadges",
    "method": "GET",
    "path": "/api/badges",
    "tags": [
      "badges"
    ],
    "summary": "Retrieve all badges",
    "pathParams": [],
    "queryParams": [
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "postBadges",
    "method": "POST",
    "path": "/api/badges",
    "tags": [
      "badges"
    ],
    "summary": "Create a badge",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Creating, editing or awarding badges is an instance-administration action on Forem. The read endpoints are covered."
  },
  {
    "id": "deleteBadgesId",
    "method": "DELETE",
    "path": "/api/badges/{id}",
    "tags": [
      "badges"
    ],
    "summary": "Delete a badge",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Creating, editing or awarding badges is an instance-administration action on Forem. The read endpoints are covered."
  },
  {
    "id": "getBadgesId",
    "method": "GET",
    "path": "/api/badges/{id}",
    "tags": [
      "badges"
    ],
    "summary": "Retrieve a badge's details",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "patchBadgesId",
    "method": "PATCH",
    "path": "/api/badges/{id}",
    "tags": [
      "badges"
    ],
    "summary": "Update a badge",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Creating, editing or awarding badges is an instance-administration action on Forem. The read endpoints are covered."
  },
  {
    "id": "getBillboards",
    "method": "GET",
    "path": "/api/billboards",
    "tags": [
      "billboards"
    ],
    "summary": "Billboards",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Billboards are instance-level advertising units, administered by the Forem operator rather than by an author."
  },
  {
    "id": "postBillboards",
    "method": "POST",
    "path": "/api/billboards",
    "tags": [
      "billboards"
    ],
    "summary": "Create a billboard",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Billboards are instance-level advertising units, administered by the Forem operator rather than by an author."
  },
  {
    "id": "getBillboardsId",
    "method": "GET",
    "path": "/api/billboards/{id}",
    "tags": [
      "billboards"
    ],
    "summary": "A billboard (by id)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Billboards are instance-level advertising units, administered by the Forem operator rather than by an author."
  },
  {
    "id": "putBillboardsId",
    "method": "PUT",
    "path": "/api/billboards/{id}",
    "tags": [
      "billboards"
    ],
    "summary": "Update a billboard by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Billboards are instance-level advertising units, administered by the Forem operator rather than by an author."
  },
  {
    "id": "putBillboardsIdUnpublish",
    "method": "PUT",
    "path": "/api/billboards/{id}/unpublish",
    "tags": [
      "billboards"
    ],
    "summary": "Unpublish a billboard",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Billboards are instance-level advertising units, administered by the Forem operator rather than by an author."
  },
  {
    "id": "getCommentsByArticleId",
    "method": "GET",
    "path": "/api/comments",
    "tags": [
      "comments"
    ],
    "summary": "Comments",
    "pathParams": [],
    "queryParams": [
      "a_id",
      "p_id",
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getCommentById",
    "method": "GET",
    "path": "/api/comments/{id}",
    "tags": [
      "comments"
    ],
    "summary": "Comment by id",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getConcepts",
    "method": "GET",
    "path": "/api/concepts",
    "tags": [
      "concepts"
    ],
    "summary": "Retrieve all accessible concepts",
    "pathParams": [],
    "queryParams": [
      "page",
      "per_page",
      "days"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Concepts are an instance-level taxonomy feature, not author-facing."
  },
  {
    "id": "getConceptsId",
    "method": "GET",
    "path": "/api/concepts/{id}",
    "tags": [
      "concepts"
    ],
    "summary": "Retrieve details of a concept",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "days"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Concepts are an instance-level taxonomy feature, not author-facing."
  },
  {
    "id": "patchConceptsId",
    "method": "PATCH",
    "path": "/api/concepts/{id}",
    "tags": [
      "concepts"
    ],
    "summary": "Update a concept's metadata",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Concepts are an instance-level taxonomy feature, not author-facing."
  },
  {
    "id": "getConceptsIdArticles",
    "method": "GET",
    "path": "/api/concepts/{id}/articles",
    "tags": [
      "concepts"
    ],
    "summary": "Retrieve articles mapped to a concept",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "sort",
      "page",
      "per_page"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Concepts are an instance-level taxonomy feature, not author-facing."
  },
  {
    "id": "getConceptsSearch",
    "method": "GET",
    "path": "/api/concepts/search",
    "tags": [
      "concepts"
    ],
    "summary": "Perform a semantic fuzzy search on concepts",
    "pathParams": [],
    "queryParams": [
      "q",
      "per_page",
      "threshold"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Concepts are an instance-level taxonomy feature, not author-facing."
  },
  {
    "id": "getEvents",
    "method": "GET",
    "path": "/api/events",
    "tags": [
      "events"
    ],
    "summary": "Retrieve events",
    "pathParams": [],
    "queryParams": [
      "type_of"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Instance events are created by the Forem operator, not by an author."
  },
  {
    "id": "createEvent",
    "method": "POST",
    "path": "/api/events",
    "tags": [
      "events"
    ],
    "summary": "Create an event",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Instance events are created by the Forem operator, not by an author."
  },
  {
    "id": "deleteEvent",
    "method": "DELETE",
    "path": "/api/events/{id}",
    "tags": [
      "events"
    ],
    "summary": "Delete an event",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Instance events are created by the Forem operator, not by an author."
  },
  {
    "id": "getEventById",
    "method": "GET",
    "path": "/api/events/{id}",
    "tags": [
      "events"
    ],
    "summary": "Retrieve an event",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Instance events are created by the Forem operator, not by an author."
  },
  {
    "id": "updateEvent",
    "method": "PATCH",
    "path": "/api/events/{id}",
    "tags": [
      "events"
    ],
    "summary": "Update an event",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Instance events are created by the Forem operator, not by an author."
  },
  {
    "id": "patchFeedbackMessagesId",
    "method": "PATCH",
    "path": "/api/feedback_messages/{id}",
    "tags": [
      "feedback_messages",
      "admin"
    ],
    "summary": "Update a feedback message's status (Admin)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; hosted dev.to does not issue one to ordinary accounts."
  },
  {
    "id": "getFollowers",
    "method": "GET",
    "path": "/api/followers/users",
    "tags": [
      "followers"
    ],
    "summary": "Followers",
    "pathParams": [],
    "queryParams": [
      "sort"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "postFollows",
    "method": "POST",
    "path": "/api/follows",
    "tags": [
      "follows"
    ],
    "summary": "Follow users or organizations",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getFollowedTags",
    "method": "GET",
    "path": "/api/follows/tags",
    "tags": [
      "followed_tags",
      "tags"
    ],
    "summary": "Followed Tags",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getHealthChecksApp",
    "method": "GET",
    "path": "/api/health_checks/app",
    "tags": [
      "health_checks"
    ],
    "summary": "Check app health",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Instance health checks, for the operator of a Forem deployment. Reports on the server, not on anything belonging to the authenticated account."
  },
  {
    "id": "getHealthChecksCache",
    "method": "GET",
    "path": "/api/health_checks/cache",
    "tags": [
      "health_checks"
    ],
    "summary": "Check cache connection",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Instance health checks, for the operator of a Forem deployment. Reports on the server, not on anything belonging to the authenticated account."
  },
  {
    "id": "getHealthChecksDatabase",
    "method": "GET",
    "path": "/api/health_checks/database",
    "tags": [
      "health_checks"
    ],
    "summary": "Check database connection",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Instance health checks, for the operator of a Forem deployment. Reports on the server, not on anything belonging to the authenticated account."
  },
  {
    "id": "getInstance",
    "method": "GET",
    "path": "/api/instance",
    "tags": [
      "instance"
    ],
    "summary": "Retrieve instance configuration details",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getOrganizations",
    "method": "GET",
    "path": "/api/organizations",
    "tags": [
      "organizations"
    ],
    "summary": "Organizations",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "createOrganization",
    "method": "POST",
    "path": "/api/organizations",
    "tags": [
      "organizations"
    ],
    "summary": "Create an Organization",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Creating, editing or deleting an organisation requires instance administration. The read endpoints are covered."
  },
  {
    "id": "deleteOrganizationsId",
    "method": "DELETE",
    "path": "/api/organizations/{id}",
    "tags": [
      "organizations"
    ],
    "summary": "Delete an Organization by id",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Creating, editing or deleting an organisation requires instance administration. The read endpoints are covered."
  },
  {
    "id": "getOrganizationById",
    "method": "GET",
    "path": "/api/organizations/{id}",
    "tags": [
      "organizations"
    ],
    "summary": "An organization (by id)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "putOrganizationsId",
    "method": "PUT",
    "path": "/api/organizations/{id}",
    "tags": [
      "organizations"
    ],
    "summary": "Update an organization by id",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Creating, editing or deleting an organisation requires instance administration. The read endpoints are covered."
  },
  {
    "id": "getOrgArticles",
    "method": "GET",
    "path": "/api/organizations/{organization_id_or_username}/articles",
    "tags": [
      "organizations",
      "articles"
    ],
    "summary": "Organization's Articles",
    "pathParams": [
      "organization_id_or_username"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getOrgUsers",
    "method": "GET",
    "path": "/api/organizations/{organization_id_or_username}/users",
    "tags": [
      "organizations",
      "users"
    ],
    "summary": "Organization's users",
    "pathParams": [
      "organization_id_or_username"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getOrganization",
    "method": "GET",
    "path": "/api/organizations/{username}",
    "tags": [
      "organizations"
    ],
    "summary": "An organization (by username)",
    "pathParams": [
      "username"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getPages",
    "method": "GET",
    "path": "/api/pages",
    "tags": [
      "pages"
    ],
    "summary": "show details for all pages",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Static instance pages, administered by the Forem operator."
  },
  {
    "id": "postPages",
    "method": "POST",
    "path": "/api/pages",
    "tags": [
      "pages"
    ],
    "summary": "pages",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Static instance pages, administered by the Forem operator."
  },
  {
    "id": "deletePagesId",
    "method": "DELETE",
    "path": "/api/pages/{id}",
    "tags": [
      "pages"
    ],
    "summary": "remove a page",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Static instance pages, administered by the Forem operator."
  },
  {
    "id": "getPagesId",
    "method": "GET",
    "path": "/api/pages/{id}",
    "tags": [
      "pages"
    ],
    "summary": "show details for a page",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Static instance pages, administered by the Forem operator."
  },
  {
    "id": "putPagesId",
    "method": "PUT",
    "path": "/api/pages/{id}",
    "tags": [
      "pages"
    ],
    "summary": "update details for a page",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Static instance pages, administered by the Forem operator."
  },
  {
    "id": "getPodcastEpisodes",
    "method": "GET",
    "path": "/api/podcast_episodes",
    "tags": [
      "podcast_episodes"
    ],
    "summary": "Podcast Episodes",
    "pathParams": [],
    "queryParams": [
      "username"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getProfileImage",
    "method": "GET",
    "path": "/api/profile_images/{username}",
    "tags": [
      "profile images"
    ],
    "summary": "A Users or organizations profile image",
    "pathParams": [
      "username"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "postReactions",
    "method": "POST",
    "path": "/api/reactions",
    "tags": [
      "reactions"
    ],
    "summary": "create reaction",
    "pathParams": [],
    "queryParams": [
      "category",
      "reactable_id",
      "reactable_type"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "postReactionsToggle",
    "method": "POST",
    "path": "/api/reactions/toggle",
    "tags": [
      "reactions"
    ],
    "summary": "toggle reaction",
    "pathParams": [],
    "queryParams": [
      "category",
      "reactable_id",
      "reactable_type"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getReadinglist",
    "method": "GET",
    "path": "/api/readinglist",
    "tags": [
      "readinglist"
    ],
    "summary": "Readinglist",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getRecommendedArticlesLists",
    "method": "GET",
    "path": "/api/recommended_articles_lists",
    "tags": [
      "recommended_articles_lists"
    ],
    "summary": "Retrieve all recommended articles lists",
    "pathParams": [],
    "queryParams": [
      "page",
      "search"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Curated recommendation lists are administered at instance level."
  },
  {
    "id": "postRecommendedArticlesLists",
    "method": "POST",
    "path": "/api/recommended_articles_lists",
    "tags": [
      "recommended_articles_lists"
    ],
    "summary": "Create or update a recommended articles list",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Curated recommendation lists are administered at instance level."
  },
  {
    "id": "getRecommendedArticlesListsId",
    "method": "GET",
    "path": "/api/recommended_articles_lists/{id}",
    "tags": [
      "recommended_articles_lists"
    ],
    "summary": "Retrieve details of a recommended articles list",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Curated recommendation lists are administered at instance level."
  },
  {
    "id": "patchRecommendedArticlesListsId",
    "method": "PATCH",
    "path": "/api/recommended_articles_lists/{id}",
    "tags": [
      "recommended_articles_lists"
    ],
    "summary": "Update a recommended articles list",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Curated recommendation lists are administered at instance level."
  },
  {
    "id": "getSegments",
    "method": "GET",
    "path": "/api/segments",
    "tags": [
      "segments"
    ],
    "summary": "Manually managed audience segments",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "createSegment",
    "method": "POST",
    "path": "/api/segments",
    "tags": [
      "segments"
    ],
    "summary": "Create a manually managed audience segment",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "deleteSegment",
    "method": "DELETE",
    "path": "/api/segments/{id}",
    "tags": [
      "segments"
    ],
    "summary": "Delete a manually managed audience segment",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "getSegment",
    "method": "GET",
    "path": "/api/segments/{id}",
    "tags": [
      "segments"
    ],
    "summary": "A manually managed audience segment",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "addUsersToSegment",
    "method": "PUT",
    "path": "/api/segments/{id}/add_users",
    "tags": [
      "segments"
    ],
    "summary": "Add users to a manually managed audience segment",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "removeUsersFromSegment",
    "method": "PUT",
    "path": "/api/segments/{id}/remove_users",
    "tags": [
      "segments"
    ],
    "summary": "Remove users from a manually managed audience segment",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "getUsersInSegment",
    "method": "GET",
    "path": "/api/segments/{id}/users",
    "tags": [
      "segments"
    ],
    "summary": "Users in a manually managed audience segment",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Audience segments are a Forem instance feature for billboard targeting, not available to a hosted dev.to author account."
  },
  {
    "id": "getSubforems",
    "method": "GET",
    "path": "/api/subforems",
    "tags": [
      "subforems"
    ],
    "summary": "Retrieve all discoverable subforems",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Subforems are an instance-level structure created by the Forem operator."
  },
  {
    "id": "getSurveys",
    "method": "GET",
    "path": "/api/surveys",
    "tags": [
      "surveys"
    ],
    "summary": "List surveys",
    "pathParams": [],
    "queryParams": [
      "active"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "postSurveys",
    "method": "POST",
    "path": "/api/surveys",
    "tags": [
      "surveys"
    ],
    "summary": "Create a survey",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "deleteSurveysIdOrSlug",
    "method": "DELETE",
    "path": "/api/surveys/{id_or_slug}",
    "tags": [
      "surveys"
    ],
    "summary": "Delete a survey",
    "pathParams": [
      "id_or_slug"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "getSurveyByIdOrSlug",
    "method": "GET",
    "path": "/api/surveys/{id_or_slug}",
    "tags": [
      "surveys"
    ],
    "summary": "A survey with polls",
    "pathParams": [
      "id_or_slug"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "patchSurveysIdOrSlug",
    "method": "PATCH",
    "path": "/api/surveys/{id_or_slug}",
    "tags": [
      "surveys"
    ],
    "summary": "Update a survey",
    "pathParams": [
      "id_or_slug"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "getSurveyPollTextResponses",
    "method": "GET",
    "path": "/api/surveys/{id_or_slug}/poll_text_responses",
    "tags": [
      "surveys"
    ],
    "summary": "Survey poll text responses",
    "pathParams": [
      "id_or_slug"
    ],
    "queryParams": [
      "after"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "getSurveyPollVotes",
    "method": "GET",
    "path": "/api/surveys/{id_or_slug}/poll_votes",
    "tags": [
      "surveys"
    ],
    "summary": "Survey poll votes",
    "pathParams": [
      "id_or_slug"
    ],
    "queryParams": [
      "after"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "Surveys are an instance feature, created by the Forem operator."
  },
  {
    "id": "getTags",
    "method": "GET",
    "path": "/api/tags",
    "tags": [
      "tags"
    ],
    "summary": "Tags",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getTrends",
    "method": "GET",
    "path": "/api/trends",
    "tags": [
      "trends"
    ],
    "summary": "Trends",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getTrend",
    "method": "GET",
    "path": "/api/trends/{id_or_slug}",
    "tags": [
      "trends"
    ],
    "summary": "A Trend",
    "pathParams": [
      "id_or_slug"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getTrendArticles",
    "method": "GET",
    "path": "/api/trends/{trend_id_or_slug}/articles",
    "tags": [
      "trends"
    ],
    "summary": "Articles in a Trend",
    "pathParams": [
      "trend_id_or_slug"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getUser",
    "method": "GET",
    "path": "/api/users/{id}",
    "tags": [
      "users"
    ],
    "summary": "A User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "unLimitUser",
    "method": "DELETE",
    "path": "/api/users/{id}/limited",
    "tags": [
      "users"
    ],
    "summary": "Remove limited for a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "limitUser",
    "method": "PUT",
    "path": "/api/users/{id}/limited",
    "tags": [
      "users"
    ],
    "summary": "Add limited role for a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "unSpamUser",
    "method": "DELETE",
    "path": "/api/users/{id}/spam",
    "tags": [
      "users"
    ],
    "summary": "Remove spam role from a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "spamUser",
    "method": "PUT",
    "path": "/api/users/{id}/spam",
    "tags": [
      "users"
    ],
    "summary": "Add spam role for a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "suspendUser",
    "method": "PUT",
    "path": "/api/users/{id}/suspend",
    "tags": [
      "users"
    ],
    "summary": "Suspend a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "unTrustUser",
    "method": "DELETE",
    "path": "/api/users/{id}/trusted",
    "tags": [
      "users"
    ],
    "summary": "Remove trusted role from a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "trustUser",
    "method": "PUT",
    "path": "/api/users/{id}/trusted",
    "tags": [
      "users"
    ],
    "summary": "Add trusted role for a User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "unpublishUser",
    "method": "PUT",
    "path": "/api/users/{id}/unpublish",
    "tags": [
      "users"
    ],
    "summary": "Unpublish a User's Articles and Comments",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Moderation action. Requires moderator or admin privileges on the Forem instance, which a standard dev.to author API key does not carry."
  },
  {
    "id": "getUserMe",
    "method": "GET",
    "path": "/api/users/me",
    "tags": [
      "users"
    ],
    "summary": "The authenticated user",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "searchUsers",
    "method": "GET",
    "path": "/api/users/search",
    "tags": [
      "users"
    ],
    "summary": "Search for users",
    "pathParams": [],
    "queryParams": [
      "email"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  },
  {
    "id": "getOpenAPIDescription",
    "method": "GET",
    "path": "/api/v1/openapi.json",
    "tags": [
      "openapi"
    ],
    "summary": "OpenAPI description",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "excluded",
    "reason": "Serves the spec document itself, which is already vendored in this repo."
  },
  {
    "id": "videos",
    "method": "GET",
    "path": "/api/videos",
    "tags": [
      "videos",
      "articles"
    ],
    "summary": "Articles with a video",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "devto_call"
  }
];

export const OPERATIONS_BY_ID = new Map(OPERATIONS.map((o) => [o.id, o]));
