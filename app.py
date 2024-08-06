from flask import Flask, jsonify, render_template, send_from_directory,request,redirect, url_for
import os
import database as db
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

# Definimos la ruta absoluta del proyecto
project_dir = os.path.abspath(os.path.dirname(__file__))

# Crear la aplicación Flask con la carpeta de plantillas configurada a la raíz del proyecto
app = Flask(__name__, template_folder=project_dir)
app.secret_key = 'test'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    user = db.get_user(user_id)
    if user:
        return User(user_id)
    return None
@app.route('/login')
def loginnew():
    return render_template('/views/login.html')

@app.route('/')
@login_required
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    nombre = request.form['nombre']
    password = request.form['password']
    user = db.get_user(nombre)
    if user and user['password'] == password:
        user_obj = User(nombre)
        login_user(user_obj)
        return redirect(url_for('home'))
    return redirect(url_for('home'))
# Ruta para servir archivos CSS
@app.route('/css/<path:filename>')
def send_css(filename):
    return send_from_directory(os.path.join(project_dir, 'css'), filename)

# Ruta para servir archivos JavaScript
@app.route('/js/<path:filename>')
def send_js(filename):
    return send_from_directory(os.path.join(project_dir, 'js'), filename)

# Ruta para servir archivos en la carpeta src (por ejemplo, imágenes y íconos)
@app.route('/src/<path:filename>')
def send_src(filename):
    return send_from_directory(os.path.join(project_dir, 'src'), filename)

# Ruta para servir archivos HTML adicionales desde la carpeta views
@app.route('/views/<path:filename>')
def send_views(filename):
    return send_from_directory(os.path.join(project_dir, 'views'), filename)
#ruta para guardar productos
@app.route('/productos', methods=['POST'])
@login_required
def addproductos():
    
    nombre= request.form['nombre']
    cantidad= request.form['cantidad']
    precio= request.form['precio']
    proveedor= request.form['proveedor']
    categoria= request.form['categoria']
    imagen= request.form['imagen']
    if nombre and cantidad and precio and proveedor and categoria and imagen:
        cursor= db.database.cursor()
        sql= "INSERT INTO productos (nombre,cantidad,precio,proveedor,categoria,imagen) VALUES (%s, %s, %s,%s, %s, %s)"
        data=(nombre,cantidad,precio,proveedor,categoria,imagen)
        cursor.execute(sql,data)
        db.database.commit()
    return redirect(url_for('home'))
#ruta post para proveedores
@app.route('/proveedor', methods=['POST'])
@login_required
def addproveedor():
   
    nombre= request.form['nombre']
    telefono= request.form['telefono']
    mail= request.form['mail']
    if nombre and telefono and mail:
        cursor= db.database.cursor()
        sql="INSERT INTO proveedores (nombre,telefono,mail) VALUES (%s, %s, %s)"
        data=(nombre,telefono,mail)
        cursor.execute(sql,data)
        db.database.commit()
    return redirect(url_for('home'))
#ruta post para categorias
@app.route('/categoria', methods=['POST'])
@login_required
def addcategoria():
    nombre=request.form['nombre']
    proveedor= request.form['proveedor']
    if nombre and proveedor:
        cursor= db.database.cursor()
        sql="INSERT INTO categoria (nombre,proveedor)VALUES (%s, %s)"
        data=(nombre,proveedor)
        cursor.execute(sql,data)
        db.database.commit()
    return redirect(url_for('home'))
#ruta para contacto
@app.route('/contacto', methods=['POST'])
@login_required
def addconsulta():
    nombre= request.form['nombre']
    consulta= request.form['consulta']
    mail = request.form['mail']
    if nombre and consulta and mail:
        cursor= db.database.cursor()
        sql="INSERT INTO contacto (nombre,consulta,mail) VALUES (%s, %s, %s)"
        data=(nombre,consulta,mail)
        cursor.execute(sql,data)
        db.database.commit()
    return redirect(url_for('home'))

#ruta para ver provedores
@app.route('/views/proveedores', methods=['GET'])
@login_required
def getproveedores():
    cursor=db.database.cursor()
    cursor.execute("SELECT * FROM proveedores")
    resultado=cursor.fetchall()
    
    insertarObjetos= []
    nombreColumnas=[columna[0]for columna in cursor.description]

    for unregistro in resultado:
        insertarObjetos.append(dict(zip(nombreColumnas,unregistro)))
    cursor.close()
    return insertarObjetos
