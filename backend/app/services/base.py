from typing import (
    Any,
    List,
    Sequence,
    Type,
)

from sqlalchemy import (
    func,
    select,
)
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import Executable

from ..models.base import SQLModel


class SessionMixin:
    def __init__(self, session: Session) -> None:
        self.session = session


class BaseService(SessionMixin):
    """Base class for application services."""


class BaseDataManager(SessionMixin):
    """Base data manager class responsible for operations over database."""

    def add_one(self, model: Any) -> None:
        self.session.add(model)

    def add_all(self, models: Sequence[Any]) -> None:
        self.session.add_all(models)

    def get_one(self, select_stmt: Executable) -> Any:
        return self.session.scalar(select_stmt)

    def get_all(self, select_stmt: Executable) -> List[Any]:
        return list(self.session.scalars(select_stmt).all())

    def get_from_tvf(self, model: Type[SQLModel], *args: Any) -> List[Any]:
        return self.get_all(self.select_from_tvf(model, *args))

    @staticmethod
    def select_from_tvf(model: Type[SQLModel], *args: Any) -> Executable:
        fn = getattr(getattr(func, model.schema()), model.table_name())
        stmt = select(fn(*args).table_valued(*model.fields()))
        return select(model).from_statement(stmt)