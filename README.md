# bd.edu.co-react

**Plataforma MÓDULO BD - Interfaz Web**  
Framework: **React 18.20.2**

---

## 1. Estado del Proyecto
El proyecto está en desarrollo siguiendo el modelo aprobado. Los avances hasta la fecha incluyen:  

- **Modelo aprobado:** La plataforma se debe implementar en Oracle utilizando **Power Designer**.
- **Módulos desarrollados:**  
  - **Gestión de Usuarios:** CRUD (Crear, Leer, Actualizar y Eliminar) para las siguientes tablas paramétricas:
    - País  
    - Estado  
    - Usuario  
    - Categoría  
    - TipoCarpeta  
    - TipoArchivo  
    - TipoAcción  
    - TipoCopia  
    - Destinatario  
- **Pruebas:** Se deben incluir registros para validar el funcionamiento de los módulos.  
- **Pendiente:** Desarrollo del módulo **GestiónCorreo**.

---

## 2. Labores Funcionales a Desarrollar
### Desarrollo del Módulo **GestiónCorreo**  
#### 2.1. Inicio de Sesión
- Registro de usuario mediante **login** de acuerdo a un usuario existente.

#### 2.2. Interfaz Principal
Debe incluir los siguientes elementos:
- **Parte superior derecha:** Usuario registrado, fecha y hora actual.
- **Parte superior izquierda:** 
  - Nombre de la plataforma **BD.edu.co**.  
  - Botón **NuevoCorreo** para redactar un nuevo mensaje.
- **Barra lateral izquierda:** Lista de carpetas.  

#### 2.3. Visualización de Carpetas
- **Recibidos:** Correos recibidos por el usuario registrado (solo destinatarios CO).
- **Enviados:** Correos enviados por el usuario registrado con columnas separadas para destinatarios CO y CCO.

---

## 3. Funcionalidad del Botón **NuevoCorreo**
Al hacer clic en **NuevoCorreo**, se muestra la interfaz `MensajeNuevo` con las siguientes funcionalidades:  

### 3.1. Destinatario
- Búsqueda de destinatarios en las tablas **Contacto** o **Usuario**.  
- Si el contacto no existe, se puede agregar manualmente (correo opcional).  
- Posibilidad de incluir varios destinatarios.  

### 3.2. Adjuntos
- Se permite agregar varios archivos.  
- El tipo de archivo se determina según su extensión.  

### 3.3. Opciones de Envío
- Al hacer clic en **Enviar**, se guarda la información en las tablas correspondientes:  

#### 3.3.1. Mensajes Enviados
- Si el contacto existe en **Usuario** pero no en **Contacto**, se añade el contacto con los datos del usuario.  
- Si el contacto no existe en **Usuario**, se añade en **Contacto** (solo el correo es requerido).  
- Se registra el mensaje con los destinatarios, tipos de copia y adjuntos.  
- Fecha, hora y remitente se toman del sistema.  
- Categoría por defecto: **Principal**.  
- El mensaje aparece en la lista de correos enviados.  

#### 3.3.2. Mensajes Recibidos
- Se filtran los mensajes de la tabla **Destinatario** asociados al usuario registrado.  

#### 3.3.3. Mensajes Reenviados o Respondidos
- Si el usuario selecciona un correo de la carpeta **Recibidos**, se abre la interfaz `MensajeNuevo` con las opciones:  
  - **Reenviar:** Posibilidad de editar destinatarios y contenido.  
  - **Responder:** Opcionalmente modificar las casillas prellenadas.  

---
