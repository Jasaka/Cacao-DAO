import { Container } from '@/components/Container'

const faqs =
[
  {
    question: "Who are CacaoDao?",
    answer:
      "CacaoDao is a collective of likeminded individuals who are passionate about trustless improvement of public goods. We are a decentralized organization that is governed by the community. We are a DAO."
  },
  {
    question: "What does trustless mean?",
    answer:
      "Trustless means that there is no need for trust in a third party. Everything is as transparent and open as possible. This is achieved through the use of smart contracts and the blockchain."
  },
  {
    question: "What is dOrg?",
    answer:
      "dOrg is our first project. It is a trustless platform to facillitate consensus and decision making. It is currently targeted to be run by single organisations."
  },
  {
    question: "What is quadratic voting?",
    answer:
      "Quadratic voting is a voting system that allows voters to express their opinion more strongly by voting more than once. It is a way to make sure that the most passionate voices are heard. At the same time, it prevents the possibility of a single person or group of people from dominating the vote."
  },
  {
    question: "What is quadratic voting and how does it work?",
    answer: "Quadratic voting is a voting system that allows individuals to express the intensity of their preferences by assigning a certain number of votes to each option. The number of votes assigned to each option is determined by the square of the individual's level of preference. For example, if an individual has a strong preference for a certain option, they can assign a large number of votes to that option, which will have a greater impact on the final result than if they had assigned a small number of votes. The final result is calculated by summing the squares of the number of votes assigned to each option."
  },
  {
    question: "How do I use metamask to log in to the app?",
    answer: "To log in to the app using metamask, you will first need to install the metamask browser extension. Once you have installed the extension, you can click on the metamask icon in your browser's toolbar to access the metamask login screen. From here, you can either log in with an existing metamask account or create a new one. Once you have logged in, you can connect your metamask account to the app by following the on-screen instructions."
  },
  {
    question: "How do I submit a proposal for the community to vote on?",
    answer: "To submit a proposal for the community to vote on, you will first need to log in to the app using MetaMask. Once you are logged in, you can click on the \"Submit proposal\" button on the main screen to access the proposal submission form. From here, you can enter the details of your proposal, such as the title, description, and any relevant supporting information. Once you have filled out the form, you can submit the working copy of your proposal. This allows you to still edit a proposal. At this point your proposal will already be visible to other users. You can then finalize the proposal creation. Finalized proposals will be added to the list of available options for the community to vote on, once the voting phase starts."
  },
  {
    question: "Can I change my vote after I have cast it?",
    answer: "Yes, you can change your vote after you have cast it by accessing the app's voting screen and modifying your vote allocation for each option. Keep in mind that your vote will only be counted once, so any changes you make to your vote allocation will override your previous vote."
  },
  {
    question: "How are the results of the vote calculated and implemented?",
    answer: "The results of the vote are calculated by summing the squares of the number of votes assigned to each option. The option with the highest total number of votes is considered the winning optio"
  },
  {
    question: "Is my personal information and voting history kept private?",
    answer: "Yes, your personal information and voting history are kept private on the app. The app uses encryption and other security measures to protect your data and prevent unauthorized access."
  },
  {
    question: "Can I vote on multiple proposals in a single session?",
    answer: "Yes, you can vote on multiple proposals in a single session by accessing the app's voting screen and assigning a certain number of votes to each proposal. Keep in mind that your total number of votes is limited, so you will need to carefully consider how to allocate your votes among the different proposals."
  },
  {
    question: "How do I know if my vote has been successfully recorded on the blockchain?",
    answer: "Once you have cast your vote, the app will display a confirmation message to indicate that your vote has been successfully recorded on the blockchain. You can also check the status of your vote by accessing the app's voting history screen, which will show the details of your vote, including the time and date it was cast."
  },
  {
    question: "What happens if there is a dispute over the results of a vote?",
    answer: "Currently there shouldn't be any disputes concerning votes. We keep a blockchain-saved register of votes in a cycle as well as blockweave-stored version history of proposals. The vote-handling contracts are also open-source and auditable."
  },
  {
    question: "How do I contact the team behind the app for support or additional questions?",
    answer: "You can contact the team behind the app by sending an email to support@cacao-dao.org."
  }
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
