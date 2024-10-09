"""empty message

Revision ID: 9ee1a0c0123c
Revises: 904254b4ffc9
Create Date: 2024-10-09 00:23:04.088675

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ee1a0c0123c'
down_revision = '904254b4ffc9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evento', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nombre', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('descripcion', sa.Integer(), nullable=False))
        batch_op.drop_column('cantidad_maxima_participantes')
        batch_op.drop_column('precio')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evento', schema=None) as batch_op:
        batch_op.add_column(sa.Column('precio', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('cantidad_maxima_participantes', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_column('descripcion')
        batch_op.drop_column('nombre')

    # ### end Alembic commands ###
