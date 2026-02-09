CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    rol_id INT NOT NULL,
    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(id)
);

CREATE TABLE tipos_inmueble (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE propiedades (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    precio NUMERIC(12,2) NOT NULL,
    descripcion TEXT,
    habitaciones INT,
    banos INT,
    metros_cuadrados NUMERIC(10,2),
    agente_id INT NOT NULL,
    tipo_id INT NOT NULL,
    CONSTRAINT fk_propiedad_agente
        FOREIGN KEY (agente_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_propiedad_tipo
        FOREIGN KEY (tipo_id)
        REFERENCES tipos_inmueble(id)
);

CREATE TABLE fotos_propiedad (
    id SERIAL PRIMARY KEY,
    propiedad_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    CONSTRAINT fk_foto_propiedad
        FOREIGN KEY (propiedad_id)
        REFERENCES propiedades(id)
        ON DELETE CASCADE
);

CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    agente_id INT NOT NULL,
    propiedad_id INT NOT NULL,
    fecha_solicitada TIMESTAMP NOT NULL,
    fecha_propuesta TIMESTAMP,
    estado VARCHAR(20) NOT NULL,
    motivo_rechazo VARCHAR(255),
    CONSTRAINT fk_cita_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_cita_agente
        FOREIGN KEY (agente_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_cita_propiedad
        FOREIGN KEY (propiedad_id)
        REFERENCES propiedades(id)
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    propiedad_id INT NOT NULL,
    CONSTRAINT fk_favorito_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_favorito_propiedad
        FOREIGN KEY (propiedad_id)
        REFERENCES propiedades(id),
    CONSTRAINT unique_favorito UNIQUE (cliente_id, propiedad_id)
);

INSERT INTO roles (nombre) VALUES
('Cliente'),
('Agente'),
('Administrador');

INSERT INTO tipos_inmueble (nombre) VALUES
('Casa'),
('Apartamento'),
('Terreno'),
('Local Comercial');




-- insertar un usuario administrador con contraseña hasheada (admin123) para pruebas. La contraseña se ha generado utilizando bcrypt con un costo de 12.
-- INSERT INTO usuarios (nombre_completo, correo, password, rol_id)
-- VALUES (
--     'Administrador del Sistema',
--     'admin@homefinder.com',
--     '$2b$12$C9o7wzv5z8QKzXyQ1h9b7uHf5YkFZV6l3Fv9jWZ0r7Jm9F3KpY1B6', -- admin123
--     (SELECT id FROM roles WHERE nombre = 'Administrador')
-- );