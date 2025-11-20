
echo "Esperando a que la base de datos MySQL esté lista en $DB_HOST:$DB_PORT..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Base de datos disponible, iniciando aplicación Node..."
exec "$@"
