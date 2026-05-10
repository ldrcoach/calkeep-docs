---
title: Tasks, projects, and processes
sidebar_position: 5
description: How CalKeep's productivity layer organizes work after meetings — Inbox tasks, projects, and process templates.
---

# Tasks, projects, and processes

CalKeep's productivity layer organizes the work that happens after a
meeting ends. Three layers stack:

- **Tasks** — single units of work. The most flexible.
- **Projects** — a group of tasks owned by a team.
- **Processes** — templates that spawn the same set of tasks every time
  you start a new run (e.g., a customer-onboarding sequence).

Find them under **Productivity** in the sidebar.

## Plan tier

| Layer | Plan |
|---|---|
| **Tasks** (Inbox + scheduling + reminders) | All plans |
| **Projects** | Pro and above |
| **Processes** | Pro and above |
| **Reviewer workflow** | All plans |
| **WhatsApp reminders** | Pro and above (with explicit opt-in) |
| **Task import (guarded)** | Business and Enterprise |

## Tasks

Each task lives in exactly one **container**:

- **Inbox** — your private to-do list. Inbox tasks cannot be assigned to
  others.
- **Project** — shared with project members.
- **Process run** — spawned by a process template.

Status is fixed: **todo**, **doing**, or **done**.

### Inbox

Open **Tasks → Inbox** for tasks with no project and no process run. These
are private to the creator and cannot be assigned, even if you're a
workspace admin.

This is intentional — Inbox is for personal work, not delegation.

### Subtasks

A task can have one level of subtasks. Subtasks cannot themselves have
subtasks. (Two-level nesting is deliberately prevented to keep workflows
shallow.)

### Recurring tasks

A task can carry an `RRULE`. When you complete it:

1. The current row's `dueDate` is advanced to the next occurrence.
2. New reminders are generated for the new due date.
3. The completion is appended to a `TaskCompletionHistory` record.

When the `RRULE` runs out, the task is marked truly done. There's no
master/exception split — recurring tasks are simpler than recurring events
on purpose.

### Reminders

Each task can carry reminders on multiple channels:

- **In-app** — CalKeep notification inbox.
- **Email** — branded email reminder.
- **SMS** — text (number required on user profile).
- **Push** — mobile/desktop push (when the apps are installed).
- **WhatsApp** — Pro+ tier, with explicit user opt-in.

Reminders are regenerated whenever you change the task's due date.
Cancellations on completion or delete cancel pending reminders.

The reminder worker batches every 2 minutes. Overdue reminders (>24h)
fall back to in-app only.

### Task links

A task can link to a contact, calendar event, or booking. The link is
polymorphic and visibility-gated:

- Read access requires read access to the linked resource.
- Inaccessible links are hidden from the user, with a `hiddenLinkCount`
  shown so you know there's something you can't see.

This is how "the task you owe Joe after Wednesday's call" stays connected
to both Joe (contact), the call (event), and the booking record without
manually re-linking.

### Reviewer workflow

Tasks can be assigned a reviewer. When the assignee marks the task done:

1. The task moves to a `needsReview` state.
2. The reviewer sees it in their **Review queue**.
3. Reviewer approves or kicks back with a comment.

Use this for QA-style workflows or anything where "done" needs a second
pair of eyes.

### Schedule a task to your calendar

Click **Schedule** on a task to create a real calendar event for it. The
event is created on the calendar you select, mirrored to other connected
calendars per your role rules, and linked back to the task via
`sourceTaskId`.

Title and description changes on a scheduled task propagate to the linked
calendar event. Due-date changes on the task do **not** automatically
move the calendar event — scheduling is your plan, not an echo of the
due date.

If the linked calendar event is deleted from a connected provider,
CalKeep detects this during sync and unlinks the task — it doesn't
delete the task.

You can also drag a task from the unscheduled-tasks tray onto the
calendar at **My Calendar** for precise drop-into-slot scheduling.

## Projects

Projects are shared task containers with members.

### Roles

- **Owner** — can edit project settings, add/remove members, delete.
- **Member** — can create, edit, complete tasks within the project.

### Membership

A project task can only be assigned to project members. Adding someone
to a project lets them be assigned tasks within it; removing someone
clears their assignments on active project tasks (and notifies them).

### Delete a project

Deleting a project requires a `taskDisposition`:

| Disposition | What happens |
|---|---|
| **delete** | All project tasks are deleted. |
| **orphan** | Tasks move to the creator's Inbox; non-creator assignees and reviewers are cleared; reminders for users losing access are cancelled. |

If a task's creator has left the workspace and you orphan, the task is
hard-deleted (since there's no Inbox owner left).

## Processes

A **process** is a template. Each run is an instance.

Use processes when the same multi-step workflow repeats — customer
onboarding, employee onboarding, weekly QBR, monthly compliance check.

### Process structure

A process has:

- **Ordered steps** — each spawns one task per run.
- **Members** — the pool of users who can be assigned process tasks.
- **Optional `RRULE`** — for processes that auto-restart on a cadence.

Each step has either:

- **`offsetDays`** — due N days after the run starts. Most common.
- **`absoluteDate`** — due on a fixed date regardless of when the run
  started. Mutually exclusive with offset.

(The two are mutually exclusive per step. Absolute dates don't recompute
per run, so a process with `RRULE` and absolute-date steps shows a soft
warning at edit time.)

### Process runs

When you start a run:

1. CalKeep spawns one task per step, applies the offset/absolute due
   dates, and copies the step's defaults onto the task.
2. The run lives at **Processes → [process] → [run]** with its own task
   board.
3. When all tasks are done, mark the run complete (or archive it).

### Auto-spawn

If a process has an `RRULE`, the auto-spawn worker creates a new run on
the cadence. Catch-up is **one-spawn** — if the worker missed several
intervals while paused, only one new run is created, not a backlog. The
new run gets a name suffix if there's a collision.

### Removing a member

Removing a member from a process cascades to active run tasks: their
assignee/reviewer slots are cleared, and they receive a notification.
This prevents orphaned task ownership.

## Filtering tasks

The **Tasks** page supports several filter views:

- **Inbox** — private tasks (no project, no run).
- **Assigned to me** — across all containers.
- **Review queue** — tasks where I'm the reviewer and `needsReview` is true.
- **Status** — todo, doing, done.
- **Due before / after** — date ranges.
- **Include subtasks** — show or collapse one-level subtasks.
- **Include completed** — show done tasks.

## Programmatic access

The `tasks:read` and `tasks:write` token scopes are defined and can be
selected when issuing an API token, but the underlying `/api/v1/tasks`
endpoints are still under construction. Watch [API tokens](/admin/api)
for the resource-coverage table that reflects what's live.

`task.created` and `task.completed` webhooks fire on commit and can be
subscribed to today. See [Webhooks](/admin/webhooks).

## Buyer-facing positioning

For how this fits into a real customer-service or sales-team workflow, see:

- [Convert meetings into tracked follow-up](https://calkeep.com/solutions/post-meeting-follow-up-workflow)
- [Run a repeatable customer-onboarding process](https://calkeep.com/solutions/customer-onboarding-process)
