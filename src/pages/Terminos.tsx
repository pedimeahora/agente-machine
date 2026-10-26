import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const secciones = [
  {
    titulo: "1. Identificación del prestador",
    cuerpo: (
      <>
        <p>
          Este sitio y los servicios ofrecidos bajo el nombre "Agente Machine" son operados por
          Gastón Ezequiel Jeandet, con domicilio en Ciudad Autónoma de Buenos Aires, Argentina.
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
    titulo: "2. Objeto",
    cuerpo: (
      <p>
        Agente Machine presta servicios de desarrollo de software, agentes de inteligencia
        artificial y automatización de procesos — atención al cliente por WhatsApp, automatización
        de email e integraciones a medida — para empresas y particulares que contraten dichos
        servicios.
      </p>
    ),
  },
  {
    titulo: "3. Aceptación de los términos",
    cuerpo: (
      <p>
        Al utilizar este sitio o contratar nuestros servicios, el usuario o cliente acepta estos
        Términos y Condiciones en su totalidad. Si no está de acuerdo, debe abstenerse de utilizar
        el sitio o contratar los servicios.
      </p>
    ),
  },
  {
    titulo: "4. Contratación y pago",
    cuerpo: (
      <p>
        Los servicios se contratan de forma individual mediante acuerdo previo (propuesta
        comercial, presupuesto o contrato) entre Agente Machine y el cliente, donde se detallan
        alcance, plazos y condiciones de pago específicas de cada proyecto. Estos Términos
        generales rigen de forma supletoria a lo acordado en cada contratación particular.
      </p>
    ),
  },
  {
    titulo: "5. Propiedad intelectual",
    cuerpo: (
      <p>
        El código, diseños y materiales desarrollados específicamente para un cliente bajo
        contrato son cedidos al cliente según lo acordado en cada proyecto. Las herramientas,
        metodologías propias de Agente Machine y el contenido de este sitio son propiedad de
        Gastón Ezequiel Jeandet y no pueden reproducirse sin autorización.
      </p>
    ),
  },
  {
    titulo: "6. Servicios de terceros",
    cuerpo: (
      <p>
        Nuestras soluciones pueden integrar servicios de terceros — por ejemplo, la plataforma de
        WhatsApp Business de Meta, proveedores de inteligencia artificial y servicios de email. El
        uso de dichas integraciones está sujeto además a los términos y políticas propias de cada
        proveedor.
      </p>
    ),
  },
  {
    titulo: "7. Limitación de responsabilidad",
    cuerpo: (
      <p>
        Agente Machine no garantiza que los servicios estén libres de errores o interrupciones. En
        la medida permitida por la ley, no se responde por daños indirectos, lucro cesante o
        pérdida de datos derivados del uso de los servicios, salvo dolo o negligencia grave.
      </p>
    ),
  },
  {
    titulo: "8. Protección de datos",
    cuerpo: (
      <p>
        El tratamiento de datos personales se rige por nuestra{" "}
        <a href="/privacidad" className="text-gradient font-medium">
          Política de Privacidad
        </a>
        .
      </p>
    ),
  },
  {
    titulo: "9. Modificaciones",
    cuerpo: (
      <p>
        Estos Términos pueden actualizarse. La versión vigente es la publicada en este sitio con
        su fecha de última actualización.
      </p>
    ),
  },
  {
    titulo: "10. Ley aplicable y jurisdicción",
    cuerpo: (
      <p>
        Estos Términos se rigen por las leyes de la República Argentina. Para cualquier
        controversia, las partes se someten a los tribunales ordinarios de la Ciudad Autónoma de
        Buenos Aires.
      </p>
    ),
  },
  {
    titulo: "11. Contacto",
    cuerpo: (
      <p>
        Consultas:{" "}
        <a href="mailto:agentemachine@gmail.com" className="text-gradient font-medium">
          agentemachine@gmail.com
        </a>
      </p>
    ),
  },
];

export default function Terminos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pt-36 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Términos y <span className="text-gradient">Condiciones</span>
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
