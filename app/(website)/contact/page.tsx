import { Container } from '@/components/common/container'
import { PageClient } from './page-client'

export default function Page() {
  return (
    <Container className="py-8">
      <h1 className="text-center text-lg text-[#e4e439] md:text-2xl">
        Fale Conosco.
      </h1>

      <div className="min-h-500px mb-5 flex w-full flex-col md:flex-row md:space-x-8">
        <PageClient />

        <div className="-order-1 w-full pt-4 md:order-none md:w-1/2 [&>ul>li]:pb-2 [&>ul>li]:font-bold [&>ul>li]:text-gray-600">
          <ul>
            <li>Site com fotos de baladas e festas em Itápolis e região.</li>
            <li>
              Propaganda com banner com redirecionamento para seu site ou
              fan-page.
            </li>
            <li>
              Cobertura fotográfica: casamentos, baladas, aniversários (infantis
              ou de 15 anos), batizados, inaugurações, formaturas,
              confraternizações entre outras.
            </li>
            <li>
              Publicamos ou criamos o banner para divulgação de sua festa.
            </li>
            <li>Divulgação de eventos beneficentes isento de custo.</li>
            <li>
              Cobertura em grandes shows, isento de custo (confirmar
              disponibilidade na agenda).
            </li>
            <li>Desenvolvimentos de site e lojas virtuais.</li>
            <li>Contato Administrativo: (16) 99716-6880 Flávio</li>
            <li>Contato Fotográfico: (16) 99762-2684 Roberval</li>
            <li>
              E-Mail para contato Administrativo, Comercial e Fotográfico:
              contato@itachique.com.br
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
