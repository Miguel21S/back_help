
DB_HOST=${DB_HOST:-database}
DB_PORT=${DB_PORT:-3306}

echo "Esperando a que la base de datos MySQL esté lista en $DB_HOST:$DB_PORT..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Base de datos disponible, iniciando aplicación Node..."

exec "$@"