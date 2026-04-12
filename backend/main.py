from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from typing import Any

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: str | None = None
    position: dict[str, Any] | None = None
    data: dict[str, Any] | None = None

    class Config:
        extra = "allow"


class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None
    id: str | None = None

    class Config:
        extra = "allow"


class Pipeline(BaseModel):
    nodes: list[Node]
    edges: list[Edge]

    @field_validator("nodes")
    @classmethod
    def nodes_must_have_unique_ids(cls, v: list[Node]) -> list[Node]:
        ids = [node.id for node in v]
        duplicates = [nid for nid in ids if ids.count(nid) > 1]
        if duplicates:
            raise ValueError(
                f"Duplicate node IDs found: {sorted(set(duplicates))}"
            )
        return v


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    node_ids = {node.id for node in nodes}

    # Validate that all edge endpoints reference existing nodes
    invalid_edges = []
    for edge in edges:
        missing = []
        if edge.source not in node_ids:
            missing.append(f"source '{edge.source}'")
        if edge.target not in node_ids:
            missing.append(f"target '{edge.target}'")
        if missing:
            invalid_edges.append(
                f"Edge ('{edge.source}' -> '{edge.target}'): "
                f"unknown {', '.join(missing)}"
            )

    if invalid_edges:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Edges reference non-existent nodes",
                "invalid_edges": invalid_edges,
            },
        )

    # Build adjacency list and check for cycles (DAG validation)
    graph: dict[str, list[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited: set[str] = set()
    stack: set[str] = set()

    def dfs(node: str) -> bool:
        if node in stack:
            return False
        if node in visited:
            return True

        stack.add(node)
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        stack.remove(node)
        visited.add(node)
        return True

    is_dag = True
    for node_id in graph:
        if not dfs(node_id):
            is_dag = False
            break

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
