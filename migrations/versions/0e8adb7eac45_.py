"""empty message

Revision ID: 0e8adb7eac45
Revises: 
Create Date: 2023-03-12 09:09:31.107780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0e8adb7eac45'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('evento',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fecha', sa.String(length=80), nullable=False),
    sa.Column('id_tipo', sa.Integer(), nullable=False),
    sa.Column('lugar', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('participantes_de__eventos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_evento', sa.Integer(), nullable=True),
    sa.Column('id_participante', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tipo_de__evento',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('descripcion', sa.Integer(), nullable=False),
    sa.Column('dificultad', sa.String(length=120), nullable=False),
    sa.Column('categoria', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('tipo_de__evento')
    op.drop_table('participantes_de__eventos')
    op.drop_table('evento')
    # ### end Alembic commands ###