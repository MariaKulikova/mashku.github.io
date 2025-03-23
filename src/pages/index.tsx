import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function IntroSection() {
  return (
    <section className="py-24 text-left">
      <Heading as="h1" className="text-4xl mb-2.5">
        HEY, I AM MASHA
      </Heading>
      <p className="text-lg leading-relaxed">
        As UX Designer I create user interfaces for complex B2C and B2B products in a wide range of fields, including AI, CloudTech, E-com and MarTech. Right now, I'm working on an AI assistant project with the University of Luxembourg.
      </p>
    </section>
  );
}

function TeamsSection() {
  return (
    <section className="py-24">
      <Heading as="h2" className="text-3xl mb-5">
        TEAMS
      </Heading>
      <div className="mb-10">
        <Heading as="h3" className="text-2xl mb-3">
          University Of Luxembourg
        </Heading>
        <p className="text-gray-500 mb-3">UX designer / 2024-2025</p>
        <Link
          to="/docs/projects/university-luxembourg"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          How we research User Behavior in AI Product
        </Link>
      </div>
      <div className="mb-10">
        <Heading as="h3" className="text-2xl mb-3">
          Marquiz
        </Heading>
        <p className="text-gray-500 mb-3">Senior Product Designer /2024</p>
        <Link
          to="/docs/projects/marquiz"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          How we tried to automatize act requests at Marquiz
        </Link>
      </div>
      <div className="mb-10">
        <Heading as="h3" className="text-2xl mb-3">
          Selectel
        </Heading>
        <p className="text-gray-500 mb-3">UX designer of Cloud Storage and CDN /2020-2022</p>
        <Link
          to="/docs/projects/selectel-design-system"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2 block">
          How we create design system
        </Link>
        <Link
          to="/docs/projects/selectel-support"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2 block mt-2">
          Try to decrease count of tickets in support
        </Link>
      </div>
      <p className="mb-5">Full story of projects you can find at CV</p>
      <Link
        to="/files/cv.pdf"
        className="inline-block px-5 py-2.5 bg-gray-200 text-gray-700 no-underline border border-gray-300 rounded mt-5 hover:bg-gray-300">
        Download CV
      </Link>
    </section>
  );
}

function OtherProjectsSection() {
  return (
    <section className="py-24">
      <Heading as="h2" className="text-3xl mb-5">
        OTHER PROJECTS
      </Heading>
      <div className="mb-10">
        <Link
          to="/docs/projects/story-blog"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          How details can tell story
        </Link>
        <p className="text-gray-500 mb-3">Blog on Telegram</p>
      </div>
      <div className="mb-10">
        <Link
          to="/docs/projects/coffee-bot"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          Find a CoffeeShop near you
        </Link>
        <p className="text-gray-500 mb-3">TelegramBot</p>
      </div>
      <div className="mb-10">
        <Link
          to="/docs/projects/illustrations"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          What do you see here?
        </Link>
        <p className="text-gray-500 mb-3">Illustrations about me and you</p>
      </div>
      <div className="mb-10">
        <Link
          to="/docs/projects/planbanan"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          Estimate this on PlanBanan
        </Link>
        <p className="text-gray-500 mb-3">Estimating tool that used at real companies</p>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section className="py-24 text-left">
      <Heading as="h2" className="text-3xl mb-5">
        CONTACTS
      </Heading>
      <p className="mb-5">
        I'm always open to new connections - if you have an interesting project or just want to chat, feel free to reach out!
      </p>
      <div className="space-x-2.5">
        <Link
          to="https://medium.com/@username"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          MEDIUM
        </Link>
        <Link
          to="https://t.me/username"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          TELEGRAM
        </Link>
        <Link
          to="https://dribbble.com/username"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          DRIBBLE
        </Link>
        <Link
          to="/files/cv.pdf"
          className="text-gray-700 text-2xl leading-8 hover:text-gray-800 hover:bg-[#B4FFA1] hover:px-2">
          CV
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Portfolio - ${siteConfig.title}`}
      description="UX Designer portfolio showcasing work in AI, CloudTech, E-com and MarTech">
      <main>
        <div className="w-4/5 mx-auto p-5">
          <IntroSection />
          <TeamsSection />
          <OtherProjectsSection />
          <ContactsSection />
        </div>
      </main>
    </Layout>
  );
}
