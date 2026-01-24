from typing import List
from fastapi import APIRouter, Depends

from app.schemas.todo_schema import TodoOut, TodoCreate, TodoUpdate
from app.models.todo_model import Todo
from app.api.deps.user_deps import get_current_user
from app.models.user_model import User
from app.services.todo_service import TodoService
from uuid import UUID



todo_router = APIRouter()

@todo_router.get("/", summary="Get all todos of the user", response_model=list[TodoOut])
async def list(current_user: User = Depends(get_current_user)) -> list[TodoOut]:
    return await TodoService.list_todos(user=current_user)


@todo_router.post("/create", summary="Create a new todo", response_model=Todo)
async def create_todo(data: TodoCreate, current_user: User = Depends(get_current_user)) -> Todo:
    return await TodoService.create_todo(current_user, data)


@todo_router.get("/{todo_id}", summary="Get a todo by ID", response_model=TodoOut)
async def retrieve(todo_id: UUID, current_user: User = Depends(get_current_user)) -> TodoOut:
    return await TodoService.retrieve_todo(current_user, todo_id)


@todo_router.put("/{todo_id}", summary="Update a todo by ID", response_model=TodoOut)
async def update(todo_id: UUID, data: TodoUpdate, current_user: User = Depends(get_current_user)) -> TodoOut:
    return await TodoService.update_todo(current_user, todo_id, data)


@todo_router.delete("/{todo_id}", summary="Delete a todo by ID")
async def delete(todo_id: UUID, current_user: User = Depends(get_current_user)) -> None:
    return await TodoService.delete_todo(current_user, todo_id)