#ruta para eliminar provedores
@app.route('/eliminarproveedor/<string:id>', methods=['DELETE'])
@login_required
def eliminarproveedor(id):
    print(f"${id}")
    try:
        cursor = db.database.cursor()
        sql = "DELETE FROM proveedores WHERE id = %s"
        data = (int(id),)
        cursor.execute(sql, data)
        db.database.commit()
        # Comprobar si se eliminó alguna fila
        if cursor.rowcount > 0:
            return jsonify({"message": "categoria eliminado exitosamente", "redirect": url_for('home')}), 200
        else:
            return jsonify({"message": "categoria no encontrado"}), 404

    except Exception as e:
        return jsonify({"message": "Error al eliminar el categoria", "error": str(e)}), 500
    finally:
        cursor.close()

#ruta para actualizar provedores

#ruta para ver categorias
@app.route('/views/categoria', methods=['GET'])
@login_required
def getcategorias():
    cursor=db.database.cursor()
    cursor.execute("SELECT * FROM categoria")
    resultado=cursor.fetchall()
    
    insertarObjetos= []
    nombreColumnas=[columna[0]for columna in cursor.description]

    for unregistro in resultado:
        insertarObjetos.append(dict(zip(nombreColumnas,unregistro)))
    cursor.close()
    return insertarObjetos
#ruta para eliminar categoria
@app.route('/eliminarcategoria/<string:id>', methods=['DELETE'])
@login_required
def eliminarcategoria(id):
    print(f"${id}")
    try:
        cursor = db.database.cursor()
        sql = "DELETE FROM categoria WHERE id = %s"
        data = (int(id),)
        cursor.execute(sql, data)
        db.database.commit()
        # Comprobar si se eliminó alguna fila
        if cursor.rowcount > 0:
            return jsonify({"message": "categoria eliminado exitosamente", "redirect": url_for('home')}), 200
        else:
            return jsonify({"message": "categoria no encontrado"}), 404

    except Exception as e:
        return jsonify({"message": "Error al eliminar el categoria", "error": str(e)}), 500
    finally:
        cursor.close()
#ruta para actualizar categorias



#ruta para ver productos
@app.route('/views/productos', methods=['GET'])
@login_required
def getallproductos():
    cursor=db.database.cursor()
    cursor.execute("SELECT * FROM productos")
    resultado=cursor.fetchall()
    
    insertarObjetos= []
    nombreColumnas=[columna[0]for columna in cursor.description]

    for unregistro in resultado:
        insertarObjetos.append(dict(zip(nombreColumnas,unregistro)))
    cursor.close()
    return insertarObjetos
# Eliminar productos
@app.route('/eliminar/<string:id>', methods=['DELETE'])
@login_required
def eliminar(id):
    try:
        cursor = db.database.cursor()
        sql = "DELETE FROM productos WHERE id = %s"
        data = (int(id),)
        cursor.execute(sql, data)
        db.database.commit()
        # Comprobar si se eliminó alguna fila
        if cursor.rowcount > 0:
            return jsonify({"message": "Producto eliminado exitosamente", "redirect": url_for('home')}), 200
        else:
            return jsonify({"message": "Producto no encontrado"}), 404

    except Exception as e:
        return jsonify({"message": "Error al eliminar el producto", "error": str(e)}), 500
    finally:
        cursor.close()
@app.route('/db_status', methods=['GET'])
@login_required
def get_db_status():
    cursor = db.database.cursor()
    cursor.execute("SHOW STATUS LIKE 'Threads_connected'")
    threads_connected = cursor.fetchone()
    cursor.execute("SHOW STATUS LIKE 'Threads_running'")
    threads_running = cursor.fetchone()
    cursor.execute("SHOW STATUS LIKE 'Connections'")
    total_connections = cursor.fetchone()
    cursor.close()
    status = {
        "threads_connected": threads_connected[1],
        "threads_running": threads_running[1],
        "total_connections": total_connections[1]
    }
    return jsonify(status)
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')
# Ejecución directa de este archivo en modo de desarrollador en el puerto 4000 del localhost o servidor local creado por Flask.
if __name__ == '__main__':
    app.run(debug=True, port=4000)