export const PRIORITIES = ["low", "medium", "high"];
export const STATUSES = ["all", "active", "completed"];
export const DEFAULT_PRIORITY = "medium";
export const DEFAULT_COMPLETED = false;
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const ALLOWED_UPDATE_FIELDS = [
  "title",
  "completed",
  "priority",
  "dueDate",
];
