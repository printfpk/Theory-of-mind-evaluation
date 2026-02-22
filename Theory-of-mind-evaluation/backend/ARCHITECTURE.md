# Backend Architecture & Technical Guide

## 🏗 1️⃣ Backend Architecture Overview

The backend follows **Layered Architecture + Clean Modular Design**.

```
Client (React)
        ↓
Routes Layer
        ↓
Controller Layer
        ↓
Service Layer
        ↓
Cache Layer (Redis)
        ↓
External LLM APIs
        ↓
Database Layer (MongoDB)
```

Each layer has a clear responsibility.

---

## 📂 2️⃣ Backend Folder Structure

```
backend/
│
├── controllers/
│      evaluationController.js
│
├── services/
│      openaiService.js
│      modelRouter.js
│      redisService.js
│
├── models/
│      Scenario.js
│      Evaluation.js
│
├── utils/
│      consistencyEngine.js
│
├── routes/
│      evaluationRoutes.js
│
├── config/
│      db.js
│      redis.js
│
├── app.js
├── server.js
└── .env
```

---

## 🔄 3️⃣ Complete Request Lifecycle

**Scenario**: User clicks "Run Evaluation".

### 🔹 STEP 1: Request Hits Route
Frontend sends `POST /api/evaluations` to `evaluationRoutes.js`.

### 🔹 STEP 2: Controller Starts Evaluation
`evaluationController.js` extracts `scenarioId` and `modelName`, then fetches the Scenario from MongoDB.

### 🔹 STEP 3: Prompt Construction
Controller dynamically builds:
- `Belief Prompt`
- `Action Prompt`

### 🔹 STEP 4: Model Router (Strategy Pattern)
Controller calls `callModel(modelName, prompt)`.
The **Model Router** identifies the model type (e.g., GPT vs Claude) and routes to the appropriate service.

---

## ⚡ 4️⃣ Redis Caching Layer (Critical Optimization)

Before calling the API:
1.  **Generate Cache Key**: `${modelName}:${prompt}`
2.  **Check Redis**: 
    -   If exists: Return cached response (0 latency, 0 cost).
    -   If missing: Call LLM API -> Store response in Redis (1 hr expiry).

---

## 🤖 5️⃣ LLM Service Layer

`openaiService.js`:
-   Sends structured prompts with headers.
-   Parses API responses.
-   **Pure Functionality**: No business logic or DB operations here.

---

## 🧮 6️⃣ Consistency Engine (Core Research Component)

Receives `beliefResponse` and `actionResponse`.
1.  **Normalize**: Convert to lowercase.
2.  **Semantics**: Check keywords (e.g., "oat" vs "almond").
3.  **Score**: Returns 1 (Consistent) or 0 (Inconsistent).

*Future State: Use Vector Similarity or LLM-as-a-Judge.*

---

## 🗄 7️⃣ Database Design

### Scenario Collection
```json
{
  "title": "String",
  "story": "String",
  "complexity": "String",
  "createdAt": "Date"
}
```

### Evaluation Collection
```json
{
  "scenarioId": "ObjectId",
  "modelName": "String",
  "beliefResponse": "String",
  "actionResponse": "String",
  "consistencyScore": "Number",
  "createdAt": "Date"
}
```

---

## 🚀 8️⃣ Scalability & System Design

-   **Horizontal Scaling**: Stateless API allows multiple Node instances.
-   **Redis Caching**: Reduces load on LLM APIs and improves response time.
-   **Async/Await**: Non-blocking I/O for high throughput.
-   **Design Patterns**: MVC, Strategy (Router), Singleton (DB Connections).

---

. The system is stateless, scalable, and designed using clean architecture principles."
