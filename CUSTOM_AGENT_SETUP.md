# IShopY Custom Agent Setup

This repository now includes a dedicated custom agent for maintenance work:
- .github/agents/ishopy-maintainer.agent.md

## What this agent is optimized for
- Fixing issues across backend, frontend, and admin apps
- Syncing API contract changes between UI and server
- Debugging auth, cart, order, payment, chat, and newsletter flows
- Implementing safe updates with focused validation

## How to use in VS Code
1. Open Copilot Chat in this workspace.
2. Open the agent picker.
3. Select IShopY Maintainer.
4. Give a specific task such as:
- Fix checkout verification redirect bug
- Add validation for OTP expiry and incorrect OTP
- Refactor admin orders page to use REACT_APP_BACKEND_URL consistently
- Investigate why chat unread count is incorrect

## Recommended task prompt format
Use this pattern for best results:

```text
Context: <what screen/endpoint is failing>
Expected: <desired behavior>
Observed: <actual behavior>
Repro: <steps>
Constraints: <no breaking API changes / preserve UI / etc>
Validate: <what tests or manual checks to run>
```

## Notes specific to IShopY
- Backend uses JWT token from request headers key: token.
- Storefront state and API wiring are in frontend/src/context/ShopContext.jsx.
- Common integration work spans:
  - backend/routes + backend/controllers + backend/models
  - frontend/admin axios callers and route screens
- Stripe and COD are implemented; Razorpay path is currently scaffolded but incomplete.

## If you want stricter behavior
You can tighten the agent by editing .github/agents/ishopy-maintainer.agent.md:
- Reduce tools to disallow terminal execution
- Add explicit constraints for test-first or lint-first workflows
- Split into multiple agents (api-only, frontend-only, admin-only)
