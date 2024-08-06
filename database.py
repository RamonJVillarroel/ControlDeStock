import mysql.connector

database = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='controldestock'
)

# Función para obtener un usuario por nombre de usuario
def get_user(nombre):
    cursor = database.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE nombre = %s", (nombre,))
    user = cursor.fetchone()
    cursor.close()
    return user

# Cierra la conexión a la base de datos
def close_connection():
    if database.is_connected():
        print("se perdio la conexion con la db")
        database.close()