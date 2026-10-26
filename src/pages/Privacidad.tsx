import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const secciones = [
  {
    titulo: "1. Responsable del tratamiento",
    cuerpo: (
      <>
        <p>
          El responsable del tratamiento de los datos personales recolectados a través de este
          sitio es Gastón Ezequiel Jeandet ("Agente Machine"), con domicilio en Ciudad Autónoma de
          Buenos Aires, Argentina.
        </p>
        <p>
          Contacto:{" "}
          <a href="mailto:agentemachine@gmail.com" className="text-gradient font-medium">
            agentemachine@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    titulo: "2. Qué datos recolectamos",
    cuerpo: (
      <p>
        Cuando nos contactás por WhatsApp, email, formulario del sitio o agendás una llamada,
        podemos recolectar: nombre, número de teléfono, dirección de email, y el contenido de los
        mensajes que nos envíes. No recolectamos datos sensibles ni información financiera a
        través del sitio.
      </p>
    ),
  },
  {
    titulo: "3. Para qué los usamos",
    cuerpo: (
      <p>
        Usamos estos datos exclusivamente para responder tus consultas, coordinar reuniones,
        elaborar propuestas comerciales y, si contratás nuestros servicios, para la ejecución del
        proyecto acordado. No vendemos ni cedemos tus datos a terceros con fines comerciales
        propios de esos terceros.
      </p>
    ),
  },
  {
    titulo: "4. Con quién los compartimos",
    cuerpo: (
      <p>
        Para prestar el servicio podemos apoyarnos en proveedores externos que procesan datos en
        nuestro nombre: la plataforma de WhatsApp Business de Meta (para la mensajería),
        proveedores de inteligencia artificial (para generar respuestas automáticas), servicios de
        email transaccional, y Calendly (para la coordinación de llamadas). Cada uno de estos
        proveedores tiene sus propias políticas de privacidad.
      </p>
    ),
  },
  {
    titulo: "5. Cookies",
    cuerpo: (
      <p>
        Este sitio puede utilizar cookies técnicas propias y cookies de terceros (como las de
        Calendly, necesarias para mostrar el widget de agenda) para su correcto funcionamiento.
        Podés deshabilitar las cookies desde la configuración de tu navegador, aunque esto podría
        afectar algunas funcionalidades del sitio.
      </p>
    ),
  },
  {
    titulo: "6. Conservación de los datos",
    cuerpo: (
      <p>
        Conservamos tus datos mientras exista una relación comercial activa o potencial, y
        mientras sea necesario para cumplir obligaciones legales o contractuales. Podés solicitar
        su eliminación en cualquier momento, según se detalla en la sección siguiente.
      </p>
    ),
  },
  {
    titulo: "7. Tus derechos",
    cuerpo: (
      <p>
        De acuerdo con la Ley 25.326 de Protección de Datos Personales de Argentina, tenés derecho
        a acceder, rectificar, actualizar o solicitar la eliminación de tus datos personales.
        Podés ejercer estos derechos escribiendo a{" "}
        <a href="mailto:agentemachine@gmail.com" className="text-gradient font-medium">
          agentemachine@gmail.com
        </a>
        . La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la
        Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con
        relación al incumplimiento de las normas sobre protección de datos personales.
      </p>
    ),
  },
  {
    titulo: "8. Seguridad",
    cuerpo: (
      <p>
        Tomamos medidas razonables para proteger tus datos contra accesos no autorizados,
        alteración o destrucción. Ningún sistema es 100% infalible, pero trabajamos con
        proveedores de infraestructura reconocidos para minimizar riesgos.
      </p>
    ),
  },
  {
    titulo: "9. Menores de edad",
    cuerpo: (
      <p>
        Nuestros servicios están dirigidos a empresas y profesionales. No recolectamos
        intencionalmente datos de menores de edad.
      </p>
    ),
  },
  {
    titulo: "10. Cambios a esta política",
    cuerpo: (
      <p>
        Podemos actualizar esta Política de Privacidad. La versión vigente es la publicada en este
        sitio con su fecha de última actualización.
      </p>
    ),
  },
  {
    titulo: "11. Contacto",
    cuerpo: (
      <p>
        Consultas sobre tus datos:{" "}
        <a href="mailto:agentemachine@gmail.com" className="text-gradient font-medium">
          agentemachine@gmail.com
        </a>
      </p>
    ),
  },
];

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pt-36 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Política de <span className="text-gradient">Privacidad</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 26 de octubre de 2026
        </p>

        <div className="mt-12 space-y-10">
          {secciones.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-lg font-semibold tracking-tight">{s.titulo}</h2>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground">
                {s.cuerpo}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
