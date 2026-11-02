# FJL — Plataforma Modular Multi-Tenant de Landing Pages (v1.1)

Arquitectura base y maqueta interactiva de la plataforma FJL para generacion y personalizacion de sitios web empresariales bajo el principio de **«Una sola plataforma, multiples sitios»**.

El motor de renderizado (`PageRenderer`) procesa 13 tipos de bloques modulares y tokens de diseno reactivos, adaptandose dinamicamente a diferentes modelos de negocio (servicios profesionales, gastronomia, comercio y corporativo).

---

## Caracteristicas Principales

### 1. Editor Visual en Vivo (Personalizador)
Permite a cada cliente configurar su sitio en tiempo real sin modificar codigo:
* **Fondo y Texturas**: Seleccion entre color solido, patrones geometricos (puntos, cuadricula, degradado, foco central) o carga de imagen/textura propia con control de opacidad.
* **Efecto Vidrio Esmerilado (Glassmorphism)**: Estilo translucido opcional para tarjetas.
* **Organizacion Modular**: Reordenamiento secuencial de secciones y control de visibilidad (`enabled: true/false`).
* **Tokens de Diseno**: Ajuste en vivo de paleta cromatica (`--theme-primary`, `--theme-bg`), tipografias de titulos (*Plus Jakarta Sans*, *Playfair Display*, *Outfit*, *Inter*) y radio de bordes.
* **Gestion de Contenido y Multimedia**: Reemplazo instantaneo de imagenes locales en memoria (`URL.createObjectURL`) y catalogo de tarjetas dinamicas (anadir o eliminar elementos).
* **Control de Sesion**: Opciones de confirmacion con `[Guardar Cambios]` y reversion instantanea con `[Cancelar y Descartar]`.

### 2. Modo Disposicion Libre
* Permite arrastrar elementos clave (tarjeta visual del Hero, banner promocional, tarjetas de servicios y planes) a cualquier coordenada de la pantalla.
* Boton de `Reestablecer` para retornar inmediatamente a la cuadricula responsiva estandar.

### 3. Herramientas de Conversion
* **Barra de Anuncios Superior**: Mensajes de alerta o promocion con enlace configurable.
* **Widget Flotante de WhatsApp**: Enlace directo para captura de prospectos con mensaje precargado.
* **Exportacion JSON**: Descarga y respaldo de la configuracion activa del cliente en formato `.json`.

---

## Clientes de Prueba (Multi-Tenant)

El inspector superior permite alternar entre dos entornos de demostracion con datos basicos de prueba:

| Parametro | Cliente 1: Servicios de Salud (Dental FJL) | Cliente 2: Gastronomia (Restaurante FJL) |
| :--- | :--- | :--- |
| **Organizacion (Tenant)** | Dental FJL Especialidades Odontologicas | Fuego & Brasa FJL |
| **Dominio Simulado** | dental.fjl.com | restaurante.fjl.com |
| **Identidad Visual** | Azul Clinico (`#1d4ed8`), Blanco, Puntos sutiles | Terracota (`#c2410c`), Ambar, Degradado |
| **Banner Lateral** | Desactivado por defecto | Activado con beneficio de temporada |
| **Alineacion de Hero** | Dividido (2 columnas) | Dividido / Centrado |

---

## Pila Tecnologica

* **Frontend**: React 19, TypeScript 5.7, Vite 6.
* **Estilos**: Tailwind CSS v4, CSS Custom Properties dinamicas.
* **Validacion de Esquemas**: Zod v3 (validadores estrictos por tipo de seccion).
* **Iconografia**: Lucide React.
* **Modelado de Datos**: Prisma Schema (PostgreSQL Multi-Tenant con RLS).

---

## Ejecucion Local

### Requisitos
* Node.js v20+ o v22+
* npm v10+

### Servidor de Desarrollo (Vite HMR)
```bash
npm install
npm run dev
```
Acceder en `http://localhost:5173`.

### Compilacion de Produccion
```bash
npm run build
```
Genera los archivos optimizados en la carpeta `dist/`.
