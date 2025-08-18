"""remove id from datas table

Revision ID: 4dfa77f46a70
Revises: 64afbecc757c
Create Date: 2025-08-18 12:15:14.563626

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4dfa77f46a70'
down_revision: Union[str, Sequence[str], None] = '64afbecc757c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
