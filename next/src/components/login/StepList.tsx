import { classNames } from "../../util/classNames"
import React from "react"
import { CloudDownloadIcon } from "@heroicons/react/outline"


export interface StepProps {
  content: string,
  icon: (props: React.ComponentProps<"svg">) => JSX.Element,
  iconBackground: string,
  link: {
    href?: string,
    linkText?: string,
  }
}


const loginSteps = [
  {
    content: "Go to the MetaMask website and click on the \"Get MetaMask\" button. This will take you to the Chrome web store where you can install the MetaMask extension for Chrome.",
    icon: CloudDownloadIcon,
    iconBackground: "bg-blue-500",
    link: {
      href: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      linkText: "Or click here to go directly to the webstore."
    }
  },
  {
    content: "Once the extension is installed, click on the MetaMask icon in the top right corner of your Chrome browser. This will open the MetaMask window.",
    icon: CloudDownloadIcon,
    iconBackground: "bg-blue-500"
  },
  {
    content: "Click on the \"Create Wallet\" button to create a new wallet.",
    icon: CloudDownloadIcon,
    iconBackground: "bg-blue-500"
  },
  {
    content: "Follow the on-screen instructions to set up your wallet. This will include creating a password and backing up your seed phrase. Make sure to save your seed phrase in a safe place, as it is the only way to recover your wallet if you forget your password.",
    icon: CloudDownloadIcon,
    iconBackground: "bg-blue-500"
  },
  {
    content: "Once your wallet is set up, you will be asked to choose a network. Select the \"Main Ethereum Network\" from the dropdown menu.",
    icon: CloudDownloadIcon,
    iconBackground: "bg-blue-500"
  },
  {
    content: "Congratulations, your MetaMask wallet is now set up and ready to use! You can use it to sign in via the button above.",
    icon: CloudDownloadIcon,
    iconBackground: "bg-blue-500"
  }
]

export default function StepList() {
  const steps = loginSteps

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {steps.map((step, stepIndex) => (
          <li key={stepIndex}>
            <div className="relative pb-8">
              {stepIndex !== steps.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      step.iconBackground,
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {step.content}
                      {step.link && (
                        <><br />
                          <a href={step.link.href} className="font-medium text-gray-900" target={"_blank"} rel={"noreferrer"}>
                            {step.link.linkText}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}