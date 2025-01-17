"""empty message

Revision ID: bab9e0076896
Revises: da9a3f1195f4
Create Date: 2024-11-19 17:45:29.122731

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bab9e0076896'
down_revision = 'da9a3f1195f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('administradores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('apellido', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('rut', sa.String(length=120), nullable=False),
    sa.Column('numero_telefono', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('rut')
    )
    op.create_table('monitor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('evento',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=80), nullable=False),
    sa.Column('fecha', sa.String(length=80), nullable=False),
    sa.Column('hora', sa.String(length=80), nullable=False),
    sa.Column('lugar', sa.String(length=120), nullable=False),
    sa.Column('id_monitor', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.String(length=1000), nullable=False),
    sa.Column('realizado', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['id_monitor'], ['monitor.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('evento')
    op.drop_table('monitor')
    op.drop_table('administradores')
    # ### end Alembic commands ###
