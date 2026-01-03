### Model Orchestration Rules

- **Strategic Planner (Claude 4.5):** Use for initial mission planning, complex logic design, architectural reviews, and interpreting user intent. Limit this to the "Think" phase of any workflow.

- **Primary Executor (Gemini 3 Pro):** Default to this for all file generation, code refactoring, terminal commands, and API interactions.

- **Fast Debugger (Gemini 3 Flash):** Use for repetitive error checking, log analysis, and unit test execution.

- **Fallback Policy:** If Claude limits are reached or latency is high, automatically route the "Planner" role to Gemini 3 Pro.
