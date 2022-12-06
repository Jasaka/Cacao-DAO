import { Container } from '@/components/Container'

const faqs =
  [
    {
      question: "Who are CacaoDao?",
      answer:
        "CacaoDao is a collective of likeminded individuals who are passionate about trustless improvement of public goods. We are a decentralized organization that is governed by the community. We are a DAO.",
    },
    {
      question: "What does trustless mean?",
      answer:
        "Trustless means that there is no need for trust in a third party. Everything is as transparent and open as possible. This is achieved through the use of smart contracts and the blockchain.",
    },
    {
      question: "What is dOrg?",
      answer:
        "dOrg is our first project. It is a trustless platform to facillitate consensus and decision making. It is currently targeted to be run by single organisations.",
    },
    {
      question: "What is quadratic voting?",
      answer:
        "Quadratic voting is a voting system that allows voters to express their opinion more strongly by voting more than once. It is a way to make sure that the most passionate voices are heard. At the same time, it prevents the possibility of a single person or group of people from dominating the vote.",
    },
]

export function Faqs() {
  return (
    <>
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative overflow-hidden bg-[#4EB04C] py-20 sm:py-32"
      >
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              id="faq-title"
              className="font-display text-3xl tracking-tight text-white sm:text-4xl"
            >
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg tracking-tight text-gray-100">
              If you can’t find what you’re looking for, email our support team
              and if you’re lucky someone will get back to you.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
          >
            {faqs.map((faq, faqIndex) => (
              <li key={faqIndex}>
                <h3 className="font-display text-lg leading-7 text-white">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm text-gray-100">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
