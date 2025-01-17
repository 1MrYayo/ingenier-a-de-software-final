"""empty message

Revision ID: 9235ba31d3ba
Revises: bab9e0076896
Create Date: 2024-11-26 05:37:55.622887

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9235ba31d3ba'
down_revision = 'bab9e0076896'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programacion', schema=None) as batch_op:
        batch_op.alter_column('fecha',
               existing_type=sa.DATE(),
               type_=sa.String(length=20),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programacion', schema=None) as batch_op:
        batch_op.alter_column('fecha',
               existing_type=sa.String(length=20),
               type_=sa.DATE(),
               existing_nullable=False)

    # ### end Alembic commands ###
