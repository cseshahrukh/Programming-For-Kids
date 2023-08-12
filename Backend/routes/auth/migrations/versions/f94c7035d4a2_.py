"""empty message

Revision ID: f94c7035d4a2
Revises: 210b46943b75
Create Date: 2023-08-06 18:25:07.823112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f94c7035d4a2'
down_revision = '210b46943b75'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=200),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    # ### end Alembic commands ###