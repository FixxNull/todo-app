from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class TodoCreate(BaseModel):
    title: str = Field(..., title="Title", max_length=55, min_length=1)
    description: str = Field(..., title="Description", max_length=755, min_length=1)
    status: Optional[bool] = False

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, title="Title", max_length=55, min_length=1)
    description: Optional[str] = Field(None, title="Description", max_length=755, min_length=1)
    status: Optional[bool] = None

class TodoOut(BaseModel):
    todo_id: UUID
    title: str
    description: str
    status: bool
    created_at: datetime
    updated_at: datetime