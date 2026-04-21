export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-workflow-engine",
    title: "Designing a Workflow Engine: An Architectural Critique",
    excerpt: "A critical examination of workflow engine patterns—with insights from production systems like SpiffWorkflow",
    date: "2026-04-21",
    readTime: "18 min read",
    category: "Architecture",
    tags: ["Architecture", "Python", "BPMN", "System Design", "Workflow"],
    content: `
# Designing a Workflow Engine: An Architectural Critique

*A critical examination of workflow engine patterns—with insights from production systems like SpiffWorkflow*

---

## Table of Contents

1. [Why This Matters](#why-this-matters)
2. [The Dominant Pattern and Its Problems](#the-dominant-pattern-and-its-problems)
3. [Lessons from SpiffWorkflow](#lessons-from-spiffworkflow)
4. [A More Robust Architecture](#a-more-robust-architecture)
5. [The State Problem](#the-state-problem)
6. [Error Handling That Actually Works](#error-handling-that-actually-works)
7. [Context and History](#context-and-history)
8. [Patterns Worth Considering](#patterns-worth-considering)
9. [What You'd Actually Build](#what-youd-actually-build)
10. [Closing](#closing)

---

## Why This Matters

Most "how to build a workflow engine" content falls into two categories:

1. **Documentation**: "Here's how X system works" — absorbs but doesn't transform
2. **Best Practices Gospel**: "Always do A, B, C" — prescriptive without understanding trade-offs

This is neither. It's a critical analysis.

We'll look at common patterns, honestly assess their weaknesses, study systems like SpiffWorkflow that took different approaches, and then propose cleaner solutions. The goal: help you make architectural decisions with full awareness of consequences.

---

## The Dominant Pattern and Its Problems

The typical Python workflow engine looks something like this:

\`\`\`python
class WorkflowInstance:
    status: WorkflowStatus
    context: dict
    current_node_id: UUID
    definition_snapshot: dict

class OrchestratorService:
    async def start_workflow(self, definition_id, entity_id, context): ...
    async def complete_node(self, node_id, output): ...
    async def retry_failed_node(self, workflow_id): ...
    async def evaluate_transitions(self, node_key, context): ...
\`\`\`

This pattern has several subtle problems that compound at scale.

### Problem 1: The "God Service" Anti-pattern

The orchestrator accumulates responsibilities:

\`\`\`python
class OrchestratorService:
    def start_workflow(self, ...): ...        # Workflow lifecycle
    def complete_node(self, ...): ...         # Node lifecycle + routing
    def retry_failed_node(self, ...): ...     # Error recovery
    def cancel_workflow(self, ...): ...       # Cancellation
    def pause_workflow(self, ...): ...        # Suspension
    def merge_context(self, ...): ...         # State management
    def evaluate_transitions(self, ...): ...  # Routing logic
\`\`\`

When \`complete_node()\` does three things (update status, merge context, evaluate routing), you can't test routing logic without running a full workflow. When something breaks, you debug everything.

### Problem 2: Coupling Completion to Routing

Here's the typical \`complete_node\`:

\`\`\`python
async def complete_node(self, node_instance_id, output_context):
    # 1. Update node status
    node = await self.node_repo.get(node_instance_id)
    node.status = COMPLETED
    node.output_data = output_context

    # 2. Merge context
    self.workflow.context = merge(self.workflow.context, output_context)

    # 3. Evaluate transitions
    transitions = self.definition.transitions[node.node_key]
    next_nodes = self.evaluate(transitions, self.workflow.context)

    # 4. Trigger next nodes
    for next_node in next_nodes:
        await self.enqueue(execute_node, self.workflow.id, next_node)
\`\`\`

This couples three concerns that should be separate:

- **Completion** (node is done)
- **State update** (context grows)
- **Routing** (what happens next)

If you want to simulate "what if this node returned X?" you can't easily do it because completion is entangled with routing.

### Problem 3: Status Proliferation

Typical status enums grow unwieldy:

\`\`\`python
class NodeStatus:
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    WAITING = "waiting"                 # Waiting for what?
    WAITING_CALLBACK = "waiting_callback"  # More specific, but...
    POLLING = "polling"                  # And more...
    RETRYING = "retrying"
    TIMEOUT = "timeout"
\`\`\`

These often conflate two different concepts:

- **Execution state**: What is the node doing *right now*?
- **Blocking state**: Is the workflow waiting on something external?

\`WAITING_CALLBACK\` suggests the node is waiting, but really the *workflow* is waiting for an external signal. The node itself did its work (initiated a webhook) and is now dormant.

### Problem 4: Definition-as-Dict Loses Semantics

Storing workflows as JSON dictionaries:

\`\`\`python
definition = {
    "key": "loan-approval",
    "nodes": {
        "credit_check": {
            "type": "human_task",
            "config": {...}
        }
    }
}
\`\`\`

works until you need:

- Type checking at design time (a typo like \`"humen_task"\` won't fail until runtime)
- Cross-referencing (validating that \`approval_node\`'s \`source_node_key\` actually exists)
- Code completion in editors

The JSON representation is flexible but loses the rich semantics a typed model provides.

---

## Lessons from SpiffWorkflow

SpiffWorkflow takes a notably different approach. It's a pure Python implementation with minimal dependencies (just \`lxml\` for XML parsing), supporting BPMN 2.0 natively.

### What SpiffWorkflow Does Well

**1. BPMN-Native Design**

SpiffWorkflow parses actual BPMN 2.0 XML diagrams. This means:

- Visual modeling tools can create workflows
- The workflow is the diagram, not a JSON approximation
- Standards compliance brings interoperability

**2. Task Types with Clear Semantics**

SpiffWorkflow defines distinct task types with explicit behaviors:

| Task Type | Behavior |
|-----------|----------|
| **UserTask** | Performed by a person, blocks until external completion |
| **ServiceTask** | Automated, executes immediately |
| **ScriptTask** | Executes Python code inline |
| **ManualTask** | No system involvement, purely manual |
| **ReceiveTask** | Waits for an external message |
| **SendTask** | Sends a message to external participant |
| **BusinessRuleTask** | Executes a decision (DMN) |
| **Subprocess** | Executes another workflow |

Each task type has explicit entry/exit conditions and well-defined behavior.

**3. Events as First-Class Citizens**

SpiffWorkflow treats events properly:

\`\`\`python
# Timer events
<timerEventDefinition id="Timer_1" timerFormat="R3/PT10M"/>

# Signal events
<signalEventDefinition id="Signal_1" signalRef="approval_received"/>

# Message events
<messageEventDefinition id="Message_1" messageRef="loan_application"/>
\`\`\`

The workflow can:

- Wait for timer events (pause for duration)
- React to signal events (external signals)
- Handle message events (correlations)

**4. Multi-Instance Patterns**

SpiffWorkflow supports parallel/sequential multi-instance tasks:

\`\`\`xml
<multiInstanceLoopCharacteristics isSequential="false">
  <!-- Parallel: all reviewers approve -->
  <loopCardinality>3</loopCardinality>
</multiInstanceLoopCharacteristics>
\`\`\`

This handles "collect 3 approvals in parallel" without extra machinery.

**5. Boundary Events**

Boundary events catch failures, timers, or signals on any task:

\`\`\`xml
<boundaryEvent id="Timer_NDA" attachedToRef="nda_task">
  <timerEventDefinition id="Timer_2" />
</boundaryEvent>
\`\`\`

If \`nda_task\` takes longer than expected, the timer fires and triggers escalation.

### What SpiffWorkflow Gets Right Architecturally

**Separation of Parsing and Execution**

\`\`\`python
# Parser produces a workflow specification
spec = BpmnParser().parse(io.BytesIO(bpmn_xml))
spec.name  # "Loan Approval Process"
spec.task_specs  # Dictionary of task specifications
\`\`\`

The parser doesn't execute. The executor doesn't parse. Clean separation.

**Serializer Architecture for State**

SpiffWorkflow serializes workflow state, enabling:

- Persistence across restarts
- Migration between systems
- Debugging by loading a serialized state

\`\`\`python
serializer = JsonWorkflowSerializer()
state = serializer.serialize(workflow_instance)
# Store in database, redis, file, etc.
loaded = serializer.deserialize(state)
\`\`\`

**The Task Model**

Each task in SpiffWorkflow has:

- **State machine**: \`WAITED\` → \`READY\` → \`STARTED\` → \`COMPLETED\`
- **Internal data**: Task-specific data
- **Parent/children**: For multi-instance
- **depth**: For subprocess nesting

\`\`\`python
task = workflow.get_task_from_id(task_id)
task.status  # WORKFLOW_TASKStatuses values
task.internal_data  # Dict of task-specific data
task.children  # For multi-instance
\`\`\`

---

## A More Robust Architecture

Based on these lessons, here's an architecture that addresses the common problems.

### Core Insight: Separate What, When, and How

| Question | Concern | Component |
|----------|---------|-----------|
| **What** to execute | Workflow definition | \`WorkflowSpec\` |
| **When** to execute | Scheduling, triggers | \`Scheduler\` |
| **How** to execute | Task behavior | \`TaskExecutor\` |
| **What happened** | Events, history | \`EventLog\` |
| **Current state** | Persistence | \`StateStore\` |

### Event-Driven Architecture

Events are the integration mechanism, not direct calls:

\`\`\`python
# Domain events
@dataclass
class WorkflowEvent:
    occurred_at: datetime
    workflow_id: UUID
    correlation_id: str | None = None

@dataclass
class NodeCompleted(WorkflowEvent):
    node_id: UUID
    node_key: str
    output: dict

@dataclass
class NodeFailed(WorkflowEvent):
    node_id: UUID
    node_key: str
    error: str

@dataclass
class SignalReceived(WorkflowEvent):
    signal_name: str
    payload: dict

# Event handlers - single responsibility
class TransitionHandler:
    async def handle(self, event: NodeCompleted):
        next_nodes = self.router.route(
            event.workflow_id,
            event.node_key,
            event.output
        )
        for node_key in next_nodes:
            await self.scheduler.schedule(event.workflow_id, node_key)

class ContextHandler:
    async def handle(self, event: NodeCompleted):
        await self.state_store.apply_patch(event.workflow_id, event.node_id, event.output)
        await self.history_store.record(event)

class CompletionHandler:
    async def handle(self, event: NodeCompleted):
        if await self.state_store.has_pending_tasks(event.workflow_id):
            return  # Still running
        await self.state_store.mark_complete(event.workflow_id)
\`\`\`

### The Task Executor Strategy Pattern

Each task type has an executor. No \`if node.type ==\` chains:

\`\`\`python
class TaskExecutor(ABC):
    @abstractmethod
    async def execute(self, context: TaskContext) -> TaskResult: ...

class UserTaskExecutor(TaskExecutor):
    async def execute(self, context: TaskContext) -> TaskResult:
        task = await self.task_service.create(
            reference=context.task_reference,
            form=context.node.config.form,
            assignee=context.node.config.assignee,
        )
        return TaskResult(status=WAITING, external_id=task.id)

class ServiceTaskExecutor(TaskExecutor):
    async def execute(self, context: TaskContext) -> TaskResult:
        response = await self.http_client.post(
            context.node.config.url,
            json=self.render(context.node.config.body, context.state),
        )
        output = self.transform(response.json(), context.node.config.output_mapping)
        return TaskResult(status=COMPLETED, output=output)

class ScriptTaskExecutor(TaskExecutor):
    async def execute(self, context: TaskContext) -> TaskResult:
        result = self.script_engine.execute(
            context.node.config.script,
            context.state,
        )
        return TaskResult(status=COMPLETED, output=result)

class SubprocessExecutor(TaskExecutor):
    async def execute(self, context: TaskContext) -> TaskResult:
        subprocess = await self.subworkflow_engine.start(
            definition_key=context.node.config.subprocess_key,
            parent_context=context.state,
            parent_task_id=context.task_id,
        )
        return TaskResult(status=WAITING_SUBPROCESS, subprocess_id=subprocess.id)

class ExecutorFactory:
    def __init__(self, executors: dict[str, TaskExecutor]):
        self._executors = executors

    def get(self, task_type: str) -> TaskExecutor:
        if task_type not in self._executors:
            raise ValueError(f"Unknown task type: {task_type}")
        return self._executors[task_type]
\`\`\`

### The Router: A Pure Function

Routing should have no side effects. This makes it testable and reusable:

\`\`\`python
class Router:
    def __init__(self, condition_evaluator: ConditionEvaluator):
        self._evaluator = condition_evaluator

    def route(
        self,
        definition: WorkflowSpec,
        current_node_key: str,
        context: dict,
    ) -> list[str]:
        transitions = definition.transitions.get(current_node_key, [])
        matches = []

        for transition in transitions:
            if transition.condition is None:
                matches.append(transition.to)
            elif self._evaluator.evaluate(transition.condition, context):
                matches.append(transition.to)

        return matches  # Empty list = terminal node

    def route_all(self, definition, contexts: list[dict]) -> list[list[str]]:
        # For evaluating multiple conditions (e.g., simulation, what-if)
        return [self.route(definition, current_node_key, ctx) for ctx in contexts]
\`\`\`

---

## The State Problem

### Workflow State vs. Task State

These are often conflated. A cleaner model:

**Workflow-level state** (is the overall execution healthy?):

\`\`\`python
class WorkflowStatus:
    PENDING    # Created, not started
    RUNNING    # Actively processing
    WAITING    # Blocked on external event (timer, signal, human)
    COMPLETED  # Terminal: success
    FAILED     # Terminal: error
    CANCELLED  # Terminal: user cancelled
\`\`\`

**Task-level state** (what is this specific task doing?):

\`\`\`python
class TaskStatus:
    FUTURE    # Not yet reachable
    READY     # Can be activated
    WAITING   # Blocked (for user tasks, subprocesses)
    STARTED   # Currently executing
    COMPLETED # Finished successfully
    FAILED    # Error (may retry)
    CANCELLED # Cancelled
\`\`\`

Notice: there's no \`WAITING_CALLBACK\` or \`POLLING\`. Instead, \`WAITING\` means "this task is blocked waiting for something external." The workflow-level \`WAITING\` status indicates the entire workflow is blocked.

### State Transitions as Events

Every state transition emits an event:

\`\`\`python
class WorkflowStateMachine:
    def transition(self, workflow_id, new_status, reason):
        old_status = self._get_status(workflow_id)

        # Emit event for handlers
        self.event_bus.emit(WorkflowStatusChanged(
            workflow_id=workflow_id,
            old_status=old_status,
            new_status=new_status,
            reason=reason,
            changed_at=datetime.utcnow(),
        ))

        self.state_store.set_status(workflow_id, new_status)

# Handlers can react to status changes
class LoggingHandler:
    async def handle(self, event: WorkflowStatusChanged):
        if event.new_status == WorkflowStatus.FAILED:
            await self.alert_service.notify(
                f"Workflow {event.workflow_id} failed: {event.reason}"
            )
\`\`\`

---

## Error Handling That Actually Works

### The Idempotency Foundation

In distributed systems, duplicates happen. Every operation must be idempotent:

\`\`\`python
async def execute_node(workflow_id, node_key):
    # Check before creating
    existing = await state_store.get_active_node(workflow_id, node_key)
    if existing:
        logger.info(f"Node {node_key} already active in {workflow_id}")
        return  # Someone else is handling it

    # Use database constraint as backstop
    try:
        node = NodeInstance(workflow_id=workflow_id, node_key=node_key)
        await node_repo.create(node)
    except IntegrityError:
        logger.info(f"Node {node_key} already created (constraint catch)")
        return
\`\`\`

### Task-Level Retry with Backoff

\`\`\`python
class RetryPolicy:
    max_attempts: int = 3
    initial_delay: timedelta = timedelta(seconds=1)
    max_delay: timedelta = timedelta(minutes=5)
    exponential_base: float = 2.0

async def execute_with_retry(
    func: Callable,
    policy: RetryPolicy,
) -> Any:
    last_error: Exception | None = None
    delay = policy.initial_delay

    for attempt in range(policy.max_attempts):
        try:
            return await func()
        except RetryableError as e:
            last_error = e
            if attempt < policy.max_attempts - 1:
                await asyncio.sleep(delay.total_seconds())
                delay = min(delay * policy.exponential_base, policy.max_delay)
            continue
        except NonRetryableError:
            raise

    raise MaxRetriesExceeded(last_error)
\`\`\`

### Compensation for Partial Effects

When tasks have side effects that can't be idempotent, use compensation:

\`\`\`python
class CompensableTask(TaskExecutor):
    async def execute(self, context) -> TaskResult:
        # Do the work
        reservation = await self.reserve_funds(context.amount)
        context.state["reservation"] = reservation

        # Record compensation
        await self.compensation_log.record(
            task_id=context.task_id,
            compensate_func=self._release_funds,
            compensate_args={"reservation_id": reservation.id},
        )

        return TaskResult(status=COMPLETED)

    async def compensate(self, context) -> None:
        reservation = context.state.get("reservation")
        if reservation:
            await self.release_funds(reservation)

# Saga execution
class SagaExecutor(TaskExecutor):
    async def execute(self, context) -> TaskResult:
        results = []
        for step in self.saga.steps:
            result = await step.execute(context)
            results.append(result)
            if not result.success:
                # Compensate in reverse
                for completed in reversed(results[:-1]):
                    await completed.compensate()
                return TaskResult(status=FAILED)

        return TaskResult(status=COMPLETED)
\`\`\`

### SpiffWorkflow's Approach to Errors

SpiffWorkflow handles errors through **boundary events**:

\`\`\`xml
<serviceTask id="CreditCheck" name="Check Credit">
  <multiInstanceLoopCharacteristics isSequential="false"/>
</serviceTask>

<!-- Error boundary event -->
<boundaryEvent id="CreditCheckError" attachedToRef="CreditCheck">
  <errorEventDefinition id="Error_1" errorRef="CreditCheckError"/>
</boundaryEvent>

<sequenceFlow id="Flow_CreditError" sourceRef="CreditCheckError" targetRef="ManualReview"/>
\`\`\`

If the credit check fails, the error boundary catches it and routes to manual review.

This is cleaner than "check error, set FAILED, evaluate transitions" because the error handling is explicit in the diagram.

---

## Context and History

### The Problem with Mutable Context

Mutable shared state causes subtle bugs:

\`\`\`python
workflow.context["approval_status"] = "pending"
# ... time passes, another task runs ...
workflow.context["approval_status"] = "approved"
# What if someone read between these lines?
\`\`\`

### Event Sourcing for Context

Store context mutations as immutable events:

\`\`\`python
@dataclass
class ContextMutated(WorkflowEvent):
    node_id: UUID
    mutations: list[Mutation]

@dataclass
class Mutation:
    op: Literal["add", "replace", "remove"]
    path: str  # JSON path: "/borrower/credit_score"
    old_value: Any
    new_value: Any

# Handler applies mutations
class ContextHandler:
    async def handle(self, event: ContextMutated):
        for mutation in event.mutations:
            await self.apply_mutation(event.workflow_id, mutation)
            await self.record_history(event.workflow_id, mutation)

    async def apply_mutation(self, workflow_id, mutation):
        current = await self.state_store.get_context(workflow_id)

        if mutation.op == "add":
            set_path(current, mutation.path, mutation.new_value)
        elif mutation.op == "replace":
            set_path(current, mutation.path, mutation.new_value)
        elif mutation.op == "remove":
            unset_path(current, mutation.path)

        await self.state_store.set_context(workflow_id, current)

    async def record_history(self, workflow_id, mutation):
        await self.history_store.create(
            workflow_id=workflow_id,
            operation=mutation.op,
            path=mutation.path,
            old_value=mutation.old_value,
            new_value=mutation.new_value,
            occurred_at=datetime.utcnow(),
        )
\`\`\`

Benefits:

- **Complete audit trail**: Every change recorded with timestamp
- **Replay**: Can reconstruct context at any point
- **Debug**: Can see exactly what each task contributed
- **Consistency**: No race conditions from concurrent reads/writes

### SpiffWorkflow's Data Isolation

SpiffWorkflow maintains isolated data for each task instance:

\`\`\`python
task = workflow.get_task_from_id(task_id)
task.data  # Task-specific data, isolated from workflow data

# workflow.last_task.data access when needed
\`\`\`

This prevents task A's data bleeding into task B's context.

---

## Patterns Worth Considering

### 1. The Subprocess Pattern

For complex workflows, break them into subworkflows:

\`\`\`python
class SubprocessExecutor(TaskExecutor):
    async def execute(self, context) -> TaskResult:
        # Start subprocess
        subworkflow = await self.subworkflow_engine.start(
            definition_key=context.node.config.subprocess_key,
            input_data=self.extract_subprocess_input(context),
            parent_task_id=context.task_id,
        )
        return TaskResult(status=WAITING, subprocess_id=subworkflow.id)

    async def on_subprocess_complete(self, subprocess_id, output):
        # Called when subprocess finishes
        parent_task = await self.find_parent_task(subprocess_id)
        await self.complete_task(parent_task.id, output)
\`\`\`

SpiffWorkflow supports this natively with well-defined subprocess communication.

### 2. Multi-Instance for Parallel Work

When you need "do X for all items in this list":

\`\`\`python
class MultiInstanceExecutor(TaskExecutor):
    async def execute(self, context) -> TaskResult:
        items = self.evaluate(context.node.config.items_expression, context.state)

        if context.node.config.is_sequential:
            # Sequential: do one at a time
            return TaskResult(
                status=WAITING,
                remaining_items=items,
                completed_results=[],
            )
        else:
            # Parallel: spawn all at once
            for item in items:
                await self.schedule_child(context.task_id, item)
            return TaskResult(status=WAITING, total_items=len(items))

    async def on_child_complete(self, parent_id, child_id, result):
        parent = await self.get_task(parent_id)
        parent.state.completed_results.append(result)

        if len(parent.state.completed_results) == parent.state.total_items:
            # All done
            await self.complete_task(parent_id, parent.state.completed_results)
\`\`\`

### 3. Timer Events for Delayed Work

\`\`\`python
class TimerHandler:
    async def handle(self, event: TimerFired):
        workflow = await self.state_store.get(event.workflow_id)
        task = workflow.get_task(event.task_key)

        # Execute continuation
        executor = self.executor_factory.get(task.type)
        result = await executor.resume(task, event)

        await self.complete_task(task.id, result)
\`\`\`

### 4. Signal Events for External Integration

\`\`\`python
class SignalHandler:
    async def handle(self, event: SignalReceived):
        # Find all workflows waiting for this signal
        waiting_workflows = await self.state_store.get_workflows_waiting_for(
            event.signal_name
        )

        for workflow in waiting_workflows:
            # Resume the waiting task
            task = workflow.get_waiting_task(event.signal_name)
            executor = self.executor_factory.get(task.type)
            result = await executor.resume(task, event.payload)

            await self.complete_task(task.id, result)
\`\`\`

---

## What You'd Actually Build

If starting from scratch with awareness of these patterns, here's a sensible starting point:

### Core Abstractions

\`\`\`python
# events.py
@dataclass
class WorkflowEvent:
    occurred_at: datetime
    workflow_id: UUID

@dataclass
class NodeCompleted(WorkflowEvent): ...
@dataclass
class NodeFailed(WorkflowEvent): ...
@dataclass
class SignalReceived(WorkflowEvent): ...
@dataclass
class TimerFired(WorkflowEvent): ...

# spec.py
@dataclass
class WorkflowSpec:
    key: str
    version: int
    nodes: dict[str, NodeSpec]
    transitions: dict[str, list[Transition]]

@dataclass
class NodeSpec:
    key: str
    type: str  # "user_task", "service_task", "script_task", etc.
    config: dict
    output_mapping: dict[str, str]

@dataclass
class Transition:
    to: str | None
    condition: Condition | None

# state.py
@dataclass
class WorkflowState:
    id: UUID
    spec_snapshot: WorkflowSpec
    status: WorkflowStatus
    context: dict
    current_nodes: set[str]
    waiting_for: set[str]  # Signals, timers, etc.
    history: list[WorkflowEvent]

# executor.py
class TaskExecutor(ABC):
    @abstractmethod
    async def execute(self, state: WorkflowState, node: NodeSpec) -> TaskResult: ...

class TaskResult:
    status: TaskStatus
    output: dict
    waiting_for: set[str] | None = None
\`\`\`

### Minimal Viable Implementation

\`\`\`python
class WorkflowEngine:
    def __init__(
        self,
        spec_store: SpecStore,
        state_store: StateStore,
        event_bus: EventBus,
        executor_factory: ExecutorFactory,
    ):
        self.specs = spec_store
        self.state = state_store
        self.events = event_bus
        self.executors = executor_factory

    async def start(self, spec_key: str, initial_context: dict) -> UUID:
        spec = await self.specs.get(spec_key)
        state = WorkflowState(
            id=uuid4(),
            spec_snapshot=spec,
            status=WorkflowStatus.RUNNING,
            context=initial_context,
            current_nodes={spec.start_node},
            waiting_for=set(),
        )
        await self.state.save(state)

        self.events.emit(WorkflowStarted(workflow_id=state.id))
        await self._activate_nodes(state)

        return state.id

    async def _activate_nodes(self, state: WorkflowState):
        for node_key in list(state.current_nodes):
            node = state.spec_snapshot.nodes[node_key]
            executor = self.executors.get(node.type)

            try:
                result = await executor.execute(state, node)

                if result.status == TaskStatus.COMPLETED:
                    state.context.update(result.output)
                    self.events.emit(NodeCompleted(
                        occurred_at=datetime.utcnow(),
                        workflow_id=state.id,
                        node_key=node_key,
                        output=result.output,
                    ))
                elif result.status == TaskStatus.WAITING:
                    state.waiting_for.update(result.waiting_for or set())
                    state.current_nodes.discard(node_key)

            except Exception as e:
                self.events.emit(NodeFailed(
                    occurred_at=datetime.utcnow(),
                    workflow_id=state.id,
                    node_key=node_key,
                    error=str(e),
                ))

        await self.state.save(state)

        # Evaluate transitions for completed nodes
        for node_key in state.spec_snapshot.transitions:
            if node_key not in state.current_nodes:
                # Was completed - check for next nodes
                next_keys = self._router.route(
                    state.spec_snapshot,
                    node_key,
                    state.context,
                )
                state.current_nodes.update(next_keys)

        # Check if complete
        if not state.current_nodes and not state.waiting_for:
            state.status = WorkflowStatus.COMPLETED
        elif not state.current_nodes and state.waiting_for:
            state.status = WorkflowStatus.WAITING

        await self.state.save(state)

    async def handle_signal(self, workflow_id: UUID, signal_name: str, payload: dict):
        state = await self.state.get(workflow_id)
        if signal_name not in state.waiting_for:
            return

        state.waiting_for.discard(signal_name)
        # Resume the task waiting for this signal
        # ... implementation
\`\`\`

---

## Closing

A few principles that hold across different approaches:

**Separate concerns explicitly.** Routing shouldn't know about persistence. Executors shouldn't manage state. When everything is coupled, testing is painful and bugs are subtle.

**Events over direct calls.** Instead of \`complete_node()\` internally calling \`evaluate_transitions()\`, emit a \`NodeCompleted\` event and let handlers respond. This enables testing, logging, and extensibility.

**State is sacred.** Mutable context shared across tasks leads to race conditions and debugging nightmares. Event sourcing or snapshot isolation prevents this.

**Idempotency is not optional.** Every operation in a distributed system will eventually be called twice. Design for it from day one.

**Study existing systems.** SpiffWorkflow shows that BPMN-native design with clean task type semantics is viable. Temporal shows that "workflows as code" solves many JSON-definition problems. Learn from them, don't just invent from scratch.

The best architecture is the one that:

- Solves your actual requirements
- Your team can understand and maintain
- Handles failure gracefully
- Can evolve as requirements change

Start simple. Add complexity only when evidence demands it.

---

*This article draws from production patterns and systems like SpiffWorkflow that took alternative approaches to workflow engine design.*
`
  },
  {
    slug: "attentiongan-astronomical-image-denoising",
    title: "Astronomical Image Denoising Using AttentionGAN",
    excerpt: "A novel approach using CycleGAN with attention mechanisms to enhance astronomical images by removing noise while preserving important details.",
    date: "2023",
    readTime: "5 min read",
    category: "Research",
    tags: ["Computer Vision", "Deep Learning", "GAN", "Astronomy", "Image Processing"],
    content: `
# Astronomical Image Denoising Using AttentionGAN

## Abstract

This research presents a novel approach to astronomical image denoising using AttentionGAN, a generative adversarial network architecture enhanced with attention mechanisms. Traditional denoising methods often fail to preserve fine details in astronomical images, such as stars and nebulae. Our proposed method leverages CycleGAN's unpaired learning capability with attention modules to effectively remove noise while preserving critical astronomical features. Experimental results demonstrate significant improvements in both quantitative metrics and visual quality compared to existing approaches.

## 1. Introduction

Astronomical imaging presents unique challenges for image processing. When capturing faint celestial objects, astronomers must deal with various sources of noise:

- **Photon shot noise** - Inherent quantum fluctuations in light detection
- **Read noise** - Electronic noise from sensor readout
- **Thermal noise** - Heat-induced signals in detectors
- **Cosmic rays** - High-energy particle impacts

Traditional denoising methods like Gaussian filtering or median filtering often blur fine details - precisely the features astronomers care about most.

## 2. Methodology

### 2.1 CycleGAN Architecture

We built upon **CycleGAN**, which learns image-to-image translations without requiring paired training data. This is crucial for astronomical imaging where obtaining matched noisy/clean image pairs is extremely difficult.

### 2.2 Attention Mechanisms

The key innovation is integrating attention layers into the generator:

1. **Self-Attention Module** - Enables the model to focus on relevant spatial features across the entire image, helping distinguish between noise and actual astronomical features

2. **Channel Attention** - Emphasizes important feature channels, allowing the network to prioritize certain types of astronomical structures

3. **Residual Attention** - Helps preserve fine details while learning complex noise patterns

### 2.3 Loss Functions

The model uses multiple loss functions:

- **Adversarial Loss** - Ensures realistic output
- **Cycle Consistency Loss** - Maintains astronomical integrity
- **Perceptual Loss** - Preserves fine details using pre-trained VGG features

## 3. Experimental Results

### Dataset

- Generated synthetic noisy astronomical images
- Added varying levels of Gaussian noise (σ = 10, 20, 30)
- Used high-resolution star field and nebula images

### Quantitative Results

| Method | PSNR | SSIM |
|--------|------|------|
| BM3D | 28.45 | 0.85 |
| DnCNN | 30.12 | 0.89 |
| CycleGAN | 31.23 | 0.91 |
| **AttentionGAN** | **33.87** | **0.94** |

### Key Findings

1. **Noise Reduction** - Achieved 15% better noise reduction than CycleGAN
2. **Detail Preservation** - Maintained stellar objects with 94% SSIM
3. **Adaptability** - Successfully handled various noise levels

## 4. Visual Results

The AttentionGAN successfully:
- Removes background noise while preserving star points
- Maintains nebula structures without over-smoothing
- Handles varying noise levels without parameter tuning

## 5. Conclusion

AttentionGAN demonstrates that combining generative adversarial networks with attention mechanisms offers a powerful solution for astronomical image denoising. The approach successfully preserves critical astronomical details while effectively removing various noise sources.

This research was conducted as part of my Master's thesis at the University of Indonesia, combining my background in Astronomy with machine learning expertise.

---

*Read the full paper on [ResearchGate](https://www.researchgate.net/publication/388175752_Astronomical_Image_Denoising_Using_AttentionGAN)*
`
  },
  {
    slug: "deepct-irbert",
    title: "DeepCT-IRBERT: Hybrid Retrieval Pipeline for MS-MARCO",
    excerpt: "Combining the power of BM25 with DeepCT term weighting and IR-BERT contextual embeddings for improved document ranking.",
    date: "December 12, 2021",
    readTime: "8 min read",
    category: "Research",
    tags: ["Information Retrieval", "Deep Learning", "NLP", "IR-BERT", "DeepCT"],
    content: `
# DeepCT-IRBERT: Hybrid Retrieval Pipeline for MS-MARCO

## Introduction

In the field of Information Retrieval (IR), the challenge of effectively ranking documents remains a central problem. Traditional methods like BM25 have served as the backbone of retrieval systems for decades, while modern transformer-based models have shown remarkable semantic understanding capabilities. My research explores the synergy between these two approaches through a hybrid pipeline called **DeepCT-IRBERT**.

## The Problem

The MS-MARCO dataset presents a significant challenge for retrieval systems:
- **6,980 queries** or questions
- **1,000 candidate passages** per query
- Need to identify the most relevant passages

The goal is to maximize **MRR@10** (Mean Reciprocal Rank at 10), which measures how highly the first relevant document ranks in the top 10 results.

## Methodology

### DeepCT: Context-Aware Term Weighting

DeepCT, introduced by Dai & Callan (2019, 2020), represents a paradigm shift in term weighting. Instead of using traditional TF-IDF or BM25 term frequencies, DeepCT uses a deep learning model to learn context-aware term importance.

Key insights:
- Terms that are important in one context may be less important in another
- DeepCT can identify **semantic term importance** that traditional methods miss
- When used to reweight BM25 indexing, it significantly improves retrieval performance

### IR-BERT: Semantic Search with Transformers

IR-BERT, proposed by Deshmukh & Sethi (2020), leverages the power of BERT (and SBERT by Reimers & Gurevych, 2019) to capture semantic relationships between queries and documents.

Benefits:
- Understands **contextual meaning** beyond keyword matching
- Captures semantic similarity between query and passage
- Provides dense semantic representations

### The Hybrid Approach

My implementation combines:
1. **BM25 indexed with DeepCT term weighting** - leveraging learned term importance
2. **IR-BERT for first-stage retrieval** - capturing semantic understanding

This hybrid approach aims to get the best of both worlds:
- The **efficiency and recall** of sparse retrieval (BM25 + DeepCT)
- The **semantic precision** of dense retrieval (IR-BERT)

## Implementation Details

The project is implemented in Jupyter Notebook and includes:

1. **Data Loading**: MS-MARCO passage ranking dataset
2. **DeepCT Indexing**: Reweighting document terms using learned weights
3. **IR-BERT Encoding**: Generating dense embeddings for queries and passages
4. **Hybrid Fusion**: Combining scores from both approaches
5. **Evaluation**: Computing MRR@10 on the test set

## Key Findings

Through experimentation, I observed:

1. **DeepCT reweighting** significantly improves over raw BM25
2. **IR-BERT** provides strong semantic matching but can miss exact keyword matches
3. **Hybrid approaches** that combine both methods tend to perform best

## References

- Dai, Z. & Callan, J. (2019). Deeper Text Understanding for IR with Contextual Neural Language Model
- Dai, Z. & Callan, J. (2020). Context-Aware Document Term Weighting for Ad-Hoc Search
- Deshmukh, A. & Sethi, U. (2020). IR-BERT: Leveraging BERT for Semantic Search
- Reimers, N. & Gurevych, I. (2019). Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks

## Conclusion

The DeepCT-IRBERT hybrid pipeline demonstrates that combining traditional IR techniques with modern deep learning can yield powerful results. The key insight is that **different retrieval methods capture different aspects of relevance**, and thoughtfully combining them can outperform any single approach.

This research was conducted as part of my Master's degree in Computer Science at the University of Indonesia, focusing on Generative AI and Information Retrieval.

---

*Would you like to explore the implementation? Check out the [GitHub repository](https://github.com/faishalzk/DeepCT-IRBERT) for the full code.*
`
  }
];
