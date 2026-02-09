# MANUAL TÉCNICO

# Tabla de contenidos

* [1. Casos de Uso](#casos-de-uso)
    * [1.1 Jerarquia de actores](#jerarquia-de-actores)
    * [1.2 Diagrama de Caso de Uso de Alto Nivel](#diagrama-de-caso-de-uso-de-alto-nivel)
    * [1.3 Diagrama de Caso de Uso de Primera Derivación](#diagrama-de-caso-de-uso-de-primera-derivacion)
    * [1.4 Diagrama de Caso de Uso de Segunda Derivación](#diagrama-de-caso-de-uso-de-segunda-derivacion)
    * [1.5 Diagrama de Caso de Uso Extendido](#diagrama-de-caso-de-uso-extendido)



---

# Casos de Uso

## Jerarquia de actores

![Jerarquia de Actores](./assets/jerarquia_actores.png)

## Diagrama de Caso de Uso de Alto Nivel

![Diagrama de Caso de Uso de Alto Nivel](./assets/diagrama_alto_nivel.png)

## Diagrama de Caso de Uso de Primera Derivación

![Diagrama de Caso de Uso de Primera Derivación](./assets/diagrama_primera_derivacion.png)

## Diagrama de Caso de Uso de Segunda Derivación

![Diagrama de Caso de Uso de Segunda Derivación](./assets/diagrama_segunda_derivacion_1.png)

![Diagrama de Caso de Uso de Segunda Derivación](./assets/diagrama_segunda_derivacion_2.png)

## Diagrama de Caso de Uso Extendido
![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_1.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_2.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_3.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_4.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_5.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_6.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_7.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_8.png)

![Diagrama de Caso de Uso Extendido](./assets/diagrama_extendido_9.png)

---

## Descripción de Casos de Uso

### CU-01.01.01 - Registrar Cliente

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El cliente registra sus datos personales en el sistema para crear una cuenta. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Cliente no está registrado con el correo electrónico. |
| **Post-condiciones** | 1. Cliente registrado en el sistema. <br> 2. Datos analíticos del Dashboard reflejan la información actualizada. |
| **Rendimiento** | El sistema debe responder en un máximo de 3 segundos con mensaje de éxito. |
| **Frecuencia** | Media de 100 veces a la semana. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Crear Nueva Cuenta". | Redirigir a formulario para registro. |
| 2 | Ingresa Nombre completo, Correo electrónico, Contraseña. | Valida formato de campos. |
| 2.1 | Si el cliente decide adjuntar fotografía deberá seleccionar "Subir Fotografía" y elegir archivo de imagen. | Si el actor decide adjuntar fotografía, el sistema deberá abrir el explorador de archivos y cargar una previsualización del archivo cargado. |
| 3 | Selecciona "Registrar". | Registro de cliente en sistema y confirma éxito. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ingresa campos obligatorios. | Mensaje de error. |
| 2 | Ya existe un cliente registrado con el correo electrónico ingresado. | Mensaje de error "Correo electrónico ya registrado". |

---

### CU-01.01.02 - Actualizar datos

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El cliente modifica su información personal para mantenerla actualizada. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Cliente está previamente registrado (CU-01.01.01). <br> 2. Cliente ha iniciado sesión (CU-03.01.02). |
| **Post-condiciones** | Datos del cliente actualizados en el sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos con mensaje de éxito. |
| **Frecuencia** | Media de 1 vez al mes por cliente. |
| **Importancia** | Importante. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Editar mis datos". | Redirigir a formulario con datos actuales con opción de edición. |
| 2 | Ingresa Nombre completo y/o Contraseña. | Valida formato de campos. |
| 2.1 | Si el cliente decide adjuntar fotografía deberá seleccionar "Subir Fotografía" y elegir archivo de imagen. | Si el actor decide adjuntar fotografía, el sistema deberá abrir el explorador de archivos y cargar una previsualización del archivo cargado. |
| 3 | Selecciona "Guardar cambios". | Sistema muestra mensaje de confirmación. |
| 4 | Visualiza mensaje de confirmación con la opción de "Aceptar" o "Rechazar" cambios. | Sistema espera confirmación. |
| 4.1 | Cliente selecciona aceptar los cambios. | Datos del cliente son actualizados en el sistema, muestra mensaje de éxito. |
| 4.2 | Cliente selecciona rechazar los cambios. | Cambios son descartados. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ingresa campos obligatorios. | Sistema muestra error. |

---

### CU-01.01.03 - Eliminar Cuenta

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El cliente elimina su cuenta del sistema. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Cliente está previamente registrado (CU-01.01.01). <br> 2. Cliente ha iniciado sesión (CU-03.01.02). |
| **Post-condiciones** | Cuenta de cliente eliminada del sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 3 segundos con mensaje de éxito. |
| **Frecuencia** | Media de 1 vez al mes. |
| **Importancia** | Importante. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Eliminar mi cuenta". | Sistema muestra mensaje de confirmación. |
| 2 | Visualiza mensaje de confirmación con la opción de "Aceptar" o "Rechazar". | Sistema espera confirmación. |
| 2.1 | Cliente selecciona aceptar. | Datos del cliente son eliminados del sistema, muestra mensaje de éxito. |
| 2.2 | Cliente selecciona rechazar. | Eliminación descartada. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| - | - | - |

---

### CU-02.01.01 - Registrar Agente

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El Administrador registra datos de Agente Inmobiliario en el sistema. |
| **Actores** | Administrador. |
| **Pre-condiciones** | 1. Agente no está registrado previamente. <br> 2. Administrador ha iniciado sesión (CU-03.01.02). |
| **Post-condiciones** | Agente registrado en el sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 3 segundos con mensaje de éxito. |
| **Frecuencia** | Media de 10 veces al mes. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Registrar Agente". | Redirigir a formulario para registro. |
| 2 | Ingresa Nombre completo, Correo electrónico, Contraseña. | Valida formato de campos. |
| 3 | Selecciona "Registrar". | Registro de Agente en sistema y confirma éxito. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ingresa campos obligatorios. | Mensaje de error. |
| 2 | Ya existe un agente registrado con el correo electrónico ingresado. | Mensaje de error "Correo electrónico ya registrado". |

---

### CU-02.01.02 - Actualizar datos Agente

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El administrador modifica la información del Agente Inmobiliario para mantenerla actualizada. |
| **Actores** | Administrador. |
| **Pre-condiciones** | 1. Agente Inmobiliario está previamente registrado (CU-02.01.01). <br> 2. Administrador ha iniciado sesión (CU-03.01.02). |
| **Post-condiciones** | Datos del Agente Inmobiliario actualizados en el sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos con mensaje de éxito. |
| **Frecuencia** | Media de 5 veces al mes por administrador. |
| **Importancia** | Importante. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Buscar agente entre listado de Agentes Inmobiliario registrados (CU-02.01.03). | Redirigir a listado de Agentes Inmobiliarios registrados. |
| 2 | Ingresa Nombre completo y/o Contraseña. | Valida formato de campos. |
| 3 | Selecciona "Guardar cambios". | Sistema muestra mensaje de confirmación. |
| 4 | Visualiza mensaje de confirmación con la opción de "Aceptar" o "Rechazar" cambios. | Sistema espera confirmación. |
| 4.1 | Administrador selecciona aceptar los cambios. | Datos del agente son actualizados en el sistema, muestra mensaje de éxito. |
| 4.2 | Administrador selecciona rechazar los cambios. | Cambios son descartados. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ingresa campos obligatorios. | Mensaje de error "Campos faltantes". |

---

### CU-02.01.03 - Ver Agentes

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Administrador visualiza listado de Agentes Inmobiliario registrado en el sistema. |
| **Actores** | Administrador. |
| **Pre-condiciones** | 1. Al menos un agente registrado en el sistema. <br> 2. Administrador ha iniciado sesión. |
| **Post-condiciones** | Posibilidad de ejecutar los casos de uso (CU-02.01.02 y CU-02.01.04). |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos. |
| **Frecuencia** | Media de 1 vez al mes. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Ver Agentes". | Redirige a listado de agentes. |
| 2 | Visualiza resultados. | Sistema muestra listado de agentes con múltiples acciones. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay agentes registrados en el sistema. | Mensaje de error "Datos no encontrados". |

---

### CU-02.01.04 - Eliminar Agente

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El administrador elimina cuenta de Agente Inmobiliario del sistema. |
| **Actores** | Administrador. |
| **Pre-condiciones** | 1. Agente Inmobiliario registrado. <br> 2. Administrador ha iniciado sesión. |
| **Post-condiciones** | Cuenta de Agente Inmobiliario eliminada del sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 3 segundos. |
| **Frecuencia** | Media de 3 veces al mes. |
| **Importancia** | Importante. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Eliminar". | Sistema muestra mensaje de confirmación. |
| 2 | Visualiza mensaje de confirmación con la opción de "Aceptar" o "Rechazar". | Sistema espera confirmación. |
| 2.1 | Administrador selecciona aceptar. | Datos del agente son eliminados del sistema, muestra mensaje de éxito. |
| 2.2 | Administrador selecciona rechazar. | Eliminación descartada. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| - | - | - |

---

### CU-03.01.01 - Cerrar sesión

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Usuario desea cerrar sesión en el sistema. |
| **Actores** | Administrador, Agente Inmobiliario, Cliente. |
| **Pre-condiciones** | Usuario ha iniciado sesión (CU-03.01.02). |
| **Post-condiciones** | Posibilidad de iniciar sesión con cualquier cuenta. |
| **Rendimiento** | El sistema debe cerrar sesión en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 vez a la semana por usuario. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Salir". | Sistema cierra sesión actual. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| - | - | - |

---

### CU-03.01.02 - Iniciar sesión

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Usuario desea iniciar sesión en el sistema. |
| **Actores** | Administrador, Agente Inmobiliario, Cliente. |
| **Pre-condiciones** | Usuario previamente registrado en el sistema. |
| **Post-condiciones** | Posibilidad de utilizar las funcionalidades de su usuario en el sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 vez a la semana por usuario. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción "Iniciar sesión". | Sistema redirige a formulario para ingresar datos. |
| 2 | Ingresar correo electrónico y contraseña. | Sistema valida datos. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 2.1 | Usuario ingresa correo no registrado en el sistema. | Mensaje de "Usuario no registrado con el correo". |
| 2.2 | Usuario ingresa datos incorrectos. | Mensaje de error "Datos ingresados incorrectos". |

---

### CU-04.01.01 - Buscar Propiedad

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Cliente desea buscar propiedad registrada en el sistema. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Existencia de propiedades registradas. <br> 2. Cliente ha iniciado sesión. |
| **Post-condiciones** | Muestra el detalle o resultado de la búsqueda. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos. |
| **Frecuencia** | Media de 500 veces a la semana. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Ingresa criterio (ID, Título o Zona). | Filtra la base de datos. |
| 2 | Selecciona opción "Buscar". | Presenta lista de coincidencias. |
| 3 | Visualiza resultados. | - |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay propiedades registradas. | Mensaje de error "No hay propiedades disponibles". |
| 2 | Criterio ingresado no tiene coincidencias. | Mensaje de error "Propiedad no encontrada". |

---

### CU-04.01.02 - Guardar en favoritos

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Cliente desea guardar propiedad registrada en el sistema como favorita. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Existencia de propiedades. <br> 2. Cliente ha iniciado sesión. |
| **Post-condiciones** | Muestra propiedad en sección de favoritos. |
| **Rendimiento** | El sistema debe responder en un máximo de 3 segundos. |
| **Frecuencia** | Media de 5 veces a la semana por cliente. |
| **Importancia** | Importante. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Seleccionar opción de corazón en las opciones de la propiedad. | Mensaje de "Propiedad agregada a favoritos". |
| 1.1 | Si se vuelve a dar a la opción de corazón a una propiedad marcada. | Se elimina la propiedad de la lista de favoritos. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay propiedades registradas. | Mensaje de error "No hay propiedades disponibles". |

---

### CU-04.02.01 - Registrar Tipo de Inmueble

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El Agente desea agregar un nuevo tipo de inmueble dentro del sistema. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente con cuenta activa. <br> 2. Agente con sesión iniciada. |
| **Post-condiciones** | 1. Tipo de Inmueble disponible para nuevas propiedades. <br> 2. Dashboard actualizado. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos. |
| **Frecuencia** | Media de 1 vez al año. |
| **Importancia** | Quedaría bien. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona "Nuevo Tipo de Inmueble". | Muestra formulario de registro. |
| 2 | Ingresa nombre y descripción. | Valida formato de campos. |
| 3 | Agregar los campos que se pueden definir para dicho tipo (nombre y tipo de dato). | Agrega campo ingresado al listado. |
| 3.1 | Si se desea que el campo sea obligatorio marcar casilla "Obligatorio". | El sistema marca el campo como obligatorio para el proceso de registro de propiedad. |
| 4 | Selecciona "Agregar". | Se agrega tipo de inmueble dentro del sistema. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ingresa campos obligatorios. | Mensaje de error "Falta campos obligatorios". |
| 2 | Campo con nombre repetido ingresado. | Mensaje de error "Campos duplicados". |

---

### CU-04.02.02 - Actualizar Tipo de Inmueble

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Modificar datos de un tipo de inmueble previamente registrado. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Tipo de inmueble registrado. <br> 2. Agente ha iniciado sesión. |
| **Post-condiciones** | Datos actualizados en el sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 4 segundos. |
| **Frecuencia** | Media de 1 vez al año. |
| **Importancia** | Quedaría bien. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selección de "Agregar" (Editar) en listado de Tipos de Inmueble. | Abrir formulario. |
| 2 | Modifica los campos deseados. | Valida los cambios. |
| 3.1 | Si se desea agregar campos, ingresa nombre y tipo. | Agrega un nuevo campo disponible. |
| 4 | Selecciona "Actualizar". | Sobrescribe datos y confirma. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Un campo obligatorio se deja en vacío. | Mensaje de error "Falta campos obligatorios". |

---

### CU-04.02.03 - Eliminar Tipo de Inmueble

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Remover permanentemente un tipo de inmueble del sistema. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Tipo de inmueble registrado. <br> 2. Agente ha iniciado sesión. |
| **Post-condiciones** | Tipo de inmueble eliminada del sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 3 segundos. |
| **Frecuencia** | Media de 1 vez al año. |
| **Importancia** | Importante. |
| **Urgencia** | Puede esperar. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona icono de eliminar en el listado de inmuebles (CU-04.02.04). | Solicita confirmación. |
| 2 | Visualiza mensaje de confirmación con opción de "Aceptar" o "Rechazar". | Sistema espera confirmación. |
| 2.1 | Agente selecciona aceptar. | Datos eliminados, muestra mensaje de éxito. |
| 2.2 | Agente selecciona rechazar. | Eliminación descartada. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| - | - | - |

---

### CU-04.02.04 - Ver Tipos de Inmueble

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Agente desea ver listado de tipos de inmueble registrados en el sistema. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | Al menos un tipo de inmueble registrado. |
| **Post-condiciones** | Permite modificar o eliminar el tipo de inmueble. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos. |
| **Frecuencia** | Media de 5 veces a la semana por agente. |
| **Importancia** | Importante. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona "Tipos de Inmueble". | Muestra lista de tipos de inmueble. |
| 2 | Visualiza resultados. | - |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay tipos de inmueble registrados. | Mensaje de error "No hay tipos de inmueble disponibles". |

---

### CU-04.03.01 - Registrar Propiedad

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El Agente crea un nuevo anuncio de propiedad para que sea visible por los clientes. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente registrado y activo. <br> 2. Agente con sesión iniciada. |
| **Post-condiciones** | 1. Propiedad almacenada en la base de datos. <br> 2. Dashboard actualizado. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos. |
| **Frecuencia** | Media de 1 a 4 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona "Nueva Propiedad". | Muestra formulario de registro. |
| 2 | Ingresa Título, Dirección, Precio y Descripción. | Valida formato de campos. |
| 3 | Ejecuta CU-04.03.02 (Seleccionar Tipo de Inmueble). | Habilita campos según el tipo. |
| 4 | Ingresa Habitaciones, Baños y m². | Valida datos numéricos. |
| 4.1 | Si decide adjuntar foto, selecciona "Subir Fotos" y elige archivos. | Carga previsualización de archivos. |
| 5 | Selecciona "Guardar". | Crea registro y confirma éxito. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ingresa campos obligatorios. | Mensaje de error "Falta campos obligatorios". |

---

### CU-04.03.02 - Seleccionar Tipo de Inmueble

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Clasifica la propiedad dentro de las categorías permitidas. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | Estar en flujo de Registro o Actualización. |
| **Post-condiciones** | Categoría asignada al inmueble. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 a 3 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Despliega lista de tipos. | Muestra Casa, Apartamento, Terreno, Local. |
| 2 | Selecciona una opción. | Ajusta la visibilidad de atributos (ej. oculta baños si es Terreno). |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No se selecciona tipo de la lista. | Mensaje de error "Falta campos obligatorios". |

---

### CU-04.03.03 - Buscar Propiedad (Agente)

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Agente desea buscar propiedad registrada en el sistema. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Existencia de propiedades. <br> 2. Agente ha iniciado sesión. |
| **Post-condiciones** | Muestra el detalle o resultado de la búsqueda. |
| **Rendimiento** | El sistema debe responder en un máximo de 5 segundos. |
| **Frecuencia** | Media de 5 a 20 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Ingresa criterio (ID, Título o Zona). | Filtra la base de datos. |
| 2 | Selecciona opción "Buscar". | Presenta lista de coincidencias. |
| 3 | Visualiza resultados. | - |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay propiedades registradas. | Mensaje de error "No hay propiedades disponibles". |
| 2 | Criterio no tiene coincidencias. | Mensaje de error "Propiedad no encontrada". |

---

### CU-04.03.04 - Actualizar Propiedad

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Modificar datos de un inmueble previamente registrado. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Propiedad registrada. <br> 2. Agente ha iniciado sesión. |
| **Post-condiciones** | Datos actualizados en el sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 4 segundos. |
| **Frecuencia** | Media de 1 a 4 veces al día por agente. |
| **Importancia** | Importante. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Ejecución de CU-04.03.03 (Buscar Propiedad). | Muestra resultados. |
| 2 | Selecciona "Editar" en la propiedad encontrada. | Muestra formulario de edición. |
| 3 | Modifica los campos deseados (ej. Precio). | Valida los cambios. |
| 4 | Selecciona "Actualizar". | Sobrescribe datos y confirma. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Un campo obligatorio se deja en vacío. | Mensaje de error "Falta campos obligatorios". |

---

### CU-04.03.05 - Eliminar Propiedad

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Remover permanentemente un inmueble del sitio. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Propiedad registrada. <br> 2. Agente ha iniciado sesión. |
| **Post-condiciones** | Propiedad eliminada del sistema. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 a 5 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Ejecución de CU-04.03.03 (Buscar Propiedad). | Muestra lista de propiedades. |
| 2 | Selecciona icono de eliminar. | Solicita confirmación. |
| 3 | Confirma eliminación. | Borra registro y actualiza vista. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No confirma eliminación. | No se elimina la propiedad. |

---

### CU-05.01.01 - Visualizar solicitudes citas

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Cliente consulta las solicitudes enviadas para evaluar una propiedad. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Cliente ha iniciado sesión (CU-03.01.02). |
| **Post-condiciones** | Ejecución de CU-05.02.04 (Visualizar citas agendadas). |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 a 10 veces al día. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Entra a sección de "Citas". | Redirige a página de citas. |
| 2 | En parte superior consulta sección de "Mis citas". | Muestra datos de las citas solicitadas. |
| 2.1 | Si Agente ha contestado con una propuesta (Estado "Propuesta recibida"). | Muestra notificación o estado. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No ha enviado ninguna solicitud de cita. | Sistema muestra mensaje de "Citas no solicitadas". |

---

### CU-05.01.02 - Visualizar Propuesta Agente

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Cliente consulta la propuesta de horario recibida por el Agente Inmobiliario. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Agente envió propuesta. <br> 2. Cliente ha iniciado sesión. |
| **Post-condiciones** | Ejecución de CU-05.02.04. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 a 10 veces al día. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Entra a sección "Citas". | Redirige a página de citas. |
| 2 | Selecciona una propuesta de cita. | Muestra datos de la propuesta. |
| 2.1 | Cliente acepta la propuesta. | Cita pasa a estado de agendada. |
| 2.2 | Cliente rechaza la propuesta. | Cita pasa a estado de rechazada. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No selecciona ninguna cita. | Sistema indica que debe seleccionar una cita. |

---

### CU-05.01.03 - Solicitar Cita

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El cliente solicita una cita para evaluar una propiedad. |
| **Actores** | Cliente. |
| **Pre-condiciones** | 1. Cliente ha iniciado sesión. <br> 2. La propiedad debe estar disponible. |
| **Post-condiciones** | Visualizar solicitudes citas (CU-05.01.01). |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 50 veces a la semana. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Entra a sección de "Citas" y selecciona "Agendar cita". | Muestra formulario para ingresar fecha y hora. |
| 2 | Selecciona fecha y hora. | Muestra mensaje de confirmación. |
| 2.1 | Cliente selecciona aceptar. | Registra cita e indica actualizar solicitudes. |
| 2.2 | Cliente selecciona rechazar. | Se cancela solicitud de cita. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Propiedad seleccionada ya tiene cita en esa hora. | Mostrar mensaje "Cita no disponible". |

---

### CU-05.02.01 - Ver Solicitudes de Citas

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Consultar las peticiones de contacto realizadas por clientes. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Cliente envió solicitud de cita. |
| **Post-condiciones** | Ejecución de CU-05.02.05 (Visualizar citas agendadas). |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 1 a 10 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Entra a "Bandeja de Citas". | Recupera solicitudes vinculadas a sus propiedades. |
| 2 | Selecciona una cita. | Muestra datos del cliente y propiedad. |
| 3 | Realiza el caso de uso CU-05.02.03. | Cambia el estado de solicitud a "Enviada". |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No selecciona ninguna cita. | Sistema indica que debe seleccionar una cita. |

---

### CU-05.02.02 - Visualizar Motivo de Rechazo

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Consultar el motivo dado por el cliente por el cual rechazó la propuesta. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Cliente rechazó la propuesta. |
| **Post-condiciones** | Ejecución de CU-05.02.03 (Proponer Horario de Cita). |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 5 a 10 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Ejecución de CU-05.02.01 (Ver Solicitudes). | Muestra listado de citas con indicador rojo en rechazadas. |
| 2 | Visualiza cita rechazada y selecciona "Ver motivo". | Despliega el texto del motivo ingresado. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| - | - | - |

---

### CU-05.02.03 - Proponer Horario de Cita

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | El agente sugiere una fecha y hora para realizar la visita. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Cita en estado "Pendiente". |
| **Post-condiciones** | Solicitud enviada al cliente para aprobación. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 10 a 50 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Ingresa fecha y hora propuesta. | Valida disponibilidad básica. |
| 2 | Selecciona "Enviar Propuesta". | Propuesta recibida por cliente. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Fecha y hora propuesta es anterior a la fecha actual. | Sistema muestra error de fecha incorrecta. |

---

### CU-05.02.04 - Visualizar citas agendadas

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Permite al Agente consultar su agenda de compromisos confirmados. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Existencia de citas en estado "Confirmada". |
| **Post-condiciones** | Visualizar listado de citas. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 10 a 100 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona la opción "Agenda de Citas". | Recupera citas (no pendientes/rechazadas). |
| 2 | Selecciona una fecha en el calendario. | Muestra detalle (hora, cliente, dirección). |
| 2.1 | Si el cliente rechazó una cita previa. | Despliega retroalimentación (CU-05.02.02). |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| - | - | - |

---

### CU-06.01.01 - Visualizar Dashboard de Propiedades

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Permite al Agente obtener una vista general de sus inmuebles. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Propiedades registradas. |
| **Post-condiciones** | Se despliega el listado completo de propiedades. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 10 a 100 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona "Dashboard". | Consulta BD filtrando por Agente. |
| 2 | Visualiza resumen de cada inmueble. | Presenta lista organizada por fecha. |
| 2.1 | Si desea ver un registro específico. | Realiza caso CU-04.03.03. |
| 2.2 | Si elige filtro por tipo. | Filtra propiedades por tipo. |
| 2.3 | Si elige filtro por precio. | Filtra propiedades por precio. |
| 2.4 | Si elige filtro por características. | Filtra propiedades por características. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay propiedades registradas. | Mostrar mensaje "No propiedades encontradas". |

---

### CU-06.01.02 - Consultar Gráfica Top 5 Zonas

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Ver las 5 zonas geográficas con más propiedades publicadas. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Propiedades registradas. |
| **Post-condiciones** | Gráficas generadas visualmente. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 10 a 50 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona "Ver Gráficas". | Abrir ventana de gráficas. |
| 2 | Selecciona pestaña "Ver Top Zonas". | Agrupa propiedades por zona y muestra el Top 5. |
| 2.1 | Se elige la opción de "Generar Reporte". | Se genera reporte en formato CSV. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay propiedades registradas. | Mostrar mensaje "No propiedades encontradas". |

---

### CU-06.01.03 - Consultar Gráfica Top 3 de Tipos

| Campo | Detalle |
| :--- | :--- |
| **Descripción** | Ver estadísticas de los 3 tipos de inmuebles más buscados. |
| **Actores** | Agente Inmobiliario. |
| **Pre-condiciones** | 1. Agente ha iniciado sesión. <br> 2. Datos de búsqueda existentes. |
| **Post-condiciones** | Gráficas generadas visualmente. |
| **Rendimiento** | El sistema debe responder en un máximo de 2 segundos. |
| **Frecuencia** | Media de 10 a 50 veces al día por agente. |
| **Importancia** | Vital. |
| **Urgencia** | Inmediatamente. |
| **Comentarios** | - |

#### Secuencia Normal

| # | Acción (Actor) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | Selecciona "Ver Gráficas". | Abrir ventana de gráficas. |
| 2 | Selecciona pestaña "Ver Top Inmuebles". | Procesa tendencias y dibuja el Top 3. |
| 2.1 | Se elige la opción de "Generar Reporte". | Se genera reporte en formato CSV. |

#### Excepciones

| # | Situación (Causa) | Reacción (Sistema) |
| :--- | :--- | :--- |
| 1 | No hay propiedades registradas. | Mostrar mensaje "No propiedades encontradas". |