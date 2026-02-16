import os
from flask import Flask, render_template, abort, redirect, url_for
import pdfplumber

app = Flask(__name__)

# Directorio donde buscar carpetas con PDFs (el directorio actual)
PDF_SOURCE_DIR = os.path.abspath('.')
PROCESSED_DIR = 'processed_pdfs'

# Al iniciar, mostramos información de depuración
print(f"🔍 Buscando carpetas en: {PDF_SOURCE_DIR}")
print("📁 Contenido del directorio:")
for item in os.listdir(PDF_SOURCE_DIR):
    item_path = os.path.join(PDF_SOURCE_DIR, item)
    if os.path.isdir(item_path):
        print(f"   📂 {item}")
    else:
        print(f"   📄 {item}")


def process_specific_folder(folder_name):
    """Procesa todos los PDFs dentro de la carpeta folder_name (incluye subcarpetas)"""
    if not os.path.exists(PROCESSED_DIR):
        os.makedirs(PROCESSED_DIR)

    source_folder = os.path.join(PDF_SOURCE_DIR, folder_name)
    if not os.path.isdir(source_folder):
        print(f"❌ La carpeta {folder_name} no existe.")
        return

    for root, dirs, files in os.walk(source_folder):
        for file in files:
            if file.lower().endswith('.pdf'):
                pdf_path = os.path.join(root, file)
                # Ruta relativa desde PDF_SOURCE_DIR para mantener estructura
                rel_path = os.path.relpath(pdf_path, PDF_SOURCE_DIR)
                
                out_dir = os.path.join(PROCESSED_DIR, os.path.dirname(rel_path))
                os.makedirs(out_dir, exist_ok=True)

                out_txt = os.path.join(out_dir, f"{os.path.splitext(file)[0]}.txt")

                if os.path.exists(out_txt):
                    continue

                try:
                    with pdfplumber.open(pdf_path) as pdf:
                        meta = pdf.metadata
                        author = meta.get('Author', 'Autor Desconocido')
                        title = meta.get('Title', 'Sin Título')

                        contenido = f"--- METADATOS ---\nAutor Original: {author}\nTítulo: {title}\n-----------------\n\n"

                        paginas = []
                        for page in pdf.pages:
                            texto = page.extract_text()
                            if texto:
                                paginas.append(texto)

                        contenido += "\n".join(paginas)
                        # Reemplazar el nombre del autor por 'Jemarin'
                        contenido = contenido.replace(author, 'Jemarin')

                        with open(out_txt, 'w', encoding='utf-8') as f:
                            f.write(contenido)
                        print(f"✓ Procesado: {pdf_path}")
                except Exception as e:
                    print(f"✗ Error con {pdf_path}: {e}")


def get_available_folders():
    """Devuelve TODAS las carpetas del directorio actual, excepto 'processed_pdfs'"""
    carpetas = []
    for item in os.listdir(PDF_SOURCE_DIR):
        ruta = os.path.join(PDF_SOURCE_DIR, item)
        if os.path.isdir(ruta) and item != PROCESSED_DIR:
            carpetas.append(item)
    return sorted(carpetas)


@app.route('/')
def index():
    """Redirige a la selección de carpetas fuente"""
    return redirect(url_for('select_folder'))


@app.route('/select-folder')
def select_folder():
    """Muestra TODAS las carpetas disponibles para procesar"""
    carpetas = get_available_folders()
    # Pasamos la ruta actual al template para mostrarla
    return render_template('index.html', 
                           folders=carpetas, 
                           source=True,
                           current_dir=PDF_SOURCE_DIR)


@app.route('/process-folder/<folder_name>')
def process_folder(folder_name):
    """Procesa una carpeta y luego muestra su contenido ya procesado"""
    print(f"\n📂 Procesando: {folder_name}")
    process_specific_folder(folder_name)
    return redirect(url_for('view_content', path=folder_name))


@app.route('/view/<path:path>')
def view_content(path):
    """Muestra el contenido de un directorio o archivo dentro de processed_pdfs"""
    full_path = os.path.join(PROCESSED_DIR, path)

    if not os.path.exists(full_path):
        abort(404)

    if os.path.isdir(full_path):
        items = os.listdir(full_path)
        subcarpetas = [i for i in items if os.path.isdir(os.path.join(full_path, i))]
        archivos = [i for i in items if os.path.isfile(os.path.join(full_path, i)) and i.endswith('.txt')]
        return render_template('folder_view.html', current_path=path, folders=subcarpetas, files=archivos)
    elif os.path.isfile(full_path) and full_path.endswith('.txt'):
        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                contenido = f.read()
            return render_template('file_view.html', content=contenido.replace('\n', '<br>'), path=path)
        except Exception as e:
            abort(500, description=str(e))
    else:
        abort(404)


if __name__ == '__main__':
    app.run(debug=True)