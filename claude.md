# Guía de Integración y Documentación del Proyecto: AGENTE MACHINE

Este documento (`claude.md`) explica en detalle las modificaciones realizadas en el sitio web para incorporar simulaciones interactivas de agentes de inteligencia artificial codificando e integrando componentes reales de React, así como las optimizaciones visuales y de testimonios.

---

## 🛠️ Tecnologías e Instalaciones Realizadas

Para dar soporte a los componentes tridimensionales e interactivos solicitados, se han incorporado e instalado con éxito las siguientes dependencias a nivel de producción en el proyecto:

1. **`three`**: Biblioteca principal para renderizar gráficos 3D acelerados por hardware en la web mediante WebGL (utilizado por el componente de superficie de puntos).
2. **`@types/three`**: Definiciones de tipos de TypeScript para Three.js, garantizando un entorno libre de errores de compilación estática.
3. **`next-themes`**: Sistema de gestión de temas oscuros/claros utilizado para adaptar las paletas de colores del lienzo de partículas en tiempo real.
4. **`@splinetool/react-spline`**: Conector oficial de React para Spline, utilizado para cargar y animar la escena interactiva 3D del robot **"Whobee"**.

---

## 💡 Componentes Nuevos Implementados

### 1. Robot 3D Interactivo (`interactive-3d-robot.tsx`)
* **Ubicación:** `src/components/ui/interactive-3d-robot.tsx`
* **Descripción:** Carga de manera perezosa (`lazy loading`) y con un fallback de carga optimizado y estilizado con Tailwind la escena interactiva del robot Whobee.
* **Escena Spline:** `https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode`

### 2. Superficie de Ondas 3D (`dotted-surface.tsx`)
* **Ubicación:** `src/components/ui/dotted-surface.tsx`
* **Descripción:** Implementa un lienzo completo de partículas 3D en **Three.js** que genera una superficie ondulante interactiva basada en ecuaciones senoidales y con soporte adaptativo al tema oscuro de la landing page.

### 3. Simulador del Agente de IA (`AgentInteractionShowcase.tsx`)
* **Ubicación:** `src/components/site/AgentInteractionShowcase.tsx`
* **Descripción:** Este es el componente estrella del sitio. Replica un entorno integrado de desarrollo (IDE) premium con:
  * **Pestaña Terminal:** Simula paso a paso el registro del prompt del usuario, el diagnóstico del proyecto (shadcn/Tailwind/TS), la instalación de paquetes en la terminal, la escritura de los archivos y la compilación.
  * **Pestaña Código:** Muestra el código fuente del componente generado en tipografía monoespaciada con números de línea detallados.
  * **Pestaña Vista Previa:** Renderiza **en vivo** el componente real e interactivo (puedes jugar con el robot Whobee en el Hero y ver la superficie tridimensional ondulante en el CTA).

---

## 🚀 Integración en las Secciones de la Landing Page

### A. Hero Section (Captura 1)
* Se reemplazó la escena fija estática de la derecha del Hero por un `AgentInteractionShowcase` que demuestra la integración del robot interactivo Whobee.
* Al cargar la página, se ejecuta la animación paso a paso y al completarse exitosamente, invita de forma dinámica a abrir la pestaña **"Vista Previa"** para interactuar directamente con el robot.

### B. Sección de Testimonios (Captura 2)
* **Fotos de Clientes Senior:** Se actualizaron los enlaces de imágenes de Martín Gómez, Diego Fernández y Laura Sánchez a perfiles de Unsplash correspondientes a personas con mayor edad y mayor trayectoria profesional en concordancia a la visión del cliente.
* **Reducción de Tamaño:** Se removieron los enormes encabezados de las tarjetas. Ahora, cada testimonio se presenta con una tipografía limpia y minimalista, y en la sección inferior (footer) de cada tarjeta, se aloja un avatar circular pequeño y elegante de `w-10 h-10` con borde sutil.

### C. Sección CTA / Trabajamos Contigo (Captura 3)
* Se sustituyó el carrusel marquee de imágenes por una segunda instancia de `AgentInteractionShowcase` que demuestra la integración matemática de `dotted-surface.tsx` mediante Three.js.
* En su pestaña **"Vista Previa"**, el usuario puede contemplar la simulación en tiempo real del tejido ondulatorio tridimensional sobre un fondo de partículas.

### D. Identidad y Logotipo IA
* Se diseñó un logotipo SVG completamente vectorizado y responsivo que representa un núcleo o nodo neuronal con simetría hexagonal y un nodo central en animación pulsante.
* Este nuevo logotipo está integrado tanto en la cabecera adhesiva (`Navbar`) como en el pie de página (`Footer`), proporcionando una identidad de marca moderna y premium.
Leé todos los archivos del proyecto y actualizá el archivo claude.md con: la tecnología que usa (framework, librerías), la estructura de carpetas, el comando para correrlo localmente, el comando para hacer el build de producción, el público objetivo del negocio, y las secciones que tiene la página. Esto es para que en futuras conversaciones no necesite explicarte el proyecto desde cero.